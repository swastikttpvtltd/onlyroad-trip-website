import BookingForm from "@/components/BookingForm";
import ItineraryAccordion from "@/components/package/ItineraryAccordion";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { packages } from "@/data/packages";

type PackageItem = (typeof packages)[number];
type PageProps = { params: Promise<{ slug: string }> };

function heroImage(pkg: PackageItem) {
  if ("hero" in pkg && pkg.hero?.image) return pkg.hero.image;
  if ("image" in pkg && typeof pkg.image === "string") return pkg.image;
  return pkg.gallery?.[0]?.image ?? "/images/package-placeholder.jpg";
}
function shortDescription(pkg: PackageItem) {
  if ("hero" in pkg && pkg.hero?.shortDescription) return pkg.hero.shortDescription;
  return pkg.overview;
}
function numberField(pkg: PackageItem, key: "price" | "rating" | "reviews") {
  if (key in pkg && typeof pkg[key] === "number") return pkg[key];
  return undefined;
}

const placeNotes: Record<string, { famous: string; experience: string }> = {
  Dwarka: { famous: "Dwarkadhish Temple, Gomti Ghat, Sudama Setu and its deep association with Lord Krishna.", experience: "Temple darshan, sacred ghats, heritage lanes and the spiritual atmosphere of one of India's Char Dham destinations." },
  Somnath: { famous: "Somnath Jyotirlinga, the Arabian Sea promenade, Triveni Sangam and Bhalka Tirth.", experience: "Jyotirlinga darshan, coastal views, sacred sites and the history surrounding one of India's most revered temples." },
  Gir: { famous: "Asiatic lions, dry deciduous forest, Maldhari culture and wildlife safaris.", experience: "Wildlife landscapes, safari experiences and the natural heritage of the Gir region." },
  Kutch: { famous: "The White Rann, desert landscapes, Kutchi handicrafts, folk culture and Rann Utsav.", experience: "Salt desert scenery, local crafts, cultural performances and colourful village traditions." },
  Saputara: { famous: "Gujarat's hill-station scenery, lake, viewpoints, tribal culture and monsoon greenery.", experience: "Relaxed hill-station sightseeing, viewpoints, nature and local cultural experiences." },
  Kevadia: { famous: "Statue of Unity, Sardar Sarovar Dam, Valley of Flowers and surrounding attractions.", experience: "Modern landmarks, landscaped attractions, river-valley scenery and family-friendly sightseeing." },
};

