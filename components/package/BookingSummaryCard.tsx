"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, Download, Mail, MessageCircle, Utensils, Hotel, Camera, Bus, Users, IndianRupee, ChevronDown } from "lucide-react";
import { getGroupSharingRates, getGroupTourStartingPrice, isGroupTourPackage } from "@/data/groupTourPricing";

type SharingRate = { type: string; price: number };
type Props = {
  pkg?: { slug?: string; title?: string; duration?: string; destination?: string; state?: string; category?: string; themes?: string[]; packageId?: string; sharingRates?: SharingRate[]; groupRates?: { sharingRates?: SharingRate[] }; price?: number };
  slug?: string;
  title?: string;
  price?: number;
  duration?: string;
  destination?: string;
};

function buildFridays() {
  const dates: string[] = [];
  const cursor = new Date("2026-08-21T12:00:00");
  const end = new Date("2028-01-28T12:00:00");
  while (cursor <= end) {
    dates.push(cursor.toISOString().slice(0, 10));
    cursor.setDate(cursor.getDate() + 7);
  }
  return dates;
}

const FRIDAYS = buildFridays();
const INVENTORY_PER_DEPARTURE = 20;

function formatDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
}

export default function BookingSummaryCard({ pkg, slug, title, price, duration, destination }: Props) {
  const [message, setMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(FRIDAYS[0]);
  const finalSlug = pkg?.slug ?? slug ?? "package";
  const finalTitle = pkg?.title ?? title ?? "Tour Package";
  const finalDuration = pkg?.duration ?? duration ?? "As per package";
  const finalDestination = pkg?.destination ?? destination ?? "India";
  const groupRates = getGroupSharingRates(pkg);
  const isGroup = isGroupTourPackage(pkg) && !!groupRates;
  const displayPrice = isGroup ? getGroupTourStartingPrice(pkg) : (price ?? pkg?.price ?? 0);
  const formattedPrice = displayPrice ? `₹${displayPrice.toLocaleString("en-IN")}` : "Price on Request";
  const sharingRates = groupRates ?? pkg?.sharingRates ?? pkg?.groupRates?.sharingRates ?? [];
  const months = useMemo(() => Array.from(new Set(FRIDAYS.map((date) => date.slice(0, 7)))), []);
  const selectedMonth = selectedDate.slice(0, 7);
  const visibleSlots = useMemo(() => FRIDAYS.filter((date) => date.startsWith(selectedMonth)), [selectedMonth]);
  const whatsappText = encodeURIComponent(`Hi, I want details for ${finalTitle}. Package: ${finalSlug}`);
  const emailSubject = encodeURIComponent(`Enquiry for ${finalTitle}`);
  const emailBody = encodeURIComponent(`Hi Only Road Trip,\n\nI want details for ${finalTitle}.\nPackage: ${finalSlug}`);

  const downloadItinerary = () => { setMessage("Use Print → Save as PDF to download your itinerary."); window.print(); };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.10)]">
        <div className="border-l-4 border-[#153e75] px-5 pb-4 pt-5">
          <div className="flex items-start justify-between gap-3"><h2 className="text-[22px] font-extrabold tracking-tight text-slate-900">Booking Summary</h2><div className="flex items-center gap-3 text-slate-500"><a aria-label="Email itinerary" title="Email itinerary" href={`mailto:?subject=${emailSubject}&body=${emailBody}`}><Mail size={21} /></a><a aria-label="Send on WhatsApp" title="Send on WhatsApp" target="_blank" rel="noopener noreferrer" href={`https://wa.me/919211796168?text=${whatsappText}`}><MessageCircle size={21} /></a><button aria-label="Download itinerary" title="Download itinerary" type="button" onClick={downloadItinerary}><Download size={21} /></button></div></div>
          <div className="mt-5 space-y-4 text-sm"><div className="grid grid-cols-[115px_1fr] items-center gap-3"><span className="text-slate-500">Departure City</span><span className="text-right font-bold text-slate-900">Joining / Leaving</span></div><div className="grid grid-cols-[115px_1fr] items-center gap-3"><span className="text-slate-500">Departure Date</span><span className="text-right font-bold text-slate-900">{isGroup ? formatDate(selectedDate) : "As per selected departure"}</span></div><div className="grid grid-cols-[115px_1fr] items-center gap-3"><span className="text-slate-500">Duration</span><span className="text-right font-bold text-slate-900">{finalDuration}</span></div><div className="grid grid-cols-[115px_1fr] items-center gap-3"><span className="text-slate-500">Tour Includes</span><span className="flex justify-end gap-3 text-[#153e75]" title="Hotel, meals, sightseeing and transport"><Hotel size={18}/><Utensils size={18}/><Camera size={18}/><Bus size={18}/></span></div></div>
        </div>

        {sharingRates.length > 0 && <div className="border-t border-slate-200 bg-white px-5 py-5"><div className="mb-3"><h3 className="text-lg font-extrabold text-slate-900">Group Tour Package Pricing</h3><p className="mt-1 text-xs text-slate-500">Fixed per person • GST @ 5% included • Select your room sharing</p></div><div className="overflow-hidden rounded-xl border border-slate-200"><table className="w-full text-sm"><thead className="bg-slate-50"><tr><th className="px-3 py-3 text-left font-bold text-slate-600">Room Sharing</th><th className="px-3 py-3 text-right font-bold text-slate-600">Cost (per person)</th></tr></thead><tbody>{sharingRates.map((rate) => <tr key={rate.type} className="border-t border-slate-200"><td className="px-3 py-3 font-bold text-slate-800">{rate.type}</td><td className="px-3 py-3 text-right font-extrabold text-[#153e75]">₹{rate.price.toLocaleString("en-IN")}/-</td></tr>)}</tbody></table></div></div>}

        {isGroup && <div className="border-t border-slate-200 bg-slate-50 px-5 py-5"><div className="flex items-center justify-between gap-3"><div><h3 className="text-lg font-extrabold text-slate-900">Departure Calendar & Inventory</h3><p className="mt-1 text-xs text-slate-500">Every Friday • departures through January 2028</p></div><div className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-700">{INVENTORY_PER_DEPARTURE} seats</div></div><div className="mt-3 flex items-center gap-2"><select value={selectedMonth} onChange={(e) => { const first = FRIDAYS.find((date) => date.startsWith(e.target.value)); if (first) setSelectedDate(first); }} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-bold text-slate-800">{months.map((month) => <option key={month} value={month}>{new Date(`${month}-01T12:00:00`).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</option>)}</select><ChevronDown size={17} className="-ml-9 pointer-events-none text-slate-500" /></div><div className="mt-3 space-y-2">{visibleSlots.map((date) => <button key={date} type="button" onClick={() => setSelectedDate(date)} className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-xs ${selectedDate === date ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-white"}`}><span className="font-bold text-slate-900">{formatDate(date)}</span><span className="rounded-full bg-emerald-50 px-2 py-1 font-bold text-emerald-700">Available • {INVENTORY_PER_DEPARTURE}</span></button>)}</div></div>}

        <div className="border-t border-slate-200 bg-slate-50 px-5 py-5"><div className="flex items-end justify-between gap-4"><div><p className="text-[22px] font-extrabold text-slate-900">Tour Price</p><p className="mt-1 text-xs text-slate-500">*Price is per person on the displayed group rate card.</p></div><div className="text-right"><p className="text-[28px] font-extrabold tracking-tight text-slate-900">{formattedPrice}</p><p className="text-xs text-slate-500">Per Person*</p></div></div><div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4 text-sm"><div className="flex items-center gap-2"><IndianRupee size={17} className="text-[#153e75]"/><span className="text-slate-500">EMI</span><b>Available</b></div><div className="flex items-center justify-end gap-2"><Check size={17} className="text-emerald-600"/><span className="text-slate-500">Online Payment</span><b>Available</b></div></div></div>
        <div className="grid grid-cols-2 gap-2 border-t border-slate-200 p-5"><a href={`mailto:?subject=${emailSubject}&body=${emailBody}`} className="rounded-lg border border-slate-300 px-3 py-3 text-center text-sm font-bold text-slate-700">Enquire Now</a><Link href={`/book/${finalSlug}`} className="rounded-lg bg-[#153e75] px-3 py-3 text-center text-sm font-bold text-white">Book Now</Link></div>
        {message && <p className="px-5 pb-4 text-center text-xs text-slate-500">{message}</p>}
      </div>
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"><h3 className="text-lg font-bold text-slate-900">Plan Your Adventure</h3><div className="mt-4 grid grid-cols-3 gap-2 text-center"><a href={`mailto:?subject=${emailSubject}&body=${emailBody}`} className="rounded-xl p-2"><Mail className="mx-auto text-slate-500" size={22}/><span className="mt-2 block text-xs font-bold text-slate-800">Enquire Now</span></a><a href={`mailto:?subject=${emailSubject}&body=${emailBody}`} className="rounded-xl p-2"><Mail className="mx-auto text-slate-500" size={22}/><span className="mt-2 block text-xs font-bold text-slate-800">Email Itinerary</span></a><a target="_blank" rel="noopener noreferrer" href={`https://wa.me/919211796168?text=${whatsappText}`} className="rounded-xl p-2"><MessageCircle className="mx-auto text-slate-500" size={22}/><span className="mt-2 block text-xs font-bold text-slate-800">Send Itinerary</span></a></div><div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500"><Users size={15}/> Destination: <b className="text-slate-700">{finalDestination}</b></div></div>
    </div>
  );
}
