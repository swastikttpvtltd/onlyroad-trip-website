"use client";

import { Star, Quote } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Rahul Sharma",
    location: "Delhi",
    tour: "Kedarnath Road Trip",
    review:
      "Excellent arrangements from start to finish. Hotels, transport and support were outstanding. Highly recommended.",
  },
  {
    name: "Priya Verma",
    location: "Jaipur",
    tour: "Kashmir Tour",
    review:
      "Everything was perfectly managed. The itinerary was well planned and the team was available whenever we needed help.",
  },
  {
    name: "Amit Singh",
    location: "Gurugram",
    tour: "Spiti Valley Expedition",
    review:
      "One of the best road trip experiences we've ever had. Professional drivers, premium hotels and amazing support.",
  },
  {
    name: "Ananya Reddy",
    location: "Hyderabad",
    tour: "Leh Ladakh Expedition",
    review:
      "The entire journey was perfectly organized. Our family loved every destination and the hotels exceeded our expectations.",
  },
  {
    name: "Arjun Nair",
    location: "Kochi",
    tour: "Himachal Road Trip",
    review:
      "Professional team, comfortable vehicle and an unforgettable experience. Definitely booking again.",
  },
  {
    name: "Sneha Menon",
    location: "Bengaluru",
    tour: "Kedarnath & Badrinath",
    review:
      "The pilgrimage was stress-free because everything was managed so well. Highly satisfied with the service.",
  },
  {
    name: "Karthik Subramanian",
    location: "Chennai",
    tour: "Kashmir Premium Tour",
    review:
      "From airport pickup to hotel stays, everything was seamless. Truly a premium travel experience.",
  },
  {
    name: "Meera Krishnan",
    location: "Coimbatore",
    tour: "Golden Triangle Tour",
    review:
      "Excellent customer service and prompt support throughout our trip. We will recommend Only Road Trip to friends.",
  },
  {
    name: "Suresh Kumar",
    location: "Mysuru",
    tour: "Varanasi & Ayodhya",
    review:
      "Clean hotels, polite drivers and excellent planning. Every detail was taken care of.",
  },
  {
    name: "Vignesh Raj",
    location: "Madurai",
    tour: "Rajasthan Heritage Tour",
    review:
      "One of the most memorable holidays our family has had. Worth every penny.",
  },
  {
    name: "Ritika Das",
    location: "Kolkata",
    tour: "North East Explorer",
    review:
      "Beautiful itinerary with excellent hotels and transportation. The support team was available whenever required.",
  },
  {
    name: "Harpreet Singh",
    location: "Chandigarh",
    tour: "Manali Road Trip",
    review:
      "Smooth booking process, transparent pricing and an amazing overall experience. Looking forward to the next trip.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">

          <span className="rounded-full bg-cyan-100 px-5 py-2 text-sm font-semibold text-cyan-700">
            TESTIMONIALS
          </span>

          <h2 className="mt-6 text-5xl font-bold text-gray-900">
            What Our Travelers Say
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
            Thousands of happy travelers trust Only Road Trip for unforgettable journeys across India.
          </p>

        </div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-16"
        >
                      {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="h-full rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

                <Quote className="mb-5 text-cyan-600" size={38} />

                <div className="mb-5 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="min-h-[140px] leading-7 text-gray-600">
                  "{item.review}"
                </p>

                <div className="mt-8 border-t border-gray-200 pt-5">
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    📍 {item.location}
                  </p>

                  <p className="mt-2 text-sm font-semibold text-cyan-600">
                    {item.tour}
                  </p>

                  <div className="mt-3 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
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