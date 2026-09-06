import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://www.onlyroadtrip.com";

export const metadata: Metadata = {
  title: "Jyotirlinga Yatra Package | Only Road Trip",
  description: "Plan a customized Jyotirlinga Yatra across India's major Shiva temples with Only Road Trip, including pilgrimage planning, transport and stays.",
  keywords: ["Jyotirlinga Yatra", "12 Jyotirlinga Yatra package", "Jyotirlinga tour package India", "Shiva pilgrimage tour", "Jyotirlinga tour operator"],
  alternates: { canonical: `${baseUrl}/jyotirlinga-yatra` },
  openGraph: { title: "Jyotirlinga Yatra Package | Only Road Trip", description: "Customized Jyotirlinga pilgrimage journeys across India.", url: `${baseUrl}/jyotirlinga-yatra`, siteName: "Only Road Trip", type: "website" },
  twitter: { card: "summary_large_image", title: "Jyotirlinga Yatra Package | Only Road Trip", description: "Customized Jyotirlinga pilgrimage journeys across India." },
  robots: { index: true, follow: true },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "BreadcrumbList", "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${baseUrl}/` },
      { "@type": "ListItem", "position": 2, "name": "Jyotirlinga Yatra", "item": `${baseUrl}/jyotirlinga-yatra` }
    ]},
    { "@type": "Service", "name": "Jyotirlinga Yatra", "serviceType": "Pilgrimage Tour", "provider": { "@id": `${baseUrl}/#organization` }, "areaServed": { "@type": "Country", "name": "India" }, "url": `${baseUrl}/jyotirlinga-yatra` }
  ]
};

export default function JyotirlingaYatraPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 px-6 pb-16 pt-32 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">Spiritual &amp; Pilgrimage Experiences</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight md:text-6xl">Jyotirlinga Yatra Packages</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">Plan a comfortable and customized Jyotirlinga pilgrimage with itinerary planning, transport, stays and on-trip assistance from Only Road Trip.</p>
          <Link href="/plan-your-trip" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-900">Plan Your Yatra</Link>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-6 py-14 lg:px-8">
        <h2 className="text-3xl font-extrabold text-slate-900">Explore Jyotirlinga pilgrimage options</h2>
        <p className="mt-4 text-lg leading-8 text-slate-600">Tell us your preferred temples, travel dates, starting city and group size. Our team can build a pilgrimage itinerary around your requirements.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {[["/packages/ujjain-omkareshwar","Ujjain & Omkareshwar"],["/packages/dwarka-somnath","Dwarka & Somnath"],["/packages/varanasi-kashi","Kashi Yatra"]].map(([href,name]) => <Link key={href} href={href} className="rounded-full border border-slate-200 bg-white px-5 py-3 font-semibold text-blue-800 shadow-sm hover:border-blue-600">{name}</Link>)}
        </div>
      </section>
    </main>
  );
}
