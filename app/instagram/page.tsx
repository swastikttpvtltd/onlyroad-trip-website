import type { Metadata } from "next";
import Link from "next/link";
import { packages } from "@/data/packages";
import InstagramHero from "@/components/InstagramHero";

export const metadata: Metadata = {
 title:"Explore Tours on Instagram",
 description:"Discover Only Road Trip weekend escapes, Gujarat pilgrimage, Rajasthan journeys and door-to-door travel management.",
 alternates:{canonical:"https://www.onlyroadtrip.com/instagram"},
 robots:{index:true,follow:true}
};
const featured=[
 {title:"Kasol Weekend Escape", match:["kasol-weekend-group-tour"]},
 {title:"Chopta Tungnath Trek", match:["chopta-tungnath-weekend-group-tour"]},
 {title:"Golden Triangle", match:["golden-triangle"]},
 {title:"Somnath & Dwarka", match:["dwarka-somnath","somnath-dwarka"]},
 {title:"Gujarat Grand Tour", match:["gujarat-grand-tour"]},
 {title:"Varanasi & Ayodhya", match:["varanasi-ayodhya"]}
];
function pick(keys:string[]){return packages.find(p=>keys.some(key=>String(p.slug).includes(key)));}
function miniDay(day:any,index:number){return String(day?.title||day?.description||`Day ${index+1}`).trim();}
export default function InstagramPage(){
 const chosen=featured.map(item=>({...item,pkg:pick(item.match)})).filter(item=>item.pkg);
 return <main className="min-h-screen bg-white text-slate-900">
  <div className="fixed inset-x-0 top-3 z-50 px-3 sm:px-5">
   <header className="mx-auto flex h-[64px] max-w-6xl items-center justify-between rounded-2xl border border-blue-100/80 bg-white/65 px-4 shadow-[0_10px_35px_rgba(15,23,42,0.16)] backdrop-blur-xl supports-[backdrop-filter]:bg-blue-50/60 sm:px-6">
    <Link href="/" className="flex items-center gap-2"><img src="/images/logo/only-road-trip-logo.jpeg" alt="Only Road Trip" width="118" height="42" className="h-10 w-auto rounded object-contain"/><span className="sr-only">Only Road Trip home</span></Link>
    <div className="flex items-center gap-2"><Link href="/packages" className="hidden text-sm font-semibold text-blue-900 sm:inline">Explore Trips</Link><Link href="/plan-your-trip" className="rounded-full bg-blue-800 px-4 py-2.5 text-xs font-bold text-white sm:text-sm">Plan Your Trip</Link></div>
   </header>
  </div>
  <InstagramHero/>
  <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" id="featured">
   <p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-700">Handpicked experiences</p>
   <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">Trending & Featured Trips</h2>
   <p className="mt-2 max-w-2xl text-slate-600">Explore itineraries and live website package details, all in one place.</p>
   <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {chosen.map(({item,pkg})=><article key={pkg!.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <Link href={`/packages/${pkg!.slug}`}><img src={pkg!.image||"/images/package-placeholder.jpg"} alt={pkg!.title} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover"/></Link>
      <div className="p-4">
       <p className="text-xs font-bold uppercase tracking-wider text-cyan-700">{item.title}</p>
       <h3 className="mt-1 text-lg font-bold text-slate-950">{pkg!.title}</h3>
       <p className="mt-1 text-sm text-slate-600">{pkg!.duration} • {pkg!.destination}</p>
       {typeof pkg!.price==="number"&&pkg!.price>0&&<p className="mt-3 font-bold text-blue-800">From ₹{pkg!.price.toLocaleString("en-IN")} per person*</p>}
       {Array.isArray(pkg!.itinerary)&&pkg!.itinerary.length>0&&<details className="mt-3 rounded-lg bg-slate-50 p-3"><summary className="cursor-pointer text-sm font-semibold text-slate-800">Mini day-wise itinerary</summary><ol className="mt-2 space-y-1 text-sm text-slate-600">{pkg!.itinerary.slice(0,5).map((day:any,i:number)=><li key={i}>Day {i+1}: {miniDay(day,i)}</li>)}</ol>{pkg!.itinerary.length>5&&<p className="mt-2 text-xs text-slate-500">See full itinerary for remaining days.</p>}</details>}
       <div className="mt-4 grid grid-cols-2 gap-2"><Link href={`/packages/${pkg!.slug}`} className="rounded-lg border border-blue-700 px-3 py-2.5 text-center text-sm font-bold text-blue-800">Full Itinerary</Link><Link href={`/book/${pkg!.slug}`} className="rounded-lg bg-blue-800 px-3 py-2.5 text-center text-sm font-bold text-white">Book Now</Link></div>
      </div>
    </article>)}
   </div>
   <div className="mt-7 text-center"><Link href="/packages" className="inline-block rounded-full border border-blue-700 px-6 py-3 font-bold text-blue-800">Explore All Tours →</Link></div>
  </section>
  <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 px-4 py-14 text-white">
   <div className="mx-auto max-w-6xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Signature Travel Management</p><h2 className="mt-3 max-w-3xl text-3xl font-extrabold sm:text-4xl">From Your Doorstep to Every Destination.</h2><p className="mt-4 max-w-2xl text-blue-100">Home pickup, transfers, accommodation, sightseeing coordination and personalised support for families, senior citizens and assisted travellers.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/plan-your-trip" className="rounded-xl bg-white px-5 py-3 font-bold text-blue-900">Explore Door-to-Door Travel</Link><Link href="/contact" className="rounded-xl border border-white/60 px-5 py-3 font-bold text-white">Talk to Our Team</Link></div></div>
  </section>
  <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6"><h2 className="text-2xl font-extrabold">Find Your Kind of Journey</h2><div className="mt-5 flex flex-wrap gap-3">{[["Weekend Trips","weekend"],["Spiritual & Pilgrimage","spiritual"],["Family Holidays","family"],["Luxury Travel","luxury"],["Women & Solo","women"],["Senior Citizen","senior"]].map(([name,theme])=><Link key={theme} href={`/packages?theme=${theme}`} className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-900">{name} →</Link>)}</div></section>
  <footer className="border-t border-slate-200 px-4 py-8 text-center text-sm text-slate-500">Only Road Trip · Bespoke Journeys, Timeless Memories · <Link href="/contact" className="text-blue-800 underline">Contact Us</Link></footer>
 </main>;
}
