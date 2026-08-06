import Link from "next/link";
import PackageCard from "@/components/PackageCard";
import { packages } from "@/data/packages";
import type { Metadata } from "next";
import type { Package } from "@/data/packagesTypes";

type SearchParams = {
  destination?: string;
  category?: string;
  state?: string;
  sort?: string;
};

function isCompletePackage(pkg: unknown): pkg is Package {
  return (
    typeof pkg === "object" &&
    pkg !== null &&
    "id" in pkg &&
    typeof (pkg as any).id === "number" &&
    "slug" in pkg &&
    typeof (pkg as any).slug === "string" &&
    "title" in pkg &&
    typeof (pkg as any).title === "string" &&
    "destination" in pkg &&
    typeof (pkg as any).destination === "string" &&
    "state" in pkg &&
    typeof (pkg as any).state === "string" &&
    "category" in pkg &&
    typeof (pkg as any).category === "string" &&
    "image" in pkg &&
    typeof (pkg as any).image === "string" &&
    "duration" in pkg &&
    typeof (pkg as any).duration === "string" &&
    "price" in pkg &&
    typeof (pkg as any).price === "number" &&
    "rating" in pkg &&
    typeof (pkg as any).rating === "number" &&
    "reviews" in pkg &&
    typeof (pkg as any).reviews === "number" &&
    "overview" in pkg &&
    typeof (pkg as any).overview === "string" &&
    Array.isArray((pkg as any).highlights) &&
    Array.isArray((pkg as any).itinerary) &&
    Array.isArray((pkg as any).hotels) &&
    Array.isArray((pkg as any).meals) &&
    Array.isArray((pkg as any).inclusions) &&
    Array.isArray((pkg as any).exclusions) &&
    "bestTime" in pkg &&
    typeof (pkg as any).bestTime === "string" &&
    "groupSize" in pkg &&
    typeof (pkg as any).groupSize === "string" &&
    "difficulty" in pkg &&
    typeof (pkg as any).difficulty === "string"
  );
}

export const metadata: Metadata = {
  title: "Destinations | Only Road Trip",
  description:
    "Browse our India destinations and find the best pilgrimage tours, luxury road trips, and holiday packages at Only Road Trip.",
  keywords: [
    "India destinations",
    "tour destinations",
    "travel packages",
    "pilgrimage",
    "road trip",
  ],
  alternates: {
    canonical: "https://www.onlyroadtrip.com/destinations",
  },
  openGraph: {
    title: "Destinations | Only Road Trip",
    description:
      "Browse our India destinations and find the best pilgrimage tours, luxury road trips, and holiday packages.",
    url: "https://www.onlyroadtrip.com/destinations",
    siteName: "Only Road Trip",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Only Road Trip Destinations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Destinations | Only Road Trip",
    description:
      "Browse our India destinations and find the best pilgrimage tours, luxury road trips, and holiday packages.",
    images: ["/og-image.jpg"],
  },
};

export default function DestinationsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const destination = searchParams.destination ?? "";
  const category = searchParams.category ?? "";
  const state = searchParams.state ?? "";
  const sort = searchParams.sort ?? "";

  const completePackages = packages.filter(isCompletePackage) as Package[];
  let filteredPackages: Package[] = completePackages;

  if (destination) {
    filteredPackages = filteredPackages.filter((pkg) =>
      pkg.destination.toLowerCase().includes(destination.toLowerCase())
    );
  }

  if (category) {
    filteredPackages = filteredPackages.filter(
      (pkg) => pkg.category === category
    );
  }

  if (state) {
    filteredPackages = filteredPackages.filter((pkg) => pkg.state === state);
  }

  if (sort === "price-low") {
    filteredPackages = [...filteredPackages].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "price-high") {
    filteredPackages = [...filteredPackages].sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-5xl font-bold text-slate-900">
              {destination ? `${destination} Tour Packages` : "All Tour Packages"}
            </h1>

            <p className="mt-3 text-lg text-slate-600">
              {filteredPackages.length} Package
              {filteredPackages.length !== 1 ? "s" : ""} Found
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl border bg-white px-6 py-3 font-semibold shadow-sm transition hover:bg-slate-100"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="mb-10 rounded-2xl bg-white p-6 shadow">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border p-4">
              <p className="text-sm text-gray-500">Destination</p>
              <p className="mt-2 font-semibold">
                {destination || "All Destinations"}
              </p>
            </div>

            <div className="rounded-xl border p-4">
              <p className="text-sm text-gray-500">Category</p>
              <p className="mt-2 font-semibold">
                {category || "All Categories"}
              </p>
            </div>

            <div className="rounded-xl border p-4">
              <p className="text-sm text-gray-500">State</p>
              <p className="mt-2 font-semibold">{state || "All States"}</p>
            </div>

            <div className="rounded-xl border p-4">
              <p className="text-sm text-gray-500">Sort</p>
              <p className="mt-2 font-semibold">{sort || "Default"}</p>
            </div>
          </div>
        </div>

        {filteredPackages.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
            <h2 className="text-3xl font-bold text-slate-800">
              No Packages Found
            </h2>

            <p className="mt-4 text-slate-600">
              We couldn't find any tour packages matching your filters.
            </p>

            <Link
              href="/destinations"
              className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              View All Packages
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}