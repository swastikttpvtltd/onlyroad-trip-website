"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
  inclusions: string[];
  exclusions: string[];
};

export default function InclusionsExclusions({ inclusions, exclusions }: Props) {
  const [open, setOpen] = useState<"included" | "excluded" | null>(null);

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setOpen(open === "included" ? null : "included")}
        aria-expanded={open === "included"}
        className="flex w-full items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-left transition hover:bg-emerald-100"
      >
        <span className="flex items-center gap-2 font-bold text-emerald-700">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-sm text-white">✓</span>
          What&apos;s Included
          <span className="text-xs font-medium text-emerald-600">({inclusions.length})</span>
        </span>
        <ChevronDown className={`h-5 w-5 text-emerald-700 transition-transform ${open === "included" ? "rotate-180" : ""}`} />
      </button>

      {open === "included" && (
        <div className="rounded-xl border border-emerald-100 bg-white p-3">
          <div className="space-y-2">
            {inclusions.map((item) => (
              <div key={item} className="rounded-lg bg-emerald-50/70 px-3 py-2.5 text-sm leading-6 text-slate-700">
                <span className="mr-2 font-bold text-emerald-600">✓</span>{item}
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen(open === "excluded" ? null : "excluded")}
        aria-expanded={open === "excluded"}
        className="flex w-full items-center justify-between rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-left transition hover:bg-red-100"
      >
        <span className="flex items-center gap-2 font-bold text-red-700">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-sm text-white">×</span>
          What&apos;s Excluded
          <span className="text-xs font-medium text-red-600">({exclusions.length})</span>
        </span>
        <ChevronDown className={`h-5 w-5 text-red-700 transition-transform ${open === "excluded" ? "rotate-180" : ""}`} />
      </button>

      {open === "excluded" && (
        <div className="rounded-xl border border-red-100 bg-white p-3">
          <div className="space-y-2">
            {exclusions.map((item) => (
              <div key={item} className="rounded-lg bg-red-50/70 px-3 py-2.5 text-sm leading-6 text-slate-700">
                <span className="mr-2 font-bold text-red-600">×</span>{item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
