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
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-2xl">
      <div className="relative h-72 overflow-hidden">
        <img
          src={pkg.image || "/images/placeholder.jpg"}
          alt={pkg.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-cyan-600 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow">
            {pkg.category}
          </span>
        </div>

        <button
          type="button"
          aria-label="Add to Wishlist"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:scale-110"
        >
          <Heart className="h-5 w-5 text-slate-700" />
        </button>

        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 shadow-lg backdrop-blur">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-slate-900">{pkg.rating}</span>
          <span className="text-sm text-slate-500">({pkg.reviews})</span>
        </div>

        <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-amber-500 px-3 py-2 text-xs font-bold text-white shadow-lg">
          <Sparkles className="h-4 w-4" />
          Bestseller
        </div>
      </div>

      <div className="space-y-5 p-6">
        <div>
          <h3 className="line-clamp-2 text-2xl font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-cyan-700">
            {pkg.title}
          </h3>

          <div className="mt-3 flex items-center gap-2 text-slate-600">
            <MapPin className="h-4 w-4 text-cyan-600" />
            <span>{pkg.destination}, {pkg.state}</span>
          </div>

          <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">
            {pkg.overview}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
            <Clock3 className="h-4 w-4 text-cyan-600" />
            <span className="text-sm">{pkg.duration}</span>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
            <Users className="h-4 w-4 text-cyan-600" />
            <span className="text-sm">{pkg.groupSize}</span>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Starting From</p>

          <div className="mt-2 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-cyan-700">
                ₹{pkg.price.toLocaleString("en-IN")}
              </h2>
              <p className="text-sm text-slate-500">Per Person</p>
            </div>

            <Link
              href={`/packages/${pkg.slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-cyan-700"
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
