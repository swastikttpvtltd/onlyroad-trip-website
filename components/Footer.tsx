import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#071325] text-white">
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-32 h-80 w-80 rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-4">
          <div>
            <Image src="/images/logo/only-road-trip-logo.jpeg" alt="Only Road Trip" width={220} height={60} className="h-12 w-auto" />
            <p className="mt-3 text-xs leading-5 text-gray-300">
              Only Road Trip is the flagship travel brand of{" "}
              <span className="font-semibold text-white">Swastik Tour And Travels Private Limited</span>.
              We deliver premium holidays, customized road trips, hotel bookings, flight reservations,
              pilgrimage tours and corporate travel across India.
            </p>
            <div className="mt-5">
              <h3 className="mb-3 text-sm font-semibold">Follow Only Road Trip</h3>
              <div className="flex flex-wrap gap-2">
                <a href="https://www.instagram.com/onlyroadtrip.official" target="_blank" rel="noopener noreferrer" aria-label="Only Road Trip on Instagram" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-200 transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.1 2A3.7 3.7 0 0 0 4 7.7v8.6A3.7 3.7 0 0 0 7.7 20h8.6a3.7 3.7 0 0 0 3.7-3.7V7.7A3.7 3.7 0 0 0 16.3 4H7.7Zm8.9 1.5a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>
                  Instagram
                </a>
                <a href="https://www.facebook.com/profile.php?id=61587958079412" target="_blank" rel="noopener noreferrer" aria-label="Only Road Trip on Facebook" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-200 transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true"><path d="M13.5 22v-8h2.8l.4-3h-3.2V9.1c0-.9.3-1.5 1.6-1.5h1.7V4.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H7.3v3h2.8v8h3.4Z"/></svg>
                  Facebook
                </a>
                <a href="https://www.linkedin.com/company/only-road-trip/" target="_blank" rel="noopener noreferrer" aria-label="Only Road Trip on LinkedIn" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-200 transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true"><path d="M5.2 3.8A2.2 2.2 0 1 1 5.2 8a2.2 2.2 0 0 1 0-4.2ZM3.4 9.5h3.6V21H3.4V9.5Zm5.8 0h3.5v1.6h.1c.5-.9 1.7-1.9 3.6-1.9 3.8 0 4.5 2.5 4.5 5.8V21h-3.6v-5.3c0-1.3 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V21H9.2V9.5Z"/></svg>
                  LinkedIn
                </a>
                <a href="https://in.pinterest.com/onlyroadtrip/" target="_blank" rel="noopener noreferrer" aria-label="Only Road Trip on Pinterest" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-200 transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.7 19.3c-.1-1.6 0-3.4.4-4.9l1.2-5.1s-.3-.7-.3-1.7c0-1.6.9-2.8 2-2.8.9 0 1.4.7 1.4 1.6 0 1-.6 2.4-.9 3.7-.3 1.1.6 2 1.7 2 2.1 0 3.5-2.2 3.5-5.3 0-2.8-2-4.8-5-4.8-3.4 0-5.4 2.5-5.4 5.1 0 1 .4 2 .9 2.6.1.1.1.2.1.4l-.3 1.2c-.1.4-.4.5-.7.3-1.4-.6-2.2-2.5-2.2-4 0-3.3 2.4-7.9 8.7-7.9 4.6 0 7.7 3.3 7.7 6.8 0 4.7-2.6 8.2-6.4 8.2-1.3 0-2.6-.7-3-1.5l-.8 3.1c-.3 1.1-1 2.5-1.5 3.4A10 10 0 1 0 12 2Z"/></svg>
                  Pinterest
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-base font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/packages">Packages</Link></li>
              <li><Link href="/destinations">Destinations</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/packages?theme=spiritual">Pilgrimage Tours</Link></li>
              <li><Link href="/packages?theme=wildlife">Wildlife Safaris</Link></li>
              <li><Link href="/packages?theme=women">Women Special</Link></li>
              <li><Link href="/packages?theme=corporate">Corporate Travel</Link></li>
              <li><Link href="/packages?theme=family">Family Vacations</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-base font-semibold">Services</h3>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>Domestic Tours</li>
              <li>International Tours</li>
              <li>Hotel Booking</li>
              <li>Flight Booking</li>
              <li>Corporate Travel</li>
              <li>Visa Assistance</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-base font-semibold">Why Choose Us</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-cyan-400" /><span className="text-xs text-gray-300">Trusted Travel Partner</span></div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-cyan-400" /><span className="text-xs text-gray-300">Best Price Guarantee</span></div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-cyan-400" /><span className="text-xs text-gray-300">24×7 Customer Support</span></div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-cyan-400" /><span className="text-xs text-gray-300">Secure Online Booking</span></div>
            </div>
          </div>
        </div>

        <div className="mt-7 border-t border-white/10 pt-6">
          <h3 className="mb-5 text-center text-lg font-semibold">Contact Information</h3>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" /><div><p className="text-xs font-semibold">Registered Office</p><p className="mt-1 text-xs leading-5 text-gray-400">F163, Phase-1<br />New Palam Vihar<br />Gurugram, Haryana 122001</p></div></div>
            <div className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" /><div><p className="text-xs font-semibold">Call Us</p><a href="tel:+919211796168" className="text-xs text-gray-300 hover:text-cyan-400">+91 92117 96168</a></div></div>
            <div className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" /><div><p className="text-xs font-semibold">Email</p><a href="mailto:info@onlyroadtrip.com" className="text-xs text-gray-300 hover:text-cyan-400">info@onlyroadtrip.com</a></div></div>
            <div className="flex gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" /><div><p className="text-xs font-semibold">Office Hours</p><p className="text-xs leading-5 text-gray-300">Mon – Sat<br />10:00 AM – 7:00 PM</p></div></div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-5">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-gray-400">
            <Link href="/privacy-policy" className="hover:text-cyan-400">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-cyan-400">Terms & Conditions</Link>
            <Link href="/refund-policy" className="hover:text-cyan-400">Refund Policy</Link>
            <Link href="/cancellation-policy" className="hover:text-cyan-400">Cancellation Policy</Link>
            <Link href="/booking-policy" className="hover:text-cyan-400">Booking Policy</Link>
            <Link href="/cookie-policy" className="hover:text-cyan-400">Cookie Policy</Link>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">MCA Registered</span>
          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">DPIIT Startup</span>
          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">NIDHI+</span>
          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">GeM Registered</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300" title="Copyright protection notice">
            <ShieldCheck className="h-3.5 w-3.5" />
            DMCA • Copyright Protection
          </span>
        </div>

        <div className="mt-6 border-t border-white/10 pt-5 text-center">
          <h3 className="text-base font-semibold">🔒 Secure Payments</h3>
          <p className="mt-1 text-xs text-gray-400">We accept all major payment methods</p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <Image src="/images/payments/visa.svg" alt="Visa" width={32} height={20} className="h-5 w-8 object-contain" />
            <Image src="/images/payments/mastercard.svg" alt="Mastercard" width={32} height={20} className="h-5 w-8 object-contain" />
            <Image src="/images/payments/amex.svg" alt="American Express" width={32} height={20} className="h-5 w-8 object-contain" />
            <Image src="/images/payments/upi.svg" alt="UPI" width={32} height={20} className="h-5 w-8 object-contain" />
          </div>
          <p className="mt-2 text-xs text-gray-400">SSL Secured • Safe Payments • Trusted Travel Partner</p>
        </div>

        <div className="mt-6 border-t border-white/10 pt-5">
          <div className="flex flex-col items-center justify-between gap-3 lg:flex-row">
            <div className="text-center lg:text-left">
              <p className="text-xs font-semibold">© 2026 Only Road Trip. All Rights Reserved.</p>
              <p className="mt-1 text-xs text-gray-400">Operated by Swastik Tour And Travels Private Limited</p>
            </div>
            <div className="text-center text-xs text-gray-400 lg:text-right">
              <p>CIN: U52291HR2025PTC132225</p>
              <p className="mt-1">D-U-N-S®: 771608667</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
