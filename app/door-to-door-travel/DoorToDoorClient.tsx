"use client";

import { useState } from "react";
import DoorToDoorForm from "./DoorToDoorForm";
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
  ["What does door-to-door travel actually cover?", "We plan the journey from the agreed pickup address through the transfers, stays and experiences listed in your proposal, then arrange the confirmed return transfer to the agreed drop address. Every leg and its provider is shown before booking."],
  ["Is this only for senior citizens?", "No. We also plan private journeys for solo women, women’s groups, international visitors, NRI families, couples, families and corporate groups. The arrangements are tailored to each traveller."],
  ["Can the journey include flights or trains?", "Yes. We can include flight or train booking and the associated airport or station transfers in your personalised quote. These are included only when listed in the confirmed proposal."],
  ["Does door-to-door mean someone travels with us?", "A personal escort is not automatically included. Tell us if a traveller needs a companion, and we will check availability and quote the service separately."],
  ["Can you arrange a wheelchair in the vehicle?", "A foldable wheelchair can be requested for a specific journey, subject to availability and confirmation. Please tell us whether the traveller can transfer into a standard vehicle seat, the wheelchair dimensions and whether someone must assist with pushing it. A standard SUV is not a wheelchair-accessible vehicle while the person remains seated in the chair."],
  ["What about wheelchair assistance at airports or stations?", "We can request the relevant airline, airport or station assistance before travel and share the confirmation. The provider controls the service, and its availability and scope vary. Please share the requirement before tickets are booked."],
  ["Can you guarantee step-free hotel rooms and darshan?", "We ask hotels and attractions about the specific access features a traveller needs and confirm what is available for the chosen dates. Access, queues, temple facilities and special passes are controlled by the respective providers and cannot be guaranteed by a general page claim."],
  ["Can we choose food, rest stops and travel pace?", "Yes. Tell us about meal preferences, preferred start times, comfortable driving hours and restroom needs. We plan suitable stops and communicate dietary requests to providers, subject to availability on the route."],
  ["Will the same driver and vehicle stay throughout?", "For a private road circuit, we can quote a dedicated vehicle for the agreed route. Flights, intercity changes or local regulations may require separate vehicles. Your itinerary will identify each transfer and the vehicle arrangement."],
  ["How do family members receive updates?", "With the travellers’ consent, we can agree updates at key stages such as pickup, airport arrival, hotel check-in and final drop. The timing and family contacts are agreed before departure; continuous live monitoring is not assumed."],
  ["What happens if a flight is delayed or a vehicle breaks down?", "Contact the trip coordinator using the number in your confirmed itinerary. We will coordinate feasible changes with the relevant airline, hotel or transport supplier and explain any additional supplier costs before arranging them."],
  ["What happens in a medical emergency?", "The driver or trip contact will seek appropriate local emergency help, inform the designated family contact and coordinate travel-related next steps. Medical assessment, treatment and response times depend on qualified local services."],
  ["Can an NRI book a journey for parents in India?", "Yes. We can discuss the plan with the person booking and, where appropriate, the travellers themselves. India-based pickup, transfers and family updates can be set out in the quote. Overseas home pickup is offered only if specifically confirmed."],
  ["Is the service available across India?", "We assess each request based on the pickup location, route, dates and support needs, then confirm where our available partners can fulfil the plan."],
  ["What is included in the price?", "Your written quotation lists the exact pickup and drop, hotels, transport, meals, guides, tickets, assistance and taxes included. Flights, escorts, medical equipment and paid special access are included only if specifically written into that quote."],
  ["How much does a door-to-door journey cost?", "Pricing depends on dates, route, group size, accommodation, vehicle and assistance requirements. We share the total price, inclusions, exclusions and applicable payment and cancellation terms before you decide."],
] as const;

