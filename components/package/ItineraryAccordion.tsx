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
};

export default function ItineraryAccordion({ itinerary, destination, category }: Props) {
  const [openDay, setOpenDay] = useState<number | null>(0);

  return (
    <div className="space-y-5">
      {itinerary.map((day, index) => {
        const isOpen = openDay === index;
        const allActivities = [...day.morning, ...day.afternoon, ...day.evening];
        return (
          <div key={`${day.day}-${index}`} className="relative border-l-2 border-orange-300 pl-7">
            <span className="absolute -left-4 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">{index + 1}</span>
            <div className="overflow-hidden rounded-xl border bg-white">
              <button type="button" onClick={() => setOpenDay(isOpen ? null : index)} className="flex w-full items-start justify-between gap-5 p-5 text-left hover:bg-slate-50" aria-expanded={isOpen}>
                <div>
                  <p className="text-xs font-bold uppercase text-orange-600">Day {index + 1}</p>
                  <h3 className="mt-1 text-xl font-bold text-slate-900">{day.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{allActivities.slice(0, 2).join(" • ")}</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-orange-500 text-2xl font-light text-orange-600 transition-transform">{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && (
                <div className="border-t bg-slate-50/60 p-5 md:p-6">
                  <div className="grid gap-5 md:grid-cols-3">
                    {(["morning", "afternoon", "evening"] as const).map((period) => (
                      <div key={period} className="rounded-xl bg-white p-4 shadow-sm">
                        <h4 className="font-bold capitalize text-[#153e75]">{period}</h4>
                        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                          {day[period].map((item) => <li key={item} className="flex gap-2"><span className="text-orange-500">•</span><span>{item}</span></li>)}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">
                      <h4 className="font-bold text-slate-900">Today&apos;s Experience</h4>
                      <p className="mt-2 text-sm leading-6 text-slate-600">This day focuses on <b>{day.title}</b>. The schedule covers the listed sightseeing and activities at a comfortable pace, with practical breaks for meals, transfers, photography and local exploration.</p>
                    </div>
                    <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                      <h4 className="font-bold text-slate-900">What this day is known for</h4>
                      <p className="mt-2 text-sm leading-6 text-slate-600">Experience the key character of {destination} through {category.toLowerCase()} highlights connected with this day. Your trip coordinator can adjust visit timing according to local conditions, opening hours and travel time.</p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border bg-white p-4">
                    <h4 className="font-bold text-slate-900">Detailed Day Schedule</h4>
                    <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                      {allActivities.map((item, activityIndex) => <li key={`${item}-${activityIndex}`}><b className="text-[#153e75]">{activityIndex + 1}.</b> {item}</li>)}
                    </ol>
                    <p className="mt-4 text-xs leading-5 text-slate-500">Note: Exact timings may change depending on weather, traffic, safari/monument slots, local restrictions and hotel location.</p>
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
