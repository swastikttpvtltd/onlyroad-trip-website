import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://www.onlyroadtrip.com";
const image = "/images/logo/only-road-trip-logo.jpeg";

export const metadata: Metadata = {
  title: "Book Domestic Tour Packages Online | Only Road Trip",
  description: "Book domestic tour packages online with Only Road Trip. Compare family, luxury, pilgrimage, road trip and corporate group travel options across India.",
  keywords: ["Book domestic tour packages online", "Cheapest family tour packages in India", "Luxury travel agency in India", "Corporate group tour operators in India", "Travel packages with flight and hotel India", "book India tour packages", "domestic holiday booking India"],
  alternates: { canonical: `${baseUrl}/book-domestic-tour-packages` },
  openGraph: { title: "Book Domestic Tour Packages Online | Only Road Trip", description: "Plan and book customized domestic holidays, family tours, luxury journeys and group travel across India.", url: `${baseUrl}/book-domestic-tour-packages`, siteName: "Only Road Trip", locale: "en_IN", type: "website", images: [{ url: image, alt: "Book Domestic Tour Packages Online" }] },
  twitter: { card: "summary_large_image", title: "Book Domestic Tour Packages Online | Only Road Trip", images: [image] },
  robots: { index: true, follow: true },
};

export default function BookDomesticToursPage() {
  return <main className="min-h-screen bg-white"><section className="bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950 px-6 pb-16 pt-36 text-white"><div className="mx-auto max-w-5xl"><p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">Only Road Trip • Direct Booking</p><h1 className="mt-4 text-4xl font-bold md:text-6xl">Book Domestic Tour Packages Online</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">Find family holidays, pilgrimage journeys, luxury escapes, road trips and corporate group travel across India.</p></div></section><section className="mx-auto max-w-5xl px-6 py-14"><h2 className="text-3xl font-bold text-slate-900">Choose the right package for your trip</h2><p className="mt-5 leading-8 text-slate-600">Whether you are comparing family holidays, looking for value-focused travel or planning a premium journey, Only Road Trip can customize the destination, duration, transport, accommodation and sightseeing around your requirements.</p><p className="mt-5 leading-8 text-slate-600">For corporate groups, our team also plans group tours, business travel and offsite journeys. If your requirement includes air travel and accommodation, ask our team about the available travel packages with flight and hotel India options.</p><p className="mt-5 leading-8 text-slate-600">We aim to provide transparent options rather than make unsupported claims about being the cheapest. Tell us your budget and we will recommend the most suitable available itinerary.</p><Link href="/packages" className="mt-8 inline-block rounded-full bg-cyan-600 px-7 py-3 font-semibold text-white">Browse Tour Packages</Link></section></main>;
}
