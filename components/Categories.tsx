import Link from "next/link";
import { Landmark, Trees, Gem, Briefcase, CarFront, Users, ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";

const icons = { Landmark, Trees, Gem, Briefcase, CarFront, Users };

export default function Categories() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="rounded-full bg-cyan-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">
            Travel Categories
          </span>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Find Your Perfect Journey
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
            From spiritual pilgrimages to luxury holidays, discover travel experiences crafted especially for you.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => {
            const Icon = icons[category.icon as keyof typeof icons];
            return (
              <div
                key={category.id}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.11)]"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0B3D91] to-cyan-600 text-white transition duration-300 group-hover:scale-105">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{category.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{category.description}</p>
                <Link
                  href={`/packages?theme=${encodeURIComponent(category.theme)}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition group-hover:gap-3"
                >
                  Explore <ArrowRight size={17} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}