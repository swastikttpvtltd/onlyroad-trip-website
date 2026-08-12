import Link from "next/link";
import { ArrowRight } from "lucide-react";

type PageKey = "char-dham" | "kedarnath" | "kashi" | "ayodhya" | "prayagraj" | "circuit";

const pages: Record<PageKey, { title: string; text: string; href: string }> = {
  "char-dham": { title: "Char Dham Yatra Package", text: "Explore a customized Char Dham pilgrimage with transport and stay coordination.", href: "/char-dham-yatra-package" },
  kedarnath: { title: "Kedarnath Yatra Package", text: "Plan a practical Kedarnath journey from Delhi or your preferred departure city.", href: "/kedarnath-yatra-package" },
  kashi: { title: "Kashi Yatra Package", text: "Plan Kashi Vishwanath, Varanasi sightseeing and Ganga Aarti in one itinerary.", href: "/kashi-yatra-package" },
  ayodhya: { title: "Ayodhya Yatra Package", text: "Plan Ram Mandir, Saryu and Ayodhya sightseeing around your travel dates.", href: "/ayodhya-yatra-package" },
  prayagraj: { title: "Prayagraj Yatra Package", text: "Visit Triveni Sangam and important pilgrimage sites with a customized plan.", href: "/prayagraj-yatra-package" },
  circuit: { title: "Kashi Ayodhya Prayagraj Yatra", text: "Combine three major Uttar Pradesh pilgrimage destinations in one spiritual circuit.", href: "/kashi-ayodhya-prayagraj-yatra-package" },
};

const groups: Record<PageKey, PageKey[]> = {
  "char-dham": ["kedarnath", "kashi", "ayodhya", "prayagraj"],
  kedarnath: ["char-dham", "kashi", "ayodhya", "prayagraj"],
  kashi: ["circuit", "ayodhya", "prayagraj", "char-dham", "kedarnath"],
  ayodhya: ["circuit", "kashi", "prayagraj", "char-dham", "kedarnath"],
  prayagraj: ["circuit", "kashi", "ayodhya", "char-dham", "kedarnath"],
  circuit: ["kashi", "ayodhya", "prayagraj", "char-dham", "kedarnath"],
};

export default function RelatedPilgrimageLinks({ current }: { current: PageKey }) {
  return (
    <section className="border-t border-slate-100 bg-slate-50 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">Explore More Pilgrimage Tours</p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-950 md:text-4xl">Related Yatra Packages</h2>
        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {groups[current].map((key) => {
            const page = pages[key];
            return (
              <Link key={key} href={page.href} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
                <h3 className="text-lg font-semibold text-slate-950 group-hover:text-blue-800">{page.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{page.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-800">Explore <ArrowRight size={16} /></span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
