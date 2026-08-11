"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Calendar, Car, CheckCircle2, MapPin, MessageCircle, Minus, Plus, Search, Users } from "lucide-react";
import { packages } from "@/data/packages";

const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const cleanPlace = (value: string) => value.trim().replace(/\s+/g, " ");

const steps = [
  ["01", "Tell us your plan", "Share your destination, dates, group size and the kind of experience you want."],
  ["02", "We design the journey", "Our travel team builds a practical itinerary around your pace, preferences and budget."],
  ["03", "Travel with confidence", "Review the plan, confirm the arrangements and let us take care of the details."],
];

export default function PlanYourTripPage() {
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travellers, setTravellers] = useState(2);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const destinations = useMemo(() => {
    const places = new Set<string>();
    packages.forEach((pkg: any) => {
      if (pkg.destination) String(pkg.destination).split(/•|,|\||–|—|\//).map(cleanPlace).filter(Boolean).forEach((p: string) => places.add(p));
      if (pkg.state) places.add(cleanPlace(String(pkg.state)));
    });
    return Array.from(places).sort((a, b) => a.localeCompare(b));
  }, []);

  const suggestions = useMemo(() => {
    const q = destination.trim().toLowerCase();
    if (!q) return destinations.slice(0, 12);
    return destinations.filter(place => place.toLowerCase().includes(q)).sort((a, b) => {
      const al = a.toLowerCase(), bl = b.toLowerCase();
      return (al.startsWith(q) ? 0 : 1) - (bl.startsWith(q) ? 0 : 1) || a.localeCompare(b);
    }).slice(0, 12);
  }, [destination, destinations]);

  return (
    <main className="min-h-screen bg-white text-slate-900">
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

          <form className="mt-8 grid gap-5 sm:grid-cols-2">
            <input required placeholder="Full Name" className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
            <input required type="tel" placeholder="Mobile Number" className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
            <input type="email" placeholder="Email Address" className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />

            <div className="relative">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" size={19} />
                <input value={destination} onFocus={() => setShowSuggestions(true)} onChange={e => { setDestination(e.target.value); setShowSuggestions(true); }} onKeyDown={e => { if (e.key === "Escape") setShowSuggestions(false); }} placeholder="Search destination, state or district" autoComplete="off" className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3.5 pl-11 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
              </div>
              {showSuggestions && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-72 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 text-slate-900 shadow-2xl">
                  {suggestions.length ? suggestions.map(place => (
                    <button key={place} type="button" onMouseDown={e => e.preventDefault()} onClick={() => { setDestination(place); setShowSuggestions(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left font-bold transition hover:bg-blue-50 hover:text-blue-800">
                      <MapPin className="h-4 w-4 shrink-0 text-blue-600" />{place}
                    </button>
                  )) : <div className="px-3 py-3 text-sm font-semibold text-slate-500">No matching destination found.</div>}
                </div>
              )}
            </div>

            <div className="relative">
              <Calendar className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-blue-600" size={19} />
              <input type="date" min={todayIso()} value={travelDate} onChange={e => setTravelDate(e.target.value)} aria-label="Travel date" className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
            </div>

            <div className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3"><Users className="text-blue-600" size={19}/><div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Travellers</p><p className="text-base font-extrabold text-slate-900">{travellers} {travellers === 1 ? "Traveller" : "Travellers"}</p></div></div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setTravellers(p => Math.max(1, p - 1))} aria-label="Decrease travellers" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 shadow-sm transition hover:border-blue-600 hover:bg-blue-50"><Minus size={16} strokeWidth={3}/></button>
                  <span className="w-7 text-center text-lg font-extrabold text-slate-900">{travellers}</span>
                  <button type="button" onClick={() => setTravellers(p => p + 1)} aria-label="Increase travellers" className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-600 bg-blue-600 text-white shadow-sm transition hover:bg-blue-700"><Plus size={16} strokeWidth={3}/></button>
                </div>
              </div>
            </div>

            <select className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"><option>Travel Type</option><option>Family Holiday</option><option>Honeymoon</option><option>Pilgrimage</option><option>Road Trip</option><option>Group Travel</option><option>Corporate Travel</option></select>
            <select className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"><option>Approx. Budget</option><option>Under ₹25,000</option><option>₹25,000 – ₹50,000</option><option>₹50,000 – ₹1,00,000</option><option>₹1,00,000+</option></select>
            <textarea rows={5} placeholder="Requirements / Message" className="sm:col-span-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
            <button type="submit" className="sm:col-span-2 rounded-xl bg-blue-700 px-6 py-4 font-extrabold text-white shadow-lg transition hover:bg-blue-800">Send My Travel Enquiry</button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 sm:p-9">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Why plan with Only Road Trip?</p>
            <h2 className="mt-3 text-3xl font-extrabold">Travel designed around you.</h2>
            <div className="mt-7 space-y-5">{["Customised itineraries instead of one-size-fits-all plans", "Comfort-focused transport and practical route planning", "Clear package inclusions, exclusions and booking guidance", "Personal support before and during your journey"].map(item => <div key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-blue-700" size={21}/><p className="font-semibold leading-6 text-slate-700">{item}</p></div>)}</div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"><div className="rounded-2xl bg-blue-50 p-5"><MapPin className="text-blue-700"/><p className="mt-3 font-extrabold">Destination-led planning</p><p className="mt-1 text-sm leading-6 text-slate-600">From mountains and pilgrimage circuits to family holidays, we plan around the destination and your pace.</p></div><div className="rounded-2xl bg-slate-50 p-5"><Car className="text-blue-700"/><p className="mt-3 font-extrabold">Comfortable travel</p><p className="mt-1 text-sm leading-6 text-slate-600">Transport and sightseeing can be planned around your final group size and requirements.</p></div></div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-16 sm:py-20"><div className="mx-auto max-w-7xl"><div className="text-center"><p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">How it works</p><h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Three simple steps to your holiday</h2></div><div className="mt-10 grid gap-5 md:grid-cols-3">{steps.map(([num,title,text]) => <div key={num} className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm"><span className="text-sm font-extrabold text-blue-700">{num}</span><h3 className="mt-4 text-xl font-extrabold">{title}</h3><p className="mt-2 leading-7 text-slate-600">{text}</p></div>)}</div></div></section>

      <section className="px-6 py-16"><div className="mx-auto max-w-4xl rounded-[2rem] bg-gradient-to-r from-blue-700 to-blue-900 p-8 text-center text-white shadow-2xl sm:p-12"><h2 className="text-3xl font-extrabold sm:text-4xl">Ready to start planning?</h2><p className="mx-auto mt-3 max-w-2xl leading-7 text-blue-100">If you would rather speak to us directly, our travel team is just a call or WhatsApp message away.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><a href="https://wa.me/919211796168" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-extrabold text-blue-800"><MessageCircle size={18}/> WhatsApp Us</a><a href="tel:+919211796168" className="rounded-full border border-white/40 bg-white/10 px-6 py-3 font-extrabold text-white">Call +91 92117 96168</a></div><Link href="/contact" className="mt-6 inline-block text-sm font-bold text-blue-100 underline underline-offset-4">Need general support? Contact us →</Link></div></section>
    </main>
  );
}
