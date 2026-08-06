import {
  Plane,
  Hotel,
  Bus,
  Building2,
  Map,
  Mountain,
  Briefcase,
  BadgeCheck,
} from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Flight Booking",
    description:
      "Domestic and international flight reservations with competitive fares.",
  },
  {
    icon: Hotel,
    title: "Hotel Booking",
    description:
      "Premium hotels, resorts and homestays across India and abroad.",
  },
  {
    icon: Bus,
    title: "Road Trips",
    description:
      "Comfortable road trips with professional drivers and well-maintained vehicles.",
  },
  {
    icon: Building2,
    title: "Corporate Travel",
    description:
      "Complete business travel management for companies and organizations.",
  },
  {
    icon: Map,
    title: "Customized Tours",
    description:
      "Personalized itineraries designed around your travel preferences.",
  },
  {
    icon: BadgeCheck,
    title: "Visa Assistance",
    description:
      "Guidance and support for visa applications and travel documentation.",
  },
  {
    icon: Mountain,
    title: "Pilgrimage Tours",
    description:
      "Well-planned spiritual and religious journeys across India.",
  },
  {
    icon: Briefcase,
    title: "Group Travel",
    description:
      "School, college, corporate and family group travel solutions.",
  },
];

export default function OurServices() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full bg-cyan-100 px-5 py-2 text-sm font-semibold text-cyan-700">
            OUR SERVICES
          </span>

          <h2 className="mt-6 text-5xl font-bold text-slate-900">
            Complete Travel Solutions
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
            From planning to booking and support, we provide end-to-end travel
            services for leisure, corporate and pilgrimage journeys.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="rounded-3xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100">
                  <Icon className="h-8 w-8 text-cyan-700" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}