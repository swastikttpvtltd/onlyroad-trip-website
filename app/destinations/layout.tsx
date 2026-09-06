import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "India Tour Destinations | Only Road Trip",
  description: "Explore India destinations and discover pilgrimage tours, road trips, family holidays and customized travel packages with Only Road Trip.",
  alternates: { canonical: "https://www.onlyroadtrip.com/destinations" },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "BreadcrumbList", "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.onlyroadtrip.com/" },
      { "@type": "ListItem", "position": 2, "name": "Destinations", "item": "https://www.onlyroadtrip.com/destinations" }
    ]},
    { "@type": "CollectionPage", "name": "India Tour Destinations", "url": "https://www.onlyroadtrip.com/destinations", "description": "India destinations for pilgrimage tours, holidays and road trips." }
  ]
};

export default function DestinationsLayout({ children }: { children: React.ReactNode }) {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />{children}</>;
}
