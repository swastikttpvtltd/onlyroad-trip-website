import { packages } from "@/data/packages";
import { serializeJsonLd, siteUrl } from "@/lib/siteSeo";
import type { ReactNode } from "react";

export default async function PackageLayout({ params, children }: {
  params: Promise<{ slug: string }>; children: ReactNode;
}) {
  const { slug } = await params;
  const pkg = packages.find(item => item.slug === slug);
  if (!pkg) return children;
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl + "/" },
      { "@type": "ListItem", position: 2, name: "Packages", item: siteUrl + "/packages" },
      { "@type": "ListItem", position: 3, name: pkg.title, item: siteUrl + "/packages/" + pkg.slug },
    ],
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumb) }} />{children}</>;
}
