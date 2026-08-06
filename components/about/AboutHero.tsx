import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative h-[90vh] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/about/about-hero.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-900/50" />

      {/* Content */}
      <div className="relative mx-auto flex h-full max-w-7xl items-center px-6">
        <div className="max-w-3xl">

          <span className="rounded-full bg-cyan-500/20 px-5 py-2 text-sm font-semibold tracking-wide text-cyan-300 backdrop-blur">
            ABOUT ONLY ROAD TRIP
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight text-white lg:text-7xl">
            Creating
            <span className="text-cyan-400"> Unforgettable </span>
            Journeys Across India
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            Only Road Trip, operated by Swastik Tour And Travels Private
            Limited, delivers premium road trips, spiritual journeys,
            family holidays, corporate travel and customized experiences
            across India with comfort, safety and transparency.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <Link
              href="/packages"
              className="rounded-full bg-cyan-500 px-8 py-4 font-semibold text-white transition hover:bg-cyan-600"
            >
              Explore Packages
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-slate-900"
            >
              Contact Us
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}