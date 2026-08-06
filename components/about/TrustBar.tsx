import {
  ShieldCheck,
  BadgeCheck,
 Building2,
  Headset,
} from "lucide-react";

const items = [
  {
    icon: Building2,
    title: "MCA Registered",
    desc: "Private Limited Company",
  },
  {
    icon: BadgeCheck,
    title: "D-U-N-S® Verified",
    desc: "Global Business Identity",
  },
  {
    icon: ShieldCheck,
    title: "Secure Booking",
    desc: "Trusted Travel Services",
  },
  {
    icon: Headset,
    title: "24×7 Support",
    desc: "Travel Assistance",
  },
];

export default function TrustBar() {
  return (
    <section className="border-b bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-cyan-300 hover:shadow-lg"
            >
              <div className="rounded-xl bg-cyan-100 p-3">
                <Icon className="h-7 w-7 text-cyan-700" />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}