import Image from "next/image";
import { MapPin, Star, Heart } from "lucide-react";
import { destinations } from "@/data/destinations";

export default function FeaturedDestinations() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Popular Destinations
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Discover India's most loved travel destinations.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                <button className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-lg">
                  <Heart size={18} />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">{item.name}</h3>

                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={18} fill="currentColor" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 text-gray-500">
                  <MapPin size={18} />
                  {item.location}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Starting From</p>

                    <p className="text-2xl font-bold text-[#0B3D91]">
                      {item.price}
                    </p>
                  </div>

                  <button className="rounded-xl bg-[#0B3D91] px-5 py-3 font-semibold text-white transition hover:bg-blue-900">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}