function destinationsFor(pkg: PackageItem) {
  const names = pkg.destination.split(/[•,&/–-]/).map((x) => x.trim()).filter(Boolean);
  return names.map((name) => ({ name, ...(placeNotes[name] ?? { famous: `${name} is known for its local landmarks, culture, food and regional character.`, experience: `The itinerary is designed to cover the key experiences and important sightseeing around ${name}.` }) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = packages.find((item) => item.slug === slug);
  if (!pkg) return { title: "Package Not Found | Only Road Trip", robots: "noindex" };
  return { title: `${pkg.title} | Only Road Trip`, description: pkg.overview, alternates: { canonical: `https://www.onlyroadtrip.com/packages/${slug}` } };
}

export default async function PackageDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = packages.find((item) => item.slug === slug);
  if (!pkg) notFound();
  const image = heroImage(pkg);
  const price = numberField(pkg, "price");
  const rating = numberField(pkg, "rating");
  const reviews = numberField(pkg, "reviews");
  const places = destinationsFor(pkg);

  return <main className="min-h-screen bg-[#f6f6f6] text-slate-800">
    <section className="relative h-[430px] overflow-hidden"><Image src={image} alt={pkg.title} fill priority className="object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" /><div className="absolute inset-0 mx-auto flex max-w-7xl items-end px-5 pb-12 md:px-8"><div className="max-w-4xl text-white"><div className="mb-4 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide"><span className="rounded bg-orange-500 px-3 py-1.5">{pkg.category}</span><span className="rounded bg-white/20 px-3 py-1.5 backdrop-blur">{pkg.state}</span></div><h1 className="text-4xl font-extrabold leading-tight md:text-5xl">{pkg.title}</h1><p className="mt-4 max-w-3xl text-base leading-7 text-white/90">{shortDescription(pkg)}</p></div></div></section>
    <div className="sticky top-0 z-30 border-b bg-white shadow-sm"><div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-5 py-4 text-sm font-bold md:px-8">{[["overview","Overview"],["itinerary","Itinerary"],["places","Places Covered"],["inclusions","Inclusions"],["hotels","Stay & Meals"]].map(([id,label]) => <a key={id} href={`#${id}`} className="whitespace-nowrap hover:text-orange-600">{label}</a>)}</div></div>
    <section className="mx-auto grid max-w-7xl gap-7 px-5 py-8 md:px-8 lg:grid-cols-[1fr_350px]">
      <div className="space-y-7">
        <section className="grid grid-cols-2 gap-3 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-4"><Fact label="Duration" value={pkg.duration} /><Fact label="Destination" value={pkg.destination} /><Fact label="Group Size" value={pkg.groupSize} /><Fact label="Best Time" value={pkg.bestTime} /></section>
        <ContentCard id="overview" title="Tour Overview"><p className="leading-8 text-slate-600">{pkg.overview}</p><div className="mt-6 rounded-xl border-l-4 border-orange-500 bg-orange-50 p-5"><h3 className="font-bold">Package Theme</h3><p className="mt-2 leading-7 text-slate-600">This {pkg.category.toLowerCase()} journey is planned around {pkg.destination}, combining the destination&apos;s signature attractions with comfortable road travel, meaningful local experiences and a practical day-wise route.</p></div><h3 className="mt-7 text-xl font-bold">Tour Highlights</h3><div className="mt-4 grid gap-3 md:grid-cols-2">{pkg.highlights.map((x) => <div key={x} className="flex gap-3 rounded-lg bg-slate-50 p-4"><span className="text-orange-500">✓</span><span>{x}</span></div>)}</div></ContentCard>
        <ContentCard id="places" title="Places Covered & What They Are Famous For"><p className="mb-5 leading-7 text-slate-600">Know the character of every major destination included in this tour and what you can expect to experience there.</p><div className="space-y-4">{places.map((p,i) => <div key={`${p.name}-${i}`} className="rounded-xl border p-5"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 font-bold text-white">{i+1}</span><h3 className="text-xl font-bold">{p.name}</h3></div><p className="mt-4 text-sm font-bold text-slate-900">Famous for</p><p className="mt-1 leading-7 text-slate-600">{p.famous}</p><p className="mt-3 text-sm font-bold text-slate-900">What we cover</p><p className="mt-1 leading-7 text-slate-600">{p.experience}</p></div>)}</div></ContentCard>
        <ContentCard id="itinerary" title="Day-wise Tour Itinerary"><p className="mb-5 text-sm leading-6 text-slate-500">Click the + button on any day to open its complete morning-to-evening schedule, activities and travel notes.</p><ItineraryAccordion itinerary={pkg.itinerary} destination={pkg.destination} category={pkg.category} /></ContentCard>
        <ContentCard id="inclusions" title="Tour Inclusions & Exclusions"><div className="grid gap-6 md:grid-cols-2"><div><h3 className="mb-3 text-lg font-bold text-emerald-700">What&apos;s Included</h3>{pkg.inclusions.map(x => <p key={x} className="mb-2 rounded-lg bg-emerald-50 p-3 text-sm">✓ {x}</p>)}</div><div><h3 className="mb-3 text-lg font-bold text-red-700">What&apos;s Excluded</h3>{pkg.exclusions.map(x => <p key={x} className="mb-2 rounded-lg bg-red-50 p-3 text-sm">× {x}</p>)}</div></div></ContentCard>
        <ContentCard id="hotels" title="Stay, Meals & Travel Information"><div className="grid gap-6 md:grid-cols-2"><div><h3 className="font-bold">Suggested Hotels / Similar</h3><div className="mt-3 space-y-3">{pkg.hotels.map((h,i) => { const hotel=h as {name:string;category?:string;star?:string}; return <div key={`${hotel.name}-${i}`} className="rounded-lg border p-4"><b>{hotel.name}</b><p className="mt-1 text-sm text-slate-500">{hotel.star ?? hotel.category ?? "Comfort Stay"}</p></div> })}</div></div><div><h3 className="font-bold">Meals</h3><div className="mt-3 space-y-2">{pkg.meals.map(x => <p key={x} className="rounded-lg border p-3">🍽 {x}</p>)}</div><div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-7"><p><b>Difficulty:</b> {pkg.difficulty}</p><p><b>Best Time:</b> {pkg.bestTime}</p><p><b>Group:</b> {pkg.groupSize}</p></div></div></div></ContentCard>
        <section className="rounded-2xl bg-white p-6 shadow-sm"><h2 className="text-2xl font-bold">Tour Gallery</h2><div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">{pkg.gallery.map((g,i) => <div key={`${g.image}-${i}`} className="relative h-52 overflow-hidden rounded-xl"><Image src={g.image} alt={g.alt ?? pkg.title} fill className="object-cover transition duration-500 hover:scale-105" /></div>)}</div></section><section className="rounded-2xl bg-white p-6 shadow-sm"><BookingForm /></section>
      </div>
      <aside className="h-fit lg:sticky lg:top-20"><div className="overflow-hidden rounded-2xl bg-white shadow-lg"><div className="bg-[#153e75] p-5 text-white"><p className="text-sm text-white/75">Starting From</p><div className="mt-1 text-3xl font-extrabold">{price ? `₹${price.toLocaleString("en-IN")}` : "Price on Request"}</div><p className="mt-1 text-xs">Per Person*</p></div><div className="p-5"><div className="grid grid-cols-2 gap-2 text-sm"><Mini label="Rating" value={rating ? `${rating} ★` : "New"}/><Mini label="Reviews" value={reviews ? String(reviews) : "—"}/></div><a href={`https://wa.me/919211796168?text=${encodeURIComponent(`Hi, I want details for ${pkg.title}`)}`} target="_blank" rel="noopener noreferrer" className="mt-5 block rounded-lg bg-orange-500 px-4 py-3 text-center font-bold text-white hover:bg-orange-600">Enquire on WhatsApp</a><a href="tel:+919211796168" className="mt-3 block rounded-lg border border-[#153e75] px-4 py-3 text-center font-bold text-[#153e75]">Call Now</a><div className="mt-5 border-t pt-4 text-xs leading-5 text-slate-500">Price may vary by travel date, hotel category, vehicle and group size. Final quotation is shared before booking.</div></div></div></aside>
    </section>
  </main>;
}

function ContentCard({ id, title, children }: { id: string; title: string; children: React.ReactNode }) { return <section id={id} className="scroll-mt-24 rounded-2xl bg-white p-6 shadow-sm md:p-7"><h2 className="border-b pb-4 text-2xl font-extrabold text-[#153e75]">{title}</h2><div className="pt-5">{children}</div></section> }
function Fact({ label, value }: { label: string; value: string }) { return <div className="border-r last:border-0"><p className="text-xs uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 text-sm font-bold">{value}</p></div> }
function Mini({ label, value }: { label: string; value: string }) { return <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-400">{label}</p><p className="mt-1 font-bold">{value}</p></div> }
