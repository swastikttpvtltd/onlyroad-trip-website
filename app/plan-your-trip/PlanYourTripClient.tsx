"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, Car, CheckCircle2, MapPin, MessageCircle, Minus, Plus, Search, Users } from "lucide-react";

const steps = [
  ["01", "Tell us your plan", "Share your destination, dates, group size and the kind of experience you want."],
  ["02", "We design the journey", "Our travel team builds a practical itinerary around your pace, preferences and budget."],
  ["03", "Travel with confidence", "Review the plan, confirm the arrangements and let us take care of the details."],
];

const destinations = [
  "Agra", "Ahmedabad", "Ajanta", "Ajmer", "Alleppey", "Amaravati", "Amritsar", "Andaman & Nicobar",
  "Ayodhya", "Bengaluru", "Bhopal", "Chandigarh", "Chennai", "Coorg", "Delhi", "Darjeeling", "Dehradun",
  "Gangtok", "Goa", "Gurugram", "Haridwar", "Himachal Pradesh", "Jaipur", "Jaisalmer", "Jammu & Kashmir",
  "Jim Corbett", "Jodhpur", "Kashmir", "Kerala", "Kolkata", "Ladakh", "Lucknow", "Manali", "Mathura",
  "Mumbai", "Munnar", "Mysore", "Nainital", "New Delhi", "Ooty", "Prayagraj", "Pune", "Rajasthan",
  "Rishikesh", "Shimla", "Sikkim", "Srinagar", "Udaipur", "Ujjain", "Uttarakhand", "Varanasi", "Vrindavan"
];

