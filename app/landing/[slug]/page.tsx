import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { packages } from "@/data/packages";

type PageProps = { params: Promise<{ slug: string }> };

const baseUrl = "https://www.onlyroadtrip.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return packages.map((pkg) => ({ slug: String(pkg.slug) })).filter((item) => item.slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = packages.find((item) => String(item.slug) === slug) as any;
  if (!pkg) return { title: "Package Not Found | Only Road Trip", robots: "noindex" };

  return {
    title: `${pkg.title} | Only Road Trip`,
    description: String(pkg.overview ?? `Explore ${pkg.title} with Only Road Trip.`).slice(0, 160),
    alternates: { canonical: `${baseUrl}/packages/${slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params;
  const exists = packages.some((pkg) => String(pkg.slug) === slug);
  if (!exists) redirect("/404");

  // The landing URL reuses the existing package detail UI/data.
  // This keeps itinerary, gallery, pricing, inclusions, exclusions and FAQ in one source.
  redirect(`/packages/${slug}#itinerary`);
}
