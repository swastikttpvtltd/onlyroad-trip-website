import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Only Road Trip | Travel Assistance & Tour Enquiries",
  description: "Contact Only Road Trip for customized India tour packages, pilgrimage journeys, road trips, family holidays and travel assistance.",
  alternates: { canonical: "https://www.onlyroadtrip.com/contact" },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "BreadcrumbList", "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.onlyroadtrip.com/" },
      { "@type": "ListItem", "position": 2, "name": "Contact Only Road Trip", "item": "https://www.onlyroadtrip.com/contact" }
    ]},
    { "@type": "ContactPage", "name": "Contact Only Road Trip", "url": "https://www.onlyroadtrip.com/contact", "isPartOf": { "@id": "https://www.onlyroadtrip.com/#website" }, "about": { "@id": "https://www.onlyroadtrip.com/#organization" } }
  ]
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />{children}</>;
}
