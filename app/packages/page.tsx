import Link from "next/link";
import type { Metadata } from "next";

import PackageCard from "@/components/PackageCard";
import { packages } from "@/data/packages";
import type { Package } from "@/data/packagesTypes";

type SearchParams = {
  q?: string;
  category?: string;
  state?: string;
  sort?: "price-low" | "price-high";
};

type GalleryItem = {
  image?: string;
  alt?: string;
};

type RawPackage = Record<string, any>;

function normalizePackage(pkg: RawPackage): Package {
  const gallery = Array.isArray(pkg.gallery)
    ? pkg.gallery.map((item: any) =>
        typeof item === "string"
          ? item
          : item?.image ?? "/images/package-placeholder.jpg"
      )
    : [];

  return {
    id:
      typeof pkg.id === "number"
        ? pkg.id
        : Number(String(pkg.id || "").replace(/\D/g, "")) || 0,
    slug: pkg.slug ?? "",
    title: pkg.title ?? "Tour Package",
    destination: pkg.destination ?? "",
    state: pkg.state ?? "",
    category: pkg.category ?? "Tour",
    image:
      pkg.image ??
      pkg.hero?.image ??
      gallery[0] ??
      "/images/package-placeholder.jpg",
    gallery,
    duration: pkg.duration ?? "",
    price: typeof pkg.price === "number" ? pkg.price : 0,
    rating: typeof pkg.rating === "number" ? pkg.rating : 4.5,
    reviews: typeof pkg.reviews === "number" ? pkg.reviews : 0,
    overview: pkg.overview ?? "",
    highlights: Array.isArray(pkg.highlights) ? pkg.highlights : [],
    itinerary: Array.isArray(pkg.itinerary)
      ? pkg.itinerary.map((day: any, index: number) => ({
          day:
            typeof day.day === "number"
              ? day.day
              : Number(String(day.day || "").replace(/\D/g, "")) ||
                index + 1,
          title: day.title ?? `Day ${index + 1}`,
          description: [
            Array.isArray(day.morning)
              ? `Morning: ${day.morning.join(", ")}`
              : "",
            Array.isArray(day.afternoon)
              ? `Afternoon: ${day.afternoon.join(", ")}`
              : "",
            Array.isArray(day.evening)
              ? `Evening: ${day.evening.join(", ")}`
              : "",
          ]
            .filter(Boolean)
            .join(" "),
        }))
      : [],
    hotels: Array.isArray(pkg.hotels)
      ? pkg.hotels.map((hotel: any) => ({
          name: hotel.name ?? "Hotel",
          category: hotel.category ?? "Standard",
        }))
      : [],
    meals: Array.isArray(pkg.meals) ? pkg.meals : [],
    inclusions: Array.isArray(pkg.inclusions) ? pkg.inclusions : [],
    exclusions: Array.isArray(pkg.exclusions) ? pkg.exclusions : [],
    bestTime: pkg.bestTime ?? "",
    groupSize: pkg.groupSize ?? "",
    difficulty: pkg.difficulty ?? "",
  };
}

const packageList = packages.map(normalizePackage);

export const metadata: Metadata = {
  title: "Tour Packages | Only Road Trip",
  description:
    "Explore premium India tour packages, pilgrimage tours, luxury road trips and custom holiday packages at Only Road Trip.",
  keywords: [
    "Only Road Trip",
    "India tour packages",
    "pilgrimage tours",
    "luxury road trips",
    "family holidays",
    "custom packages",
  ],
  alternates: {
    canonical: "https://www.onlyroadtrip.com/packages",
  },
  openGraph: {
    title: "Tour Packages | Only Road Trip",
    description:
      "Explore premium India tour packages, pilgrimage tours, luxury road trips and custom holiday packages.",
    url: "https://www.onlyroadtrip.com/packages",
    siteName: "Only Road Trip",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Only Road Trip Tour Packages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour Packages | Only Road Trip",
    description:
      "Explore premium India tour packages, pilgrimage tours, luxury road trips and custom holiday packages.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PackagesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = searchParams?.q?.trim().toLowerCase() ?? "";
  const activeCategory = searchParams?.category;
  const activeState = searchParams?.state;
  const sort = searchParams?.sort;

  const categories = Array.from(
    new Set(packageList.map((pkg) => pkg.category))
  );
  const states = Array.from(new Set(packageList.map((pkg) => pkg.state)));

  let filteredPackages = packageList;

  if (query) {
    filteredPackages = filteredPackages.filter(
      (pkg) =>
        pkg.title.toLowerCase().includes(query) ||
        pkg.destination.toLowerCase().includes(query) ||
        pkg.overview.toLowerCase().includes(query)
    );
  }

  if (activeCategory) {
    filteredPackages = filteredPackages.filter(
      (pkg) => pkg.category === activeCategory
    );
  }

  if (activeState) {
    filteredPackages = filteredPackages.filter(
      (pkg) => pkg.state === activeState
    );
  }

  if (sort === "price-low") {
    filteredPackages = [...filteredPackages].sort((a, b) => a.price - b.price);
  }

  if (sort === "price-high") {
    filteredPackages = [...filteredPackages].sort((a, b) => b.price - a.price);
  }

  return (
    <main className="bg-slate-50">
      <section className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Premium India Tour Packages
            </p>
            <h1 className="text-5xl font-bold tracking-tight">
              Discover the best holiday packages across India
            </h1>
            <p className="text-lg leading-8 text-slate-300">
              Handpicked pilgrimage tours, luxury road trips, family holidays,
              and corporate travel packages with premium hotels, transportation
              and curated sightseeing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/destinations"
                className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-cyan-400"
              >
                View All Destinations
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200"
              >
                Contact Travel Experts
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">
              {filteredPackages.length} Packages Available
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Find your next adventure
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
              {activeCategory ?? "All Categories"}
            </span>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
              {activeState ?? "All States"}
            </span>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
              {sort === "price-low"
                ? "Price: Low to High"
                : sort === "price-high"
                ? "Price: High to Low"
                : "Default Sort"}
            </span>
          </div>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Search</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">
              {query ? `Searching for "${query}"` : "Search tour packages"}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Category</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/packages?category=${encodeURIComponent(category)}`}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    category === activeCategory
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">State</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {states.map((state) => (
                <Link
                  key={state}
                  href={`/packages?state=${encodeURIComponent(state)}`}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    state === activeState
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {state}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {filteredPackages.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
            <h2 className="text-3xl font-bold text-slate-900">
              No packages found
            </h2>
            <p className="mt-4 text-slate-600">
              Try a different category, state, or search term.
            </p>
            <Link
              href="/packages"
              className="mt-8 inline-block rounded-full bg-cyan-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
            >
              Reset Filters
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}