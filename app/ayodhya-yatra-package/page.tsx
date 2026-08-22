import type { Metadata } from "next";
import PilgrimageLandingPage from "@/components/PilgrimageLandingPage";
import RelatedPilgrimageLinks from "@/components/RelatedPilgrimageLinks";
import HotelCard from "@/components/HotelCard";
import { hotels } from "@/data/hotels";

const baseUrl = "https://www.onlyroadtrip.com";

export const metadata: Metadata = {
  title: "Ayodhya Yatra Package from Delhi | Ram Mandir Tour | Only Road Trip",
  description: "Book customized Ayodhya Yatra packages from Delhi with Ram Mandir, Ayodhya sightseeing, Saryu, comfortable transport and hotel coordination.",
  keywords: ["Ayodhya Yatra Package", "Ayodhya Yatra Package from Delhi", "Ayodhya Tour Package", "Ram Mandir Tour Package", "Ayodhya Yatra Booking", "Ayodhya Kashi Yatra Package"],
  alternates: { canonical: `${baseUrl}/ayodhya-yatra-package` },
  openGraph: { title: "Ayodhya Yatra Package from Delhi | Only Road Trip", description: "Customized Ayodhya pilgrimage packages with Ram Mandir, sightseeing, transport and stay coordination.", url: `${baseUrl}/ayodhya-yatra-package`, siteName: "Only Road Trip", locale: "en_IN", type: "website" },
  robots: { index: true, follow: true },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: baseUrl }, { "@type": "ListItem", position: 2, name: "Ayodhya Yatra Package", item: `${baseUrl}/ayodhya-yatra-package` }] },
    { "@type": "Service", "@id": `${baseUrl}/ayodhya-yatra-package#service`, name: "Ayodhya Yatra Packages", serviceType: "Ayodhya Yatra Package", provider: { "@id": `${baseUrl}/#travel-agency` }, areaServed: { "@type": "Country", name: "India" }, url: `${baseUrl}/ayodhya-yatra-package` },
  ],
};

export default function AyodhyaYatraPackagePage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <PilgrimageLandingPage variant="ayodhya" />
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">Stay Recommendations</p>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-950 md:text-4xl">Recommended 3★ stays for your yatra</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">Hotel recommendations are shown separately from package costing. Verify current availability and rates directly before booking.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <HotelCard {...hotels.varanasi} />
          <HotelCard {...hotels.ayodhya} />
          <HotelCard {...hotels.prayagraj} />
        </div>
      </div>
    </section>
    <RelatedPilgrimageLinks current="ayodhya" />
  </>;
}
