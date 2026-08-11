import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://www.onlyroadtrip.com";
const image = "/images/logo/only-road-trip-logo.jpeg";

export const metadata: Metadata = {
  title: "Adventure Travel Agency India | Road Trips & Adventure Tours",
  description: "Plan adventure holidays, mountain road trips, trekking journeys, wildlife experiences and active escapes across India with Only Road Trip.",
  keywords: ["Adventure travel agency India", "adventure tour packages India", "India adventure holidays", "Ladakh road trips", "Himalayan trekking tours", "adventure road trips India"],
  alternates: { canonical: `${baseUrl}/adventure-travel` },
  openGraph: { title: "Adventure Travel Agency India | Only Road Trip", description: "Adventure holidays, road trips, trekking and active travel experiences across India.", url: `${baseUrl}/adventure-travel`, siteName: "Only Road Trip", locale: "en_IN", type: "website", images: [{ url: image, alt: "Adventure Travel India" }] },
  twitter: { card: "summary_large_image", title: "Adventure Travel Agency India | Only Road Trip", images: [image] },
  robots: { index: true, follow: true },
};

export default function AdventurePage() {
  return <main className="min-h-screen bg-white"><section className="bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950 px-6 pb-16 pt-36 text-white"><div className="mx-auto max-w-5xl"><p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">Only Road Trip • Adventure</p><h1 className="mt-4 text-4xl font-bold md:text-6xl">Adventure Travel Agency India</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">Take the scenic route with mountain road trips, trekking journeys, active holidays and unforgettable outdoor experiences.</p></div></section><section className="mx-auto max-w-5xl px-6 py-14"><h2 className="text-3xl font-bold text-slate-900">Adventure experiences across India</h2><p className="mt-5 leading-8 text-slate-600">Only Road Trip plans adventure holidays around the pace and experience you want. Choose Himalayan road trips, Ladakh journeys, trekking destinations, wildlife experiences and other active escapes.</p><p className="mt-5 leading-8 text-slate-600">Our itineraries can be customized for couples, friends, families and private groups, with transport, stays and sightseeing arranged around the destination and season.</p><Link href="/packages?theme=adventure" className="mt-8 inline-block rounded-full bg-cyan-600 px-7 py-3 font-semibold text-white">Explore Adventure Packages</Link></section></main>;
}
