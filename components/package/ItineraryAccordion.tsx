"use client";
import { useState } from "react";

type ItineraryDay = {
  day: string | number;
  title: string;
  morning: string[];
  afternoon: string[];
  evening: string[];
};

type SharingRate = { type: string; price: number };
type GroupRates = {
  2?: number;
  4?: number;
  6?: number;
  12?: number;
  16?: number;
  20?: number;
  25?: number;
  30?: number;
  "30+"?: number;
  sharingRates?: SharingRate[];
};

type Props = {
  itinerary: ItineraryDay[];
  destination: string;
  category: string;
  vibeHook?: string;
  packageTitle?: string;
  packageId?: string;
  duration?: string;
  overview?: string;
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
  groupRates?: GroupRates;
  sharingRates?: SharingRate[];
  bestTime?: string;
  hotels?: { name?: string }[];
  meals?: string[];
};

const clean = (items: string[] = []) =>
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
  return String(value ?? "").replace(/[&<>\"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
  }[char] || char));
}

function listHtml(items: string[]) {
  const visible = items.filter(Boolean);
  return visible.length
    ? `<ul>${visible.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
    : `<p class="muted">Not specified for this package.</p>`;
}

function pricingHtml(sharingRates: SharingRate[], groupRates?: GroupRates) {
  if (sharingRates.length) {
    return `<table class="pricing-table"><thead><tr><th>Room Sharing</th><th>Cost per Person</th></tr></thead><tbody>${sharingRates
      .map((rate) => `<tr><td>${escapeHtml(rate.type)}</td><td>₹${Number(rate.price).toLocaleString("en-IN")}/-</td></tr>`)
      .join("")}</tbody></table>`;
  }

  const slabs: Array<[string, number | undefined]> = [
    ["Up to 2 Travellers", groupRates?.[2]],
    ["Up to 4 Travellers", groupRates?.[4]],
    ["Up to 6 Travellers", groupRates?.[6]],
    ["Up to 12 Travellers", groupRates?.[12]],
    ["Up to 16 Travellers", groupRates?.[16]],
    ["Up to 20 Travellers", groupRates?.[20]],
    ["Up to 25 Travellers", groupRates?.[25]],
    ["Up to 30 Travellers", groupRates?.[30]],
    ["30+ Travellers", groupRates?.["30+"]],
  ].filter(([, price]) => typeof price === "number") as Array<[string, number]>;

  if (!slabs.length) return `<p class="muted">Price will be shared in the confirmed quotation.</p>`;
  return `<table class="pricing-table"><thead><tr><th>Group Size</th><th>Per Person</th></tr></thead><tbody>${slabs
    .map(([label, price]) => `<tr><td>${escapeHtml(label)}</td><td>₹${price.toLocaleString("en-IN")}/-</td></tr>`)
    .join("")}</tbody></table>`;
}

function buildItineraryHtml(itinerary: ItineraryDay[]) {
  return itinerary.map((day, index) => `
    <section class="day">
      <div class="day-title">Day ${escapeHtml(String(day.day ?? index + 1))} — ${escapeHtml(day.title || "Travel & Sightseeing")}</div>
      <div class="cols">
        <div><h4>Morning</h4>${clean(day.morning).map((x) => `<p>• ${escapeHtml(x)}</p>`).join("") || "<p class=\"muted\">No morning activity listed.</p>"}</div>
        <div><h4>Afternoon</h4>${clean(day.afternoon).map((x) => `<p>• ${escapeHtml(x)}</p>`).join("") || "<p class=\"muted\">No afternoon activity listed.</p>"}</div>
        <div><h4>Evening</h4>${clean(day.evening).map((x) => `<p>• ${escapeHtml(x)}</p>`).join("") || "<p class=\"muted\">No evening activity listed.</p>"}</div>
      </div>
    </section>
  `).join("");
}

function downloadItinerary({
  itinerary,
  destination,
  category,
  packageTitle,
  packageId,
  duration,
  overview,
  highlights,
  inclusions,
  exclusions,
  groupRates,
  sharingRates,
  bestTime,
  hotels,
  meals,
}: Props) {
  const title = packageTitle || destination || "Only Road Trip Itinerary";
  const safeItinerary = Array.isArray(itinerary) ? itinerary : [];
  const safeHighlights = Array.isArray(highlights) ? highlights : [];
  const safeInclusions = Array.isArray(inclusions) ? inclusions : [];
  const safeExclusions = Array.isArray(exclusions) ? exclusions : [];
  const safeSharingRates = Array.isArray(sharingRates) ? sharingRates : [];
  const safeHotels = Array.isArray(hotels) ? hotels.filter((hotel) => hotel?.name) : [];
  const safeMeals = Array.isArray(meals) ? meals.filter(Boolean) : [];

  const overviewText = overview || "This package follows the published day-wise itinerary and inclusions shown on the Only Road Trip website.";
  const paymentPolicy = [
    "A 30% advance payment is required to confirm the booking unless a different advance is specified in the confirmed quotation.",
    "The remaining balance must be cleared before commencement of the trip unless otherwise agreed in writing.",
    "Booking confirmation is subject to availability of hotels, transport, activities and other suppliers at the time of payment.",
    "The final confirmed quotation/invoice will govern the applicable price, taxes and package-specific payment terms.",
  ];
  const cancellationPolicy = [
    "Cancellation requests must be submitted in writing and will be processed according to the applicable Only Road Trip cancellation/refund terms.",
    "Refunds are subject to supplier cancellation charges, hotel/transport/activity rules, applicable taxes, banking charges and service deductions where applicable.",
    "No-show, late cancellation, unused services or changes after confirmation may attract higher or non-refundable charges depending on the supplier terms.",
    "Where a package or supplier has a specific cancellation schedule, that schedule will prevail over the general terms stated here.",
  ];

  const printWindow = window.open("", "_blank", "width=1000,height=900");
  if (!printWindow) {
    window.alert("Please allow pop-ups for Only Road Trip to download the itinerary.");
    return;
  }

  const hotelText = safeHotels.map((hotel) => String(hotel.name)).join(", ");
  const mealText = safeMeals.join(" • ");

  printWindow.document.open();
  printWindow.document.write(`<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)} - Complete Itinerary</title>
