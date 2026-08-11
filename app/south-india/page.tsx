import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://www.onlyroadtrip.com";
const image = "/images/logo/only-road-trip-logo.jpeg";

export const metadata: Metadata = {
  title: "Best Travel Agency for South India | South India Tour Packages",
  description: "Explore South India tour packages with Kerala backwaters, family holidays, temple tours and island escapes from Only Road Trip.",
  keywords: ["Best travel agency for South India", "South India tour operators", "Kerala backwaters tour packages", "Best Kerala tour packages for family", "South India temple tour packages", "Andaman and Nicobar holiday packages"],
  alternates: { canonical: `${baseUrl}/south-india` },
  openGraph: { title: "South India Tour Packages | Only Road Trip", description: "Kerala, South India temple and island holiday packages.", url: `${baseUrl}/south-india`, siteName: "Only Road Trip", locale: "en_IN", type: "website", images: [{ url: image, alt: "South India Tour Packages" }] },
  twitter: { card: "summary_large_image", title: "South India Tour Packages | Only Road Trip", images: [image] },
  robots: { index: true, follow: true },
};

export default function SouthIndiaPage() {
  return <main className="min-h-screen bg-white"><section className="bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950 px-6 pb-16 pt-36 text-white"><div className="mx-auto max-w-5xl"><p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">Only Road Trip • South India</p><h1 className="mt-4 text-4xl font-bold md:text-6xl">South India Tour Packages</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">Explore Kerala backwaters, family-friendly holidays, temple circuits and relaxed coastal escapes with customized itineraries.</p></div></section><section className="mx-auto max-w-5xl px-6 py-14"><h2 className="text-3xl font-bold text-slate-900">South India experiences for every traveller</h2><p className="mt-5 leading-8 text-slate-600">Choose the best travel agency for South India for a journey designed around your interests. Our Kerala backwaters tour packages are ideal for couples and families, while our Best Kerala tour packages for family combine sightseeing, nature and comfortable stays.</p><p className="mt-5 leading-8 text-slate-600">Travellers interested in spirituality can choose South India temple tour packages covering important pilgrimage destinations. We also provide island-focused holiday planning, including Andaman and Nicobar holiday packages.</p><Link href="/packages" className="mt-8 inline-block rounded-full bg-cyan-600 px-7 py-3 font-semibold text-white">Explore All Packages</Link></section></main>;
}
