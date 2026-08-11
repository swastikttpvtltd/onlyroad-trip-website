import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://www.onlyroadtrip.com";
const phone = "+919211796168";
const whatsapp = "https://wa.me/919211796168";

export const metadata: Metadata = {
  title: "India Tour Packages | Only Road Trip",
  description:
    "Book customized India tour packages with Only Road Trip. Pilgrimage tours, Kashmir, Himachal, Uttarakhand, Goa, Kerala, Rajasthan, family holidays and corporate travel.",
  keywords: [
    "Best travel agency in India",
    "Top tour operators in India",
    "Best domestic travel agency in India",
    "All India tour packages",
    "Customized tour packages in India",
    "Best travel agent for domestic tours",
    "Book domestic tour packages online",
    "Cheapest family tour packages in India",
    "Luxury travel agency in India",
    "Corporate group tour operators in India",
    "India honeymoon packages",
    "Best pilgrimage tour packages in India",
    "Adventure travel agency India",
    "Heritage and cultural tours India",
  ],
  alternates: { canonical: `${baseUrl}/google-ads` },
  robots: { index: false, follow: true },
};

const benefits = [
  ["Customized Itineraries", "Travel plans built around your dates, budget and interests."],
  ["Verified Travel Support", "One travel team for planning, coordination and on-trip assistance."],
  ["Domestic Specialists", "Pilgrimage, mountains, beaches, family holidays and road trips across India."],
  ["Group & Corporate", "Solutions for families, groups, corporate offsites and MICE travel."],
];

const destinations = [
  "Kashmir",
  "Himachal Pradesh",
  "Uttarakhand",
  "Rajasthan",
  "Kerala",
  "Goa",
  "Ladakh",
  "Ayodhya & Varanasi",
  "Kedarnath & Char Dham",
  "Andaman & Nicobar",
];

export default function GoogleAdsLandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-700 px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="text-xl font-black tracking-tight">ONLY ROAD TRIP</Link>
            <a href={`tel:${phone}`} className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">Call +91 92117 96168</a>
          </div>

          <div className="grid gap-10 py-16 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:py-20">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-cyan-200/40 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100">Premium India Travel Planning</p>
              <h1 className="max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">Customized India Tour Packages Designed Around You</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">Plan your next family holiday, pilgrimage, honeymoon, road trip or corporate journey with a dedicated travel team. Tell us where you want to go — we will help build the right itinerary.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-white px-7 py-4 text-center font-extrabold text-blue-800 shadow-xl transition hover:bg-blue-50">Get Free Quote on WhatsApp</a>
                <a href={`tel:${phone}`} className="rounded-xl border border-white/50 bg-white/10 px-7 py-4 text-center font-extrabold text-white backdrop-blur transition hover:bg-white/20">Talk to a Travel Expert</a>
              </div>
              <p className="mt-4 text-sm text-blue-100">No obligation enquiry • Customized itinerary • Fast response</p>
            </div>

            <div className="rounded-3xl border border-white/20 bg-white p-6 text-slate-900 shadow-2xl">
              <h2 className="text-2xl font-black">Plan Your Trip</h2>
              <p className="mt-2 text-sm text-slate-600">Share a few details and contact us directly for a personalized quote.</p>
              <div className="mt-6 grid gap-3">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-green-600 px-5 py-4 text-center font-extrabold text-white hover:bg-green-700">WhatsApp Your Requirement</a>
                <a href={`tel:${phone}`} className="rounded-xl bg-blue-700 px-5 py-4 text-center font-extrabold text-white hover:bg-blue-800">Call for a Quote</a>
                <Link href="/packages" className="rounded-xl border border-slate-300 px-5 py-4 text-center font-bold text-slate-800 hover:bg-slate-50">Browse Tour Packages</Link>
              </div>
              <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                <strong>Popular requests:</strong> Kashmir family tours, Himachal holidays, Uttarakhand from Delhi, Kerala, Goa, Rajasthan, pilgrimage tours, Ladakh road trips and customized domestic holidays.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 text-slate-900 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">Why travelers choose us</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">A travel plan built for your trip — not a generic package</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-extrabold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 text-slate-900 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black sm:text-4xl">Popular India Tour Destinations</h2>
          <p className="mt-3 max-w-3xl text-slate-600">Choose a destination or ask us to create a completely customized route.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {destinations.map((destination) => <span key={destination} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold shadow-sm">{destination}</span>)}
          </div>
        </div>
      </section>

      <section className="bg-blue-800 px-5 py-16 text-center sm:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-black sm:text-4xl">Ready to plan your India holiday?</h2>
          <p className="mt-4 text-blue-100">Send your destination, travel dates and number of travelers. Our team will help you with the next step.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-white px-7 py-4 font-extrabold text-blue-800">Get Free Quote</a>
            <a href={`tel:${phone}`} className="rounded-xl border border-white/50 px-7 py-4 font-extrabold text-white">Call +91 92117 96168</a>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 px-5 py-8 text-center text-sm text-slate-400">
        <p className="font-bold text-white">Only Road Trip</p>
        <p className="mt-1">Swastik Tour And Travels Private Limited • Gurugram, Haryana</p>
        <p className="mt-1">+91 92117 96168 • info@onlyroadtrip.com</p>
      </footer>
    </main>
  );
}
