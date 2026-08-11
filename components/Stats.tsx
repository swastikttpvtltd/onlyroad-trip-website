import { Users, MapPin, Headset, Star } from "lucide-react";
import { stats } from "@/data/stats";

const icons = [
  <Users size={28} />,
  <MapPin size={28} />,
  <Headset size={28} />,
  <Star size={28} />,
];

export default function Stats() {
  return (
    <section className="relative z-10 bg-white pt-20 pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <div key={item.id} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-800 text-white transition-transform duration-300 group-hover:scale-105">{icons[index]}</div>
              <h3 className="text-4xl font-extrabold tracking-tight text-blue-800">{item.value}</h3>
              <p className="mt-2 text-base font-medium text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
