import { packages } from "@/data/packages";
import { getPackagePrimaryImage } from "@/data/packageMediaFallback";

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
  const image = getPackagePrimaryImage(pkg);
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

  const tripSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${url}#tourist-trip`,
    name: pkg.title,
    description: pkg.overview,
    url,
    image: [image],
    touristType: pkg.category,
    areaServed: { "@type": "Country", name: "India" },
    provider: { "@id": `${baseUrl}/#travel-agency` },
    ...(numericPrice !== undefined
      ? {
          offers: {
            "@type": "Offer",
            url,
            priceCurrency: "INR",
            price: numericPrice,
            availability: "https://schema.org/InStock",
            seller: { "@id": `${baseUrl}/#travel-agency` },
          },
        }
      : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }} />
      {children}
    </>
  );
}
