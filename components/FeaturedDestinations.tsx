import Link from "next/link";
import { MapPin, Star, Heart, Clock3, ArrowRight } from "lucide-react";
import { packages } from "@/data/packages";

export default function FeaturedDestinations() {
  const featuredPackages = packages
    .filter((pkg) => pkg.image && pkg.image !== "/images/package-placeholder.jpg")
    .slice(0, 6);

  return (
    <section className="bg-white py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-7 text-center md:mb-8">
          <span className="inline-flex rounded-full bg-cyan-100 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-700">
            Explore India
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Featured Packages
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
            Handpicked journeys from our latest travel packages.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredPackages.map((pkg) => (
            <article
              key={pkg.slug}
              className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_7px_25px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(15,23,42,0.13)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/50" />

                <span className="absolute left-3 top-3 rounded-full bg-cyan-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">
                  {pkg.category}
                </span>

                <button
                  type="button"
                  aria-label={`Add ${pkg.title} to wishlist`}
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-lg backdrop-blur transition hover:scale-105"
                >
                  <Heart size={18} />
                </button>

                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-lg">
                  <Star size={14} fill="currentColor" className="text-amber-500" />
                  <span className="text-xs font-bold text-slate-900">{pkg.rating}</span>
                  <span className="text-[11px] text-slate-500">({pkg.reviews})</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="line-clamp-2 min-h-[46px] text-[18px] font-bold leading-[1.25] text-slate-900 transition-colors group-hover:text-cyan-700">
                  {pkg.title}
                </h3>

                <div className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-slate-500">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-cyan-600" />
                  <span className="line-clamp-1">{pkg.destination}, {pkg.state}</span>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1.5">
                    <Clock3 size={13} className="text-cyan-600" />
                    {pkg.duration}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1.5">
                    {pkg.groupSize}
                  </span>
                </div>

                <div className="mt-4 flex items-end justify-between gap-3 border-t border-slate-100 pt-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      Starting From
                    </p>
                    <p className="mt-0.5 text-xl font-extrabold text-[#0B3D91]">
                      ₹{pkg.price.toLocaleString("en-IN")}
                    </p>
                    <p className="text-[10px] text-slate-400">Per Person</p>
                  </div>

                  <Link
                    href={`/packages/${pkg.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#0B3D91] px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-blue-900"
                  >
                    View Details
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-7 text-center">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-cyan-500 hover:text-cyan-700"
          >
            View All Packages
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
