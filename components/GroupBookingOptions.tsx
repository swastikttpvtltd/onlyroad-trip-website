"use client";

import { useMemo, useState } from "react";

type Props = { packageTitle?: string };

const money = (value: number) => `₹${value.toLocaleString("en-IN")}/-`;

function nextFriday(from: Date) {
  const d = new Date(from);
  d.setHours(12, 0, 0, 0);
  const days = (5 - d.getDay() + 7) % 7 || 7;
  d.setDate(d.getDate() + days);
  return d;
}

function iso(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function display(d: Date) {
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function GroupBookingOptions({ packageTitle }: Props) {
  const isGoa = /goa/i.test(String(packageTitle ?? ""));
  const rates = isGoa
    ? { quad: 9999, triple: 11599, double: 12599 }
    : { quad: 7499, triple: 7999, double: 8499 };

  const slots = useMemo(() => {
    const start = nextFriday(new Date());
    const end = new Date(2028, 0, 31, 12);
    const items: { start: Date; end: Date; value: string }[] = [];
    for (const d = new Date(start); d <= end; d.setDate(d.getDate() + 7)) {
      const tripEnd = new Date(d);
      tripEnd.setDate(tripEnd.getDate() + 2);
      items.push({ start: new Date(d), end: tripEnd, value: iso(d) });
    }
    return items;
  }, []);

  const [selected, setSelected] = useState(slots[0]?.value ?? "");
  const selectedSlot = slots.find((slot) => slot.value === selected) ?? slots[0];

  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl md:p-7">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Group Tour Booking</p>
        <h2 className="mt-1 text-2xl font-extrabold text-slate-900 md:text-3xl">Fixed Group Tour Rates</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">These are fixed per-person rates. The same rate applies whether one person or multiple travellers are booking.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#153e75] text-left text-white">
              <th className="px-4 py-3 font-bold">Sharing Type</th>
              <th className="px-4 py-3 text-right font-bold">Price / Person</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t"><td className="px-4 py-3 font-bold">Quad Sharing</td><td className="px-4 py-3 text-right font-extrabold">{money(rates.quad)}</td></tr>
            <tr className="border-t bg-slate-50"><td className="px-4 py-3 font-bold">Triple Sharing</td><td className="px-4 py-3 text-right font-extrabold">{money(rates.triple)}</td></tr>
            <tr className="border-t"><td className="px-4 py-3 font-bold">Double Sharing</td><td className="px-4 py-3 text-right font-extrabold">{money(rates.double)}</td></tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Travel Slots</p>
            <h3 className="mt-1 text-xl font-extrabold text-slate-900">Select Your Friday Departure</h3>
            <p className="mt-1 text-sm text-slate-500">Slots are generated every Friday from the next available Friday through January 2028.</p>
          </div>
          <label className="w-full md:w-80">
            <span className="mb-2 block text-sm font-bold text-slate-800">Selected Travel Date</span>
            <select value={selected} onChange={(e) => setSelected(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100">
              {slots.map((slot) => <option key={slot.value} value={slot.value}>{display(slot.start)} — return {display(slot.end)}</option>)}
            </select>
          </label>
        </div>

        {selectedSlot && (
          <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <div className="grid gap-3 md:grid-cols-3">
              <div><p className="text-xs font-bold uppercase text-blue-600">Departure</p><p className="mt-1 font-extrabold text-slate-900">{display(selectedSlot.start)}</p></div>
              <div><p className="text-xs font-bold uppercase text-blue-600">Return</p><p className="mt-1 font-extrabold text-slate-900">{display(selectedSlot.end)}</p></div>
              <div><p className="text-xs font-bold uppercase text-blue-600">Slot Status</p><p className="mt-1 font-extrabold text-emerald-700">Available</p></div>
            </div>
          </div>
        )}

        <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[620px] border-collapse text-sm">
            <thead><tr className="bg-slate-100 text-left"><th className="px-4 py-3 font-bold">Departure</th><th className="px-4 py-3 font-bold">Return</th><th className="px-4 py-3 font-bold">Trip</th><th className="px-4 py-3 font-bold">Status</th></tr></thead>
            <tbody>
              {slots.map((slot) => <tr key={slot.value} className={`border-t ${slot.value === selected ? "bg-blue-50" : ""}`}><td className="px-4 py-3 font-semibold">{display(slot.start)}</td><td className="px-4 py-3">{display(slot.end)}</td><td className="px-4 py-3">2 Nights / 3 Days</td><td className="px-4 py-3 font-bold text-emerald-700">Available</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-5 text-xs leading-5 text-slate-500">The calendar currently publishes the scheduled Friday slots. Live seat inventory will be connected separately so confirmed payments can automatically reduce availability for the selected departure.</p>
    </section>
  );
}