export default function PlanYourTripClient() {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelType, setTravelType] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [showDestinationResults, setShowDestinationResults] = useState(false);
  const [travellers, setTravellers] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const destinationRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const today = useMemo(() => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }, []);

  const filteredDestinations = useMemo(() => {
    const query = destination.trim().toLowerCase();
    if (!query) return [];
    return destinations.filter((item) => item.toLowerCase().includes(query)).slice(0, 8);
  }, [destination]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) setShowDestinationResults(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const closeDestinationResults = () => setShowDestinationResults(false);

  const openCalendar = () => {
    const input = dateRef.current;
    if (!input) return;
    input.focus();
    input.showPicker?.();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/travel-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, mobile, email, destination, travelDate, travellers, travelType, budget, message }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to send enquiry.");

      setSubmitMessage("Thank you! Your travel enquiry has been sent. Our team will contact you shortly.");
      setFullName("");
      setMobile("");
      setEmail("");
      setDestination("");
      setTravelDate("");
      setTravellers(2);
      setTravelType("");
      setBudget("");
      setMessage("");
    } catch (error) {
      setSubmitMessage(error instanceof Error ? error.message : "Unable to send enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 px-6 pb-24 pt-36 text-white sm:pt-40">
        <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-200">Bespoke travel planning</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">Plan Your Trip With Us</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-blue-100 sm:text-lg">Tell us what you have in mind. Whether it is a family holiday, pilgrimage, road trip, honeymoon or group journey, we will help turn your travel idea into a clear, comfortable itinerary.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_.9fr] lg:py-20">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Start your enquiry</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Let’s build your journey.</h2>
          <p className="mt-3 leading-7 text-slate-600">The more you tell us, the better we can tailor the route, hotels, transport and experiences to your group.</p>
          <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
            <input required value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Full Name" onFocus={closeDestinationResults} className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
            <input required value={mobile} onChange={(event) => setMobile(event.target.value)} type="tel" placeholder="Mobile Number" onFocus={closeDestinationResults} className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email Address" onFocus={closeDestinationResults} className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />

            <div ref={destinationRef} className="relative">
              <Search className="pointer-events-none absolute left-4 top-4 z-10 text-blue-600" size={19} />
              <input required value={destination} onChange={(event) => { const value = event.target.value; setDestination(value); setShowDestinationResults(value.trim().length > 0); }} onFocus={() => setShowDestinationResults(destination.trim().length > 0)} placeholder="Search destination, state or district" autoComplete="off" className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3.5 pl-11 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
              {showDestinationResults && filteredDestinations.length > 0 && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-64 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_45px_rgba(15,23,42,0.18)]">
                  {filteredDestinations.map((item) => (
                    <button key={item} type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => { setDestination(item); setShowDestinationResults(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-slate-800 transition hover:bg-blue-50"><MapPin size={18} className="shrink-0 text-blue-600" /><span>{item}</span></button>
                  ))}
                </div>
              )}
              {showDestinationResults && destination.trim() && filteredDestinations.length === 0 && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500 shadow-[0_20px_45px_rgba(15,23,42,0.18)]">No matching destination found. You can continue with your typed destination.</div>
              )}
            </div>

            <div className="relative cursor-pointer" onClick={openCalendar}>
              <input required ref={dateRef} value={travelDate} onChange={(event) => setTravelDate(event.target.value)} type="date" min={today} onFocus={closeDestinationResults} className="pointer-events-none w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 py-3.5 pl-4 pr-12 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-4 [&::-webkit-calendar-picker-indicator]:h-0 [&::-webkit-calendar-picker-indicator]:w-0 [&::-webkit-calendar-picker-indicator]:opacity-0" aria-label="Travel date" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-3 flex w-9 items-center justify-center rounded-lg text-blue-600"><CalendarDays size={19} /></div>
            </div>

            <div className="relative" onFocus={closeDestinationResults}>
              <Users className="pointer-events-none absolute left-4 top-4 z-10 text-blue-600" size={19} />
              <div className="flex w-full items-center rounded-xl border border-slate-300 bg-slate-50 py-1.5 pl-11 pr-2 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">
                <span className="flex-1 py-2 text-slate-700">{travellers} {travellers === 1 ? "Traveller" : "Travellers"}</span>
                <button type="button" aria-label="Decrease travellers" disabled={travellers <= 1} onClick={() => setTravellers((value) => Math.max(1, value - 1))} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-35"><Minus size={17} /></button>
                <button type="button" aria-label="Increase travellers" onClick={() => setTravellers((value) => value + 1)} className="flex h-9 w-9 items-center justify-center rounded-lg text-blue-700 transition hover:bg-blue-100"><Plus size={17} /></button>
              </div>
            </div>

            <select required value={travelType} onChange={(event) => setTravelType(event.target.value)} onFocus={closeDestinationResults} className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"><option value="">Travel Type</option><option>Family Holiday</option><option>Honeymoon</option><option>Pilgrimage</option><option>Road Trip</option><option>Group Travel</option><option>Corporate Travel</option></select>
            <select value={budget} onChange={(event) => setBudget(event.target.value)} onFocus={closeDestinationResults} className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"><option value="">Approx. Budget</option><option>Under ₹25,000</option><option>₹25,000 – ₹50,000</option><option>₹50,000 – ₹1,00,000</option><option>₹1,00,000+</option></select>
            <textarea required value={message} onChange={(event) => setMessage(event.target.value)} rows={5} placeholder="Requirements / Message" onFocus={closeDestinationResults} className="sm:col-span-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
            <button disabled={isSubmitting} type="submit" className="sm:col-span-2 rounded-xl bg-blue-700 px-6 py-4 font-extrabold text-white shadow-lg transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting ? "Sending Enquiry..." : "Send My Travel Enquiry"}</button>
            {submitMessage && <p className="sm:col-span-2 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-900" role="status">{submitMessage}</p>}
          </form>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 sm:p-9"><p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Why plan with Only Road Trip?</p><h2 className="mt-3 text-3xl font-extrabold">Travel designed around you.</h2><div className="mt-7 space-y-5">{["Customised itineraries instead of one-size-fits-all plans", "Comfort-focused transport and practical route planning", "Clear package inclusions, exclusions and booking guidance", "Personal support before and during your journey"].map(item=><div key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-blue-700" size={21}/><p className="font-semibold leading-6 text-slate-700">{item}</p></div>)}</div></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"><div className="rounded-2xl bg-blue-50 p-5"><MapPin className="text-blue-700"/><p className="mt-3 font-extrabold">Destination-led planning</p><p className="mt-1 text-sm leading-6 text-slate-600">From mountains and pilgrimage circuits to family holidays, we plan around the destination and your pace.</p></div><div className="rounded-2xl bg-slate-50 p-5"><Car className="text-blue-700"/><p className="mt-3 font-extrabold">Comfortable travel</p><p className="mt-1 text-sm leading-6 text-slate-600">Transport and sightseeing can be planned around your final group size and requirements.</p></div></div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-16 sm:py-20"><div className="mx-auto max-w-7xl"><div className="text-center"><p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">How it works</p><h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Three simple steps to your holiday</h2></div><div className="mt-10 grid gap-5 md:grid-cols-3">{steps.map(([num,title,text])=><div key={num} className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm"><span className="text-sm font-extrabold text-blue-700">{num}</span><h3 className="mt-4 text-xl font-extrabold">{title}</h3><p className="mt-2 leading-7 text-slate-600">{text}</p></div>)}</div></div></section>

      <section className="px-6 py-16"><div className="mx-auto max-w-4xl rounded-[2rem] bg-gradient-to-r from-blue-700 to-blue-900 p-8 text-center text-white shadow-2xl sm:p-12"><h2 className="text-3xl font-extrabold sm:text-4xl">Ready to start planning?</h2><p className="mx-auto mt-3 max-w-2xl leading-7 text-blue-100">If you would rather speak to us directly, our travel team is just a call or WhatsApp message away.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><a href="https://wa.me/919211796168" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-extrabold text-blue-800"><MessageCircle size={18}/> WhatsApp Us</a><a href="tel:+919211796168" className="rounded-full border border-white/40 bg-white/10 px-6 py-3 font-extrabold text-white">Call +91 92117 96168</a></div><Link href="/contact" className="mt-6 inline-block text-sm font-bold text-blue-100 underline underline-offset-4">Need general support? Contact us →</Link></div></section>
    </>
  );
}
