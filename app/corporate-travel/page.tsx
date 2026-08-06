import Link from "next/link";
import {
  BriefcaseBusiness,
  Building2,
  Plane,
  Hotel,
  Bus,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function CorporateTravelPage() {
  const services = [
    {
      icon: Plane,
      title: "Corporate Flight Booking",
      description:
        "Best available domestic and international airfares with flexible corporate booking options.",
    },
    {
      icon: Hotel,
      title: "Hotel Reservations",
      description:
        "Premium hotels across India with negotiated corporate rates.",
    },
    {
      icon: Bus,
      title: "Ground Transportation",
      description:
        "Luxury cars, SUVs, Tempo Travellers and coaches for business travel.",
    },
    {
      icon: Users,
      title: "MICE Services",
      description:
        "Meetings, Incentives, Conferences and Events managed professionally.",
    },
    {
      icon: Building2,
      title: "Corporate Tours",
      description:
        "Employee outings, dealer meets, reward trips and team-building experiences.",
    },
    {
      icon: BriefcaseBusiness,
      title: "Dedicated Travel Manager",
      description:
        "One point of contact for all your corporate travel requirements.",
    },
  ];

  return (
    <main className="bg-slate-950 text-white">

      {/* Hero */}
      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-slate-950 to-slate-950 opacity-90" />

        <div className="relative mx-auto max-w-7xl px-6 py-28">

          <div className="max-w-3xl">

            <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold">
              ONLY ROAD TRIP • CORPORATE TRAVEL
            </span>

            <h1 className="mt-8 text-5xl font-bold leading-tight lg:text-7xl">
              Business Travel,
              <br />
              Simplified.
            </h1>

            <p className="mt-8 text-xl leading-9 text-slate-300">
              From executive travel and corporate hotel bookings to conferences,
              employee offsites and business events, we deliver seamless travel
              solutions across India.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <Link
                href="/contact"
                className="rounded-full bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
              >
                Request Proposal
              </Link>

              <Link
                href="/contact"
                className="rounded-full border border-white/20 px-8 py-4 font-semibold hover:bg-white hover:text-black transition"
              >
                Speak to Expert
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* Services */}

      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <span className="rounded-full bg-blue-900 px-4 py-2 text-sm font-semibold text-blue-300">
              OUR SERVICES
            </span>

            <h2 className="mt-6 text-4xl font-bold">
              Complete Corporate Travel Solutions
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
              Everything your business needs under one roof.
            </p>

          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {services.map((service, index) => {
              const Icon = service.icon;

              return (

                <div
                  key={index}
                  className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:border-blue-500 hover:-translate-y-2"
                >

                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">

                    <Icon size={30} />

                  </div>

                  <h3 className="text-2xl font-bold">
                    {service.title}
                  </h3>

                  <p className="mt-4 leading-8 text-slate-400">
                    {service.description}
                  </p>

                </div>

              );
            })}

          </div>

        </div>

      </section>

      {/* Why Choose */}

      <section className="bg-slate-900 py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-16 lg:grid-cols-2 items-center">

            <div>

              <span className="rounded-full bg-blue-800 px-4 py-2 text-sm">
                WHY CHOOSE US
              </span>

              <h2 className="mt-6 text-4xl font-bold">
                Trusted Corporate Travel Partner
              </h2>

              <p className="mt-6 text-lg leading-9 text-slate-400">
                We help businesses save time, reduce travel costs and provide a
                hassle-free experience through dedicated account management and
                premium travel support.
              </p>

            </div>

            <div className="space-y-6">

              {[
                "Dedicated Corporate Relationship Manager",
                "Customized Billing & GST Invoices",
                "PAN India Hotel Network",
                "24×7 Emergency Travel Support",
                "Luxury & Budget Options",
                "Fast Booking & Quick Confirmations",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-5"
                >

                  <CheckCircle className="text-green-400" />

                  <span>{item}</span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-24">

        <div className="mx-auto max-w-5xl rounded-[40px] bg-gradient-to-r from-blue-700 to-cyan-600 p-14 text-center">

          <h2 className="text-4xl font-bold">
            Ready to Simplify Your Corporate Travel?
          </h2>

          <p className="mt-5 text-lg">
            Let Only Road Trip manage your business travel while you focus on
            growing your company.
          </p>

          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-slate-900 transition hover:scale-105"
          >
            Get Corporate Quote
            <ArrowRight size={20} />
          </Link>

        </div>

      </section>

    </main>
  );
}