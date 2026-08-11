import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://www.onlyroadtrip.com";
const image = "/images/logo/only-road-trip-logo.jpeg";

export const metadata: Metadata = {
  title: "India Honeymoon Packages | Romantic Holidays | Only Road Trip",
  description: "Plan India honeymoon packages with romantic stays, scenic road trips and customized couple itineraries across India's most beautiful destinations.",
  keywords: ["India honeymoon packages", "honeymoon tour packages India", "romantic holiday packages India", "couple tour packages India", "honeymoon travel agency India"],
  alternates: { canonical: `${baseUrl}/honeymoon-packages` },
  openGraph: { title: "India Honeymoon Packages | Only Road Trip", description: "Customized romantic holidays and honeymoon journeys across India.", url: `${baseUrl}/honeymoon-packages`, siteName: "Only Road Trip", locale: "en_IN", type: "website", images: [{ url: image, alt: "India Honeymoon Packages" }] },
  twitter: { card: "summary_large_image", title: "India Honeymoon Packages | Only Road Trip", images: [image] },
  robots: { index: true, follow: true },
};

export default function HoneymoonPage() {
  return <main className="min-h-screen bg-white"><section className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 px-6 pb-16 pt-36 text-white"><div className="mx-auto max-w-5xl"><p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">Only Road Trip • Couples</p><h1 className="mt-4 text-4xl font-bold md:text-6xl">India Honeymoon Packages</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">Create a romantic journey around your preferred destination, travel dates, stay style and experiences.</p></div></section><section className="mx-auto max-w-5xl px-6 py-14"><h2 className="text-3xl font-bold text-slate-900">Romantic journeys, customized for two</h2><p className="mt-5 leading-8 text-slate-600">Our India honeymoon packages are designed for couples who want a comfortable pace, scenic experiences and memorable stays. Choose mountains, beaches, backwaters, heritage cities or a private road trip and let us shape the itinerary around you.</p><p className="mt-5 leading-8 text-slate-600">From short romantic breaks to longer multi-destination holidays, we can customize sightseeing, transport, accommodation and experiences according to your preferences.</p><Link href="/packages?theme=honeymoon" className="mt-8 inline-block rounded-full bg-cyan-600 px-7 py-3 font-semibold text-white">View Honeymoon Packages</Link></section></main>;
}
