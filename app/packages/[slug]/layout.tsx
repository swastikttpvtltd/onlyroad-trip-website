import { packages } from "@/data/packages";

const baseUrl = "https://www.onlyroadtrip.com";

type LayoutProps = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export default async function PackageLayout({ params, children }: LayoutProps) {
  const { slug } = await params;
  const pkg = packages.find((item) => item.slug === slug);

  if (!pkg) return children;

  const url = `${baseUrl}/packages/${pkg.slug}`;
  const numericPrice = "price" in pkg && typeof pkg.price === "number" ? pkg.price : undefined;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Packages", item: `${baseUrl}/packages` },
      { "@type": "ListItem", position: 3, name: pkg.title, item: url },
    ],
  };

  const packageSchema = {
    "@context": "https://schema.org",
    "@type": "Trip",
    name: `${pkg.title} - Only Road Trip`,
    description: pkg.overview,
    provider: {
      "@type": "TravelAgency",
      "@id": `${baseUrl}/#organization`,
    },
    ...(numericPrice !== undefined
      ? {
          offers: {
            "@type": "Offer",
            price: numericPrice,
            priceCurrency: "INR",
            url,
            category: "Premium Package Tour",
            priceValidUntil: "2027-12-31",
            valueAddedService: [
              { "@type": "Service", name: "24/7 On-Road Support" },
              { "@type": "Service", name: "Verified Accommodations" },
            ],
          },
        }
      : {}),
    itinerary: {
      "@type": "ItemList",
      numberOfItems: Array.isArray(pkg.itinerary) ? pkg.itinerary.length : 0,
      itemListElement: (Array.isArray(pkg.itinerary) ? pkg.itinerary : []).map((day, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "TouristAttraction",
          name: day.title,
          description: day.description,
        },
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(packageSchema) }} />
      {children}
    </>
  );
}
