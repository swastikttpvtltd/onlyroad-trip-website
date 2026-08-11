import type { Metadata } from "next";

const baseUrl = "https://www.onlyroadtrip.com";

export const metadata: Metadata = {
  title: "Corporate Travel Agency in Gurugram | Only Road Trip",
  description:
    "Only Road Trip provides corporate travel management, business travel, MICE, corporate offsites, flights, hotels, ground transportation and group travel solutions across India.",
  keywords: [
    "Corporate Travel Agency Gurgaon",
    "Corporate Travel Agency Gurugram",
    "Corporate Travel Management India",
    "Business Travel Agency Gurgaon",
    "Corporate Travel Services Delhi NCR",
    "MICE Travel India",
    "Corporate Offsite Packages",
    "Business Travel Management",
    "Corporate Hotel Booking",
    "Corporate Flight Booking",
  ],
  alternates: { canonical: `${baseUrl}/corporate-travel` },
  openGraph: {
    title: "Corporate Travel Agency in Gurugram | Only Road Trip",
    description:
      "Corporate travel management, MICE, business travel, corporate offsites, hotels, flights and ground transportation across India.",
    url: `${baseUrl}/corporate-travel`,
    siteName: "Only Road Trip",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Only Road Trip Corporate Travel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporate Travel Agency | Only Road Trip",
    description: "Corporate travel and MICE solutions across India.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Corporate Travel", item: `${baseUrl}/corporate-travel` },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${baseUrl}/corporate-travel#service`,
  name: "Corporate Travel Management",
  serviceType: [
    "Corporate Travel Management",
    "Business Travel",
    "MICE Travel",
    "Corporate Offsites",
    "Corporate Flight Booking",
    "Corporate Hotel Booking",
    "Ground Transportation",
  ],
  provider: { "@id": `${baseUrl}/#travel-agency` },
  areaServed: { "@type": "Country", name: "India" },
  url: `${baseUrl}/corporate-travel`,
};

export default function CorporateTravelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {children}
    </>
  );
}
