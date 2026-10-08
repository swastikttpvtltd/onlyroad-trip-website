import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Bus, Camera, Utensils } from "lucide-react";
import { packages } from "@/data/packages";
import InstagramHero from "@/components/InstagramHero";
import InstagramTracking from "@/components/InstagramTracking";

const pageUrl = "https://www.onlyroadtrip.com/instagram";
const pageTitle = "Weekend Trips & Pilgrimage Tours | Only Road Trip";
const pageDescription = "Explore weekend escapes, Char Dham, Vaishno Devi, Ujjain, Kashmir, Rajasthan and Gujarat tours. View itineraries and plan your journey with Only Road Trip.";
export const metadata: Metadata = {
 title: { absolute: pageTitle },
 description: pageDescription,
 alternates: { canonical: pageUrl },
 openGraph: { title: pageTitle, description: pageDescription, url: pageUrl, siteName: "Only Road Trip", locale: "en_IN", type: "website", images: [{ url: "https://www.onlyroadtrip.com/images/hero/hero-2.png", alt: "Himalayan weekend journeys with Only Road Trip" }] },
 twitter: { card: "summary_large_image", title: pageTitle, description: pageDescription, images: ["https://www.onlyroadtrip.com/images/hero/hero-2.png"] },
 robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
};
const featured: {title:string;match:string[];year?:number;image?:string}[]=[
 {title:"Kasol Weekend Escape", match:["kasol-weekend-group-tour"]},
 {title:"Chopta Tungnath Trek", match:["chopta-tungnath-weekend-group-tour"]},
 {title:"Nainital Weekend Escape", match:["nainital-weekend-group-tour"]},
 {title:"Jibhi Weekend Escape", match:["jibhi-weekend-group-tour"]},
 {title:"Vaishno Devi Group Yatra", match:["vaishno-devi-group-yatra"],image:"/images/packages/jammu-kashmir/hero.avif"},
 {title:"Amarnath Yatra 2027", match:["amarnath-yatra-kashmir"],year:2027},
 {title:"Char Dham Yatra", match:["char-dham-yatra"]},
 {title:"Do Dham · Kedarnath & Badrinath", match:["kedarnath-badrinath-do-dham"]},
 {title:"Ujjain & Omkareshwar Jyotirlinga Yatra", match:["ujjain-omkareshwar"],image:"/images/packages/madhya-pradesh/ujjain-omkareshwar/hero.jpg"},
 {title:"Varanasi & Deoghar · 7 Nights / 8 Days", match:["varanasi-ayodhya-prayagraj-gaya-bodh-gaya-deoghar"]},
 {title:"Somnath & Dwarka", match:["dwarka-somnath","somnath-dwarka"]},
 {title:"Rajasthan Grand Tour", match:["rajasthan-grand-tour"]},
 {title:"Gujarat Grand Tour", match:["gujarat-grand-tour"]},
 {title:"Golden Triangle", match:["golden-triangle"]},
 {title:"Shimla Manali · 5 Nights / 6 Days", match:["shimla-manali"]},
 {title:"Kashmir Winter Snow · 4 Nights / 5 Days", match:["kashmir-winter-snow"]}
];
function pick(keys:string[]){return packages.find(p=>keys.some(key=>String(p.slug).includes(key)));}
function whatsappUrl(pkg:{title:string;slug:string;duration?:string},year?:number){const message=`Hello Only Road Trip, I would like to enquire about ${pkg.title}${year?` for ${year}`:""}${pkg.duration?` (${pkg.duration})`:""}. Package: https://www.onlyroadtrip.com/packages/${pkg.slug}. Please share availability and details.`;return `https://wa.me/919211796168?text=${encodeURIComponent(message)}`;}
function miniDay(day:{title?:string;description?:string},index:number){return String(day?.title||day?.description||`Day ${index+1}`).trim();}
export default function InstagramPage(){
 const chosen=featured.map(item=>({item,pkg:pick(item.match)})).filter(item=>item.pkg);

 const structuredData = { "@context": "https://schema.org", "@graph": [
  { "@type": "CollectionPage", "@id": pageUrl + "#webpage", url: pageUrl, name: pageTitle, description: pageDescription, inLanguage: "en-IN", isPartOf: { "@id": "https://www.onlyroadtrip.com/#website" }, publisher: { "@id": "https://www.onlyroadtrip.com/#organization" }, mainEntity: { "@id": pageUrl + "#trips" }, breadcrumb: { "@id": pageUrl + "#breadcrumb" } },
  { "@type": "ItemList", "@id": pageUrl + "#trips", name: "Trending & Featured Trips", numberOfItems: chosen.length, itemListElement: chosen.map(({item,pkg},i)=>({ "@type": "ListItem", position: i + 1, name: pkg!.title + (item.year ? " · " + item.year + " enquiries" : ""), url: "https://www.onlyroadtrip.com/packages/" + pkg!.slug })) },
  { "@type": "BreadcrumbList", "@id": pageUrl + "#breadcrumb", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.onlyroadtrip.com/" }, { "@type": "ListItem", position: 2, name: "Instagram Tours", item: pageUrl }] }
 ] };
 return <main className="instagram-landing min-h-screen bg-white text-slate-900">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,"\\u003c")}}/>
  <InstagramTracking/>
  <style>{`body:has(.instagram-landing) header > div { background: rgba(15, 35, 70, .68) !important; border-color: rgba(186, 230, 253, .4) !important; } body:has(.instagram-landing) header > div > div:first-child a, body:has(.instagram-landing) header > div > div:first-child button { color: white !important; } body:has(.instagram-landing) header nav > div > div a { color: #0f172a !important; }`}</style>
  <a href="https://wa.me/919211796168?text=Hello%20Only%20Road%20Trip%2C%20please%20help%20me%20plan%20my%20trip." target="_blank" rel="noopener noreferrer" aria-label="Chat with Only Road Trip on WhatsApp" title="Chat on WhatsApp" className="fixed right-3 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#25D366] shadow-[0_4px_20px_rgba(0,0,0,.25)] transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 sm:right-5 sm:h-14 sm:w-14" style={{color:"#ffffff"}}><svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.91 11.91 0 0 0 12.05 0C5.47 0 .12 5.35.12 11.93c0 2.1.55 4.15 1.6 5.96L0 24l6.27-1.64a11.9 11.9 0 0 0 5.77 1.47h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.18-3.46-8.42ZM12.05 21.8a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.98.99-3.63-.24-.37a9.86 9.86 0 0 1-1.52-5.26c0-5.46 4.44-9.9 9.9-9.9 2.64 0 5.13 1.03 7 2.9a9.84 9.84 0 0 1 2.9 7c0 5.46-4.44 9.9-9.91 9.9Zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.49-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.63.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.18-1.41-.08-.12-.28-.2-.57-.34Z"/></svg></a>
  <InstagramHero/>
  <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" style={{paddingRight:"76px"}} id="featured">
   <p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-700">Handpicked experiences</p>
   <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">Trending & Featured Trips</h2>
   <p className="mt-2 max-w-2xl text-slate-600">Explore itineraries and live website package details, all in one place.</p>
   <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {chosen.map(({item,pkg})=><article key={pkg!.slug} className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <Link href={`/packages/${pkg!.slug}`} className="relative block aspect-[16/10] shrink-0"><Image src={item.image||pkg!.image||"/images/package-placeholder.jpg"} alt={pkg!.title} fill sizes="(max-width: 639px) calc(100vw - 92px), (max-width: 1023px) 45vw, 360px" className="object-cover"/></Link>
      <div className="flex flex-1 flex-col p-4">
       <p className="text-xs font-bold uppercase tracking-wider text-cyan-700">{item.title}</p>
       <h3 className="mt-1 text-lg font-bold text-slate-950">{pkg!.title}</h3>
       <p className="mt-1 text-sm text-slate-600">{pkg!.duration} • {pkg!.destination}</p>
       {pkg!.slug.endsWith("weekend-group-tour")&&<p className="mt-2 text-xs text-slate-500">1 hotel night + 1 overnight road journey · 1 breakfast & 1 dinner</p>}
       {item.year&&<p className="mt-3 text-sm font-semibold text-blue-800">2027 enquiries open · Departure dates and fares to be confirmed.</p>}
       {!item.year&&typeof pkg!.price==="number"&&pkg!.price>0&&<p className="mt-3 font-bold text-blue-800">From ₹{pkg!.price.toLocaleString("en-IN")} per person*</p>}
       {!item.year&&<p className="mt-1 text-xs text-slate-500">{pkg!.slug.endsWith("weekend-group-tour")?"Quad sharing starting rate. ":""}Final quote depends on departure, availability and room sharing.</p>}
       <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-100 pt-3 text-xs font-semibold text-slate-600" aria-label="Tour includes">{(pkg!.meals.length>0||/meal|breakfast|dinner/i.test(pkg!.inclusions.join(" ")))&&<span className="inline-flex items-center gap-1.5"><Utensils aria-hidden="true" className="h-4 w-4 text-blue-700"/>Meals</span>}{/transport|transfer|vehicle|cab|bus|car/i.test(pkg!.inclusions.join(" "))&&<span className="inline-flex items-center gap-1.5"><Bus aria-hidden="true" className="h-4 w-4 text-blue-700"/>Transport</span>}{pkg!.highlights.length>0&&<span className="inline-flex items-center gap-1.5"><Camera aria-hidden="true" className="h-4 w-4 text-blue-700"/>Sightseeing</span>}</div>
       <div className="mt-auto pt-3">
       {Array.isArray(pkg!.itinerary)&&pkg!.itinerary.length>0&&<details className="mt-3 rounded-lg bg-slate-50 p-3"><summary className="cursor-pointer text-sm font-semibold text-slate-800">Mini day-wise itinerary</summary><ol className="mt-2 space-y-1 text-sm text-slate-600">{pkg!.itinerary.slice(0,5).map((day,i:number)=><li key={i}>Day {i+1}: {miniDay(day,i)}</li>)}</ol>{pkg!.itinerary.length>5&&<p className="mt-2 text-xs text-slate-500">See full itinerary for remaining days.</p>}</details>}
       <div className="mt-4 grid grid-cols-2 items-stretch gap-2"><a href={whatsappUrl(pkg!,item.year)} target="_blank" rel="noopener noreferrer" aria-label={`Enquire about ${pkg!.title} on WhatsApp`} style={{color:"#1e40af"}} className="flex min-h-12 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-2 py-2.5 text-center text-xs font-bold leading-5 transition-colors hover:bg-blue-100 sm:text-sm">Ask on WhatsApp</a><Link href={item.year?whatsappUrl(pkg!,item.year):`/book/${pkg!.slug}`} aria-label={item.year?`Enquire about ${pkg!.title} for ${item.year}`:`Book ${pkg!.title} on Only Road Trip`} className="flex min-h-12 items-center justify-center rounded-lg bg-blue-800 px-2 py-2.5 text-center text-xs font-bold leading-5 text-white transition-colors hover:bg-blue-900 sm:text-sm">{item.year?`Enquire for ${item.year}`:"Book Now"}</Link></div><Link href={`/packages/${pkg!.slug}`} className="mt-3 block text-center text-sm font-semibold text-slate-600 underline underline-offset-4 hover:text-blue-800">View Full Itinerary →</Link>
       </div>
      </div>
    </article>)}
   </div>
   <div className="mt-7 text-center"><Link href="/packages" className="inline-block rounded-full border border-blue-700 px-6 py-3 font-bold text-blue-800">Explore All Tours →</Link></div>
  </section>
  <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 px-4 py-14 text-white">
   <div className="mx-auto max-w-6xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Signature Travel Management</p><h2 className="mt-3 max-w-3xl text-3xl font-extrabold sm:text-4xl">From Your Doorstep to Every Destination.</h2><p className="mt-4 max-w-2xl text-blue-100">Home pickup, transfers, accommodation, sightseeing coordination and personalised support for families, senior citizens and assisted travellers.</p><div className="mt-6"><div className="mt-3 flex flex-wrap gap-3"><a href="tel:+919211796168" className="inline-flex min-h-12 items-center rounded-xl bg-white px-5 py-3 font-bold" style={{color:"#1e3a8a"}}>Call +91 92117 96168</a><Link href="/plan-your-trip" className="inline-flex min-h-12 items-center rounded-xl border border-white/60 px-5 py-3 font-bold text-white">Explore Door-to-Door Travel</Link><Link href="/contact" className="inline-flex min-h-12 items-center rounded-xl border border-white/60 px-5 py-3 font-bold text-white">Talk to Our Team</Link></div></div></div>
  </section>
  <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6"><h2 className="text-2xl font-extrabold">Find Your Kind of Journey</h2><div className="mt-5 flex flex-wrap gap-3">{[["Weekend Trips","weekend"],["Spiritual & Pilgrimage","spiritual"],["Family Holidays","family"],["Luxury Travel","luxury"],["Women & Solo","women"],["Senior Citizen","senior"]].map(([name,theme])=><Link key={theme} href={`/packages?theme=${theme}`} className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-900">{name} →</Link>)}</div></section>
  
 </main>;
}
