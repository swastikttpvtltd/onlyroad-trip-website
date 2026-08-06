import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#071325] text-white">

      {/* Background Glow */}

      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-32 h-80 w-80 rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-14">

        {/* Top Grid */}

        <div className="grid gap-8 lg:grid-cols-4">

          {/* Company */}

          <div>

            <Image
              src="/images/logo/only-road-trip-logo.jpeg"
              alt="Only Road Trip"
              width={220}
              height={60}
              className="h-14 w-auto"
            />

            <p className="mt-5 text-sm leading-6 text-gray-300">
              Only Road Trip is the flagship travel brand of{" "}
              <span className="font-semibold text-white">
                Swastik Tour And Travels Private Limited
              </span>.
              We deliver premium holidays, customized road trips,
              hotel bookings, flight reservations, pilgrimage tours
              and corporate travel across India.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-5 text-xl font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-300">

              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/packages">Packages</Link></li>
              <li><Link href="/destinations">Destinations</Link></li>
              <li><Link href="/contact">Contact</Link></li>

            </ul>

          </div>

          {/* Services */}

          <div>

            <h3 className="mb-5 text-xl font-semibold">
              Services
            </h3>

            <ul className="space-y-3 text-gray-300">

              <li>Domestic Tours</li>
              <li>International Tours</li>
              <li>Hotel Booking</li>
              <li>Flight Booking</li>
              <li>Corporate Travel</li>
              <li>Visa Assistance</li>

            </ul>

          </div>

          {/* Why Choose */}

          <div>

            <h3 className="mb-5 text-xl font-semibold">
              Why Choose Us
            </h3>

            <div className="space-y-3">

              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-cyan-400" />
                <span className="text-gray-300">Trusted Travel Partner</span>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-cyan-400" />
                <span className="text-gray-300">Best Price Guarantee</span>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-cyan-400" />
                <span className="text-gray-300">24×7 Customer Support</span>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-cyan-400" />
                <span className="text-gray-300">Secure Online Booking</span>
              </div>

            </div>

          </div>

        </div>
                {/* ================= Contact ================= */}

        <div className="mt-12 border-t border-white/10 pt-10">

          <h3 className="mb-8 text-center text-2xl font-semibold">
            Contact Information
          </h3>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {/* Address */}

            <div className="flex gap-3">

              <MapPin className="mt-1 h-5 w-5 text-cyan-400" />

              <div>

                <p className="font-semibold">
                  Registered Office
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  F163, Phase-1
                  <br />
                  New Palam Vihar
                  <br />
                  Gurugram, Haryana 122001
                </p>

              </div>

            </div>

            {/* Phone */}

            <div className="flex gap-3">

              <Phone className="mt-1 h-5 w-5 text-cyan-400" />

              <div>

                <p className="font-semibold">
                  Call Us
                </p>

                <a
                  href="tel:+919211796168"
                  className="text-sm text-gray-300 hover:text-cyan-400"
                >
                  +91 92117 96168
                </a>

              </div>

            </div>

            {/* Email */}

            <div className="flex gap-3">

              <Mail className="mt-1 h-5 w-5 text-cyan-400" />

              <div>

                <p className="font-semibold">
                  Email
                </p>

                <a
                  href="mailto:info@onlyroadtrip.com"
                  className="text-sm text-gray-300 hover:text-cyan-400"
                >
                  info@onlyroadtrip.com
                </a>

              </div>

            </div>

            {/* Office Hours */}

            <div className="flex gap-3">

              <Clock className="mt-1 h-5 w-5 text-cyan-400" />

              <div>

                <p className="font-semibold">
                  Office Hours
                </p>

                <p className="text-sm text-gray-300">
                  Mon – Sat
                  <br />
                  10:00 AM – 7:00 PM
                </p>

              </div>

            </div>

          </div>

        </div>
                {/* ================= Legal ================= */}

        <div className="mt-12 border-t border-white/10 pt-8">

          <div className="flex flex-wrap justify-center gap-5 text-sm text-gray-400">

            <Link href="/privacy-policy" className="hover:text-cyan-400">
              Privacy Policy
            </Link>

            <Link href="/terms-and-conditions" className="hover:text-cyan-400">
              Terms & Conditions
            </Link>

            <Link href="/refund-policy" className="hover:text-cyan-400">
              Refund Policy
            </Link>

            <Link href="/cancellation-policy" className="hover:text-cyan-400">
              Cancellation Policy
            </Link>

            <Link href="/booking-policy" className="hover:text-cyan-400">
              Booking Policy
            </Link>

            <Link href="/cookie-policy" className="hover:text-cyan-400">
              Cookie Policy
            </Link>

          </div>

        </div>

        {/* ================= Registrations ================= */}

        <div className="mt-8 flex flex-wrap justify-center gap-3">

          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            MCA Registered
          </span>

          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            DPIIT Startup
          </span>

          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            NIDHI+
          </span>

          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            GeM Registered
          </span>

        </div>

        {/* ================= Secure Payments ================= */}

        <div className="mt-10 border-t border-white/10 pt-8 text-center">

          <h3 className="text-lg font-semibold">
            🔒 Secure Payments
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            We accept all major payment methods
          </p>

<div className="flex items-center justify-center gap-3">
  <Image
    src="/images/payments/visa.svg"
      alt="visa"
  width={32}
  height={20}
  style={{
    width: "32px",
    height: "20px",
    objectFit: "contain",
  }}
/>

  <Image
  src="/images/payments/mastercard.svg"
  alt="Mastercard"
  width={32}
  height={20}
  style={{
    width: "32px",
    height: "20px",
    objectFit: "contain",
  }}
/>

  <Image
    src="/images/payments/amex.svg"
     alt="American Express"
  width={32}
  height={20}
  style={{
    width: "32px",
    height: "20px",
    objectFit: "contain",
  }}
/>

  <Image
    src="/images/payments/upi.svg"
      alt="Mastercard"
  width={32}
  height={20}
  style={{
    width: "32px",
    height: "20px",
    objectFit: "contain",
  }}
/>
</div>

          <p className="mt-5 text-sm text-gray-400">
            SSL Secured • Safe Payments • Trusted Travel Partner
          </p>

        </div>

        {/* ================= Bottom ================= */}

        <div className="mt-10 border-t border-white/10 pt-8">

          <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">

            <div className="text-center lg:text-left">

              <p className="font-semibold">
                © 2026 Only Road Trip. All Rights Reserved.
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Operated by Swastik Tour And Travels Private Limited
              </p>

            </div>

            <div className="text-center text-sm text-gray-400 lg:text-right">

              <p>CIN: U52291HR2025PTC132225</p>

              <p className="mt-1">
                D-U-N-S®: 771608667
              </p>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}