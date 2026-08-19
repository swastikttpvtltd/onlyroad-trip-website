"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CalendarDays, Check, Hotel, Utensils, Camera, Bus, Users, MessageCircle, Mail } from "lucide-react";
import BookingCalendar from "@/components/BookingCalendar";
import { buildFridays, addDaysISO, formatBookingDate, getTripHoliday, isBookingLeadEligible, toISODate } from "@/data/bookingCalendar";
import { getGroupSharingRates, getGroupTourStartingPrice, getPilgrimageGroupTourDates, isGroupTourPackage } from "@/data/groupTourPricing";
import { makePackageRates } from "@/data/packagePricing";

type SharingRate = { type: string; price: number };
type Props = {
  pkg?: { slug?: string; title?: string; duration?: string; destination?: string; state?: string; category?: string; themes?: string[]; packageId?: string; sharingRates?: SharingRate[]; groupRates?: { sharingRates?: SharingRate[] }; price?: number; itinerary?: any[]; inclusions?: string[]; exclusions?: string[]; termsAndConditions?: string[]; terms?: string[] };
  slug?: string; title?: string; price?: number; duration?: string; destination?: string;
};

function formatDate(value: string) { return formatBookingDate(value); }
function isPilgrimage(title: string, packageId?: string) { return /char[- ]dham|do[- ]dham|kedarnath/i.test(`${title} ${packageId ?? ""}`); }
function isJyotirlinga(pkg?: Props["pkg"]) {
  const text = `${pkg?.title ?? ""} ${pkg?.category ?? ""} ${(pkg?.themes ?? []).join(" ")}`.toLowerCase();
  return text.includes("jyotirlinga");
}

