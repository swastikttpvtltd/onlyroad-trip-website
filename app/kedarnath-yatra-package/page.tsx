import type { Metadata } from "next";
import NicheLandingPage from "@/components/NicheLandingPage";

const baseUrl = "https://www.onlyroadtrip.com";

export const metadata: Metadata = {
  title: "Kedarnath Yatra Package from Delhi | Only Road Trip",
  description: "Plan a customized Kedarnath Yatra package from Delhi with practical road itineraries, transport, accommodation coordination and travel support.",
  keywords: ["Kedarnath Yatra Package", "Kedarnath Yatra Package from Delhi", "Kedarnath Tour Package", "Kedarnath Yatra Booking", "Kedarnath Package from Delhi", "Kedarnath Tour from Delhi"],
  alternates: { canonical: `${baseUrl}/kedarnath-yatra-package` },
  openGraph: {
    title: "Kedarnath Yatra Package from Delhi | Only Road Trip",
    description: "Customized Kedarnath Yatra packages with transport, stays and practical route planning.",
    url: `${baseUrl}/kedarnath-yatra-package`,
    siteName: "Only Road Trip",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/images/logo/only-road-trip-logo.jpeg", alt: "Only Road Trip Kedarnath Yatra" }],
  },
  twitter: { card: "summary_large_image", title: "Kedarnath Yatra Package | Only Road Trip", description: "Customized Kedarnath Yatra packages from Delhi and other departure points." },
  robots: { index: true, follow: true },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Kedarnath Yatra Package", item: `${baseUrl}/kedarnath-yatra-package` },
    ] },
    { "@type": "Service", "@id": `${baseUrl}/kedarnath-yatra-package#service`, name: "Kedarnath Yatra Packages", serviceType: "Kedarnath Yatra Package", provider: { "@id": `${baseUrl}/#travel-agency` }, areaServed: { "@type": "Country", name: "India" }, url: `${baseUrl}/kedarnath-yatra-package` },
  ],
};

export default function KedarnathYatraPackagePage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><NicheLandingPage variant="kedarnath" /></>;
}