export default function DoorToDoorClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
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

    <section className="border-y border-slate-200 bg-white px-6 py-20"><div className="mx-auto max-w-7xl">
      <p className="font-bold uppercase tracking-[0.18em] text-blue-700">Door to door, explained</p>
      <h2 className="mt-3 max-w-4xl text-3xl font-extrabold sm:text-4xl">One connected plan across every part of the trip.</h2>
      <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">A door-to-door journey starts at the pickup address you approve and finishes at the agreed drop address. Depending on your itinerary, we coordinate home transfers, flights or trains, destination arrivals, accommodation, private road travel, sightseeing and the return. You see the timing, contact point and confirmed provider for each important handoff before departure.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["01 · Before departure", "We discuss the travellers’ preferences, mobility, luggage, food and pace; then confirm the itinerary and inclusions."],
          ["02 · Leaving home", "We share the agreed pickup details and coordinate the transfer to the first airport, station or road destination."],
          ["03 · During the journey", "Destination pickups, hotel stays, local transport and planned stops follow the confirmed route. Your trip contact helps with travel-related changes."],
          ["04 · Returning home", "We coordinate the final agreed transfer and drop-off, bringing the booked journey to its end."],
        ].map(([title, copy]) => <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6"><h3 className="font-extrabold text-blue-800">{title}</h3><p className="mt-3 leading-7 text-slate-600">{copy}</p></div>)}
      </div>
      <p className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm leading-7 text-blue-950"><strong>What “managed” means:</strong> Only Road Trip coordinates the services confirmed in your booking. Airlines, hotels, healthcare providers and attractions deliver their respective services under their own operating rules. Any personal escort or specialist care must be specifically arranged and listed in your proposal.</p>
    </div></section>

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

    <section className="bg-gradient-to-br from-sky-50 to-white px-6 py-20"><div className="mx-auto max-w-7xl">
      <p className="font-bold uppercase tracking-[0.18em] text-blue-700">Mobility & wheelchair planning</p>
      <h2 className="mt-3 max-w-4xl text-3xl font-extrabold sm:text-4xl">A wheelchair request deserves a real access plan.</h2>
      <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">Tell us where support is needed: at home pickup, vehicle entry, airport, hotel, sightseeing or the final drop. We check each stage individually and describe the confirmed arrangements in your quote.</p>
      <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          ["Vehicle & chair", "We discuss foldable wheelchair storage, vehicle step-in height and whether the traveller can transfer into a standard seat."],
          ["Airport or station", "We request available assistance from the airline, airport or railway provider and share its confirmation and meeting instructions."],
          ["Hotel room access", "We check specific needs such as lift access, room approach, bathroom layout and walk-in shower with the chosen property."],
          ["Visits & stops", "We review realistic walking distances, accessible routes and suitable restroom stops where information is available."],
        ].map(([title, copy]) => <div key={title} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"><h3 className="text-lg font-extrabold text-blue-900">{title}</h3><p className="mt-3 leading-7 text-slate-600">{copy}</p></div>)}
      </div>
      <p className="mt-7 rounded-2xl border-l-4 border-blue-600 bg-white p-5 text-sm leading-7 text-slate-700">A foldable wheelchair in the luggage area is different from a vehicle designed for someone to remain seated in their wheelchair. Tell us which is required before we confirm the vehicle. Equipment, attendants and accessible facilities depend on the route and are included only when written into the quote.</p>
    </div></section>

    <section className="mx-auto max-w-7xl px-6 py-20">
      <p className="font-bold uppercase tracking-[0.18em] text-blue-700">Your quotation, clearly explained</p>
      <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">What can be included in your door-to-door plan?</h2>
      <p className="mt-5 max-w-4xl leading-8 text-slate-600">Each journey is custom priced. The services below are available to plan; your individual written quotation states exactly which ones are included, their limits and any extra charges.</p>
      <div className="mt-9 grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-7"><h3 className="text-xl font-extrabold text-blue-950">Core journey arrangements</h3><ul className="mt-5 space-y-3 text-slate-700">{[
          "Agreed home or hotel pickup and final drop",
          "Airport, station and destination transfers in the route",
          "Private vehicle, driver and intercity travel where quoted",
          "Chosen accommodation and specified room category",
          "A day-wise itinerary with realistic timing and rest stops",
          "Trip coordinator contact and agreed family updates",
          "Clearly stated taxes, tolls, parking and driver charges",
        ].map(item=><li key={item} className="flex gap-3"><CheckCircle2 className="mt-1 shrink-0 text-blue-700" size={18}/>{item}</li>)}</ul></div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7"><h3 className="text-xl font-extrabold text-slate-950">Add when your journey needs them</h3><ul className="mt-5 space-y-3 text-slate-700">{[
          "Flights or train tickets and baggage arrangements",
          "Airport or station wheelchair assistance requests",
          "Foldable wheelchair or suitable accessible transport",
          "Meet-and-assist, personal travel companion or attendant",
          "Meals, dietary requests and local guides",
          "Sightseeing tickets and available special-access services",
          "Additional hotel nights, vehicle hours or route changes",
        ].map(item=><li key={item} className="flex gap-3"><CheckCircle2 className="mt-1 shrink-0 text-slate-500" size={18}/>{item}</li>)}</ul></div>
      </div>
      <p className="mt-6 text-sm leading-7 text-slate-600"><strong>Before you pay:</strong> We share the exact inclusions, exclusions, supplier confirmations, total price and applicable payment and cancellation terms. Medical treatment, insurance and emergency response are not included unless expressly arranged with the appropriate provider.</p>
      <Link href="/privacy-policy" className="mt-5 inline-block font-semibold text-blue-700 underline underline-offset-4">How we handle your information</Link>
    </section>

    <section className="bg-slate-50 px-6 py-20"><div className="mx-auto max-w-4xl">
      <p className="font-bold uppercase tracking-[0.18em] text-blue-700">Frequently asked questions</p>
      <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Questions, answered clearly.</h2>
      <p className="mt-4 leading-7 text-slate-600">Open a question to see the details. We will confirm arrangements specific to your route in writing.</p>
      <div className="mt-8 space-y-3">{faqs.map(([question, answer], index) => {
        const isOpen = openFaq === index;
        return <div key={question} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <button type="button" onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen} aria-controls={`door-faq-${index}`} className="flex w-full items-center justify-between gap-5 p-5 text-left transition hover:bg-blue-50">
            <span className="text-base font-extrabold text-slate-900">{question}</span><span aria-hidden="true" className="shrink-0 text-3xl font-light text-blue-700">{isOpen ? "−" : "+"}</span>
          </button>
          {isOpen && <div id={`door-faq-${index}`} className="border-t border-slate-200 bg-slate-50 px-5 py-5 leading-7 text-slate-600">{answer}</div>}
        </div>;
      })}</div>
    </div></section>

    <section id="enquiry" className="px-6 py-20"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr]">
      <div><p className="font-bold uppercase tracking-[0.18em] text-blue-700">Start your journey</p><h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Let’s plan travel that feels right for you.</h2><p className="mt-5 leading-8 text-slate-600">Share the essentials and our team will discuss a personalised, door-to-door travel plan. This enquiry does not confirm a booking.</p><p className="mt-7 text-sm leading-6 text-slate-500">Please do not enter detailed medical records here. We can discuss relevant assistance needs directly.</p></div>
      <DoorToDoorForm />
    </div></section>
  </main>;
}