export default function BookingSummaryCard({ pkg, slug, title, price, duration, destination }: Props) {
  const finalSlug = pkg?.slug ?? slug ?? "package";
  const finalTitle = pkg?.title ?? title ?? "Tour Package";
  const finalDuration = pkg?.duration ?? duration ?? "As per package";
  const finalDestination = pkg?.destination ?? destination ?? "India";
  const groupRates = getGroupSharingRates(pkg);
  const isGroup = isGroupTourPackage(pkg) && !!groupRates;
  const displayPrice = isGroup ? getGroupTourStartingPrice(pkg) : (price ?? pkg?.price ?? 0);
  const sharingRates = groupRates ?? pkg?.sharingRates ?? pkg?.groupRates?.sharingRates ?? [];
  const jyotirlingaRates = useMemo(() => {
    if (!isJyotirlinga(pkg) || isGroup) return null;
    const rates = makePackageRates(pkg);
    return rates;
  }, [pkg, isGroup]);
  const matrixRows = jyotirlingaRates ? [
    ["1 Traveller", jyotirlingaRates[2]],
    ["2–4 Travellers", jyotirlingaRates[4]],
    ["4–6 Travellers", jyotirlingaRates[6]],
    ["7–12 Travellers", jyotirlingaRates[12]],
    ["13–16 Travellers", jyotirlingaRates[16]],
    ["17–20 Travellers", jyotirlingaRates[20]],
    ["21–25 Travellers", jyotirlingaRates[25]],
    ["26–30 Travellers", jyotirlingaRates[30]],
    ["30+ Travellers", jyotirlingaRates["30+"]],
  ].filter(([, value]) => typeof value === "number") as Array<[string, number]> : [];
  const matrixStartingPrice = matrixRows.length ? matrixRows[0][1] : null;
  const today = toISODate(new Date());
  const minDate = addDaysISO(today, 7);
  const groupSlots = useMemo(() => isGroup ? (isPilgrimage(finalTitle, pkg?.packageId) ? getPilgrimageGroupTourDates() : buildFridays(minDate, 18)).filter((date) => date >= minDate) : undefined, [isGroup, finalTitle, pkg?.packageId, minDate]);
  const [selectedDate, setSelectedDate] = useState(groupSlots?.[0] ?? minDate);
  const tripHoliday = getTripHoliday(selectedDate, finalDuration);
  const leadEligible = isBookingLeadEligible(selectedDate, today);
  const enquiryOnly = !!tripHoliday || !leadEligible || (isGroup && !groupSlots?.includes(selectedDate));
  const enquiryHref = useMemo(() => {
    const reason = tripHoliday ? `${tripHoliday.name} falls during the trip` : !leadEligible ? "travel date is less than 7 days away" : "special-date availability";
    const body = encodeURIComponent(`Hi Only Road Trip,\n\nI want to enquire about ${finalTitle}.\nPackage: ${finalSlug}\nTravel Date: ${formatDate(selectedDate)}\nReason: ${reason}\n\nPlease confirm availability.`);
    return `mailto:info@onlyroadtrip.com?subject=${encodeURIComponent(`Enquiry – ${finalTitle} – ${selectedDate}`)}&body=${body}`;
  }, [finalTitle, finalSlug, leadEligible, selectedDate, tripHoliday]);

  return <>
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.10)]">
        <div className="border-l-4 border-[#153e75] px-5 pb-4 pt-5">
          <div className="flex items-start justify-between gap-3"><div><h2 className="text-[22px] font-extrabold tracking-tight text-slate-900">Booking Summary</h2><p className="mt-1 text-xs text-slate-500">{isGroup ? "Group departure calendar" : "Choose your preferred future travel date"}</p></div><div className="flex items-center gap-3 text-slate-500"><a aria-label="Email enquiry" href={enquiryHref}><Mail size={20} /></a><a aria-label="WhatsApp enquiry" target="_blank" rel="noopener noreferrer" href={`https://wa.me/919211796168?text=${encodeURIComponent(`Hi, I want details for ${finalTitle}. Travel date: ${formatDate(selectedDate)}`)}`}><MessageCircle size={20} /></a></div></div>
          <div className="mt-5 space-y-4 text-sm"><div className="grid grid-cols-[115px_1fr] items-center gap-3"><span className="text-slate-500">Departure Date</span><span className="text-right font-bold text-slate-900">{formatDate(selectedDate)}</span></div><div className="grid grid-cols-[115px_1fr] items-center gap-3"><span className="text-slate-500">Duration</span><span className="text-right font-bold text-slate-900">{finalDuration}</span></div><div className="grid grid-cols-[115px_1fr] items-center gap-3"><span className="text-slate-500">Tour Includes</span><span className="flex justify-end gap-3 text-[#153e75]" title="Hotel, meals, sightseeing and transport"><Hotel size={18}/><Utensils size={18}/><Camera size={18}/><Bus size={18}/></span></div></div>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-4 py-4 md:px-5"><BookingCalendar selectedDate={selectedDate} onChange={setSelectedDate} duration={finalDuration} groupOnly={isGroup} allowedDates={groupSlots} title={isGroup ? "Group Tour Departure Calendar" : "Travel Date Calendar"} helper={isGroup ? "Friday group departures • minimum 7 days advance • holiday-overlap departures become enquiry-only." : "Future dates only • minimum 7 days advance • any holiday inside the trip duration becomes enquiry-only."} /></div>

        {tripHoliday && <div className="border-t border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-800"><b>{tripHoliday.name} falls during this trip.</b><p className="mt-1">This date cannot be booked online. <a href={enquiryHref} className="font-extrabold underline">Send Enquiry</a> for an alternate date.</p></div>}
        {!leadEligible && <div className="border-t border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800"><b>7-day advance rule:</b> online booking is not available for this date.</div>}

        {sharingRates.length > 0 && <div className="border-t border-slate-200 bg-white px-5 py-5"><h3 className="mb-3 text-lg font-extrabold text-slate-900">Package Pricing</h3><div className="overflow-hidden rounded-xl border border-slate-200"><table className="w-full text-sm"><thead className="bg-slate-50"><tr><th className="px-3 py-3 text-left font-bold text-slate-600">Room Sharing</th><th className="px-3 py-3 text-right font-bold text-slate-600">Cost / Person</th></tr></thead><tbody>{sharingRates.map((rate) => <tr key={rate.type} className="border-t border-slate-200"><td className="px-3 py-3 font-bold text-slate-800">{rate.type}</td><td className="px-3 py-3 text-right font-extrabold text-[#153e75]">₹{rate.price.toLocaleString("en-IN")}/-</td></tr>)}</tbody></table></div></div>}

        {matrixRows.length > 0 && <div className="border-t border-slate-200 bg-white px-5 py-5"><div className="flex items-center justify-between gap-3"><div><h3 className="text-lg font-extrabold text-slate-900">Flexible Group Pricing</h3><p className="mt-1 text-xs text-slate-500">Per-person rate • private/customizable Jyotirlinga package</p></div><span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#153e75]">Customizable</span></div><div className="mt-3 overflow-hidden rounded-xl border border-slate-200"><table className="w-full text-sm"><thead className="bg-slate-50"><tr><th className="px-3 py-3 text-left font-bold text-slate-600">Travellers</th><th className="px-3 py-3 text-right font-bold text-slate-600">Per Person</th></tr></thead><tbody>{matrixRows.map(([label, rate]) => <tr key={label} className="border-t border-slate-200"><td className="px-3 py-3 font-bold text-slate-800">{label}</td><td className="px-3 py-3 text-right font-extrabold text-[#153e75]">₹{rate.toLocaleString("en-IN")}/-</td></tr>)}</tbody></table></div></div>}

        <div className="border-t border-slate-200 bg-slate-50 px-5 py-5"><div className="flex items-end justify-between gap-4"><div><p className="text-[22px] font-extrabold text-slate-900">Tour Price</p><p className="mt-1 text-xs text-slate-500">Per person • final price subject to confirmation</p></div><div className="text-right"><p className="text-[28px] font-extrabold tracking-tight text-slate-900">{matrixStartingPrice ? `₹${matrixStartingPrice.toLocaleString("en-IN")}` : displayPrice ? `₹${displayPrice.toLocaleString("en-IN")}` : "Price on Request"}</p><p className="text-xs text-slate-500">Per Person</p></div></div><div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4 text-sm"><div className="flex items-center gap-2"><Users size={17} className="text-[#153e75]"/><span className="text-slate-500">Group</span><b>{isGroup ? "Available" : "Custom"}</b></div><div className="flex items-center justify-end gap-2"><Check size={17} className="text-emerald-600"/><span className="text-slate-500">Online Booking</span><b>{enquiryOnly ? "Enquiry" : "Available"}</b></div></div></div>
        <div className="grid grid-cols-2 gap-2 border-t border-slate-200 p-5"><a href={enquiryHref} className="rounded-lg border border-slate-300 px-3 py-3 text-center text-sm font-bold text-slate-700">Send Enquiry</a><Link href={`/book/${finalSlug}`} className={`rounded-lg px-3 py-3 text-center text-sm font-bold text-white ${enquiryOnly ? "bg-slate-500" : "bg-[#153e75]"}`}>{enquiryOnly ? "Contact Us" : "Book Now"}</Link></div>
      </div>
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"><h3 className="text-lg font-bold text-slate-900">Plan Your Adventure</h3><div className="mt-4 grid grid-cols-2 gap-2 text-center"><a href={enquiryHref} className="rounded-xl p-2"><Mail className="mx-auto text-slate-500" size={22}/><span className="mt-2 block text-xs font-bold text-slate-800">Send Enquiry</span></a><a target="_blank" rel="noopener noreferrer" href={`https://wa.me/919211796168?text=${encodeURIComponent(`Hi, I want details for ${finalTitle}. Travel date: ${formatDate(selectedDate)}`)}`} className="rounded-xl p-2"><MessageCircle className="mx-auto text-slate-500" size={22}/><span className="mt-2 block text-xs font-bold text-slate-800">WhatsApp</span></a></div><div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500"><Users size={15}/> Destination: <b className="text-slate-700">{finalDestination}</b></div></div>
    </div>
  </>;
}
