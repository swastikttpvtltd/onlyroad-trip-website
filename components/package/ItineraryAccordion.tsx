"use client";
import { useState } from "react";

type ItineraryDay = {
  day: string | number;
  title: string;
  morning: string[];
  afternoon: string[];
  evening: string[];
};

type Props = {
  itinerary: ItineraryDay[];
  destination: string;
  category: string;
  vibeHook?: string;
};

const clean = (items: string[]) =>
  items.filter(Boolean).filter((x) => !/^breakfast|^dinner|^stay$|^drop$|^departure$/i.test(x.trim()));

function experience(day: ItineraryDay) {
  const acts = clean([...day.morning, ...day.afternoon, ...day.evening]);
  if (/arrival|check.?in/i.test(day.title)) {
    return `Arrival and settling-in day. ${acts.length ? `The scheduled experience includes ${acts.slice(0, 4).join(", ")}.` : "The pace is intentionally comfortable after the journey."}`;
  }
  if (/departure|return|drop/i.test(day.title)) {
    return `A departure-focused day following the published route. ${acts.length ? `The planned stops and transfer details are ${acts.slice(0, 3).join(", ")}.` : "Checkout and transfer follow the confirmed departure timing."}`;
  }
  return `Today is built around ${day.title}. ${acts.length ? `The itinerary specifically includes ${acts.slice(0, 5).join(", ")}.` : "Sightseeing follows the confirmed route."}`;
}

export default function ItineraryAccordion({ itinerary, destination, category, vibeHook }: Props) {
  const [openDay, setOpenDay] = useState<number | null>(0);

  return (
    <div className="space-y-5">
      {vibeHook && (
        <div className="rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 via-white to-sky-50 p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Only Road Trip • Vibe Check</p>
          <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">{vibeHook}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">Less checklist, more experience. Open each day to see the full plan.</p>
        </div>
      )}

      {itinerary.map((day, index) => {
        const isOpen = openDay === index;
        return (
          <div key={`${day.day}-${index}`} className="relative border-l-2 border-orange-300 pl-7">
            <span className="absolute -left-4 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
              {index + 1}
            </span>
            <div className="overflow-hidden rounded-xl border bg-white">
              <button
                type="button"
                onClick={() => setOpenDay(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-5 p-5 text-left hover:bg-slate-50"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Day {day.day}</p>
                  <h3 className="mt-1 text-xl font-extrabold text-slate-900">{day.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{experience(day)}</p>
                </div>
                <span className="shrink-0 text-3xl font-light text-orange-500">{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && (
                <div className="border-t bg-slate-50 p-5">
                  <div className="grid gap-4 md:grid-cols-3">
                    <ActivityBlock title="Morning" items={day.morning} />
                    <ActivityBlock title="Afternoon" items={day.afternoon} />
                    <ActivityBlock title="Evening" items={day.evening} />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ActivityBlock({ title, items }: { title: string; items: string[] }) {
  const visibleItems = clean(items);
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <h4 className="font-bold text-orange-600">{title}</h4>
      {visibleItems.length ? (
        <ul className="mt-3 space-y-2">
          {visibleItems.map((item, index) => (
            <li key={`${item}-${index}`} className="flex gap-2 text-sm leading-6 text-slate-600">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-slate-400">No activity listed.</p>
      )}
    </div>
  );
}
