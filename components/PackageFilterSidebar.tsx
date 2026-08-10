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
      <form onSubmit={applyFilters} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-7 py-6">
          <h3 className="text-2xl font-bold text-slate-900">Filter Your Trip</h3>
        </div>

        <div className="space-y-7 px-7 py-7">
          <div>
            <label htmlFor="package-search" className="mb-3 block text-sm font-bold uppercase tracking-wider text-slate-500">Search</label>
            <input
              id="package-search"
              list="package-suggestions"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Package, destination or state"
              autoComplete="off"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
            />
            <datalist id="package-suggestions">
              {suggestions.map((item) => <option key={item} value={item} />)}
            </datalist>
            <p className="mt-2 text-xs text-slate-400">Type “V” to see matching destinations such as Varanasi.</p>
          </div>

          <div>
            <label htmlFor="package-state" className="mb-3 block text-sm font-bold uppercase tracking-wider text-slate-500">State / Region</label>
            <select id="package-state" value={state} onChange={(e) => setState(e.target.value)} className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base text-slate-800 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10">
              <option value="">All States & Regions</option>
              {states.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="package-category" className="mb-3 block text-sm font-bold uppercase tracking-wider text-slate-500">Package Type</label>
            <select id="package-category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base text-slate-800 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10">
              <option value="">All Package Types</option>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="package-sort" className="mb-3 block text-sm font-bold uppercase tracking-wider text-slate-500">Sort By</label>
            <select id="package-sort" value={sort} onChange={(e) => setSort(e.target.value)} className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base text-slate-800 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10">
              <option value="">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button type="submit" className="rounded-2xl bg-cyan-600 px-4 py-3 font-semibold text-white transition hover:bg-cyan-700">Apply Filters</button>
            <button type="button" onClick={resetFilters} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">Reset</button>
          </div>
        </div>
      </form>
    </aside>
  );
}
