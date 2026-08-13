import Link from "next/link";

export const metadata = {
  title: "Payment Cancelled | Only Road Trip",
  description: "Your payment was cancelled. Return to Only Road Trip to try again.",
};

export default function PaymentCancelledPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 text-slate-900 md:px-6">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
        <section className="w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
          <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-6 py-10 text-center text-white md:px-10 md:py-14">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-amber-300/40 bg-amber-400/10 text-4xl font-bold shadow-lg">!</div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">Only Road Trip</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">Payment Cancelled</h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
              Your payment was cancelled or was not completed. The booking is not confirmed from this payment attempt.
            </p>
          </div>

          <div className="px-6 py-8 md:px-10 md:py-10">
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <h2 className="text-lg font-bold">What you can do now</h2>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                <li>• Check your internet connection and payment details.</li>
                <li>• Return to your tour package and try again.</li>
                <li>• If you need help, contact the Only Road Trip team.</li>
              </ul>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link href="/book" className="rounded-xl bg-blue-700 px-5 py-3.5 text-center text-sm font-bold text-white shadow-lg transition hover:bg-blue-800">
                Back to Booking
              </Link>
              <Link href="/contact" className="rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-center text-sm font-bold text-slate-800 transition hover:bg-slate-50">
                Contact Our Team
              </Link>
            </div>

            <p className="mt-7 text-center text-xs leading-5 text-slate-500">
              Only Road Trip is the travel brand of Swastik Tour And Travels Private Limited.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
