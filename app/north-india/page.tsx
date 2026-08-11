import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://www.onlyroadtrip.com";
const image = "/images/logo/only-road-trip-logo.jpeg";

export const metadata: Metadata = {
  title: "Best Travel Agency for North India | North India Holiday Packages",
  description: "Explore North India holiday packages with Only Road Trip, including Kashmir family tours, Himachal, Manali and Uttarakhand holidays from Delhi NCR.",
  keywords: ["Best travel agency for North India", "North India holiday packages", "Kashmir family tour packages", "Best Himachal tour packages", "Uttarakhand holiday packages from Delhi", "Cheap Manali tour packages", "Best travel agent for Kashmir tour"],
  alternates: { canonical: `${baseUrl}/north-india` },
  openGraph: { title: "North India Holiday Packages | Only Road Trip", description: "Kashmir, Himachal, Manali and Uttarakhand holiday packages from Delhi NCR.", url: `${baseUrl}/north-india`, siteName: "Only Road Trip", locale: "en_IN", type: "website", images: [{ url: image, alt: "North India Holiday Packages" }] },
  twitter: { card: "summary_large_image", title: "North India Holiday Packages | Only Road Trip", images: [image] },
  robots: { index: true, follow: true },
};

export default function NorthIndiaPage() {
  return <main className="min-h-screen bg-white"><section className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 px-6 pb-16 pt-36 text-white"><div className="mx-auto max-w-5xl"><p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">Only Road Trip • North India</p><h1 className="mt-4 text-4xl font-bold md:text-6xl">North India Holiday Packages</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">Discover Kashmir, Himachal Pradesh, Manali and Uttarakhand with flexible itineraries, comfortable transport and customized journeys from Delhi NCR.</p></div></section><section className="mx-auto max-w-5xl px-6 py-14"><h2 className="text-3xl font-bold text-slate-900">North India travel made simple</h2><p className="mt-5 leading-8 text-slate-600">Choose the best travel agency for North India when you want family holidays, mountain escapes and pilgrimage journeys planned around your dates and budget. Our Kashmir family tour packages cover popular valley experiences, while our Best Himachal tour packages include destinations such as Manali, Shimla and Dalhousie. We also offer Uttarakhand holiday packages from Delhi for spiritual and mountain journeys.</p><p className="mt-5 leading-8 text-slate-600">For budget-conscious travellers, ask about cheap Manali tour packages and customized road trips. If Kashmir is your priority, our team can plan a personalized itinerary as your best travel agent for Kashmir tour requirements.</p><Link href="/packages" className="mt-8 inline-block rounded-full bg-cyan-600 px-7 py-3 font-semibold text-white">Explore All Packages</Link></section></main>;
}
