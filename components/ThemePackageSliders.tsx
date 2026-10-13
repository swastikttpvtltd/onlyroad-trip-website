import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, Heart, MapPin } from "lucide-react";
import type { PackageCardSummary } from "@/lib/packageCardSummary";
import ThemeSliderControls from "./ThemeSliderControls";
import { isGroupTourBookingPaused } from "@/data/groupTourBookingPause";

const sections = [
  { title: "Wildlife", tags: ["wildlife"], href: "/packages?theme=wildlife", description: "Discover India's wild landscapes and unforgettable safaris." },
  { title: "Heritage & Culture", tags: ["heritage", "culture"], href: "/packages?theme=heritage", description: "Explore timeless cities, architecture and local traditions." },
  { title: "Hill Stations", tags: ["hill station", "hill"], href: "/packages?theme=hill", description: "Escape to mountain towns and scenic valleys." },
  { title: "Corporate & MICE", tags: ["corporate", "mice"], href: "/packages?theme=corporate", description: "Team retreats, offsites and business travel experiences." },
  { title: "Pilgrimage", tags: ["pilgrimage", "spiritual"], href: "/packages?theme=pilgrimage", description: "Journeys to Varanasi, Ayodhya, Gujarat and sacred destinations across India." },
  { title: "Adventure", tags: ["adventure"], href: "/packages?theme=adventure", description: "Active journeys and exciting experiences across India." },
  { title: "Rajasthan Trips", state: "rajasthan", href: "/packages?state=Rajasthan", description: "Explore Rajasthan's royal cities, deserts and heritage." },
] as const;

type Tour = PackageCardSummary;

function PackageSlider({ title, description, href, trips, index }: { title: string; description: string; href: string; trips: Tour[]; index: number }) {
  if (!trips.length) return null;

  return <section className={index % 2 ? "bg-slate-50 py-10 md:py-12" : "bg-white py-10 md:py-12"} aria-label={`${title} packages`}>
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div><span className="inline-flex rounded-full bg-blue-100 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-800">Explore India</span><h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">{title}</h2><p className="mt-2 text-sm text-slate-600 md:text-base">{description}</p></div>
        <Link href={href} className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-blue-600 hover:text-blue-800">View All <ArrowRight size={16} /></Link>
      </div>
      <ThemeSliderControls title={title} count={trips.length} index={index}>
          {trips.map((pkg) => <article key={pkg.slug} data-theme-card className="group min-w-0 flex-[0_0_86%] snap-start overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_7px_25px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(15,23,42,0.13)] sm:flex-[0_0_calc((100%-20px)/2)] lg:flex-[0_0_calc((100%-40px)/3)]">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <Image src={pkg.image} alt={pkg.title} fill sizes="(max-width: 640px) 86vw, (max-width: 1024px) 48vw, 33vw" loading="lazy" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/50" />
              <span className="absolute left-3 top-3 rounded-full bg-blue-800 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">{pkg.category}</span>
              <button type="button" aria-label={`Add ${pkg.title} to wishlist`} className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-lg backdrop-blur transition hover:scale-105"><Heart size={18} /></button>
            </div>
            <div className="p-4">
              <h3 className="line-clamp-2 min-h-[46px] text-[18px] font-bold leading-[1.25] text-slate-900 transition-colors group-hover:text-blue-800">{pkg.title}</h3>
              <div className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-slate-500"><MapPin size={14} className="mt-0.5 shrink-0 text-blue-700" /><span className="line-clamp-1">{pkg.destination}, {pkg.state}</span></div>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-600"><span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1.5"><Clock3 size={13} className="text-blue-700" />{pkg.duration}</span><span className="rounded-full bg-slate-100 px-2.5 py-1.5">2–100+ Persons</span></div>
              <div className="mt-4 flex items-end justify-between gap-3 border-t border-slate-100 pt-3">
                <div><p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Price incl. 5% GST</p><p className="mt-0.5 text-xl font-extrabold text-blue-800">₹{pkg.price.toLocaleString("en-IN")}</p><p className="text-[10px] text-slate-400">Per Person • {pkg.displayPriceBasis}</p></div>
                <div className="grid grid-cols-2 gap-2"><Link href={`/packages/${pkg.slug}`} className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-blue-700 px-2 py-2.5 text-xs font-bold text-blue-800 transition hover:bg-blue-50">View Tour</Link>{isGroupTourBookingPaused(pkg.slug) ? <button type="button" disabled title="Online booking is temporarily unavailable" className="inline-flex items-center justify-center rounded-lg bg-slate-300 px-2 py-2.5 text-xs font-bold text-slate-600">Paused</button> : <Link href={`/packages/${pkg.slug}#booking`} className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-blue-800 px-2 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-900">Book Now</Link>}</div>
              </div>
            </div>
          </article>)}
      </ThemeSliderControls>
    </div>
  </section>;
}

export default function ThemePackageSliders({ packages }: { packages: PackageCardSummary[] }) {
  return <>{sections.map((section, index) => {
    const trips = packages.filter((pkg) => pkg.image && pkg.image !== "/images/package-placeholder.jpg" && ("state" in section ? pkg.state?.toLowerCase() === section.state : pkg.themes?.some((theme: string) => section.tags.some((tag: string) => theme.toLowerCase() === tag))));
    return <PackageSlider key={section.title} {...section} trips={trips} index={index} />;
  })}</>;
}
