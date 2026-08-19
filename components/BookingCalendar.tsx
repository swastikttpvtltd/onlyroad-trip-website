"use client";

import { useMemo } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { BOOKING_HOLIDAYS, addDaysISO, formatBookingDate, getHoliday, getTripHoliday, isBookingLeadEligible, monthLabel, parseISODate, toISODate } from "@/data/bookingCalendar";

type Props = {
  selectedDate: string;
  onChange: (date: string) => void;
  duration?: string;
  groupOnly?: boolean;
  allowedDates?: string[];
  title?: string;
  helper?: string;
  onEnquiry?: (date: string, reason: string) => void;
};

function buildMonthDays(month: string) {
  const first = parseISODate(`${month}-01`);
  const start = new Date(first);
  start.setDate(1 - first.getDay());
  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    return toISODate(day);
  });
}

function monthKey(value: string) {
  return value.slice(0, 7);
}

export default function BookingCalendar({ selectedDate, onChange, duration, groupOnly = false, allowedDates, title = "Select Travel Date", helper, onEnquiry }: Props) {
  const today = toISODate(new Date());
  const minDate = addDaysISO(today, 7);
  const currentMonthKey = selectedDate?.slice(0, 7) || minDate.slice(0, 7);
  const days = useMemo(() => buildMonthDays(currentMonthKey), [currentMonthKey]);
  const availableSet = useMemo(() => new Set(allowedDates ?? []), [allowedDates]);
  const monthHolidays = useMemo(() => BOOKING_HOLIDAYS.filter((holiday) => holiday.date.startsWith(currentMonthKey)), [currentMonthKey]);
  const canGoPrevious = currentMonthKey > monthKey(minDate);

  const getStatus = (date: string) => {
    const holiday = getHoliday(date);
    const tripHoliday = getTripHoliday(date, duration);
    const past = date < minDate || !isBookingLeadEligible(date, today);
    const groupSlot = groupOnly ? (allowedDates ? availableSet.has(date) : parseISODate(date).getDay() === 5) : true;

    if (past) return "past" as const;
    if (groupOnly && !groupSlot) return "group" as const;
    if (tripHoliday) return "holiday" as const;
    if (holiday) return "holiday" as const;
    return "available" as const;
  };

  const isSelectable = (date: string) => getStatus(date) === "available";

  const goToMonth = (delta: number) => {
    const base = parseISODate(`${currentMonthKey}-01`);
    base.setMonth(base.getMonth() + delta);
    const nextMonth = toISODate(base).slice(0, 7);
    if (delta < 0 && nextMonth < monthKey(minDate)) return;

    const nextDays = buildMonthDays(nextMonth);
    const candidate = nextDays.find((date) => date.startsWith(nextMonth) && isSelectable(date));
    if (candidate) onChange(candidate);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays size={19} className="text-blue-700" />
            <h3 className="text-lg font-extrabold text-slate-950">{title}</h3>
          </div>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            {helper ?? `Minimum 7 days advance • ${groupOnly ? "Group departure dates only" : "future departures only"} • holiday-overlap dates are enquiry-only.`}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" aria-label="Previous month" disabled={!canGoPrevious} onClick={() => goToMonth(-1)} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"><ChevronLeft size={17} /></button>
          <button type="button" aria-label="Next month" onClick={() => goToMonth(1)} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"><ChevronRight size={17} /></button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
        <span className="text-sm font-extrabold text-slate-800">{monthLabel(`${currentMonthKey}-01`)}</span>
        <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">India Calendar</span>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <span key={day} className="py-1">{day}</span>)}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date) => {
          const inMonth = date.startsWith(currentMonthKey);
          const holiday = getHoliday(date);
          const tripHoliday = getTripHoliday(date, duration);
          const status = getStatus(date);
          const selected = selectedDate === date;
          const dayNumber = Number(date.slice(-2));
          const enabled = inMonth && status === "available";
          const enquiryDate = inMonth && status === "holiday" && date >= minDate;
          const reason = status === "past"
            ? "Minimum 7 days advance"
            : tripHoliday
              ? `${tripHoliday.name} falls during trip`
              : holiday
                ? holiday.name
                : status === "group"
                  ? "Not an available group departure"
                  : "";

          return (
            <button
              key={date}
              type="button"
              disabled={!enabled && !enquiryDate}
              onClick={() => {
                if (enabled) onChange(date);
                else if (enquiryDate && onEnquiry) onEnquiry(date, reason || "Holiday / trip overlap");
              }}
              title={reason ? `${formatBookingDate(date)} — ${reason}` : `Select ${formatBookingDate(date)}`}
              className={`relative min-h-[54px] rounded-lg border p-1 text-xs transition ${!inMonth ? "invisible" : ""} ${selected && enabled ? "border-blue-700 bg-blue-700 text-white shadow" : ""} ${selected && enquiryDate ? "border-rose-600 bg-rose-600 text-white shadow" : ""} ${!selected && enabled ? "border-slate-200 bg-white text-slate-800 hover:border-blue-400 hover:bg-blue-50" : ""} ${!enabled && !enquiryDate && inMonth ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300" : ""} ${enquiryDate ? "border-rose-200 bg-rose-50 text-rose-800 hover:border-rose-400" : ""}`}>
              <span className="block font-extrabold">{dayNumber}</span>
              {(holiday || tripHoliday) && inMonth && <span className={`mx-auto mt-0.5 block max-w-[42px] truncate text-[8px] font-bold ${selected ? "text-white/90" : "text-rose-600"}`}>{tripHoliday?.name ?? holiday?.name}</span>}
              {enabled && <span className={`mx-auto mt-1 block h-1 w-1 rounded-full ${selected ? "bg-white" : "bg-emerald-500"}`} />}
              {enquiryDate && <span className={`mx-auto mt-1 block h-1 w-1 rounded-full ${selected ? "bg-white" : "bg-rose-500"}`} />}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-bold">
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">● Available</span>
        <span className="rounded-full bg-rose-50 px-2.5 py-1 text-rose-700">● Holiday / trip overlap — Enquiry</span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-500">● Less than 7 days — closed</span>
      </div>

      {monthHolidays.length > 0 && (
        <div className="mt-3 rounded-xl border border-rose-100 bg-rose-50 p-3">
          <p className="text-[10px] font-extrabold uppercase tracking-wide text-rose-600">Major / travel-impact holidays this month</p>
          <p className="mt-1 text-[11px] text-slate-600">{monthHolidays.map((holiday) => `${holiday.name} (${holiday.date.slice(-2)})`).join(" • ")}</p>
        </div>
      )}
    </div>
  );
}