<style>
  @page { size: A4; margin: 14mm; }
  * { box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; color: #172033; margin: 0; background: #fff; font-size: 12px; line-height: 1.55; }
  h1 { font-size: 25px; line-height: 1.2; margin: 0 0 7px; color: #173f78; }
  h2 { font-size: 17px; margin: 23px 0 10px; color: #173f78; border-bottom: 2px solid #f59e0b; padding-bottom: 5px; break-after: avoid; }
  h3 { font-size: 14px; margin: 0 0 7px; color: #173f78; }
  h4 { font-size: 12px; margin: 0 0 6px; color: #173f78; }
  p { margin: 4px 0; }
  ul, ol { margin: 6px 0; padding-left: 20px; }
  li { margin: 4px 0; }
  .intro { border: 1px solid #dbe2ea; border-radius: 10px; padding: 14px; margin-bottom: 15px; }
  .meta { color: #64748b; font-size: 11px; margin-top: 4px; }
  .meta-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 12px; }
  .meta-box { background: #f8fafc; border-radius: 7px; padding: 8px; border: 1px solid #e2e8f0; }
  .meta-label { display: block; color: #64748b; font-size: 9px; text-transform: uppercase; font-weight: 700; letter-spacing: .06em; }
  .meta-value { display: block; margin-top: 3px; font-weight: 700; color: #172033; }
  .day { border: 1px solid #dbe2ea; border-radius: 9px; margin: 0 0 10px; padding: 10px; break-inside: avoid; }
  .day-title { font-weight: 700; font-size: 14px; margin-bottom: 9px; color: #173f78; }
  .cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 9px; }
  .cols > div { background: #f8fafc; padding: 8px; border-radius: 7px; min-height: 48px; }
  .cols p { margin: 3px 0; }
  .pricing-table { width: 100%; border-collapse: collapse; margin-top: 5px; }
  .pricing-table th, .pricing-table td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; }
  .pricing-table th { background: #f1f5f9; color: #334155; }
  .pricing-table td:last-child, .pricing-table th:last-child { text-align: right; font-weight: 700; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .info-card { border: 1px solid #dbe2ea; border-radius: 8px; padding: 10px; break-inside: avoid; }
  .muted { color: #64748b; }
  .footer-note { margin-top: 25px; padding-top: 9px; border-top: 1px solid #cbd5e1; color: #64748b; font-size: 9px; text-align: center; }
  @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
</style>
</head>
<body>
  <div class="intro">
    <h1>${escapeHtml(title)}</h1>
    <div class="meta">${escapeHtml(destination || "India")} • ${escapeHtml(category || "Tour Package")}</div>
    <div class="meta-grid">
      <div class="meta-box"><span class="meta-label">Package ID</span><span class="meta-value">${escapeHtml(packageId || "—")}</span></div>
      <div class="meta-box"><span class="meta-label">Duration</span><span class="meta-value">${escapeHtml(duration || "—")}</span></div>
      <div class="meta-box"><span class="meta-label">Best Time</span><span class="meta-value">${escapeHtml(bestTime || "As per package")}</span></div>
    </div>
  </div>

  <h2>Package Overview</h2>
  <div class="info-card"><p>${escapeHtml(overviewText).replace(/\n/g, "<br />")}</p>${safeHighlights.length ? `<h3 style="margin-top:12px">Tour Highlights</h3>${listHtml(safeHighlights)}` : ""}</div>

  <h2>Pricing</h2>
  <div class="info-card">
    ${pricingHtml(safeSharingRates, groupRates)}
    <p class="muted" style="margin-top:8px">Final pricing is subject to the confirmed quotation, availability, applicable taxes and package-specific terms.</p>
  </div>

  <h2>Complete Day-wise Itinerary</h2>
  ${buildItineraryHtml(safeItinerary) || `<div class="info-card"><p class="muted">No day-wise itinerary is available for this package.</p></div>`}

  <h2>Inclusions</h2>
  <div class="info-card">${listHtml(safeInclusions)}</div>

  <h2>Exclusions</h2>
  <div class="info-card">${listHtml(safeExclusions)}</div>

  <h2>Stay & Meals</h2>
  <div class="two-col">
    <div class="info-card"><h3>Accommodation</h3><p>${escapeHtml(hotelText || "3-Star Hotel / Similar")}</p></div>
    <div class="info-card"><h3>Meals</h3><p>${escapeHtml(mealText || "As per package itinerary")}</p></div>
  </div>

  <h2>Payment Policy</h2>
  <div class="info-card">${listHtml(paymentPolicy)}</div>

  <h2>Cancellation Policy</h2>
  <div class="info-card">${listHtml(cancellationPolicy)}</div>

  <div class="footer-note">This document is a package itinerary and pricing reference. Final booking documents, confirmed quotation and applicable supplier terms prevail.</div>

<script>
  window.addEventListener('load', function () {
    setTimeout(function () { window.focus(); window.print(); }, 250);
  });
</script>
</body>
</html>`);
  printWindow.document.close();
}

export default function ItineraryAccordion({
  itinerary,
  destination,
  category,
  vibeHook,
  packageTitle,
  packageId,
  duration,
  overview,
  highlights,
  inclusions,
  exclusions,
  groupRates,
  sharingRates,
  bestTime,
  hotels,
  meals,
}: Props) {
  const [openDay, setOpenDay] = useState<number | null>(0);

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => downloadItinerary({ itinerary, destination, category, vibeHook, packageTitle, packageId, duration, overview, highlights, inclusions, exclusions, groupRates, sharingRates, bestTime, hotels, meals })}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-extrabold text-white shadow-md transition hover:bg-blue-800"
        >
          ↓ Download Complete Itinerary
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
