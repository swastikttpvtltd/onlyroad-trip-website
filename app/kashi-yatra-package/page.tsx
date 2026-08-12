import type { Metadata } from "next";
import PilgrimageLandingPage from "@/components/PilgrimageLandingPage";
import RelatedPilgrimageLinks from "@/components/RelatedPilgrimageLinks";

const baseUrl = "https://www.onlyroadtrip.com";

export const metadata: Metadata = {
  title: "Kashi Yatra Package from Delhi | Varanasi Tour | Only Road Trip",
  description: "Book customized Kashi Yatra packages from Delhi with Varanasi sightseeing, Kashi Vishwanath, Ganga Aarti, comfortable transport and hotel coordination.",
  keywords: ["Kashi Yatra Package", "Kashi Yatra Package from Delhi", "Kashi Vishwanath Yatra", "Varanasi Tour Package", "Kashi Yatra Booking", "Kashi Ayodhya Yatra Package"],
  alternates: { canonical: `${baseUrl}/kashi-yatra-package` },
  openGraph: { title: "Kashi Yatra Package from Delhi | Only Road Trip", description: "Customized Kashi Yatra and Varanasi pilgrimage packages with transport, stays and travel coordination.", url: `${baseUrl}/kashi-yatra-package`, siteName: "Only Road Trip", locale: "en_IN", type: "website" },
  robots: { index: true, follow: true },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: baseUrl }, { "@type": "ListItem", position: 2, name: "Kashi Yatra Package", item: `${baseUrl}/kashi-yatra-package` }] },
    { "@type": "Service", "@id": `${baseUrl}/kashi-yatra-package#service`, name: "Kashi Yatra Packages", serviceType: "Kashi Yatra Package", provider: { "@id": `${baseUrl}/#travel-agency` }, areaServed: { "@type": "Country", name: "India" }, url: `${baseUrl}/kashi-yatra-package` },
  ],
};

export default function KashiYatraPackagePage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><PilgrimageLandingPage variant="kashi" /><RelatedPilgrimageLinks current="kashi" /></>;
}
