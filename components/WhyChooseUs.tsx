import { ShieldCheck, BadgeCheck, HeartHandshake, Headphones, Bus, Star } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "Trusted Travel Partner", description: "Safe, reliable and professionally managed road trips across India." },
  { icon: BadgeCheck, title: "Verified Hotels", description: "Hand-picked accommodations with quality and comfort assured." },
  { icon: Bus, title: "Premium Transport", description: "Tempo Travellers, SUVs and luxury coaches with experienced drivers." },
  { icon: HeartHandshake, title: "Personalized Tours", description: "Every itinerary is customized according to your travel style." },
  { icon: Headphones, title: "24×7 Support", description: "Our travel experts are always available before and during your journey." },
  { icon: Star, title: "Best Value", description: "Premium travel experiences at competitive prices without hidden charges." },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-100 py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-7 text-center">
          <span className="rounded-full bg-blue-100 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
            Why Only Road Trip
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Experience Travel The Premium Way
          </h2>
          <p className="mx-auto mt-2 max-w-3xl text-sm leading-6 text-slate-600 md:text-base">
            We don&apos;t just plan trips. We create unforgettable experiences with premium service, carefully designed itineraries and complete travel assistance.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_25px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(15,23,42,0.10)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0B3D91] to-cyan-600 text-white">
                  <Icon size={24} />
                </div>
                <h3 className="mb-1.5 text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
