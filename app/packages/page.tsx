export const dynamic = "force-dynamic";
import Link from "next/link";
import type { Metadata } from "next";
import PackageCard from "@/components/PackageCard";
import { packages } from "@/data/packages";
import type { Package } from "@/data/packagesTypes";

type SearchParams = { q?: string; category?: string; state?: string; theme?: string; sort?: "price-low" | "price-high"; minPrice?: string; maxPrice?: string; duration?: string };
type RawPackage = Record<string, any>;

function normalizePackage(pkg: RawPackage): Package & { themes: string[]; rawSearch: string } {
  const gallery = Array.isArray(pkg.gallery) ? pkg.gallery.map((item: any) => typeof item === "string" ? item : item?.image ?? "/images/package-placeholder.jpg") : [];
  const themes = Array.isArray(pkg.themes) ? pkg.themes.map(String) : [];
  const highlights = Array.isArray(pkg.highlights) ? pkg.highlights : [];
  return {
    id: typeof pkg.id === "number" ? pkg.id : Number(String(pkg.id || "").replace(/\D/g, "")) || 0,
    slug: pkg.slug ?? "", title: pkg.title ?? "Tour Package", destination: pkg.destination ?? "", state: pkg.state ?? "", category: pkg.category ?? "Tour",
    image: pkg.image ?? pkg.hero?.image ?? gallery[0] ?? "/images/package-placeholder.jpg", gallery, duration: pkg.duration ?? "", price: typeof pkg.price === "number" ? pkg.price : 0,
    rating: typeof pkg.rating === "number" ? pkg.rating : 4.5, reviews: typeof pkg.reviews === "number" ? pkg.reviews : 0, overview: pkg.overview ?? "", highlights,
    itinerary: Array.isArray(pkg.itinerary) ? pkg.itinerary.map((day: any, index: number) => ({ day: typeof day.day === "number" ? day.day : Number(String(day.day || "").replace(/\D/g, "")) || index + 1, title: day.title ?? `Day ${index + 1}`, description: [Array.isArray(day.morning) ? `Morning: ${day.morning.join(", ")}` : "", Array.isArray(day.afternoon) ? `Afternoon: ${day.afternoon.join(", ")}` : "", Array.isArray(day.evening) ? `Evening: ${day.evening.join(", ")}` : ""].filter(Boolean).join(" ") })) : [],
    hotels: Array.isArray(pkg.hotels) ? pkg.hotels.map((hotel: any) => ({ name: hotel.name ?? "Hotel", category: hotel.category ?? "Standard" })) : [],
    meals: Array.isArray(pkg.meals) ? pkg.meals : [], inclusions: Array.isArray(pkg.inclusions) ? pkg.inclusions : [], exclusions: Array.isArray(pkg.exclusions) ? pkg.exclusions : [],
    bestTime: pkg.bestTime ?? "", groupSize: pkg.groupSize ?? "", difficulty: pkg.difficulty ?? "", themes,
    rawSearch: [pkg.title, pkg.destination, pkg.state, pkg.category, pkg.overview, ...themes, ...highlights].filter(Boolean).join(" ").toLowerCase(),
  };
}

const packageList = packages.map(normalizePackage);
const states = [...new Set(packageList.map((p) => p.state).filter(Boolean))].sort();
const categories = [...new Set(packageList.map((p) => p.category).filter(Boolean))].sort();
const suggestions = [...new Set(packageList.flatMap((p) => [p.title, p.state, p.destination, p.category, ...p.themes].flatMap((value) => String(value || "").split(/[•,|/]/).map((part) => part.trim()).filter(Boolean))))].sort((a, b) => a.localeCompare(b));

export const metadata: Metadata = {
  title: "Tour Packages | Only Road Trip",
  description: "Explore premium India tour packages, pilgrimage tours, road trips and curated travel experiences at Only Road Trip.",
  alternates: { canonical: "https://www.onlyroadtrip.com/packages" }, robots: { index: true, follow: true },
};

