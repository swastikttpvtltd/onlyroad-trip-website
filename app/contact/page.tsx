import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Only Road Trip",
  description:
    "Contact Only Road Trip for premium tour bookings, custom travel packages, pilgrimage tours, corporate travel and family holidays.",
  keywords: [
    "contact Only Road Trip",
    "travel enquiries",
    "tour booking",
    "holiday packages",
    "corporate travel",
  ],
  alternates: {
    canonical: "https://www.onlyroadtrip.com/contact",
  },
  openGraph: {
    title: "Contact | Only Road Trip",
    description:
      "Contact Only Road Trip for premium tour bookings, custom travel packages, pilgrimage tours, corporate travel and family holidays.",
    url: "https://www.onlyroadtrip.com/contact",
    siteName: "Only Road Trip",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Only Road Trip",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Only Road Trip",
    description:
      "Contact Only Road Trip for premium tour bookings, custom travel packages, pilgrimage tours, corporate travel and family holidays.",
    images: ["/og-image.jpg"],
  },
};<section className="bg-linear-to-r from-cyan-700 via-blue-700 to-indigo-700 py-20 text-white"></section>
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero Section */}

      <section className="bg-gradient-to-r from-cyan-700 via-blue-700 to-indigo-700 py-20 text-white">

        <div className="mx-auto max-w-7xl px-6 text-center">

          <h1 className="text-5xl font-extrabold">
            Contact Only Road Trip
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-cyan-100">
            We'd love to help you plan your next unforgettable journey.
            Whether you're looking for a family vacation, pilgrimage,
            honeymoon, corporate tour or a customized holiday package,
            our travel experts are here to assist you.
          </p>

        </div>

      </section>

      {/* Main Content */}

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2">

        {/* Contact Form */}

        <div className="rounded-3xl bg-white p-8 shadow-xl">

          <h2 className="text-3xl font-bold text-slate-900">
            Send an Enquiry
          </h2>

          <p className="mt-3 text-base leading-7 text-slate-600">
            Fill in your details and one of our travel experts
            will contact you shortly.
          </p>

          <form className="mt-8 space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded-xl border border-gray-300 bg-white p-4 text-slate-900 placeholder:text-slate-500 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-200"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-xl border border-gray-300 bg-white p-4 text-slate-900 placeholder:text-slate-500 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-200"
            />

            <input
              type="tel"
              placeholder="Mobile Number"
              className="w-full rounded-xl border border-gray-300 bg-white p-4 text-slate-900 placeholder:text-slate-500 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-200"
            />

                        <textarea
              rows={5}
              placeholder="How can we help you?"
              className="w-full rounded-xl border border-gray-300 bg-white p-4 text-slate-900 placeholder:text-slate-500 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-200"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-cyan-600 py-4 text-lg font-bold text-white transition hover:bg-cyan-700"
            >
              Send Message
            </button>

          </form>

        </div>

        {/* Contact Details */}

        <div className="space-y-6">

          <div className="rounded-3xl bg-white p-8 shadow-xl">

            <h2 className="text-3xl font-bold text-slate-900">
              Get In Touch
            </h2>

            <p className="mt-3 text-base leading-7 text-slate-600">
              Our travel consultants are happy to assist you with
              domestic tours, international holidays, corporate travel,
              pilgrimage tours, hotel bookings, flights and customized
              travel packages.
            </p>

            <div className="mt-8 space-y-7">

              {/* Phone */}

              <div className="flex items-start gap-4">

                <Phone className="mt-1 text-cyan-600" />

                <div>

                  <p className="font-semibold text-slate-900">
                    Phone
                  </p>

                  <a
                    href="tel:+919211796168"
                    className="text-slate-700 transition hover:text-cyan-600"
                  >
                    +91 92117 96168
                  </a>

                </div>

              </div>

              {/* Email */}

              <div className="flex items-start gap-4">

                <Mail className="mt-1 text-cyan-600" />

                <div>

                  <p className="font-semibold text-slate-900">
                    Email
                  </p>

                  <a
                    href="mailto:info@onlyroadtrip.com"
                    className="text-slate-700 transition hover:text-cyan-600 hover:underline"
                  >
                    info@onlyroadtrip.com
                  </a>

                </div>

              </div>
                            {/* Office Address */}

              <div className="flex items-start gap-4">

                <MapPin className="mt-1 text-cyan-600" />

                <div>

                  <p className="font-semibold text-slate-900">
                    Office Address
                  </p>

                  <p className="leading-7 text-slate-700">
                    F163, PH-1,
                    <br />
                    New Palam Vihar,
                    <br />
                    Gurugram,
                    Haryana,
                    <br />
                    India - 122001
                  </p>

                </div>

              </div>

              {/* Business Hours */}

              <div className="flex items-start gap-4">

                <Clock className="mt-1 text-cyan-600" />

                <div>

                  <p className="font-semibold text-slate-900">
                    Business Hours
                  </p>

                  <p className="text-slate-700">
                    Monday – Saturday
                  </p>

                  <p className="text-slate-700">
                    10:00 AM – 8:00 PM
                  </p>

                  <p className="text-sm text-slate-500">
                    Sunday: By Appointment Only
                  </p>

                </div>

              </div>

            </div>

            {/* Action Buttons */}

            <div className="mt-10 grid gap-4 sm:grid-cols-2">

              <a
                href="https://wa.me/919211796168"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-4 font-semibold text-white transition hover:bg-green-700"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>

              <a
                href="tel:+919211796168"
                className="flex items-center justify-center rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700"
              >
                Call Now
              </a>

            </div>
                        <div className="mt-6">

              <Link
                href="/"
                className="block rounded-xl border border-gray-300 py-4 text-center font-semibold text-slate-700 transition hover:bg-gray-100"
              >
                Back to Home
              </Link>

            </div>

          </div>

          {/* Google Map */}

          <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

            <iframe
              title="Only Road Trip Office Location"
              src="https://www.google.com/maps?q=F163%20PH-1%20New%20Palam%20Vihar%20Gurugram%20Haryana%20122001&output=embed"
              width="100%"
              height="400"
              loading="lazy"
              className="border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />

          </div>

        </div>

      </section>

    </main>
  );
}