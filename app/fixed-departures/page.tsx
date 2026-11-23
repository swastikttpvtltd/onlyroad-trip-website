import PackageServiceIcons from "@/features/fixedDepartures/components/PackageServiceIcons";
import { departureStartingPrices } from "@/features/fixedDepartures/data/fixedDeparturePresentation";
import type { Metadata } from "next";
import Link from "next/link";
import { packages } from "@/data/packages";
import { fixedDepartureReviews } from "@/features/fixedDepartures/data/fixedDepartureDetails";
import { CalendarDays, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Fixed Departure Tours | Only Road Trip" },
  description: "Explore Only Road Trip tours with scheduled departure dates. Upcoming packages and departure details will be published here.",
  alternates: { canonical: "https://www.onlyroadtrip.com/fixed-departures" },
};

export default function FixedDeparturesPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 pb-20 pt-32 text-slate-900 sm:pt-40">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-800">Travel on a planned schedule</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Fixed Departures</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">Find trips with scheduled departure dates, clear itineraries and published package details.</p>
        <section aria-labelledby="upcoming-departures-heading" className="mt-10">
          <h2 id="upcoming-departures-heading" className="text-2xl font-bold">Upcoming tour collection</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">Explore the itineraries and starting prices below. Contact us to confirm departure availability and your city-wise quotation.</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {fixedDepartureReviews.map((draft) => {
              const pkg = packages.find((item) => item.slug === draft.sourceSlug);
              if (!pkg) throw new Error(`Missing fixed departure package: ${draft.slug}`);
              return <article key={draft.slug} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6">
                <CalendarDays className="text-blue-800" size={24} aria-hidden="true" />
                <h3 className="mt-4 text-xl font-bold">{draft.title}</h3>
                <p className="mt-3 font-semibold text-blue-800">{draft.nights} Nights / {draft.itinerary.length} Days</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{draft.route}</p>
                <p className="mt-4 text-sm font-semibold text-slate-700">Starting from ₹{departureStartingPrices[draft.slug].toLocaleString("en-IN")} per person</p>
                <PackageServiceIcons services={{meals:true,hotel:true,transport:true,flights:true}} />
                <Link href={`/fixed-departures/${draft.slug}`} className="mt-auto inline-flex items-center gap-2 pt-5 font-bold text-blue-800">View Tour <ArrowRight size={17} aria-hidden="true" /></Link>
                <Link href={`/book/fixed/${draft.slug}`} className="mt-3 inline-flex justify-center rounded-lg bg-blue-800 px-4 py-3 text-sm font-bold text-white">Book Now</Link>
              </article>;
            })}
          </div>
          <div className="mt-8 rounded-2xl bg-blue-50 p-6">
            <h3 className="text-xl font-bold">Flight-inclusive city options</h3>
            <p className="mt-3 leading-7 text-slate-600">Return flights from your selected city — Delhi, Mumbai, Chennai, Hyderabad or Bengaluru (Bangalore) — are part of the proposed city-wise package price. Exact sectors, fares, baggage and flight times must be confirmed before booking. Local joining applies where the origin and destination gateway are the same.</p>
            <Link href="/contact" className="mt-5 inline-flex items-center gap-2 font-bold text-blue-800">Enquire about upcoming trips <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </section>
      </div>
    </main>
  );
}
