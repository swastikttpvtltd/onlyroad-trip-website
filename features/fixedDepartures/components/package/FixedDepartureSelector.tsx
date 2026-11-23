"use client";
import Link from "next/link";
import { useState } from "react";
import { useFixedBooking } from "@/features/fixedDepartures/components/package/FixedBookingState";
import {fixedDepartureOptions,fixedRate,yatraPlanningWindows,standardDepartureWindows} from "@/features/fixedDepartures/data/fixedDepartureBooking";
import { GROUP_CAPACITY, getDepartureAvailability } from "@/features/fixedDepartures/data/departureAvailability";
import { departureCities } from "@/features/fixedDepartures/data/varanasiDepartureSchedule";
const format = (value: string, options: Intl.DateTimeFormatOptions) => new Date(value + "T12:00:00Z").toLocaleDateString("en-IN", { ...options, timeZone: "Asia/Kolkata" });
export default function FixedDepartureSelector({ nights,slug }: { nights: number;slug:string }) {
  const shared=useFixedBooking();
  const [localCity,setLocalCity]=useState("Delhi"),[localDate,setLocalDate]=useState("");
  const city=shared?.city??localCity,selected=shared?.date??localDate,setCity=shared?.setCity??setLocalCity,setSelected=shared?.setDate??setLocalDate;
  const availability = getDepartureAvailability(null);
  const departures = fixedDepartureOptions(slug);
  const planned=yatraPlanningWindows[slug]; const standard=standardDepartureWindows[slug];
  const months = [...new Set(departures.map(item => item.date.slice(0,7)))];
  const cityPrice = fixedRate(slug,city);
  const chosen = departures.find(item => item.date === selected);
  return <section id="departures" className="mt-7 overflow-hidden rounded-2xl bg-white shadow-sm">
    <div className="p-5 sm:p-6">
      <h2 className="relative text-xl font-extrabold leading-8 text-slate-950 before:absolute before:-left-5 before:top-1 before:h-7 before:w-1 before:rounded-r before:bg-orange-500 sm:text-2xl sm:before:-left-6">Select Departure City & Dates to Book Your Tour</h2>
      <nav aria-label="Departure cities" className="mt-5 flex flex-wrap gap-2">{departureCities.map(name => <button key={name} type="button" aria-pressed={city === name} onClick={() => setCity(name)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${city === name ? "border-orange-500 bg-white text-orange-600" : "border-transparent bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>{name}</button>)}</nav>
      <p className="mt-5 text-sm font-semibold text-slate-900">{city === "All Departures" ? "All Departures" : "Ex-"+city} {planned ? "Proposed Dates" : "Dates"} ({departures.length})</p>
      <p className="mt-1 text-xs leading-6 text-slate-500">Flights included · Up to {GROUP_CAPACITY} travellers per group · Prices from, per person on twin sharing</p>
      {planned && slug !== "amarnath-yatra-kashmir" && <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-6 text-amber-950"><p className="font-extrabold">2027 opening dates: official announcement awaited</p><p>Proposed planning window: {format(planned.start,{day:"2-digit",month:"short"})} – {format(planned.end,{day:"2-digit",month:"short",year:"numeric"})}. {planned.registration}</p><p className="mt-2">Last checked: {planned.checked}. <a href={planned.source} target="_blank" rel="noreferrer" className="font-bold underline">Check {planned.authority} updates</a>.</p></div>}
      {standard && <p className="mt-3 rounded-xl bg-blue-50 p-3 text-xs leading-6 text-blue-900">{standard.note} The last trip returns by 31 March 2027. Availability and city-wise flights require confirmation.</p>}{!departures.length && <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">Fixed departure dates will be published after confirmation. <a href="#booking" className="font-bold text-blue-800 underline">Choose your preferred date and request availability.</a></div>}
      <div aria-label="Departure dates by month" className="mt-4 max-h-[320px] overflow-y-auto overscroll-contain pr-2 [scrollbar-width:thin]">
        {months.map(month => <div key={month} className="mb-6 flex items-start gap-3 pt-3 last:mb-2">
          <div className="sticky top-0 flex w-9 shrink-0 flex-col items-center justify-center rounded-md bg-slate-600 px-1 py-5 text-[10px] font-semibold leading-4 text-white"><span>{format(month+"-01",{month:"short"})}</span><span>{month.slice(0,4)}</span></div>
          <div className="grid min-w-0 flex-1 grid-cols-[repeat(auto-fill,minmax(76px,1fr))] gap-x-3 gap-y-6">
            {departures.filter(item => item.date.startsWith(month)).map(item => { const active = selected === item.date; return <button key={item.date} type="button" aria-pressed={active} aria-label={format(item.date,{day:"numeric",month:"long",year:"numeric"}) + ", from ₹" + cityPrice.toLocaleString("en-IN") + ", " + availability.label} onClick={() => setSelected(item.date)} className={`relative flex min-h-[82px] flex-col items-center justify-center rounded-lg border px-1 pb-2 pt-3 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 motion-reduce:transition-none ${active ? "border-orange-500 bg-emerald-600 text-white shadow-sm" : "border-slate-300 bg-white text-slate-900 hover:border-orange-400 hover:bg-orange-50/30"}`}>
              <span className={`absolute -top-2 left-1/2 w-[calc(100%-8px)] -translate-x-1/2 whitespace-nowrap rounded-full px-1 py-0.5 text-[9px] font-bold leading-3 ${availability.className}`}>{availability.label}</span>
              <span className={`text-[10px] uppercase leading-4 ${active ? "text-white/90" : "text-slate-500"}`}>{format(item.date,{weekday:"short"})}</span><span className="text-xl font-extrabold leading-6">{format(item.date,{day:"numeric"})}</span><span className="mt-1 text-[11px] font-medium leading-4">₹{cityPrice.toLocaleString("en-IN")}*</span>
            </button>; })}
          </div>
        </div>)}
      </div>
      {chosen && <div aria-live="polite" className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4"><h3 className="font-bold text-slate-900">Booking Summary</h3><div className="mt-3 grid gap-3 text-sm sm:grid-cols-3"><p><span className="block text-xs text-slate-500">Departure city</span><strong>{city === "All Departures" ? "Select your city" : city}</strong></p><p><span className="block text-xs text-slate-500">Travel dates</span>{format(chosen.date,{day:"numeric",month:"short"})} – {format(chosen.returnDate,{day:"numeric",month:"short",year:"numeric"})}</p><p><span className="block text-xs text-slate-500">Starting from / person</span><strong>₹{cityPrice.toLocaleString("en-IN")}</strong></p></div><p className="mt-3 text-xs leading-6 text-slate-500">{nights} Nights / {nights+1} Days · Onward and return flights and 5% GST included. Final airfare and availability require confirmation.</p><Link href={"/book/fixed/"+slug+"?" + new URLSearchParams({ city:city === "All Departures" ? "Delhi" : city, departureDate: chosen.date,adults:String(shared?.adults??1) }).toString()} className="mt-4 inline-flex rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600">{slug.startsWith("varanasi")?"Book Now":"Request Availability"}</Link></div>}
      <p className="mt-4 text-[11px] leading-5 text-slate-500">*Starting prices vary by city and flight availability. {planned ? "Planned slots are subject to official yatra dates, registration and permissions. No confirmed inventory is implied." : standard ? "Only displayed dates follow this tour’s schedule and attraction closure rules. Availability must be confirmed." : "Trips overlapping Diwali, Dev Deepawali or Holi are excluded. Christmas and New Year departures are available."}</p>
    </div>
  </section>;
}
