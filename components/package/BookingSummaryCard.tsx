"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Download, Mail, MessageCircle, Utensils, Hotel, Camera, Bus, Users, IndianRupee } from "lucide-react";

type Props = {
  pkg?: { slug?: string; title?: string; duration?: string; destination?: string };
  slug?: string;
  title?: string;
  price?: number;
  duration?: string;
  destination?: string;
};

export default function BookingSummaryCard({ pkg, slug, title, price, duration, destination }: Props) {
  const [message, setMessage] = useState("");
  const finalSlug = pkg?.slug ?? slug ?? "package";
  const finalTitle = pkg?.title ?? title ?? "Tour Package";
  const finalDuration = pkg?.duration ?? duration ?? "As per package";
  const finalDestination = pkg?.destination ?? destination ?? "India";
  const formattedPrice = price ? `₹${price.toLocaleString("en-IN")}` : "Price on Request";
  const whatsappText = encodeURIComponent(`Hi, I want details for ${finalTitle}. Package: ${finalSlug}`);
  const emailSubject = encodeURIComponent(`Enquiry for ${finalTitle}`);
  const emailBody = encodeURIComponent(`Hi Only Road Trip,\n\nI want details for ${finalTitle}.\nPackage: ${finalSlug}`);

  const downloadItinerary = () => {
    setMessage("Use Print → Save as PDF to download your itinerary.");
    window.print();
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.10)]">
        <div className="border-l-4 border-[#153e75] px-5 pb-4 pt-5">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-[22px] font-extrabold tracking-tight text-slate-900">Booking Summary</h2>
            <div className="flex items-center gap-3 text-slate-500">
              <a aria-label="Email itinerary" title="Email itinerary" href={`mailto:?subject=${emailSubject}&body=${emailBody}`} className="transition hover:text-[#153e75]"><Mail size={21} /></a>
              <a aria-label="Send on WhatsApp" title="Send on WhatsApp" target="_blank" rel="noopener noreferrer" href={`https://wa.me/919211796168?text=${whatsappText}`} className="transition hover:text-[#153e75]"><MessageCircle size={21} /></a>
              <button aria-label="Download itinerary" title="Download itinerary" type="button" onClick={downloadItinerary} className="transition hover:text-[#153e75]"><Download size={21} /></button>
            </div>
          </div>

          <div className="mt-5 space-y-4 text-sm">
            <div className="grid grid-cols-[115px_1fr] items-center gap-3"><span className="text-slate-500">Departure City</span><span className="text-right font-bold text-slate-900">Joining / Leaving</span></div>
            <div className="grid grid-cols-[115px_1fr] items-center gap-3"><span className="text-slate-500">Departure Date</span><span className="text-right font-bold text-slate-900">As per selected departure</span></div>
            <div className="grid grid-cols-[115px_1fr] items-center gap-3"><span className="text-slate-500">Duration</span><span className="text-right font-bold text-slate-900">{finalDuration}</span></div>
            <div className="grid grid-cols-[115px_1fr] items-center gap-3"><span className="text-slate-500">Tour Includes</span><span className="flex justify-end gap-3 text-[#153e75]" title="Hotel, meals, sightseeing and transport"><Hotel size={18}/><Utensils size={18}/><Camera size={18}/><Bus size={18}/></span></div>
          </div>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-5 py-5">
          <div className="flex items-end justify-between gap-4"><div><p className="text-[22px] font-extrabold text-slate-900">Tour Price</p><p className="mt-1 text-xs text-slate-500">*Price is per person on standard sharing basis.</p></div><div className="text-right"><p className="text-[28px] font-extrabold tracking-tight text-slate-900">{formattedPrice}</p><p className="text-xs text-slate-500">Per Person*</p></div></div>
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4 text-sm"><div className="flex items-center gap-2"><IndianRupee size={17} className="text-[#153e75]"/><span className="text-slate-500">EMI</span><b>Available</b></div><div className="flex items-center justify-end gap-2"><Check size={17} className="text-emerald-600"/><span className="text-slate-500">Online Payment</span><b>Available</b></div></div>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-slate-200 p-5"><a href={`mailto:?subject=${emailSubject}&body=${emailBody}`} className="rounded-lg border border-slate-300 px-3 py-3 text-center text-sm font-bold text-slate-700 transition hover:border-[#153e75] hover:text-[#153e75]">Enquire Now</a><Link href={`/book/${finalSlug}`} className="rounded-lg bg-[#153e75] px-3 py-3 text-center text-sm font-bold text-white transition hover:bg-[#0f2f59]">Book Now</Link></div>
        {message && <p className="px-5 pb-4 text-center text-xs text-slate-500">{message}</p>}
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"><h3 className="text-lg font-bold text-slate-900">Plan Your Adventure</h3><div className="mt-4 grid grid-cols-3 gap-2 text-center"><a href={`mailto:?subject=${emailSubject}&body=${emailBody}`} className="rounded-xl p-2 transition hover:bg-slate-50"><Mail className="mx-auto text-slate-500" size={22}/><span className="mt-2 block text-xs font-bold text-slate-800">Enquire Now</span></a><a href={`mailto:?subject=${emailSubject}&body=${emailBody}`} className="rounded-xl p-2 transition hover:bg-slate-50"><Mail className="mx-auto text-slate-500" size={22}/><span className="mt-2 block text-xs font-bold text-slate-800">Email Itinerary</span></a><a target="_blank" rel="noopener noreferrer" href={`https://wa.me/919211796168?text=${whatsappText}`} className="rounded-xl p-2 transition hover:bg-slate-50"><MessageCircle className="mx-auto text-slate-500" size={22}/><span className="mt-2 block text-xs font-bold text-slate-800">Send Itinerary</span></a></div><div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500"><Users size={15}/> Destination: <b className="text-slate-700">{finalDestination}</b></div></div>
    </div>
  );
}
