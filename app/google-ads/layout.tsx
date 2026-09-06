const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebPage", "name": "India Tour Packages | Only Road Trip", "url": "https://www.onlyroadtrip.com/google-ads", "isPartOf": { "@id": "https://www.onlyroadtrip.com/#website" } },
    { "@type": "Service", "name": "Customized India Tour Planning", "serviceType": "Travel Agency Services", "provider": { "@id": "https://www.onlyroadtrip.com/#organization" }, "areaServed": { "@type": "Country", "name": "India" } }
  ]
};
export default function GoogleAdsLayout({ children }: { children: React.ReactNode }) { return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />{children}</>; }
