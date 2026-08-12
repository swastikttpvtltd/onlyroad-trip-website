import type { Metadata } from "next";
import NicheLandingPage from "@/components/NicheLandingPage";
import RelatedPilgrimageLinks from "@/components/RelatedPilgrimageLinks";

const baseUrl = "https://www.onlyroadtrip.com";

export const metadata: Metadata = {
  title: "Char Dham Yatra Package from Delhi | Only Road Trip",
  description: "Book customized Char Dham Yatra packages from Delhi with comfortable transport, hotel coordination and personalized itineraries for families, groups and senior travelers.",
  keywords: ["Char Dham Yatra Package", "Char Dham Yatra Package from Delhi", "Char Dham Tour Package", "Char Dham Yatra Booking", "Char Dham Package", "Char Dham Tour from Delhi"],
  alternates: { canonical: `${baseUrl}/char-dham-yatra-package` },
  openGraph: { title: "Char Dham Yatra Package from Delhi | Only Road Trip", description: "Customized Char Dham Yatra packages with transport, stays and travel coordination.", url: `${baseUrl}/char-dham-yatra-package`, siteName: "Only Road Trip", locale: "en_IN", type: "website", images: [{ url: "/images/logo/only-road-trip-logo.jpeg", alt: "Only Road Trip Char Dham Yatra" }] },
  twitter: { card: "summary_large_image", title: "Char Dham Yatra Package | Only Road Trip", description: "Customized Char Dham Yatra packages from Delhi and other departure points." },
  robots: { index: true, follow: true },
};

const schema = { "@context": "https://schema.org", "@graph": [
  { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: baseUrl }, { "@type": "ListItem", position: 2, name: "Char Dham Yatra Package", item: `${baseUrl}/char-dham-yatra-package` }] },
  { "@type": "Service", "@id": `${baseUrl}/char-dham-yatra-package#service`, name: "Char Dham Yatra Packages", serviceType: "Char Dham Yatra Package", provider: { "@id": `${baseUrl}/#travel-agency` }, areaServed: { "@type": "Country", name: "India" }, url: `${baseUrl}/char-dham-yatra-package` },
] };

export default function CharDhamYatraPackagePage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><NicheLandingPage variant="char-dham" /><RelatedPilgrimageLinks current="char-dham" /></>;
}
