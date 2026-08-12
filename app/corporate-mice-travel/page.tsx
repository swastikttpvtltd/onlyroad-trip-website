import type { Metadata } from "next";
import NicheLandingPage from "@/components/NicheLandingPage";

const baseUrl = "https://www.onlyroadtrip.com";

export const metadata: Metadata = {
  title: "Corporate MICE Travel Company in India | Only Road Trip",
  description: "Corporate MICE travel, conferences, incentive trips, offsites and business group travel across India and international destinations with Only Road Trip.",
  keywords: ["Corporate MICE Travel", "MICE Travel Company India", "Corporate MICE Travel Agency", "Corporate Offsite Travel", "Corporate Incentive Travel", "Conference Travel Management", "Business Group Travel India"],
  alternates: { canonical: `${baseUrl}/corporate-mice-travel` },
  openGraph: {
    title: "Corporate MICE Travel Company in India | Only Road Trip",
    description: "MICE, corporate offsites, incentive trips, conferences and business group travel coordination.",
    url: `${baseUrl}/corporate-mice-travel`,
    siteName: "Only Road Trip",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/images/logo/only-road-trip-logo.jpeg", alt: "Only Road Trip Corporate MICE Travel" }],
  },
  twitter: { card: "summary_large_image", title: "Corporate MICE Travel | Only Road Trip", description: "MICE and corporate group travel solutions across India and international destinations." },
  robots: { index: true, follow: true },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Corporate MICE Travel", item: `${baseUrl}/corporate-mice-travel` },
    ] },
    { "@type": "Service", "@id": `${baseUrl}/corporate-mice-travel#service`, name: "Corporate MICE Travel", serviceType: ["Meetings", "Incentives", "Conferences", "Exhibitions", "Corporate Offsites", "Business Group Travel"], provider: { "@id": `${baseUrl}/#travel-agency` }, areaServed: { "@type": "Country", name: "India" }, url: `${baseUrl}/corporate-mice-travel` },
  ],
};

export default function CorporateMiceTravelPage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><NicheLandingPage variant="corporate-mice" /></>;
}
