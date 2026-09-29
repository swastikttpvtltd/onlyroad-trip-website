"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, ShieldCheck, Users, HeartHandshake } from "lucide-react";

const categories = [
  ["Senior-Friendly Journeys", "Comfortable pacing, suitable transfers and assistance planned in advance."],
  ["Solo Women Travel", "Private journeys planned around your comfort and preferences."],
  ["Women’s Group Journeys", "Shared experiences with clearly coordinated travel arrangements."],
  ["International Visitors", "India arrival-to-departure planning with clear transfers, stays and local coordination."],
  ["NRI Family Travel", "Journeys for you or your family in India, with agreed updates and one clear itinerary."],
  ["Private Family Travel", "Flexible private trips from the first pickup to the return journey."],
  ["Corporate & Group Mobility", "Coordinated guest movements, stays and group transfers."],
] as const;
const steps = [
  ["01", "Tell us your needs", "Share your pickup city, destination, dates, travellers and what matters to them."],
  ["02", "Review your plan", "Receive a personalised itinerary with clear inclusions, exclusions and pricing."],
  ["03", "Travel with support", "We coordinate the confirmed transfers, stays and travel arrangements in your booking."],
  ["04", "Return home", "Your agreed return transfer and final drop complete the journey."],
] as const;
const faqs = [
  ["Does door-to-door mean someone travels with us?", "A personal escort is not automatically included. Tell us if you need one and we will check availability and quote it separately."],
  ["Can you plan wheelchair or mobility assistance?", "Yes. Tell us where assistance is needed. We will request available services and confirm what each provider accepts before travel. Access varies by route and facility."],
  ["Can my family receive travel updates?", "We can agree updates for key stages, such as pickup and hotel arrival, with the travellers’ preferences and consent."],
  ["What happens in a medical emergency?", "The driver or trip contact will seek appropriate local emergency help, inform the designated family contact and coordinate travel-related next steps. Medical response depends on local qualified services."],
  ["Is this available throughout India?", "We assess each request based on pickup location, route, dates and required services, then confirm what we can arrange."],
  ["What will the journey cost?", "Your written proposal will show the total price and exactly what is included. Prices depend on the route, dates, accommodation, transport and requested assistance."],
] as const;

