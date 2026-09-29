"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { CalendarDays, MapPin, Minus, Plus, Search, Users } from "lucide-react";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import countries from "i18n-iso-countries";

const destinations = [
  "Agra", "Ahmedabad", "Ajanta", "Ajmer", "Alleppey", "Amaravati", "Amritsar", "Andaman & Nicobar",
  "Ayodhya", "Bengaluru", "Bhopal", "Chandigarh", "Chennai", "Coorg", "Delhi", "Darjeeling", "Dehradun",
  "Gangtok", "Goa", "Gurugram", "Haridwar", "Himachal Pradesh", "Jaipur", "Jaisalmer", "Jammu & Kashmir",
  "Jim Corbett", "Jodhpur", "Kashmir", "Kerala", "Kolkata", "Ladakh", "Lucknow", "Manali", "Mathura",
  "Mumbai", "Munnar", "Mysore", "Nainital", "New Delhi", "Ooty", "Prayagraj", "Pune", "Rajasthan",
  "Rishikesh", "Shimla", "Sikkim", "Srinagar", "Udaipur", "Ujjain", "Uttarakhand", "Varanasi", "Vrindavan",
];
const categories = [
  "Senior-Friendly Journeys", "Accessible & Assisted Travel", "Solo Women Travel", "Women’s Group Journeys",
  "International Visitors", "NRI Family Travel", "Private Family Travel", "Corporate & Group Mobility", "Other",
];
const countryOptions = getCountries().map((iso2) => {
  const code = iso2.toUpperCase();
  const callingCode = getCountryCallingCode(code as never);
  const alpha3 = countries.alpha2ToAlpha3(code) || code;
  return { iso2: code, displayCode: code === "US" ? "USA" : code === "IN" ? "IN" : alpha3, callingCode };
}).sort((a, b) => a.displayCode.localeCompare(b.displayCode));