const aliases: Record<string, string[]> = {
  spiritual: ["spiritual", "pilgrimage", "temple", "dham", "jyotirlinga", "yatra"], pilgrimage: ["pilgrimage", "spiritual", "temple", "dham", "jyotirlinga", "yatra"],
  trekking: ["trek", "trekking", "tungnath", "chopta", "madhyameshwar"], adventure: ["adventure", "trek", "bike", "safari", "water sports", "road trip"],
  women: ["women", "woman", "ladies", "female"], senior: ["senior", "pilgrimage", "spiritual", "easy"], honeymoon: ["honeymoon", "romantic", "couple"], family: ["family"],
  wildlife: ["wildlife", "safari", "national park", "tiger", "gir", "corbett", "kaziranga"], beach: ["beach", "island", "goa", "andaman", "lakshadweep", "kovalam"],
  heritage: ["heritage", "culture", "fort", "palace", "hampi", "ajanta", "ellora"], hill: ["hill", "mountain", "manali", "shimla", "mussoorie", "nainital", "munnar", "darjeeling", "ooty", "kodaikanal"],
  weekend: ["weekend", "short break", "2 nights", "3 days"], road: ["road trip", "bike", "manali", "ladakh"], corporate: ["corporate", "mice", "offsite", "incentive", "team"],
  nature: ["nature", "valley", "lake", "backwater", "forest", "mountain"], luxury: ["luxury", "premium", "honeymoon", "romantic", "grand", "heritage"],
};
const themeOptions = [["spiritual", "Spiritual & Pilgrimage"], ["family", "Family"], ["honeymoon", "Honeymoon & Couple"], ["adventure", "Adventure"], ["wildlife", "Wildlife"], ["beach", "Beach & Islands"], ["heritage", "Heritage & Culture"], ["hill", "Hills & Mountains"], ["road", "Road Trips"], ["corporate", "Corporate"]];
const durationOptions = [["1-3", "1–3 Days"], ["4-6", "4–6 Days"], ["7+", "7+ Days"]];
function durationMatches(duration: string, filter: string) { const numbers = duration.match(/\d+/g)?.map(Number) ?? []; const days = numbers.length ? Math.max(...numbers) + (duration.toLowerCase().includes("night") ? 1 : 0) : 0; if (filter === "1-3") return days > 0 && days <= 3; if (filter === "4-6") return days >= 4 && days <= 6; return days >= 7; }

