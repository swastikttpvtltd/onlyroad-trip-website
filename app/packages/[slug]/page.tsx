import BookingForm from "@/components/BookingForm";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { packages } from "@/data/packages";

type PackageItem = (typeof packages)[number];

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getHeroImage(pkg: PackageItem) {
  if ("hero" in pkg && pkg.hero?.image) return pkg.hero.image;
  if ("image" in pkg && typeof pkg.image === "string") return pkg.image;
  return pkg.gallery?.[0]?.image ?? "/images/package-placeholder.jpg";
}

function getHeroShortDescription(pkg: PackageItem) {
  if ("hero" in pkg && pkg.hero?.shortDescription) return pkg.hero.shortDescription;
  return pkg.overview;
}

function getNumericField(pkg: PackageItem, key: "price" | "rating" | "reviews") {
  if (key in pkg && typeof pkg[key] === "number") return pkg[key];
  return undefined;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = packages.find((item) => item.slug === slug);

  if (!pkg) {
    return {
      title: "Package Not Found | Only Road Trip",
      description: "Discover premium tour packages from Only Road Trip.",
      robots: "noindex",
    };
  }

  const heroImage = getHeroImage(pkg);
  return {
    title: `${pkg.title} | Only Road Trip`,
    description: pkg.overview,
    alternates: { canonical: `https://www.onlyroadtrip.com/packages/${slug}` },
    openGraph: {
      title: `${pkg.title} | Only Road Trip`,
      description: pkg.overview,
      url: `https://www.onlyroadtrip.com/packages/${slug}`,
      type: "website",
      images: [{ url: heroImage, width: 1200, height: 630, alt: pkg.title }],
    },
  };
}

export default async function PackageDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = packages.find((item) => item.slug === slug);

  if (!pkg) notFound();

  const heroImage = getHeroImage(pkg);
  const heroDescription = getHeroShortDescription(pkg);
  const price = getNumericField(pkg, "price");
  const rating = getNumericField(pkg, "rating");
  const reviews = getNumericField(pkg, "reviews");

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative h-[420px] w-full overflow-hidden">
        <Image src={heroImage} alt={pkg.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            <Link href="/destinations" className="inline-block rounded-full bg-white/20 px-4 py-2 text-sm text-white backdrop-blur">← Back to Packages</Link>
            <h1 className="mt-6 text-4xl font-bold text-white md:text-5xl">{pkg.title}</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-200">{heroDescription}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium">📍 {pkg.destination}</span>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium">⏳ {pkg.duration}</span>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium">⭐ {rating ?? "N/A"}</span>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium">👥 {pkg.groupSize}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-6 text-3xl font-bold">Tour Highlights</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {pkg.highlights.map((item) => <div key={item} className="rounded-xl border bg-white p-4 shadow-sm">✅ {item}</div>)}
          </div>

          <div className="mt-12">
            <h2 className="mb-6 text-3xl font-bold">Gallery</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pkg.gallery.map((item, index) => (
                <div key={`${item.image}-${index}`} className="relative h-56 overflow-hidden rounded-xl">
                  <Image src={item.image} alt={item.alt ?? `${pkg.title} ${index + 1}`} fill className="object-cover transition duration-300 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <h2 className="mb-6 text-3xl font-bold">Day Wise Itinerary</h2>
            <div className="space-y-5">
              {pkg.itinerary.map((day) => (
                <div key={day.day} className="rounded-xl border bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold">{day.day}: {day.title}</h3>
                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    {(["morning", "afternoon", "evening"] as const).map((period) => (
                      <div key={period}>
                        <h4 className="font-semibold capitalize text-gray-900">{period}</h4>
                        <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-600">
                          {day[period].map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-5 text-2xl font-bold text-green-700">What's Included</h2>
              <div className="space-y-3">{pkg.inclusions.map((item) => <div key={item} className="rounded-lg border border-green-200 bg-green-50 p-4">✅ {item}</div>)}</div>
            </div>
            <div>
              <h2 className="mb-5 text-2xl font-bold text-red-700">What's Excluded</h2>
              <div className="space-y-3">{pkg.exclusions.map((item) => <div key={item} className="rounded-lg border border-red-200 bg-red-50 p-4">❌ {item}</div>)}</div>
            </div>
          </div>
        </div>

        <aside className="h-fit lg:sticky lg:top-24">
          <div className="rounded-2xl border bg-white p-6 shadow-lg">
            <p className="text-gray-500">Starting From</p>
            <h2 className="mt-2 text-4xl font-bold text-blue-600">{price ? `₹${price.toLocaleString("en-IN")}` : "Price on request"}</h2>
            <p className="mt-2 text-gray-500">Per Person</p>
            <div className="mt-8 space-y-4">
              <a href={`https://wa.me/919211796168?text=${encodeURIComponent(`Hi, I want to book the ${pkg.title}`)}`} target="_blank" rel="noopener noreferrer" className="block w-full rounded-xl bg-green-600 py-4 text-center font-semibold text-white">WhatsApp Book Now</a>
              <a href="tel:+919211796168" className="block w-full rounded-xl bg-blue-600 py-4 text-center font-semibold text-white">Call Now</a>
              <Link href="/contact" className="block w-full rounded-xl border py-4 text-center font-semibold">Send Enquiry</Link>
            </div>
            <div className="mt-8 rounded-xl bg-gray-100 p-5">
              <h3 className="font-semibold">Package Details</h3>
              <div className="mt-4 space-y-2 text-sm">
                <p>📍 {pkg.destination}</p><p>⏳ {pkg.duration}</p><p>⭐ {rating ?? "N/A"}{reviews ? ` (${reviews} Reviews)` : ""}</p><p>👥 {pkg.groupSize}</p><p>🌤️ {pkg.bestTime}</p>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20"><BookingForm /></section>
    </main>
  );
}
