import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://www.onlyroadtrip.com";
const image = "/images/logo/only-road-trip-logo.jpeg";

export const metadata: Metadata = {
  title: "Heritage and Cultural Tours India | Only Road Trip",
  description: "Explore heritage and cultural tours across India covering forts, palaces, historic cities, temples, local traditions and immersive experiences.",
  keywords: ["Heritage and cultural tours India", "heritage tour packages India", "cultural tours India", "India heritage holidays", "historic India tour packages", "fort and palace tours India"],
  alternates: { canonical: `${baseUrl}/heritage-cultural-tours` },
  openGraph: { title: "Heritage and Cultural Tours India | Only Road Trip", description: "Discover India's forts, palaces, historic cities and cultural experiences.", url: `${baseUrl}/heritage-cultural-tours`, siteName: "Only Road Trip", locale: "en_IN", type: "website", images: [{ url: image, alt: "Heritage and Cultural Tours India" }] },
  twitter: { card: "summary_large_image", title: "Heritage and Cultural Tours India | Only Road Trip", images: [image] },
  robots: { index: true, follow: true },
};

export default function HeritagePage() {
  return <main className="min-h-screen bg-white"><section className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 px-6 pb-16 pt-36 text-white"><div className="mx-auto max-w-5xl"><p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">Only Road Trip • Heritage & Culture</p><h1 className="mt-4 text-4xl font-bold md:text-6xl">Heritage and Cultural Tours India</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">Travel through India's forts, palaces, historic cities, temples, local traditions and living culture with thoughtfully designed itineraries.</p></div></section><section className="mx-auto max-w-5xl px-6 py-14"><h2 className="text-3xl font-bold text-slate-900">See India through its history and culture</h2><p className="mt-5 leading-8 text-slate-600">Our heritage and cultural tours India collection is designed for travellers who want more than a checklist of attractions. Explore historic architecture, local food, traditions, spiritual landmarks and the stories behind India's destinations.</p><p className="mt-5 leading-8 text-slate-600">Choose a private family journey, a couple's cultural holiday or a group itinerary and we can customize the route around your interests, travel dates and preferred pace.</p><Link href="/packages?theme=heritage" className="mt-8 inline-block rounded-full bg-cyan-600 px-7 py-3 font-semibold text-white">Explore Heritage Packages</Link></section></main>;
}
