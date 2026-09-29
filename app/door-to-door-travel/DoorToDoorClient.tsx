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
  ["What does door-to-door travel actually cover?", "Your journey begins at the pickup address you choose and is planned through to your final drop-off. We bring the agreed parts of the trip together in one personalised itinerary: your home transfer, flight or train where included, arrival pickup, hotel stay, private ground transport, planned visits, and the journey home. Before departure, we share the key timings, meeting points and contact details so every handoff is clear. A dedicated trip contact helps coordinate the confirmed arrangements and travel-related changes along the way. Your written proposal sets out exactly what is included, which services are optional, and the total price—allowing you to enjoy the journey with the details thoughtfully taken care of."],
  ["Is this only for senior citizens?", "Not at all. We design door-to-door journeys for senior travellers, solo women, women’s groups, international guests, NRI families, couples and private or corporate groups. The travel plan is shaped around the people travelling, their preferred pace and the support they actually need."],
  ["Can the journey include flights or trains?", "Yes. We can bring flights or trains together with the relevant home, airport or station and destination transfers in a single proposed itinerary. Fares, baggage terms and ticket details are shown in the quotation when those bookings are part of your package."],
  ["Is support available 24/7 during our journey?", "Yes. During your confirmed trip, you will have a dedicated journey contact and a 24/7 assistance number for urgent travel issues. Whether a pickup changes, a hotel needs to be contacted or a traveller needs help with the next arrangement, our team will coordinate with the relevant provider and keep your designated contact informed. Your final itinerary will include the correct numbers and escalation route. Emergency medical and public services are delivered by local providers, and their response times are outside our control."],
  ["Will a guide be available at the attractions we visit?", "A knowledgeable local guide can be arranged at major sightseeing points where guiding is permitted and available. We will identify the attractions and cities with a guide, the language and the guiding duration in your day-wise itinerary and quotation. At places where a guide is unavailable or access is restricted, we will tell you before booking instead of assuming guide coverage throughout the trip."],
  ["How do you verify hotels, vehicles and the places we visit?", "Before confirming a journey, we check the hotel room category and access needs, vehicle type, cleanliness and suitability, and the practical route to each planned stop. For priority accessibility requirements, our team or an on-site local representative will physically inspect the relevant hotel, vehicle or access point where this can be arranged, record the findings and share any limitation before you approve the plan. Site conditions can change, so we reconfirm critical details close to travel rather than treating an old inspection as a permanent guarantee."],
  ["Will you check walking distances, stairs and steep access in advance?", "Yes. For the stops in your proposed itinerary, we look beyond the attraction name: where the vehicle can stop, the approximate walk to the entrance, steps, slopes, lifts, ramps and any further movement inside. When these details materially affect a traveller, we verify them locally where feasible, note the expected effort in the itinerary and discuss an alternative if the route is unsuitable. Temporary closures, crowd controls and changing terrain are reconfirmed near the travel date."],
  ["Which meal plans can we choose?","You may choose CPAI (room with breakfast), MAPAI (room with breakfast and dinner), or APAI (room with breakfast, lunch and dinner). We will show the selected plan, the exact meals covered on each travel day and the hotel or restaurant serving arrangements in your quotation and day-wise itinerary. Dietary requests can be communicated in advance. Anything beyond the confirmed meal plan, such as a special menu or additional restaurant order, will be explained separately."],
  ["Is premium mineral bottled water, soft drinks, tea and snacks provided?","Yes. Your confirmed Door-to-Door package can include premium-quality mineral water bottles, soft drinks, tea and light snacks for the road journey. We will state the brand or standard where relevant, the quantity or refreshment schedule, and where they are served in your quotation. These agreed refreshments are complimentary within the package; additional personal orders remain optional."],
  ["Can we add services or upgrade hotels and transport?", "Absolutely. We can explore a higher hotel category, larger or more accessible vehicle, additional guide, escort, experiences, extra nights or a different meal plan. Tell us what you would like to change before booking—or during the trip when practical—and we will check availability, share the revised price and obtain your approval before confirming an upgrade."],
  ["Does door-to-door mean someone travels with us?", "You will have a named trip contact to coordinate the confirmed arrangements. A personal escort is a separate service: if a traveller would feel more comfortable with someone accompanying them, tell us early and we will explore an appropriate option and quote it clearly."],
  ["Can you arrange a wheelchair in the vehicle?", "We plan this around the traveller rather than assuming one wheelchair solution fits everyone. Tell us whether a foldable chair is needed for outings, whether the traveller can move into a vehicle seat and who will assist with the chair. We then check a suitable vehicle and equipment option for the route and confirm exactly what is included. A standard SUV cannot carry a traveller while they remain seated in a wheelchair."],
  ["What about wheelchair assistance at airports or stations?", "We can submit assistance requests in advance, check the airline or station provider’s process and share the confirmed meeting instructions with you. These services are delivered by the relevant provider, so we identify the confirmed scope before departure and explain any gaps that need another arrangement."],
  ["Can you plan step-free rooms and special darshan?","We check the practical access requirements that matter to the traveller: steps from the vehicle, lift access to the room floor, bathroom layout and the walking involved at planned visits. Where the temple or attraction offers a special darshan arrangement, we can request or book it subject to its rules, availability and any applicable fee. Your itinerary will state what has been confirmed, what remains subject to the venue and an alternative if a requested access feature cannot be arranged."],
  ["Can we choose rest stops and travel pace?", "Of course. We ask about preferred start times, comfortable driving hours and the frequency of breaks before finalising the route. We plan suitable restroom and refreshment stops where available, then set expectations honestly for remote stretches of the journey."],
  ["Will the same driver and vehicle stay throughout?", "If a continuous private road journey is your preference, we can build the quote around a dedicated vehicle for the agreed circuit. Flights, local regulations or route changes may require another vehicle. We show each transfer in the itinerary so you know when a driver or vehicle change is planned."],
  ["How do family members receive updates?", "We agree the right level of communication with the travellers and their designated family contacts before departure. Key updates can cover pickup, important transfers, hotel arrival and final drop. Location or photo sharing is arranged only with the travellers’ consent, so they stay informed without losing their privacy."],
  ["What happens if a flight is delayed or our vehicle breaks down?","You will have your trip coordinator’s contact throughout the journey. If a flight is delayed, the coordinator will work with the airline, hotel and transfer providers, explain any necessary schedule or sightseeing changes, and seek your approval before any optional service that carries an extra supplier charge. If the vehicle arranged by us breaks down during the confirmed itinerary, our team will arrange a suitable replacement vehicle and bear that replacement cost—there is no additional vehicle charge to you for the breakdown. We will keep you informed of the new vehicle details, revised pickup timing and any effect on the planned visits."],
  ["What happens in a medical emergency?", "The driver will contact local emergency services promptly and alert the trip coordinator. We will notify the family contact you have designated and help coordinate travel-related changes while the traveller reaches appropriate local medical care. Clinical decisions, treatment and response times remain with qualified healthcare and emergency providers in that location."],
  ["Can you arrange an oxygen cylinder or oxygen support?","If a traveller needs oxygen support, please tell us before booking and share the treating clinician’s written advice about the device and required flow. We can check a suitable medical-equipment supplier for the road portion, including delivery, capacity and backup arrangements, and quote the confirmed equipment separately. Oxygen must be used as directed by a qualified professional; a driver is not a medical attendant. For flights, oxygen cylinders and portable concentrators are governed by the airline’s medical-clearance and equipment rules, so we will request the relevant approval in advance rather than assume road equipment can go on board."],
  ["Should we share medical history and regular medication details?","Please share only the health and mobility information relevant to planning the journey, through a private discussion with our team and with the traveller’s consent. It helps us plan suitable travel time, breaks, access and any approved equipment. Travellers should bring their own medicines, prescriptions and an adequate supply in their hand luggage. If medicine is forgotten during the trip, our coordinator can help locate a licensed pharmacy or medical provider, subject to prescription, availability and the traveller’s approval; we do not keep every prescription medicine in the vehicle or ask a driver to administer it."],
  ["Can an NRI book a journey for parents in India?", "Yes. We can plan the India journey with you while also listening to your parents’ own preferences and comfort needs. Their agreed pickup, transfers, stay, return drop and family updates can be brought together in one proposal. Any overseas home transfer would be quoted only if specifically available and confirmed."],
  ["Is the service available across India?", "Tell us your starting point, route and support requirements. We check the relevant local partners and facilities before confirming coverage, so the journey we propose is based on arrangements we can actually make for your dates."],
  ["What exactly is included in the quoted price?","Your personal quotation provides a complete, item-by-item view of the journey: agreed pickup and final drop, each transfer, vehicle and driver, accommodation and room category, the chosen CPAI/MAPAI/APAI meal plan, guide coverage, sightseeing or entry tickets, refreshments, wheelchair or other assistance, and applicable tolls, parking and taxes. We identify the services included for each day and list exclusions separately. Flights, personal escorts, oxygen equipment, paid special access and upgrades are included only when expressly written into the final quotation, so you can approve the full cost with confidence."],
  ["How much does a door-to-door journey cost?", "Every journey is built around its route, dates, number of travellers, accommodation standard, vehicle and assistance needs. After we understand your requirements, we share a total price with clear inclusions, exclusions, payment terms and cancellation conditions—so you can review the complete plan before making a decision."],
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
          "24/7 urgent travel support contact during the confirmed journey",
          "Trip coordinator and agreed family updates",
          "Clearly stated taxes, tolls, parking and driver charges",
        ].map(item=><li key={item} className="flex gap-3"><CheckCircle2 className="mt-1 shrink-0 text-blue-700" size={18}/>{item}</li>)}</ul></div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7"><h3 className="text-xl font-extrabold text-slate-950">Add when your journey needs them</h3><ul className="mt-5 space-y-3 text-slate-700">{[
          "Flights or train tickets and baggage arrangements",
          "Airport or station wheelchair assistance requests",
          "Foldable wheelchair or suitable accessible transport",
          "Meet-and-assist, personal travel companion or attendant",
          "Breakfast-only (BB) or all-meals (AP) plans",
          "Guides at listed attractions and language options",
          "Complimentary water, soft drinks, tea and snacks as quoted",
          "Sightseeing tickets and available special-access services",
          "Hotel and vehicle upgrades, extra nights or route changes",
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
