import { Users, MapPin, Headset, Star } from "lucide-react";
import { stats } from "@/data/stats";

const icons = [
  <Users size={32} />,
  <MapPin size={32} />,
  <Headset size={32} />,
  <Star size={32} />,
];

export default function Stats() {
  return (
    <section className="relative z-10 bg-white pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <div
              key={item.id}
              className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0B3D91] to-cyan-600 text-white transition-transform duration-300 group-hover:scale-110">
                {icons[index]}
              </div>

              <h3 className="text-5xl font-extrabold text-[#0B3D91]">
                {item.value}
              </h3>

              <p className="mt-3 text-lg font-medium text-gray-600">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}