export default function DoorToDoorForm() {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [phoneCountry, setPhoneCountry] = useState("IN");
  const [showCountryCodes, setShowCountryCodes] = useState(false);
  const [email, setEmail] = useState("");
  const [pickupCity, setPickupCity] = useState("");
  const [destination, setDestination] = useState("");
  const [showDestinationResults, setShowDestinationResults] = useState(false);
  const [travelDate, setTravelDate] = useState("");
  const [travellers, setTravellers] = useState(2);
  const [travellerCategory, setTravellerCategory] = useState("");
  const [homePickup, setHomePickup] = useState("Please discuss");
  const [mobilityAssistance, setMobilityAssistance] = useState("Please discuss");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const countryRef = useRef<HTMLDivElement>(null);
  const destinationRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const today = useMemo(() => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }, []);
  const selectedCountry = countryOptions.find((item) => item.iso2 === phoneCountry) ?? countryOptions[0];
  const filteredDestinations = useMemo(() => {
    const query = destination.trim().toLowerCase();
    return query ? destinations.filter((item) => item.toLowerCase().includes(query)).slice(0, 8) : [];
  }, [destination]);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (countryRef.current && !countryRef.current.contains(target)) setShowCountryCodes(false);
      if (destinationRef.current && !destinationRef.current.contains(target)) setShowDestinationResults(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const closeDropdowns = () => { setShowCountryCodes(false); setShowDestinationResults(false); };
  const openCalendar = () => { dateRef.current?.focus(); dateRef.current?.showPicker?.(); };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitMessage("");
    try {
      const response = await fetch("/api/door-to-door-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName, mobile: `+${selectedCountry.callingCode}${mobile}`,
          phoneCountry: selectedCountry.displayCode, email, pickupCity, destination,
          travelDate, travellers, travellerCategory, homePickup, mobilityAssistance, message,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send your enquiry.");
      setSubmitMessage("Thank you. Your door-to-door travel enquiry has been received. Our team will contact you shortly.");
      setFullName(""); setMobile(""); setPhoneCountry("IN"); setEmail(""); setPickupCity("");
      setDestination(""); setTravelDate(""); setTravellers(2); setTravellerCategory("");
      setHomePickup("Please discuss"); setMobilityAssistance("Please discuss"); setMessage("");
    } catch (error) {
      setSubmitMessage(error instanceof Error ? error.message : "Unable to send your enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const input = "w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100";
  return <form onSubmit={handleSubmit} className="grid gap-5 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] sm:grid-cols-2 sm:p-10">
    <div className="sm:col-span-2"><p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Start your enquiry</p><h3 className="mt-3 text-3xl font-extrabold">Let’s build your journey.</h3><p className="mt-3 leading-7 text-slate-600">Share the essentials and we’ll tailor a door-to-door plan around the travellers.</p></div>
    <label className="sr-only" htmlFor="dd-name">Full name</label>
    <input id="dd-name" required value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Full Name" onFocus={closeDropdowns} className={input} />

    <div ref={countryRef} className="relative">
      <label className="sr-only" htmlFor="dd-mobile">Mobile number</label>
      <div className="flex w-full rounded-xl border border-slate-300 bg-slate-50 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">
        <button type="button" onClick={() => { setShowCountryCodes((value) => !value); setShowDestinationResults(false); }} className="flex shrink-0 items-center gap-1.5 rounded-l-xl border-r border-slate-300 px-3.5 text-sm font-extrabold text-slate-800 hover:bg-white" aria-label="Select country calling code" aria-expanded={showCountryCodes}><span>{selectedCountry.displayCode}</span><span className="text-slate-400">⌄</span><span className="text-blue-700">+{selectedCountry.callingCode}</span></button>
        <input id="dd-mobile" required value={mobile} onChange={(event) => setMobile(event.target.value.replace(/\D/g, "").slice(0, 15))} type="tel" inputMode="numeric" pattern="[0-9]{6,15}" maxLength={15} placeholder="Mobile Number" onFocus={closeDropdowns} className="min-w-0 flex-1 rounded-r-xl bg-transparent px-3.5 py-3.5 outline-none" />
      </div>
      {showCountryCodes && <div className="absolute left-0 top-[calc(100%+8px)] z-[70] w-full min-w-[250px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.20)]"><div className="border-b border-slate-100 px-4 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">Country code</div><div className="max-h-72 overflow-y-auto p-2">{countryOptions.map((country) => <button key={country.iso2} type="button" onClick={() => { setPhoneCountry(country.iso2); setShowCountryCodes(false); }} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition hover:bg-blue-50 ${phoneCountry === country.iso2 ? "bg-blue-50" : ""}`}><span className="font-extrabold text-slate-800">{country.displayCode}</span><span className="font-semibold text-blue-700">+{country.callingCode}</span></button>)}</div></div>}
    </div>

    <label className="sr-only" htmlFor="dd-email">Email address</label>
    <input id="dd-email" value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email Address" onFocus={closeDropdowns} className={input} />
    <label className="sr-only" htmlFor="dd-pickup">Pickup city</label>
    <input id="dd-pickup" required value={pickupCity} onChange={(event) => setPickupCity(event.target.value)} placeholder="Pickup City / Location" onFocus={closeDropdowns} className={input} />

    <div ref={destinationRef} className="relative">
      <Search className="pointer-events-none absolute left-4 top-4 z-10 text-blue-600" size={19} />
      <label className="sr-only" htmlFor="dd-destination">Destination</label>
      <input id="dd-destination" required value={destination} onChange={(event) => { const value = event.target.value; setDestination(value); setShowDestinationResults(value.trim().length > 0); }} onFocus={() => { setShowCountryCodes(false); setShowDestinationResults(destination.trim().length > 0); }} placeholder="Search destination, state or district" autoComplete="off" className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3.5 pl-11 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
      {showDestinationResults && filteredDestinations.length > 0 && <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-64 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_45px_rgba(15,23,42,0.18)]">{filteredDestinations.map((item) => <button key={item} type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => { setDestination(item); setShowDestinationResults(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-slate-800 transition hover:bg-blue-50"><MapPin size={18} className="shrink-0 text-blue-600" /><span>{item}</span></button>)}</div>}
      {showDestinationResults && destination.trim() && filteredDestinations.length === 0 && <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500 shadow-[0_20px_45px_rgba(15,23,42,0.18)]">No matching destination found. You can continue with your typed destination.</div>}
    </div>

    <div className="relative cursor-pointer" onClick={openCalendar}>
      <input required ref={dateRef} value={travelDate} onChange={(event) => setTravelDate(event.target.value)} type="date" min={today} onFocus={closeDropdowns} className="pointer-events-none w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 py-3.5 pl-4 pr-12 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-4 [&::-webkit-calendar-picker-indicator]:h-0 [&::-webkit-calendar-picker-indicator]:w-0 [&::-webkit-calendar-picker-indicator]:opacity-0" aria-label="Travel date" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-3 flex w-9 items-center justify-center rounded-lg text-blue-600"><CalendarDays size={19} /></div>
    </div>
    <div className="relative" onFocus={closeDropdowns}><Users className="pointer-events-none absolute left-4 top-4 z-10 text-blue-600" size={19} /><div className="flex w-full items-center rounded-xl border border-slate-300 bg-slate-50 py-1.5 pl-11 pr-2 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100"><span className="flex-1 py-2 text-slate-700">{travellers} {travellers === 1 ? "Traveller" : "Travellers"}</span><button type="button" aria-label="Decrease travellers" disabled={travellers <= 1} onClick={() => setTravellers((value) => Math.max(1, value - 1))} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-35"><Minus size={17} /></button><button type="button" aria-label="Increase travellers" disabled={travellers >= 200} onClick={() => setTravellers((value) => Math.min(200, value + 1))} className="flex h-9 w-9 items-center justify-center rounded-lg text-blue-700 transition hover:bg-blue-100 disabled:opacity-35"><Plus size={17} /></button></div></div>

    <select required value={travellerCategory} onChange={(event) => setTravellerCategory(event.target.value)} onFocus={closeDropdowns} aria-label="Who is travelling?" className={input}><option value="">Who is travelling?</option>{categories.map((category) => <option key={category}>{category}</option>)}</select>
    <select value={homePickup} onChange={(event) => setHomePickup(event.target.value)} onFocus={closeDropdowns} aria-label="Home pickup and return drop" className={input}><option>Please discuss</option><option>Yes, home pickup and return drop</option><option>No, different pickup or drop</option></select>
    <select value={mobilityAssistance} onChange={(event) => setMobilityAssistance(event.target.value)} onFocus={closeDropdowns} aria-label="Wheelchair or mobility assistance" className={input}><option>Please discuss</option><option>Yes, wheelchair assistance</option><option>Yes, other mobility support</option><option>No mobility assistance</option></select>
    <div className="sm:col-span-2"><label htmlFor="dd-message" className="mb-2 block text-sm font-bold text-slate-700">Anything we should consider for your comfort?</label><textarea id="dd-message" required value={message} onChange={(event) => setMessage(event.target.value)} rows={6} placeholder="Tell us as much as you like about the route, pace, food, luggage or assistance needs. Please avoid detailed medical records." className={input} /></div>
    <button disabled={isSubmitting} type="submit" className="rounded-xl bg-blue-700 px-6 py-4 font-extrabold text-white shadow-lg transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2">{isSubmitting ? "Sending Enquiry..." : "Request My Door-to-Door Plan"}</button>
    {submitMessage && <p role="status" className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-900 sm:col-span-2">{submitMessage}</p>}
    <p className="text-xs leading-5 text-slate-500 sm:col-span-2">By sending this enquiry, you agree that Only Road Trip, operated by Swastik Tour And Travels Private Limited, may contact you about this travel request. See our <Link href="/privacy-policy" className="underline">Privacy Policy</Link>.</p>
  </form>;
}
