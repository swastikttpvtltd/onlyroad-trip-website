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
    <article className="group overflow-hidden rounded-[20px] border border-slate-200/80 bg-white shadow-[0_6px_24px_rgba(15,23,42,0.09)] transition-all duration-500 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-[0_14px_34px_rgba(15,23,42,0.14)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
        <img
          src={pkg.image || "/images/placeholder.jpg"}
          alt={pkg.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/60" />

        <div className="absolute left-3 top-3">
          <span className="inline-flex rounded-full bg-cyan-600 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-md shadow-cyan-900/15">
            {pkg.category}
          </span>
        </div>

        <button
          type="button"
          aria-label="Add to Wishlist"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white"
        >
          <Heart className="h-5 w-5 stroke-[1.8]" />
        </button>

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-2 shadow-lg">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-bold text-slate-900">{pkg.rating}</span>
          <span className="text-xs text-slate-500">({pkg.reviews})</span>
        </div>

        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-amber-500 px-3 py-2 text-xs font-bold text-white shadow-lg">
          <Sparkles className="h-3.5 w-3.5" />
          Bestseller
        </div>
      </div>

      <div className="space-y-3.5 p-4">
        <div>
          <h3 className="line-clamp-2 min-h-[48px] text-[19px] font-bold leading-[1.2] text-slate-950 transition-colors duration-300 group-hover:text-cyan-700">
            {pkg.title}
          </h3>

          <div className="mt-2 flex items-start gap-1.5 text-[13px] leading-5 text-slate-600">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-600" />
            <span className="line-clamp-2">
              {pkg.destination}, {pkg.state}
            </span>
          </div>

          <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-slate-500">
            {pkg.overview}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1.5">
            <Clock3 className="h-3.5 w-3.5 text-cyan-600" />
            <span className="text-xs font-medium text-slate-700">{pkg.duration}</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1.5">
            <Users className="h-3.5 w-3.5 text-cyan-600" />
            <span className="text-xs font-medium text-slate-700">{pkg.groupSize}</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">Starting From</p>

          <div className="mt-1 flex items-end justify-between gap-2">
            <div>
              <h2 className="text-[23px] font-extrabold leading-none text-cyan-700">
                ₹{pkg.price.toLocaleString("en-IN")}
              </h2>
              <p className="mt-1 text-[10px] text-slate-500">Per Person</p>
            </div>

            <Link
              href={`/packages/${pkg.slug}`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-cyan-600 px-3 py-2.5 text-xs font-bold text-white shadow-md shadow-cyan-600/20 transition-all duration-300 hover:bg-cyan-700 hover:shadow-lg"
            >
              View Details
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
