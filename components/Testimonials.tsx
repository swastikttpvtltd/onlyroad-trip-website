"use client";

import { Star, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  { name: "Rahul Sharma", location: "Delhi", tour: "Kedarnath Road Trip", review: "Excellent arrangements from start to finish. Hotels, transport and support were outstanding. Highly recommended." },
  { name: "Priya Verma", location: "Jaipur", tour: "Kashmir Tour", review: "Everything was perfectly managed. The itinerary was well planned and the team was available whenever we needed help." },
  { name: "Amit Singh", location: "Gurugram", tour: "Spiti Valley Expedition", review: "One of the best road trip experiences we've ever had. Professional drivers, premium hotels and amazing support." },
  { name: "Ananya Reddy", location: "Hyderabad", tour: "Leh Ladakh Expedition", review: "The entire journey was perfectly organized. Our family loved every destination and the hotels exceeded our expectations." },
  { name: "Arjun Nair", location: "Kochi", tour: "Himachal Road Trip", review: "Professional team, comfortable vehicle and an unforgettable experience. Definitely booking again." },
  { name: "Sneha Menon", location: "Bengaluru", tour: "Kedarnath & Badrinath", review: "The pilgrimage was stress-free because everything was managed so well. Highly satisfied with the service." },
  { name: "Karthik Subramanian", location: "Chennai", tour: "Kashmir Premium Tour", review: "From airport pickup to hotel stays, everything was seamless. Truly a premium travel experience." },
  { name: "Meera Krishnan", location: "Coimbatore", tour: "Golden Triangle Tour", review: "Excellent customer service and prompt support throughout our trip. We will recommend Only Road Trip to friends." },
  { name: "Suresh Kumar", location: "Mysuru", tour: "Varanasi & Ayodhya", review: "Clean hotels, polite drivers and excellent planning. Every detail was taken care of." },
  { name: "Vignesh Raj", location: "Madurai", tour: "Rajasthan Heritage Tour", review: "One of the most memorable holidays our family has had. Worth every penny." },
  { name: "Ritika Das", location: "Kolkata", tour: "North East Explorer", review: "Beautiful itinerary with excellent hotels and transportation. The support team was available whenever required." },
  { name: "Harpreet Singh", location: "Chandigarh", tour: "Manali Road Trip", review: "Smooth booking process, transparent pricing and an amazing overall experience. Looking forward to the next trip." },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-7 text-center">
          <span className="rounded-full bg-cyan-100 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-700">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
            What Our Travelers Say
          </h2>
          <p className="mx-auto mt-2 max-w-3xl text-sm text-gray-600 md:text-base">
            Thousands of happy travelers trust Only Road Trip for unforgettable journeys across India.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={18}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="h-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Quote className="mb-3 text-cyan-600" size={28} />

                <div className="mb-3 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={15} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="min-h-[108px] text-sm leading-6 text-gray-600">&quot;{item.review}&quot;</p>

                <div className="mt-5 border-t border-gray-200 pt-4">
                  <h3 className="text-base font-bold text-gray-900">{item.name}</h3>
                  <p className="text-xs text-gray-500">📍 {item.location}</p>
                  <p className="mt-1.5 text-xs font-semibold text-cyan-600">{item.tour}</p>
                  <div className="mt-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-semibold text-green-700">
                    ✓ Verified Traveller
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
