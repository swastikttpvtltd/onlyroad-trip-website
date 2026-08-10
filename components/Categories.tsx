"use client";

import Link from "next/link";
import { Landmark, Trees, Gem, Briefcase, CarFront, Users, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { categories } from "@/data/categories";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const icons = { Landmark, Trees, Gem, Briefcase, CarFront, Users };

export default function Categories() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-10 md:py-12">
      <div className="mx-auto max-w-[1500px] px-5 lg:px-8">
        <div className="mx-auto mb-6 max-w-3xl text-center">
          <span className="rounded-full bg-cyan-100 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-700">
            Travel Categories
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Find Your Perfect Journey
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 md:text-base">
            From spiritual pilgrimages to luxury holidays, discover travel experiences crafted especially for you.
          </p>
        </div>

        <div className="relative px-8 md:px-10">
          <button
            type="button"
            className="categories-prev absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition hover:scale-105 hover:bg-slate-50"
            aria-label="Previous travel category"
          >
            <ChevronLeft size={20} />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{ prevEl: ".categories-prev", nextEl: ".categories-next" }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            loop={categories.length > 6}
            spaceBetween={16}
            slidesPerView={1.15}
            breakpoints={{
              640: { slidesPerView: 2 },
              900: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
              1450: { slidesPerView: 6 },
            }}
            className="categories-swiper !pb-9"
          >
            {categories.map((category) => {
              const Icon = icons[category.icon as keyof typeof icons];
              return (
                <SwiperSlide key={category.id} className="!h-auto">
                  <div className="group flex h-full min-h-[175px] flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_25px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_14px_35px_rgba(15,23,42,0.10)]">
                    <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0B3D91] to-cyan-600 text-white transition duration-300 group-hover:scale-105">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{category.title}</h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-600">{category.description}</p>
                    <Link
                      href={`/packages?theme=${encodeURIComponent(category.theme)}`}
                      className="mt-auto inline-flex items-center gap-2 pt-3 text-xs font-semibold text-cyan-700 transition group-hover:gap-3"
                    >
                      Explore <ArrowRight size={15} />
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <button
            type="button"
            className="categories-next absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition hover:scale-105 hover:bg-slate-50"
            aria-label="Next travel category"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