export default function DoorToDoorClient() {
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setFeedback("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/door-to-door-enquiry", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Please try again.");
      form.reset();
      setFeedback("Thank you. Your enquiry has been received. Our team will contact you about your journey.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to send your enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }
  return <main className="bg-white text-slate-900">
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 px-6 pb-24 pt-36 text-white sm:pt-40">
      <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-200">Only Road Trip · Door-to-Door Travel</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">Your journey, connected from the first pickup to the final drop.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">Personalised travel planning, transfers, stays and on-trip coordination for senior travellers, women, international visitors, NRI families and private groups. One clear plan, shaped around the people travelling.</p>
        <div className="mt-8 flex flex-wrap gap-3"><a href="#enquiry" className="rounded-full bg-white px-7 py-3 font-extrabold text-blue-900">Plan a Door-to-Door Journey</a><a href="#how-it-works" className="rounded-full border border-white/60 px-7 py-3 font-bold text-white">See How It Works</a></div>
        <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-blue-100"><span>✓ Home pickup & return drop options</span><span>✓ Personally planned itineraries</span><span>✓ One clear trip contact</span></div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 py-20">
      <p className="font-bold uppercase tracking-[0.18em] text-blue-700">The complete journey</p>
      <h2 className="mt-3 max-w-3xl text-3xl font-extrabold sm:text-4xl">Travel plans should fit the people travelling.</h2>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">From the agreed pickup address to your destination and back, we bring the confirmed parts of your journey into one coordinated plan. Tell us your pace, comfort needs and preferences. We will show you what can be arranged before you book.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          [MapPin, "Every transfer accounted for", "We set out the agreed pickup points, airport or station transfers and final drop in your itinerary."],
          [Users, "A journey built around you", "Private routes, suitable stays and realistic schedules planned around your group."],
          [ShieldCheck, "Clarity before booking", "Your written proposal specifies inclusions, exclusions, assistance requests and total price."],
        ].map(([Icon, title, copy]) => <div key={title as string} className="rounded-3xl border border-slate-200 bg-slate-50 p-7">{typeof Icon !== "string" && <Icon className="text-blue-700" size={27}/>}<h3 className="mt-5 text-xl font-bold">{title as string}</h3><p className="mt-3 leading-7 text-slate-600">{copy as string}</p></div>)}
      </div>
    </section>

    <section className="bg-slate-50 px-6 py-20" id="journeys"><div className="mx-auto max-w-7xl">
      <p className="font-bold uppercase tracking-[0.18em] text-blue-700">Who we plan for</p>
      <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">A journey for every kind of traveller.</h2>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{categories.map(([title, copy]) => <a key={title} href="#enquiry" className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><HeartHandshake className="text-blue-700" size={26}/><h3 className="mt-5 text-xl font-extrabold">{title}</h3><p className="mt-3 min-h-16 leading-7 text-slate-600">{copy}</p><span className="mt-5 inline-flex items-center gap-2 font-bold text-blue-700">Plan this journey <ArrowRight size={17}/></span></a>)}</div>
    </div></section>

    <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20">
      <p className="font-bold uppercase tracking-[0.18em] text-blue-700">How it works</p>
      <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Four steps, one connected journey.</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{steps.map(([number, title, copy]) => <div key={number} className="rounded-3xl border border-slate-200 p-6"><span className="text-lg font-extrabold text-blue-700">{number}</span><h3 className="mt-5 text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-slate-600">{copy}</p></div>)}</div>
    </section>

    <section className="bg-blue-950 px-6 py-20 text-white"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
      <div><p className="font-bold uppercase tracking-[0.18em] text-cyan-200">What matters in the details</p><h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Comfort is planned, not assumed.</h2><p className="mt-5 leading-8 text-blue-100">Tell us about walking distance, luggage, preferred travel pace, dietary needs and the kind of support that would make your journey easier. We check what is available on your route and confirm specific arrangements in your proposal.</p></div>
      <div className="grid gap-3">{["Suitable vehicle and practical route planning", "Hotel and room needs discussed in advance", "Rest breaks and food preferences considered", "Assistance requested and confirmed where available", "Agreed family updates with traveller consent"].map(item=><div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 p-4"><CheckCircle2 className="mt-1 shrink-0 text-cyan-300" size={20}/><span>{item}</span></div>)}</div>
    </div></section>

    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="text-3xl font-extrabold sm:text-4xl">Know what is included before you book.</h2>
      <p className="mt-4 max-w-3xl leading-8 text-slate-600">Your proposal identifies the pickup and drop addresses, transport, hotels, meals, guides, assistance arrangements and any exclusions. Flights, escorts, medical equipment, paid meet-and-assist and special access are included only when specifically listed in your confirmed quote.</p>
      <Link href="/privacy-policy" className="mt-5 inline-block font-semibold text-blue-700 underline underline-offset-4">How we handle your information</Link>
    </section>

    <section className="bg-slate-50 px-6 py-20"><div className="mx-auto max-w-4xl"><h2 className="text-3xl font-extrabold sm:text-4xl">Questions, answered clearly.</h2><div className="mt-8 space-y-3">{faqs.map(([q,a])=><details key={q} className="group rounded-2xl border border-slate-200 bg-white p-5"><summary className="cursor-pointer list-none font-bold marker:hidden">{q}<span className="float-right text-blue-700 group-open:rotate-45">+</span></summary><p className="mt-4 leading-7 text-slate-600">{a}</p></details>)}</div></div></section>

    <section id="enquiry" className="px-6 py-20"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr]">
      <div><p className="font-bold uppercase tracking-[0.18em] text-blue-700">Start your journey</p><h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Let’s plan travel that feels right for you.</h2><p className="mt-5 leading-8 text-slate-600">Share the essentials and our team will discuss a personalised, door-to-door travel plan. This enquiry does not confirm a booking.</p><p className="mt-7 text-sm leading-6 text-slate-500">Please do not enter detailed medical records here. We can discuss relevant assistance needs directly.</p></div>
      <form onSubmit={submit} className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:grid-cols-2 sm:p-9">
        <label className="text-sm font-bold">Your name *<input name="fullName" required maxLength={120} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal" /></label>
        <label className="text-sm font-bold">Phone / WhatsApp *<input name="mobile" required type="tel" maxLength={25} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal" /></label>
        <label className="text-sm font-bold">Email address<input name="email" type="email" maxLength={160} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal" /></label>
        <label className="text-sm font-bold">Pickup city *<input name="pickupCity" required maxLength={120} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal" /></label>
        <label className="text-sm font-bold">Destination *<input name="destination" required maxLength={160} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal" /></label>
        <label className="text-sm font-bold">Preferred travel date *<input name="travelDate" required type="date" className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal" /></label>
        <label className="text-sm font-bold">Number of travellers *<input name="travellers" required type="number" min="1" max="200" defaultValue="2" className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal" /></label>
        <label className="text-sm font-bold">Who is travelling? *<select name="travellerCategory" required defaultValue="" className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 font-normal"><option value="" disabled>Select a category</option>{categories.map(([title])=><option key={title}>{title}</option>)}<option>Other</option></select></label>
        <label className="text-sm font-bold sm:col-span-2">Would you like home pickup and return drop?<select name="homePickup" defaultValue="Please discuss" className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 font-normal"><option>Yes</option><option>Please discuss</option><option>No</option></select></label>
        <label className="text-sm font-bold sm:col-span-2">Anything we should consider for your comfort? *<textarea name="message" required maxLength={2000} rows={4} placeholder="Tell us about preferred pace, luggage, food or assistance needs. Please avoid detailed medical records." className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal" /></label>
        <button disabled={submitting} type="submit" className="rounded-xl bg-blue-700 px-6 py-4 font-extrabold text-white hover:bg-blue-800 disabled:opacity-60 sm:col-span-2">{submitting ? "Sending..." : "Request My Door-to-Door Plan"}</button>
        {feedback && <p role="status" className="rounded-xl bg-blue-50 p-3 text-sm font-semibold text-blue-900 sm:col-span-2">{feedback}</p>}
        <p className="text-xs leading-5 text-slate-500 sm:col-span-2">By sending this enquiry, you agree that Only Road Trip, operated by Swastik Tour And Travels Private Limited, may contact you about this travel request. See our <Link className="underline" href="/privacy-policy">Privacy Policy</Link>.</p>
      </form>
    </div></section>
  </main>;
}
