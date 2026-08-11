import type { Metadata } from "next";
import PlanYourTripClient from "../plan-your-trip/PlanYourTripClient";

export const metadata: Metadata = {
  title: "Contact Only Road Trip | Plan Your Trip & Travel Assistance",
  description: "Contact Only Road Trip and plan your customised domestic holiday, pilgrimage journey, road trip, honeymoon or group travel with our travel team.",
  keywords: [
    "contact Only Road Trip",
    "travel enquiry",
    "tour booking enquiry",
    "travel assistance",
    "travel agency Gurugram",
    "plan your trip",
    "customised tour packages",
  ],
  alternates: { canonical: "https://www.onlyroadtrip.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PlanYourTripClient />

      <section className="bg-white px-6 pb-20 pt-4 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[0.75fr_1.25fr]">
            <div className="flex flex-col justify-center bg-slate-50 p-8 lg:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">Visit Our Office</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">Only Road Trip</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                F163, PH-1,<br />
                New Palam Vihar,<br />
                Gurugram, Haryana,<br />
                India - 122001
              </p>
              <p className="mt-6 text-sm leading-6 text-slate-500">
                Meet our travel team for customised domestic tours, road trips, pilgrimage journeys and travel planning assistance.
              </p>
            </div>

            <div className="min-h-[360px] bg-slate-100 lg:min-h-[430px]">
              <iframe
                title="Only Road Trip office location map"
                src="https://www.google.com/maps?q=F163%2C%20PH-1%2C%20New%20Palam%20Vihar%2C%20Gurugram%2C%20Haryana%20122001&output=embed"
                className="h-full min-h-[360px] w-full border-0 lg:min-h-[430px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
