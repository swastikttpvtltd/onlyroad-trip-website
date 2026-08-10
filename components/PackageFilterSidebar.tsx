"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type FilterPackage = {
  title?: string;
  destination?: string;
  state?: string;
  category?: string;
  themes?: string[];
};

type Props = { packages: FilterPackage[] };

export default function PackageFilterSidebar({ packages }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [state, setState] = useState(searchParams.get("state") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [sort, setSort] = useState(searchParams.get("sort") ?? "");

  const suggestions = useMemo(() => {
    const values = new Set<string>();
    for (const pkg of packages) {
      [pkg.title, pkg.destination, pkg.state, pkg.category, ...(pkg.themes ?? [])].forEach((value) => {
        if (!value) return;
        value.split(/[•,|/]/).map((part) => part.trim()).filter(Boolean).forEach((part) => values.add(part));
      });
    }
    return [...values].sort((a, b) => a.localeCompare(b));
  }, [packages]);

  const states = useMemo(() => [...new Set(packages.map((p) => p.state).filter(Boolean) as string[])].sort(), [packages]);
  const categories = useMemo(() => [...new Set(packages.map((p) => p.category).filter(Boolean) as string[])].sort(), [packages]);

  function applyFilters(event: React.FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (state) params.set("state", state);
    if (category) params.set("category", category);
    if (sort) params.set("sort", sort);
    router.push(`${pathname}?${params.toString()}`);
  }

  function resetFilters() {
    setQuery("");
    setState("");
    setCategory("");
    setSort("");
    router.push(pathname);
  }

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <form onSubmit={applyFilters} className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-slate-50 via-white to-cyan-50/60 px-6 py-6">
          <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-100/60 blur-2xl" />
          <div className="relative">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-600">Plan Your Journey</p>
            <h3 className="text-[22px] font-bold tracking-tight text-slate-900">Filter Your Trip</h3>
            <p className="mt-1 text-xs text-slate-500">Find the right experience in seconds.</p>
          </div>
        </div>

        <div className="space-y-6 px-6 py-6">
          <div>
            <label htmlFor="package-search" className="mb-2.5 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-500">Search</label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cyan-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </span>
              <input
                id="package-search"
                list="package-suggestions"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Package, destination or state"
                autoComplete="off"
                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-[15px] font-medium text-slate-900 placeholder:text-slate-400 outline-none transition duration-200 hover:border-slate-300 hover:bg-white focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
              />
            </div>
            <p className="mt-2 text-[11px] text-slate-400">Type a letter like <span className="font-bold text-slate-500">V</span> for Varanasi and other matches.</p>
            <datalist id="package-suggestions">
              {suggestions.map((item) => <option key={item} value={item} />)}
            </datalist>
          </div>

          <div>
            <label htmlFor="package-state" className="mb-2.5 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-500">State / Region</label>
            <select id="package-state" value={state} onChange={(e) => setState(e.target.value)} className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-800 outline-none transition hover:border-slate-300 hover:bg-white focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10">
              <option value="">All States & Regions</option>
              {states.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="package-category" className="mb-2.5 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-500">Package Type</label>
            <select id="package-category" value={category} onChange={(e) => setCategory(e.target.value)} className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-800 outline-none transition hover:border-slate-300 hover:bg-white focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10">
              <option value="">All Package Types</option>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="package-sort" className="mb-2.5 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-500">Sort By</label>
            <select id="package-sort" value={sort} onChange={(e) => setSort(e.target.value)} className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-800 outline-none transition hover:border-slate-300 hover:bg-white focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10">
              <option value="">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
            <button type="submit" className="rounded-2xl bg-cyan-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-600/15 transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-700 hover:shadow-xl">Apply Filters</button>
            <button type="button" onClick={resetFilters} className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50">Reset</button>
          </div>
        </div>
      </form>
    </aside>
  );
}
