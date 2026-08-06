import {
  ShieldCheck,
  BadgeCheck,
  HeartHandshake,
  Headphones,
  Bus,
  Star,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Travel Partner",
    description:
      "Safe, reliable and professionally managed road trips across India.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Hotels",
    description:
      "Hand-picked accommodations with quality and comfort assured.",
  },
  {
    icon: Bus,
    title: "Premium Transport",
    description:
      "Tempo Travellers, SUVs and luxury coaches with experienced drivers.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Tours",
    description:
      "Every itinerary is customized according to your travel style.",
  },
  {
    icon: Headphones,
    title: "24×7 Support",
    description:
      "Our travel experts are always available before and during your journey.",
  },
  {
    icon: Star,
    title: "Best Value",
    description:
      "Premium travel experiences at competitive prices without hidden charges.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-100 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center mb-14">

          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            WHY ONLY ROAD TRIP
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Experience Travel The Premium Way
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">
            We don't just plan trips. We create unforgettable experiences with
            premium service, carefully designed itineraries and complete travel
            assistance.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <Icon size={32} />
                </div>

                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}