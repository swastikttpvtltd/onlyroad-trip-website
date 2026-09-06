import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "India Tour Packages | Only Road Trip",
  description: "Explore premium India tour packages, pilgrimage tours, road trips, family holidays, honeymoon packages and corporate travel experiences.",
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "BreadcrumbList", "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.onlyroadtrip.com/" },
      { "@type": "ListItem", "position": 2, "name": "Tour Packages", "item": "https://www.onlyroadtrip.com/packages" }
    ]},
    { "@type": "CollectionPage", "name": "India Tour Packages", "url": "https://www.onlyroadtrip.com/packages", "description": "Premium domestic tour packages and customized travel experiences across India." }
  ]
};

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />{children}</>;
}
