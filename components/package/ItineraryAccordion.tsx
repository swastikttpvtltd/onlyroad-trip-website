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

function escapeHtml(value: string) {
  return value.replace(/[&<>\"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[char] || char));
}

function findSectionByHeading(pattern: RegExp) {
  const headings = Array.from(document.querySelectorAll("h1,h2,h3,h4"));
  const heading = headings.find((node) => pattern.test((node.textContent || "").trim()));
  if (!heading) return "";
  const section = heading.closest("section,article");
  return section?.outerHTML || heading.parentElement?.outerHTML || "";
}

function buildItineraryHtml(itinerary: ItineraryDay[]) {
  return itinerary.map((day) => `
    <section class="day">
      <div class="day-title">Day ${escapeHtml(String(day.day))} — ${escapeHtml(day.title)}</div>
      <div class="cols">
        <div><h4>Morning</h4>${clean(day.morning).map((x) => `<p>• ${escapeHtml(x)}</p>`).join("") || "<p>—</p>"}</div>
        <div><h4>Afternoon</h4>${clean(day.afternoon).map((x) => `<p>• ${escapeHtml(x)}</p>`).join("") || "<p>—</p>"}</div>
        <div><h4>Evening</h4>${clean(day.evening).map((x) => `<p>• ${escapeHtml(x)}</p>`).join("") || "<p>—</p>"}</div>
      </div>
    </section>
  `).join("");
}

function downloadItinerary(itinerary: ItineraryDay[], destination: string, category: string) {
  const itineraryHtml = buildItineraryHtml(itinerary);
  const inclusionHtml = findSectionByHeading(/inclusions?|included/i);
  const exclusionHtml = findSectionByHeading(/exclusions?|not included|excluded/i);
  const termsHtml = findSectionByHeading(/terms|conditions|booking policy|cancellation policy/i);
  const costingHtml = findSectionByHeading(/package cost|costing|pricing|price/i);

  const printWindow = window.open("", "_blank", "noopener,noreferrer,width=1000,height=800");
  if (!printWindow) return;

  printWindow.document.write(`<!doctype html><html><head><title>${escapeHtml(destination)} - Itinerary</title>
    <style>
      @page{size:A4;margin:14mm}
      *{box-sizing:border-box}body{font-family:Arial,Helvetica,sans-serif;color:#172033;margin:0;background:#fff;font-size:12px;line-height:1.55}
      h1{font-size:24px;margin:0 0 4px;color:#173f78}h2{font-size:17px;margin:22px 0 10px;color:#173f78;border-bottom:2px solid #f59e0b;padding-bottom:5px}
      h3{font-size:15px}h4{font-size:12px;margin:0 0 5px;color:#173f78}.meta{color:#64748b;margin-bottom:16px}.day{border:1px solid #dbe2ea;border-radius:8px;margin:0 0 10px;padding:10px;break-inside:avoid}.day-title{font-weight:700;font-size:14px;margin-bottom:8px;color:#173f78}.cols{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.cols>div{background:#f8fafc;padding:8px;border-radius:6px}.cols p{margin:2px 0}.source{margin-top:8px}.source>*{max-width:100%}.source table{width:100%;border-collapse:collapse}.source th,.source td{border:1px solid #cbd5e1;padding:6px;text-align:left}.source ul,.source ol{padding-left:20px}.source button,.source nav,.source a[href]{color:inherit;text-decoration:none}.empty{display:none}
    </style></head><body>
      <h1>${escapeHtml(destination)}</h1><div class="meta">${escapeHtml(category)} • Only Road Trip</div>
      <h2>Itinerary</h2>${itineraryHtml}
      ${inclusionHtml ? `<h2>Inclusions</h2><div class="source">${inclusionHtml}</div>` : ""}
      ${exclusionHtml ? `<h2>Exclusions</h2><div class="source">${exclusionHtml}</div>` : ""}
      ${costingHtml ? `<h2>Costing</h2><div class="source">${costingHtml}</div>` : ""}
      ${termsHtml ? `<h2>Terms & Conditions</h2><div class="source">${termsHtml}</div>` : ""}
    </body></html>`);
  printWindow.document.close();
  setTimeout(() => { printWindow.focus(); printWindow.print(); }, 350);
}

export default function ItineraryAccordion({ itinerary, destination, category, vibeHook }: Props) {
  const [openDay, setOpenDay] = useState<number | null>(0);

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <button type="button" onClick={() => downloadItinerary(itinerary, destination, category)} className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-extrabold text-white shadow-md transition hover:bg-blue-800">
          ↓ Download Itinerary
        </button>
      </div>

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
            <span className="absolute -left-4 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">{index + 1}</span>
            <div className="overflow-hidden rounded-xl border bg-white">
              <button type="button" onClick={() => setOpenDay(isOpen ? null : index)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-5 p-5 text-left hover:bg-slate-50">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Day {day.day}</p>
                  <h3 className="mt-1 text-xl font-extrabold text-slate-900">{day.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{experience(day)}</p>
                </div>
                <span className="shrink-0 text-3xl font-light text-orange-500">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && <div className="border-t bg-slate-50 p-5"><div className="grid gap-4 md:grid-cols-3"><ActivityBlock title="Morning" items={day.morning} /><ActivityBlock title="Afternoon" items={day.afternoon} /><ActivityBlock title="Evening" items={day.evening} /></div></div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ActivityBlock({ title, items }: { title: string; items: string[] }) {
  const visibleItems = clean(items);
  return <div className="rounded-xl border border-slate-200 bg-white p-4"><h4 className="font-bold text-orange-600">{title}</h4>{visibleItems.length ? <ul className="mt-3 space-y-2">{visibleItems.map((item, index) => <li key={`${item}-${index}`} className="flex gap-2 text-sm leading-6 text-slate-600"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" /><span>{item}</span></li>)}</ul> : <p className="mt-3 text-sm text-slate-400">No activity listed.</p>}</div>;
}
