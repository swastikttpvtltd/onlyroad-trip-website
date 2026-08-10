import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Heart,
  MapPin,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import type { Package } from "@/data/packagesTypes";

interface Props {
  pkg: Package;
}

export default function PackageCard({ pkg }: Props) {
  return (
    <article className="group overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.10)] transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-300 hover:shadow-[0_18px_45px_rgba(15,23,42,0.16)]">
      {/* Fixed square media frame keeps every package card visually consistent. */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-200">
        <img
          src={pkg.image || "/images/placeholder.jpg"}
          alt={pkg.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Premium bottom fade for readable badges without hiding the photo. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/65" />

        <div className="absolute left-4 top-4">
          <span className="inline-flex rounded-full bg-cyan-600 px-4 py-2 text-[13px] font-bold uppercase tracking-wide text-white shadow-lg shadow-cyan-900/15">
            {pkg.category}
          </span>
        </div>

        <button
          type="button"
          aria-label="Add to Wishlist"
          className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white"
        >
          <Heart className="h-6 w-6 stroke-[1.8]" />
        </button>

        <div className="absolute bottom-5 left-4 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-xl">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-bold text-slate-900">{pkg.rating}</span>
          <span className="text-sm text-slate-500">({pkg.reviews})</span>
        </div>

        <div className="absolute bottom-5 right-4 flex items-center gap-1.5 rounded-full bg-amber-500 px-4 py-2.5 text-sm font-bold text-white shadow-xl">
          <Sparkles className="h-4 w-4" />
          Bestseller
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div>
          <h3 className="line-clamp-2 min-h-[58px] text-[23px] font-bold leading-[1.18] text-slate-950 transition-colors duration-300 group-hover:text-cyan-700">
            {pkg.title}
          </h3>

          <div className="mt-3 flex items-start gap-2 text-[15px] leading-6 text-slate-600">
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-cyan-600" />
            <span className="line-clamp-2">
              {pkg.destination}, {pkg.state}
            </span>
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
            {pkg.overview}
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-2">
            <Clock3 className="h-4 w-4 text-cyan-600" />
            <span className="text-sm font-medium text-slate-700">{pkg.duration}</span>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-2">
            <Users className="h-4 w-4 text-cyan-600" />
            <span className="text-sm font-medium text-slate-700">{pkg.groupSize}</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4.5">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Starting From</p>

          <div className="mt-1.5 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-[27px] font-extrabold leading-none text-cyan-700">
                ₹{pkg.price.toLocaleString("en-IN")}
              </h2>
              <p className="mt-1 text-xs text-slate-500">Per Person</p>
            </div>

            <Link
              href={`/packages/${pkg.slug}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-cyan-600/20 transition-all duration-300 hover:bg-cyan-700 hover:shadow-lg"
            >
              View Details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