export default async function PackagesPage({ searchParams }: { searchParams: Promise<SearchParams> | SearchParams }) {
  const sp = await Promise.resolve(searchParams); const query = sp?.q?.trim().toLowerCase() ?? ""; const activeCategory = sp?.category; const activeState = sp?.state; const activeTheme = sp?.theme; const sort = sp?.sort; const minPrice = Number(sp?.minPrice || 0); const maxPrice = Number(sp?.maxPrice || 0); const duration = sp?.duration;
  let filteredPackages = packageList;
  if (query) filteredPackages = filteredPackages.filter((p) => p.rawSearch.includes(query));
  if (activeCategory) filteredPackages = filteredPackages.filter((p) => p.category === activeCategory);
  if (activeState) filteredPackages = filteredPackages.filter((p) => p.state === activeState);
  if (activeTheme) { const terms = aliases[activeTheme.toLowerCase()] ?? [activeTheme.toLowerCase()]; filteredPackages = filteredPackages.filter((p) => terms.some((term) => p.rawSearch.includes(term))); }
  if (minPrice > 0) filteredPackages = filteredPackages.filter((p) => p.price >= minPrice);
  if (maxPrice > 0) filteredPackages = filteredPackages.filter((p) => p.price <= maxPrice);
  if (duration) filteredPackages = filteredPackages.filter((p) => durationMatches(p.duration, duration));
  if (sort === "price-low") filteredPackages = [...filteredPackages].sort((a, b) => a.price - b.price);
  if (sort === "price-high") filteredPackages = [...filteredPackages].sort((a, b) => b.price - a.price);
  const hasFilters = Boolean(query || activeCategory || activeState || activeTheme || duration || minPrice || maxPrice || sort);

  return <main className="min-h-screen bg-slate-50">
    <section className="bg-gradient-to-br from-[#0f172a] via-[#172554] to-[#1e3a8a] pb-14 pt-32 text-white"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="max-w-3xl space-y-4"><p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Only Road Trip Experiences</p><h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">{activeTheme ? `${activeTheme} Tour Experiences` : "Discover the best holiday packages across India"}</h1><p className="text-lg leading-8 text-slate-200">{activeTheme ? `Explore our ${activeTheme.toLowerCase()} journeys and choose the package that fits your travel style.` : "Choose journeys by travel style — spiritual, adventure, family, honeymoon, wildlife, beach, heritage, corporate and more."}</p></div></div></section>
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10"><div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">{filteredPackages.length} Packages Available</p><h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">{activeTheme ? `${activeTheme} Packages` : "All Tour Packages"}</h2></div>{hasFilters && <Link href="/packages" className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-600 hover:text-blue-700">Clear All Filters</Link>}</div>
      <div className="grid gap-8 lg:grid-cols-[270px_minmax(0,1fr)]"><aside className="h-fit lg:sticky lg:top-24"><details className="group rounded-3xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] lg:open" open><summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 lg:cursor-default [&::-webkit-details-marker]:hidden"><span className="text-base font-bold text-slate-900">Filter Your Trip</span><span className="text-xs font-semibold uppercase tracking-wider text-blue-700 lg:hidden">Open</span></summary>
        <form action="/packages" method="get" className="space-y-6 border-t border-slate-100 px-5 pb-6 pt-5"><div><label htmlFor="package-search" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">Search</label><input suppressHydrationWarning id="package-search" name="q" list="package-search-options" defaultValue={sp?.q ?? ""} placeholder="Package, destination or state" autoComplete="off" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100" /><datalist id="package-search-options">{suggestions.map((item) => <option key={item} value={item} />)}</datalist><p className="mt-2 text-[11px] text-slate-400">Type “V” and choose Varanasi or another matching destination.</p></div>
          <div><label htmlFor="filter-state" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">State / Region</label><select suppressHydrationWarning id="filter-state" name="state" defaultValue={activeState ?? ""} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-800 outline-none focus:border-blue-600 focus:bg-white"><option value="">All States</option>{states.map((state) => <option key={state} value={state}>{state}</option>)}</select></div>
          <div><label htmlFor="filter-category" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">Package Type</label><select suppressHydrationWarning id="filter-category" name="category" defaultValue={activeCategory ?? ""} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-800 outline-none focus:border-blue-600 focus:bg-white"><option value="">All Package Types</option>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select></div>
          <div><p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">Duration</p><div className="space-y-2.5">{durationOptions.map(([value, label]) => <label key={value} className="flex cursor-pointer items-center gap-3 text-sm text-slate-700"><input suppressHydrationWarning type="radio" name="duration" value={value} defaultChecked={duration === value} className="h-4 w-4 accent-blue-700" />{label}</label>)}</div></div>
          <div><p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">Budget (₹)</p><div className="grid grid-cols-2 gap-2"><input suppressHydrationWarning name="minPrice" inputMode="numeric" defaultValue={sp?.minPrice ?? ""} placeholder="Min" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:bg-white" /><input suppressHydrationWarning name="maxPrice" inputMode="numeric" defaultValue={sp?.maxPrice ?? ""} placeholder="Max" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:bg-white" /></div></div>
          <div><p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">Travel Style</p><div className="grid gap-2.5">{themeOptions.map(([value, label]) => <label key={value} className="flex cursor-pointer items-center gap-3 text-sm text-slate-700"><input suppressHydrationWarning type="radio" name="theme" value={value} defaultChecked={activeTheme === value} className="h-4 w-4 accent-blue-700" />{label}</label>)}</div></div>
          <div><label htmlFor="filter-sort" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">Sort By</label><select suppressHydrationWarning id="filter-sort" name="sort" defaultValue={sort ?? ""} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-800 outline-none focus:border-blue-600 focus:bg-white"><option value="">Recommended</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option></select></div>
          <button type="submit" className="w-full rounded-xl bg-blue-800 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-900">Apply Filters</button><Link href="/packages" className="block text-center text-xs font-semibold text-slate-500 hover:text-blue-700">Reset all filters</Link>
        </form></details></aside>
        <div className="min-w-0">{filteredPackages.length > 0 ? <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{filteredPackages.map((pkg) => <PackageCard key={pkg.slug} pkg={pkg} />)}</div> : <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm"><h2 className="text-3xl font-bold text-slate-900">No matching packages yet</h2><p className="mt-4 text-slate-600">Try changing your filters or explore all available journeys.</p><Link href="/packages" className="mt-8 inline-block rounded-full bg-blue-800 px-8 py-3 text-sm font-semibold text-white">View All Packages</Link></div>}</div>
      </div></section>
  </main>;
}
