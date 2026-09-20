import { packages } from "@/data/packages";

const baseUrl = "https://www.onlyroadtrip.com";

type LayoutProps = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export default async function PackageLayout({
  params,
  children,
}: LayoutProps) {
  const { slug } = await params;
  const pkg = packages.find((item) => item.slug === slug);

  if (!pkg) return children;

  const url = `${baseUrl}/packages/${pkg.slug}`;

  const numericPrice =
    "price" in pkg && typeof pkg.price === "number"
      ? pkg.price
      : undefined;

  const itinerary = Array.isArray(pkg.itinerary) ? pkg.itinerary : [];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Packages",
        item: `${baseUrl}/packages`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pkg.title,
        item: url,
      },
    ],
  };

  const packageSchema = {
    "@context": "https://schema.org",
    "@type": "Trip",
    "@id": `${url}#trip`,
    name: `${pkg.title} - Only Road Trip`,
    description: pkg.overview,
    url,
    image:
      typeof pkg.image === "string"
        ? [
            `${baseUrl}${
              pkg.image.startsWith("/") ? pkg.image : `/${pkg.image}`
            }`,
          ]
        : undefined,

    provider: {
      "@type": "TravelAgency",
      "@id": `${baseUrl}/#organization`,
      name: "Only Road Trip",
      legalName: "Swastik Tour And Travels Private Limited",
    },

    touristType: pkg.category
      ? [String(pkg.category)]
      : ["Leisure Travelers"],

    areaServed: {
      "@type": "Country",
      name: "India",
    },

    ...(pkg.destination
      ? {
          destination: {
            "@type": "Place",
            name: String(pkg.destination),
          },
        }
      : {}),

    ...(numericPrice !== undefined
      ? {
          offers: {
            "@type": "Offer",
            url,
            price: numericPrice,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "TravelAgency",
              "@id": `${baseUrl}/#organization`,
            },
          },
        }
      : {}),

    ...(itinerary.length > 0
      ? {
          itinerary: {
            "@type": "ItemList",
            numberOfItems: itinerary.length,
            itemListElement: itinerary.map((day, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "TouristAttraction",
                name: day?.title ?? `Day ${index + 1}`,
                description:
                  day?.description ??
                  `Day ${index + 1} itinerary for ${pkg.title}`,
              },
            })),
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(packageSchema),
        }}
      />

      {children}
    </>
  );
}
