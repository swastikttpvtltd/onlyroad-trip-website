import type { Metadata } from "next";
import { groupTourTerms } from "@/components/package/GroupTourTerms";
export const metadata: Metadata = { title: "Traveller Terms & Conditions | Only Road Trip", description: "Group tour booking terms, traveller conduct, women and solo traveller safety, payments and support.", alternates: { canonical: "https://onlyroadtrip.com/traveller-terms-and-conditions" } };

export default function TravellerTermsPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero Section */}

      <section className="border-b border-slate-200 bg-white pt-40 pb-16">

        <div className="mx-auto max-w-6xl px-6 lg:px-10">

          <div className="text-center">

            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold tracking-wide text-blue-700">
              LEGAL INFORMATION
            </span>

            <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-slate-900 lg:text-6xl">
              Traveller Terms &amp; Conditions
            </h1>

            <p className="mt-6 text-xl font-semibold text-blue-700">
              Swastik Tour And Travels Private Limited
            </p>

            <p className="mt-2 text-lg text-slate-600">
              Operating Brand:
              <span className="font-semibold text-slate-900">
                {" "}ONLY ROAD TRIP
              </span>
            </p>

          </div>

          <div className="mt-12 grid gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm md:grid-cols-2 lg:grid-cols-4">

            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                CIN
              </p>
              <p className="mt-2 font-semibold text-slate-900">
                U52291HR2025PTC132225
              </p>
            </div>

            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                GSTIN
              </p>
              <p className="mt-2 font-semibold text-slate-900">
                06ABQCS2844G1Z2
              </p>
            </div>

            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                Effective Date
              </p>
              <p className="mt-2 font-semibold text-slate-900">
                20 July, 2026
              </p>
            </div>

            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                Last Updated
              </p>
              <p className="mt-2 font-semibold text-slate-900">
                1 October, 2026
              </p>
            </div>

          </div>

        </div>

      </section>

      <section className="py-20"><div className="mx-auto max-w-6xl px-6 lg:px-10"><div className="space-y-16">
      {groupTourTerms.map(([title, text], index) => <section key={title}><h2 className="text-3xl font-bold text-blue-700">{index + 1}. {title}</h2><p className="mt-6 text-lg leading-8 text-slate-700">{text}</p></section>)}
            <section className="rounded-3xl border border-blue-100 bg-blue-50 p-10">

              <h2 className="text-3xl font-bold text-blue-700">
                Contact Us
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-700">
                For questions about these Traveller Terms &amp; Conditions or assistance with your booking, please contact us:
              </p>

              <div className="mt-8 space-y-3 text-lg leading-8 text-slate-700">

                <p>
                  <strong>Swastik Tour And Travels Private Limited</strong>
                </p>

                <p>
                  Brand: <strong>Only Road Trip</strong>
                </p>

                <p>
                  Email: info@onlyroadtrip.com
                </p>

                <p>
                  Website: www.onlyroadtrip.com
                </p>

                <p>
                  Registered Office: Gurugram, Haryana, India
                </p>

              </div>

            </section>

      </div></div></section>
    </main>
  );
}
