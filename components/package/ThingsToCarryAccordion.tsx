"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
  items: string[];
};

export default function ThingsToCarryAccordion({ items }: Props) {
  const [open, setOpen] = useState(false);

  if (!items.length) return null;

  return (
    <div className="rounded-2xl border border-sky-100 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-2xl bg-sky-50 px-5 py-4 text-left transition hover:bg-sky-100"
      >
        <span>
          <span className="block text-xs font-bold uppercase tracking-[0.18em] text-sky-600">Travel Prep</span>
          <span className="mt-1 block font-extrabold text-slate-900">Things to Carry <span className="text-xs font-semibold text-sky-600">({items.length})</span></span>
        </span>
        <ChevronDown className={`h-5 w-5 text-sky-700 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="space-y-2 p-4">
          {items.map((item, index) => (
            <div key={`${item}-${index}`} className="rounded-xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
              <span className="mr-2 font-bold text-sky-600">{index + 1}.</span>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
