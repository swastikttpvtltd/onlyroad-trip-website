import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan Your Trip | Customized India Tours | Only Road Trip",
  description: "Plan a customized India holiday, pilgrimage, road trip, family vacation or corporate journey with the Only Road Trip travel team.",
  alternates: { canonical: "https://www.onlyroadtrip.com/plan-your-trip" },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "BreadcrumbList", "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.onlyroadtrip.com/" },
      { "@type": "ListItem", "position": 2, "name": "Plan Your Trip", "item": "https://www.onlyroadtrip.com/plan-your-trip" }
    ]},
    { "@type": "Service", "name": "Customized India Tour Planning", "serviceType": "Travel Planning", "provider": { "@id": "https://www.onlyroadtrip.com/#organization" }, "areaServed": { "@type": "Country", "name": "India" }, "url": "https://www.onlyroadtrip.com/plan-your-trip" }
  ]
};

export default function PlanYourTripLayout({ children }: { children: React.ReactNode }) {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />{children}</>;
}
