"use client";

import { useState } from "react";
import { jodhpurJaisalmerGroupTour as tour } from "@/data/jodhpurJaisalmerGroupTour";

export default function BookingSummary() {
  const [sharing, setSharing] = useState("Triple Sharing");
  const [date, setDate] = useState(tour.departureDates[0]);
  const formatDate = (value: string) => new Date(`${value}T12:00:00+05:30`).toLocaleDateString("en-IN", {timeZone:"Asia/Kolkata",day:"numeric",month:"long",year:"numeric"});
  const message = `Hello Only Road Trip, I would like to confirm an offline booking for the Jodhpur & Jaisalmer Group Tour from Delhi. Departure: ${formatDate(date)}. Sharing: ${sharing}. Rate: ₹${tour.groupRates.sharingRates.find(option=>option.type===sharing)!.price.toLocaleString("en-IN")}/- per person including 5% GST. Please confirm seats and boarding details.`;
  return <aside id="pricing" className="h-fit scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl lg:sticky lg:top-24">
    <div className="bg-[#153e75] p-5 text-xl font-extrabold text-white">Booking Summary</div>
    <div className="space-y-5 p-5">
      <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Starting from · per person</p><p className="mt-2 text-3xl font-extrabold text-blue-900">₹21,000/-</p><p className="mt-1 text-xs text-slate-500">Triple sharing · 5% GST included</p></div>
      <div><h2 className="text-lg font-bold">Room Sharing &amp; Rates</h2><div className="mt-3 space-y-2">{tour.groupRates.sharingRates.map(option => <button key={option.type} type="button" aria-pressed={sharing === option.type} onClick={() => setSharing(option.type)} className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-3 text-left text-sm font-bold ${sharing === option.type ? "border-blue-800 bg-blue-50 text-blue-900" : "border-slate-200 text-slate-600"}`}><span>{option.type}</span><span>₹{option.price.toLocaleString("en-IN")}/-</span></button>)}</div></div>
      <div><h2 className="text-lg font-bold">Available Delhi Departures</h2><div className="mt-3 space-y-2">{tour.departureDates.map(departure => <button key={departure} type="button" aria-pressed={date === departure} onClick={()=>setDate(departure)} className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-3 text-left text-sm font-bold ${date === departure ? "border-blue-800 bg-blue-50 text-blue-900" : "border-slate-200 text-slate-600"}`}><span>{formatDate(departure)}</span><span className="text-xs text-emerald-700">Available</span></button>)}</div><p className="mt-3 text-xs leading-5 text-slate-500">Offline booking only. Contact the team to confirm seats, boarding point and reporting time.</p></div>
      <a href={`https://wa.me/919217259457?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className="block rounded-xl bg-[#153e75] px-5 py-4 text-center font-extrabold text-white hover:bg-blue-900">Contact Team to Book</a>
      <p className="text-xs leading-5 text-slate-500">Selecting a date does not reserve a seat. Your booking is confirmed directly by the team; no online checkout is available for this tour.</p>
    </div>
  </aside>;
}
