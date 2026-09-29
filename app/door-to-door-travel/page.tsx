import type { Metadata } from "next";
import DoorToDoorClient from "./DoorToDoorClient";

const pageUrl = "https://www.onlyroadtrip.com/door-to-door-travel";
const pageTitle = "Door-to-Door Travel Planning in India";
const pageDescription =
  "Personalised door-to-door travel planning in India with coordinated pickups, transfers, stays and trip support for families, senior travellers, women and visitors.";
const socialImage = "https://www.onlyroadtrip.com/images/door-to-door-travel-social.png";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: pageUrl,
    siteName: "Only Road Trip",
    title: `${pageTitle} | Only Road Trip`,
    description: pageDescription,
    images: [{ url: socialImage, width: 1200, height: 630, alt: "Only Road Trip door-to-door travel planning" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | Only Road Trip`,
    description: pageDescription,
    images: [socialImage],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: `${pageTitle} | Only Road Trip`,
      description: pageDescription,
      inLanguage: "en-IN",
      isPartOf: { "@id": "https://www.onlyroadtrip.com/#website" },
      publisher: { "@id": "https://www.onlyroadtrip.com/#organization" },
      mainEntity: { "@id": `${pageUrl}#service` },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    },
    {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: "Door-to-Door Travel Planning",
      serviceType: "Personalised door-to-door travel planning and coordination",
      description: pageDescription,
      provider: { "@id": "https://www.onlyroadtrip.com/#organization" },
      areaServed: { "@type": "Country", name: "India" },
      url: pageUrl,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.onlyroadtrip.com/" },
        { "@type": "ListItem", position: 2, name: "Door-to-Door Travel", item: pageUrl },
      ],
    },
  ],
};

export default function DoorToDoorPage() {
  return <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema).replace(/</g, "\\u003c") }}
    />
    <DoorToDoorClient />
  </>;
}
