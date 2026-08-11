import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://www.onlyroadtrip.com";
const image = "/images/logo/only-road-trip-logo.jpeg";

export const metadata: Metadata = {
  title: "Best Pilgrimage Tour Packages in India | Only Road Trip",
  description: "Discover pilgrimage tour packages in India covering Kedarnath, Char Dham, Ayodhya, Varanasi, Amarnath, Vaishno Devi and other spiritual destinations.",
  keywords: ["Best pilgrimage tour packages in India", "pilgrimage tour packages India", "spiritual tour packages India", "Kedarnath Yatra package", "Char Dham Yatra package", "Ayodhya tour package", "Amarnath Yatra package", "Vaishno Devi Yatra package"],
  alternates: { canonical: `${baseUrl}/pilgrimage-tours` },
  openGraph: { title: "Best Pilgrimage Tour Packages in India | Only Road Trip", description: "Spiritual and pilgrimage journeys across India's most important sacred destinations.", url: `${baseUrl}/pilgrimage-tours`, siteName: "Only Road Trip", locale: "en_IN", type: "website", images: [{ url: image, alt: "Pilgrimage Tour Packages India" }] },
  twitter: { card: "summary_large_image", title: "Pilgrimage Tour Packages India | Only Road Trip", images: [image] },
  robots: { index: true, follow: true },
};

export default function PilgrimagePage() {
  return <main className="min-h-screen bg-white"><section className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 px-6 pb-16 pt-36 text-white"><div className="mx-auto max-w-5xl"><p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">Only Road Trip • Spiritual Journeys</p><h1 className="mt-4 text-4xl font-bold md:text-6xl">Best Pilgrimage Tour Packages in India</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">Comfortable and thoughtfully planned spiritual journeys for families, seniors and groups across India's sacred destinations.</p></div></section><section className="mx-auto max-w-5xl px-6 py-14"><h2 className="text-3xl font-bold text-slate-900">Spiritual journeys with practical planning</h2><p className="mt-5 leading-8 text-slate-600">Our pilgrimage tour packages in India can include Kedarnath, Char Dham, Ayodhya, Varanasi, Amarnath, Vaishno Devi and other important spiritual destinations. Itineraries can be adjusted for senior citizens, families and private groups.</p><p className="mt-5 leading-8 text-slate-600">We focus on sensible routing, comfortable transfers, suitable accommodation and clear day-wise planning so that the journey remains peaceful and manageable.</p><Link href="/packages?theme=spiritual" className="mt-8 inline-block rounded-full bg-cyan-600 px-7 py-3 font-semibold text-white">Explore Pilgrimage Packages</Link></section></main>;
}
