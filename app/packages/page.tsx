import Link from "next/link";
import type { Metadata } from "next";
import PackageCard from "@/components/PackageCard";
import { packages } from "@/data/packages";
import type { Package } from "@/data/packagesTypes";

type SearchParams={q?:string;category?:string;state?:string;theme?:string;sort?:"price-low"|"price-high"};
type RawPackage=Record<string,any>;
function normalizePackage(pkg:RawPackage):Package&{themes:string[];rawSearch:string}{
 const gallery=Array.isArray(pkg.gallery)?pkg.gallery.map((item:any)=>typeof item==="string"?item:item?.image??"/images/package-placeholder.jpg"):[];
 const themes=Array.isArray(pkg.themes)?pkg.themes.map(String):[];
 const highlights=Array.isArray(pkg.highlights)?pkg.highlights:[];
 return {id:typeof pkg.id==="number"?pkg.id:Number(String(pkg.id||"").replace(/\D/g,""))||0,slug:pkg.slug??"",title:pkg.title??"Tour Package",destination:pkg.destination??"",state:pkg.state??"",category:pkg.category??"Tour",image:pkg.image??pkg.hero?.image??gallery[0]??"/images/package-placeholder.jpg",gallery,duration:pkg.duration??"",price:typeof pkg.price==="number"?pkg.price:0,rating:typeof pkg.rating==="number"?pkg.rating:4.5,reviews:typeof pkg.reviews==="number"?pkg.reviews:0,overview:pkg.overview??"",highlights,itinerary:Array.isArray(pkg.itinerary)?pkg.itinerary.map((day:any,index:number)=>({day:typeof day.day==="number"?day.day:Number(String(day.day||"").replace(/\D/g,""))||index+1,title:day.title??`Day ${index+1}`,description:[Array.isArray(day.morning)?`Morning: ${day.morning.join(", ")}`:"",Array.isArray(day.afternoon)?`Afternoon: ${day.afternoon.join(", ")}`:"",Array.isArray(day.evening)?`Evening: ${day.evening.join(", ")}`:""].filter(Boolean).join(" ")})):[],hotels:Array.isArray(pkg.hotels)?pkg.hotels.map((hotel:any)=>({name:hotel.name??"Hotel",category:hotel.category??"Standard"})):[],meals:Array.isArray(pkg.meals)?pkg.meals:[],inclusions:Array.isArray(pkg.inclusions)?pkg.inclusions:[],exclusions:Array.isArray(pkg.exclusions)?pkg.exclusions:[],bestTime:pkg.bestTime??"",groupSize:pkg.groupSize??"",difficulty:pkg.difficulty??"",themes,rawSearch:[pkg.title,pkg.destination,pkg.state,pkg.category,pkg.overview,...themes,...highlights].filter(Boolean).join(" ").toLowerCase()};
}
const packageList=packages.map(normalizePackage);
export const metadata:Metadata={title:"Tour Packages | Only Road Trip",description:"Explore premium India tour packages, pilgrimage tours, road trips and curated travel experiences at Only Road Trip.",alternates:{canonical:"https://www.onlyroadtrip.com/packages"},robots:{index:true,follow:true}};
const aliases:Record<string,string[]>={spiritual:["spiritual","pilgrimage","temple","dham","jyotirlinga","yatra"],pilgrimage:["pilgrimage","spiritual","temple","dham","jyotirlinga","yatra"],trekking:["trek","trekking","tungnath","chopta","madhyameshwar"],adventure:["adventure","trek","bike","safari","water sports","road trip"],women:["women","woman","ladies","female"],senior:["senior","pilgrimage","spiritual","easy"],honeymoon:["honeymoon","romantic","couple"],family:["family"],wildlife:["wildlife","safari","national park","tiger","gir","corbett","kaziranga"],beach:["beach","island","goa","andaman","lakshadweep","kovalam"],heritage:["heritage","culture","fort","palace","hampi","ajanta","ellora"],hill:["hill","mountain","manali","shimla","mussoorie","nainital","munnar","darjeeling","ooty","kodaikanal"],weekend:["weekend","short break","2 nights","3 days"],road:["road trip","bike","manali","ladakh"],corporate:["corporate","mice","offsite","incentive","team"],nature:["nature","valley","lake","backwater","forest","mountain"]};

export default async function PackagesPage({searchParams}:{searchParams:Promise<SearchParams>|SearchParams}){
 const sp=await Promise.resolve(searchParams);
 const query=sp?.q?.trim().toLowerCase()??"";
 const activeCategory=sp?.category;
 const activeState=sp?.state;
 const activeTheme=sp?.theme;
 const sort=sp?.sort;
 let filteredPackages=packageList;
 if(query)filteredPackages=filteredPackages.filter(p=>p.rawSearch.includes(query));
 if(activeCategory)filteredPackages=filteredPackages.filter(p=>p.category===activeCategory);
 if(activeState)filteredPackages=filteredPackages.filter(p=>p.state===activeState);
 if(activeTheme){const key=activeTheme.toLowerCase();const terms=aliases[key]??[key];filteredPackages=filteredPackages.filter(p=>terms.some(term=>p.rawSearch.includes(term)));}
 if(sort==="price-low")filteredPackages=[...filteredPackages].sort((a,b)=>a.price-b.price);
 if(sort==="price-high")filteredPackages=[...filteredPackages].sort((a,b)=>b.price-a.price);

 return <main className="min-h-screen bg-slate-50">
  <section className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 pb-14 pt-32 text-white">
   <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="max-w-3xl space-y-4">
     <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Only Road Trip Experiences</p>
     <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{activeTheme?`${activeTheme} Tour Experiences`:"Discover the best holiday packages across India"}</h1>
     <p className="text-lg leading-8 text-slate-200">{activeTheme?`Explore our ${activeTheme.toLowerCase()} journeys and choose the package that fits your travel style.`:"Choose journeys by travel style — spiritual, adventure, family, honeymoon, wildlife, beach, heritage, corporate and more."}</p>
    </div>
   </div>
  </section>

  <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
   <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
    <div>
     <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-600">{filteredPackages.length} Packages Available</p>
     <h2 className="mt-2 text-3xl font-bold text-slate-900">{activeTheme?`${activeTheme} Packages`:"All Tour Packages"}</h2>
    </div>
    {(activeTheme||activeCategory||activeState||query)&&<Link href="/packages" className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-700">View All Packages</Link>}
   </div>

   {filteredPackages.length>0?<div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">{filteredPackages.map(pkg=><PackageCard key={pkg.slug} pkg={pkg}/>)}</div>:<div className="rounded-3xl bg-white p-12 text-center shadow-lg"><h2 className="text-3xl font-bold text-slate-900">No matching packages yet</h2><p className="mt-4 text-slate-600">Dedicated packages for this experience will be added here.</p><Link href="/packages" className="mt-8 inline-block rounded-full bg-cyan-600 px-8 py-3 text-sm font-semibold text-white">View All Packages</Link></div>}
  </section>
 </main>;
}