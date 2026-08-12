import type { Metadata } from "next";
import NicheLandingPage from "@/components/NicheLandingPage";

const baseUrl = "https://www.onlyroadtrip.com";

export const metadata: Metadata = {
  title: "Solo Women Travel Packages in India | Only Road Trip",
  description: "Customized solo women travel packages in India and international destinations with practical itineraries, accommodation planning, transport and travel support.",
  keywords: ["Solo Women Travel Packages", "Solo Female Travel India", "Women Solo Travel Packages India", "Solo Women Tour Packages", "Solo Travel Packages India", "Women Travel Packages"],
  alternates: { canonical: `${baseUrl}/solo-women-travel-packages` },
  openGraph: {
    title: "Solo Women Travel Packages in India | Only Road Trip",
    description: "Customized solo women travel packages with practical itineraries, stays and transport coordination.",
    url: `${baseUrl}/solo-women-travel-packages`,
    siteName: "Only Road Trip",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/images/logo/only-road-trip-logo.jpeg", alt: "Only Road Trip Solo Women Travel" }],
  },
  twitter: { card: "summary_large_image", title: "Solo Women Travel Packages | Only Road Trip", description: "Customized solo women travel packages in India and international destinations." },
  robots: { index: true, follow: true },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Solo Women Travel Packages", item: `${baseUrl}/solo-women-travel-packages` },
    ] },
    { "@type": "Service", "@id": `${baseUrl}/solo-women-travel-packages#service`, name: "Solo Women Travel Packages", serviceType: "Solo Women Travel Packages", provider: { "@id": `${baseUrl}/#travel-agency` }, areaServed: { "@type": "Country", name: "India" }, url: `${baseUrl}/solo-women-travel-packages` },
  ],
};

export default function SoloWomenTravelPackagesPage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><NicheLandingPage variant="solo-women" /></>;
}
