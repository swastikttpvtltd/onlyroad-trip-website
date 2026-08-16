"use client";
import { useMemo, useState } from "react";

type ItineraryDay={day:string|number;title:string;morning:string[];afternoon:string[];evening:string[]};
type Props={itinerary:ItineraryDay[];destination:string;category:string;vibeHook?:string};
type Place={name:string;famous:string};

const clean=(items:string[])=>items.filter(Boolean).filter(x=>!/^breakfast|^dinner|^stay$|^drop$|^departure$/i.test(x.trim()));
const allText=(itinerary:ItineraryDay[])=>itinerary.flatMap(d=>[d.title,...d.morning,...d.afternoon,...d.evening]).join(" ");
const norm=(s:string)=>s.toLowerCase().replace(/[–—]/g,"-").replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim();

function experience(day:ItineraryDay){
  const acts=clean([...day.morning,...day.afternoon,...day.evening]);
  if(/arrival|check.?in/i.test(day.title))return `Arrival and settling-in day. ${acts.length?`The scheduled experience includes ${acts.slice(0,4).join(", ")}.`:"The pace is intentionally comfortable after the journey."}`;
  if(/departure|return|drop/i.test(day.title))return `A departure-focused day following the published route. ${acts.length?`The planned stops and transfer details are ${acts.slice(0,3).join(", ")}.`:"Checkout and transfer follow the confirmed departure timing."}`;
  return `Today is built around ${day.title}. ${acts.length?`The itinerary specifically includes ${acts.slice(0,5).join(", ")}.`:"Sightseeing follows the confirmed route."}`;
}

const placeFacts:Record<string,string>={
  "Bhuj":"Bhuj is the historic gateway to the Kutch region and is known for Kutch's crafts, textiles, embroidery, traditional architecture and cultural heritage. It is also an important base for journeys towards the White Rann and surrounding craft villages.",
  "Dhordo":"Dhordo is the principal gateway to the White Rann experience and is known for its desert landscape, Kutchi culture, handicrafts and the Rann festival/tent-city experience when officially operational. Festival access and activities are date- and permission-dependent.",
  "White Rann":"The White Rann of Kutch is famous for its vast salt desert landscape, dramatic white terrain, sunsets and photography. Access is regulated and can depend on local permissions, seasonal operations and official visitor rules.",
  "White Rann of Kutch":"The White Rann of Kutch is famous for its vast salt desert landscape, dramatic white terrain, sunsets and photography. Access is regulated and can depend on local permissions, seasonal operations and official visitor rules.",
  "Kala Dungar":"Kala Dungar, or Black Hill, is the highest point in Kutch and is known for panoramic views across the surrounding Rann landscape. It is also associated with the historic Dattatreya Temple and the local tradition of offering food to the jackals.",
  "Kutchi handicrafts":"Kutch is internationally known for its hand embroidery, textiles, weaving, bandhani, ajrakh, leather work, pottery and other traditional crafts. Specific craft villages and workshops visited depend on the published route and local opening conditions.",
  "Traditional village experience":"Traditional Kutchi village experiences are known for local crafts, embroidery, textiles, architecture, food traditions and community culture. The exact village or artisan stop depends on the confirmed route and operating conditions.",
  "Dwarka":"Dwarka is traditionally associated with Lord Krishna and is one of the Char Dham pilgrimage destinations. The Dwarkadhish Temple is the principal spiritual attraction.",
  "Bet Dwarka":"Bet Dwarka is an island pilgrimage stop associated with the Krishna tradition. Boat access is subject to local operations and weather.",
  "Nageshwar":"Nageshwar is associated with one of the 12 Jyotirlingas of Lord Shiva and is an important Shiva pilgrimage stop in the Dwarka circuit.",
  "Gopi Talav":"Gopi Talav is a sacred water body near Dwarka associated with Krishna traditions and local pilgrimage stories.",
  "Porbandar":"Porbandar is best known as the birthplace of Mahatma Gandhi, with Kirti Mandir commemorating his birthplace and life.",
  "Kirti Mandir":"Kirti Mandir in Porbandar is a memorial associated with Mahatma Gandhi and his birthplace and is an important heritage stop.",
  "Somnath":"Somnath is one of India's major Shiva pilgrimage destinations and is associated with one of the 12 Jyotirlingas. Its temple stands beside the Arabian Sea.",
  "Bhalka Tirth":"Bhalka Tirth near Somnath is associated with the traditional account of the final earthly episode of Lord Krishna and is an important Krishna pilgrimage site.",
  "Triveni Sangam":"Triveni Sangam at Somnath is a sacred confluence associated with the Hiran, Kapila and Saraswati rivers.",
  "Fort Aguada":"Fort Aguada is a historic Portuguese-era fort overlooking the Arabian Sea, known for its defensive architecture and sea views.",
  "Candolim":"Candolim is a popular North Goa coastal area known for its beach, resorts, cafés and relaxed shoreline.",
  "Calangute":"Calangute is one of North Goa's best-known beaches, popular for its broad sandy shoreline, cafés, shopping and water-based leisure.",
  "Baga":"Baga is a lively North Goa beach area known for restaurants, cafés, beach atmosphere and an active evening scene.",
  "Anjuna":"Anjuna is known for its North Goa beach, rocky coastline, cafés and market culture.",
  "Vagator":"Vagator is a scenic North Goa coastal area known for rocky viewpoints, sea views and sunset atmosphere.",
  "Basilica of Bom Jesus":"The Basilica of Bom Jesus in Old Goa is a UNESCO World Heritage church famous for its historic architecture and association with St. Francis Xavier.",
  "Se Cathedral":"Se Cathedral is one of Old Goa's major historic churches, known for its Portuguese-era architecture and religious heritage.",
  "Panjim":"Panjim, Goa's capital, is known for Portuguese-influenced architecture, the Mandovi riverside and colourful heritage neighbourhoods.",
  "Colva":"Colva is a South Goa beach area known for its long sandy coastline and relaxed coastal atmosphere.",
  "Kasol":"Kasol is a Parvati Valley village known for mountain scenery, riverside walks, cafés and its relaxed traveller culture.",
  "Manikaran":"Manikaran is known for hot springs and important religious sites associated with both Sikh and Hindu traditions.",
  "Chalal":"Chalal is a small village near Kasol reached by a forest trail and known for a quieter mountain setting and Parvati Valley views.",
  "Kanatal":"Kanatal is a quiet Himalayan hill destination known for forested slopes, mountain views, fresh air and outdoor experiences.",
  "Surkanda Devi":"Surkanda Devi Temple is a hilltop Hindu shrine near Kanatal and Dhanaulti, known for spiritual importance and panoramic Himalayan views.",
  "Mussoorie":"Mussoorie is a classic Uttarakhand hill station known for Himalayan viewpoints, colonial-era character, Mall Road and waterfalls.",
  "Kempty Falls":"Kempty Falls is one of Mussoorie's best-known waterfalls, surrounded by wooded hills and visited for its scenic cascade.",
  "Gun Hill":"Gun Hill is a popular Mussoorie viewpoint known for elevated views over the surrounding Himalayan foothills and town.",
  "Nainital":"Nainital is a lake town built around Naini Lake, known for boating, surrounding hills and classic Kumaoni hill-station character.",
  "Naini Lake":"Naini Lake is the centrepiece of Nainital and is known for boating, lakeside walks and its mountain setting.",
  "Snow View Point":"Snow View Point is a popular Nainital viewpoint known for wide Himalayan views on clear days.",
  "Udaipur":"Udaipur is known for its lakes, Rajput-era palaces, romantic waterfront setting and rich Mewar heritage.",
  "City Palace":"Udaipur City Palace is a large royal complex overlooking Lake Pichola, famous for courtyards, balconies, museums and Mewar-era architecture.",
  "Lake Pichola":"Lake Pichola is an artificial lake surrounded by Udaipur's palaces, ghats and hills and is famous for boat and sunset views.",
  "Chaukori":"Chaukori is a quiet Kumaon hill destination known for expansive Himalayan views, tea gardens and peaceful sunrise and sunset experiences."
};

function findKnownPlaces(text:string){
  const n=norm(text);
  return Object.keys(placeFacts).filter(name=>n.includes(norm(name))).sort((a,b)=>norm(b).length-norm(a).length);
}
function destinationParts(destination:string){return destination.split(/[•,&/|]/).map(x=>x.trim()).filter(Boolean).filter(x=>x.length>2);}
function placesFromItinerary(itinerary:ItineraryDay[],destination:string):Place[]{
  const text=allText(itinerary);const names=Array.from(new Set(findKnownPlaces(text)));
  if(names.length)return names.map(name=>({name,famous:placeFacts[name]}));
  return destinationParts(destination).map(name=>({name,famous:`${name} is a confirmed destination in this package. The description is limited to experiences specifically listed in the published day-wise itinerary.`}));
}

function thingsFromItinerary(itinerary:ItineraryDay[],destination:string,category:string){
  const t=norm(`${category} ${destination} ${allText(itinerary)}`);
  const items=["Valid government photo ID, booking confirmation and emergency contact details.","Personal medicines, prescription copies if needed, basic first-aid essentials and regular toiletries.","Phone, charging cable, power bank and a small day bag for daily sightseeing.","Reusable water bottle and a few light snacks for road journeys or longer sightseeing days."];
  if(/desert|rann|dhordo|bhuj|sand|salt/.test(t))items.push("Sunglasses, sunscreen, lip balm/moisturiser, a hat or cap and comfortable closed walking shoes for salt-desert terrain.","A light jacket or warm layer for desert evenings and early mornings, especially during winter travel.");
  if(/beach|sea|coast|island|swim|water activity/.test(t))items.push("Sunscreen, sunglasses, hat/cap, swimwear or quick-dry clothes and a waterproof pouch for phone/valuables.","Comfortable sandals or water-friendly footwear for beach and coastal walks.");
  if(/trek|hike|trail|camp|mountain|valley|altitude|kasol|kanatal|chaukori|mussoorie|nainital/.test(t))items.push("Good-grip trekking/walking shoes, breathable layers, a light warm layer, rain/wind protection and a compact backpack.","Moisture-friendly socks, sunglasses and lip balm/moisturiser for mountain weather.");
  if(/pilgrimage|temple|darshan|jyotirlinga|dwarka|somnath|nageshwar|manikaran|surkanda/.test(t))items.push("Comfortable modest clothing suitable for temple visits and easy-to-remove footwear where required.","A light shawl/stole and enough small cash for local offerings or incidental expenses where digital payment is not available.");
  if(/heritage|palace|fort|museum|old goa|udaipur|bhuj/.test(t))items.push("Comfortable walking footwear, sun protection and a camera/phone with enough storage for photography.");
  if(/safari|wildlife|national park|forest/.test(t))items.push("Comfortable neutral-coloured clothing, sun protection, binoculars if you use them and a camera with spare battery/storage.");
  if(/snow|winter|cold|december|january|february|march/.test(t))items.push("Warm layers appropriate to the forecast, thermal innerwear where required, gloves/cap and weather-resistant footwear.");
  items.push(`A comfortable outfit for the longest sightseeing day in the ${destination} itinerary, plus one spare change of clothes.`);
  return Array.from(new Set(items));
}

function questionsAndAnswers(destination:string,category:string,itinerary:ItineraryDay[]){
  const text=norm(`${destination} ${category} ${allText(itinerary)}`);
  const days=itinerary.map((d,i)=>`Day ${i+1}: ${d.title} — ${clean([...d.morning,...d.afternoon,...d.evening]).join(", ")}`).join(" | ");
  const qa=[{question:`What places and experiences are actually covered in the ${destination} itinerary?`,answer:`The published plan covers the destinations and activities written in the day-wise schedule. ${days} Attractions not listed in that schedule are not automatically included.`}];
  if(/desert|rann|dhordo|bhuj/.test(text))qa.push({question:`What is the main experience of the ${destination} trip?`,answer:"The core experience is the Kutch desert and culture route described in the published itinerary: Bhuj, Dhordo, the White Rann, Kala Dungar and selected Kutchi craft or village experiences. Festival activities and tent-city services are included only when operational and specifically confirmed for the travel dates."});
  else if(/pilgrimage|temple|darshan|jyotirlinga/.test(text))qa.push({question:`Which major pilgrimage sites are covered in ${destination}?`,answer:"The pilgrimage stops are the ones explicitly named in the published itinerary. Temple timings, queues, security rules and local conditions can affect the exact visit timing."});
  else if(/beach|goa|coast|island|sea/.test(text))qa.push({question:`Which coastal experiences are included in ${destination}?`,answer:"Only the beaches and coastal stops written in the published day-wise itinerary are treated as included. Optional water sports, cruises or additional attractions are not assumed unless specifically mentioned."});
  else if(/trek|hike|trail|mountain|valley|kasol|kanatal|chaukori|mussoorie|nainital/.test(text))qa.push({question:`What should I know about weather and road conditions?`,answer:"Mountain weather can change quickly, and road travel can be affected by rain, snowfall, traffic or local restrictions. The published sequence is a planned route rather than a guarantee of exact arrival times."});
  else qa.push({question:`What is the main experience of this ${destination} tour?`,answer:`The main experience is defined by the actual sightseeing, activities and free-time blocks published day by day rather than by a generic attraction list.`});
  qa.push({question:`Can this ${destination} itinerary be customised?`,answer:"Yes. Dates, group size, hotel category, vehicle type, sightseeing preferences, meal requirements and trip pace can be discussed for customisation, subject to route feasibility, availability and pricing."});
  qa.push({question:"What should I carry for this trip?",answer:"Carry the destination- and activity-specific items listed in the Things to Carry section above."});
  return qa;
}

export default function ItineraryAccordion({itinerary,destination,category,vibeHook}:Props){
  const[openDay,setOpenDay]=useState<number|null>(0);const[openQuestion,setOpenQuestion]=useState<number|null>(null);const[openSection,setOpenSection]=useState<string|null>(null);
  const places=useMemo(()=>placesFromItinerary(itinerary,destination),[itinerary,destination]);
  const things=useMemo(()=>thingsFromItinerary(itinerary,destination,category),[itinerary,destination,category]);
  const qa=useMemo(()=>questionsAndAnswers(destination,category,itinerary),[destination,category,itinerary]);
  const toggle=(key:string)=>setOpenSection(openSection===key?null:key);
  return <div className="space-y-5">
    {vibeHook&&<div className="rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 via-white to-sky-50 p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Only Road Trip • Vibe Check</p><p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">{vibeHook}</p><p className="mt-2 text-sm leading-6 text-slate-600">Less checklist, more experience. Open each day to see the full plan.</p></div>}
    {itinerary.map((day,index)=>{const isOpen=openDay===index;const allActivities=[...day.morning,...day.afternoon,...day.evening];return <div key={`${day.day}-${index}`} className="relative border-l-2 border-orange-300 pl-7"><span className="absolute -left-4 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">{index+1}</span><div className="overflow-hidden rounded-xl border bg-white"><button type="button" onClick={()=>setOpenDay(isOpen?null:index)} className="flex w-full items-start justify-between gap-5 p-5 text-left hover:bg-slate-50" aria-expanded={isOpen}><div><p className="text-xs font-bold uppercase text-orange-600">Day {index+1}</p><h3 className="mt-1 text-xl font-bold text-slate-900">{day.title}</h3><p className="mt-2 text-sm text-slate-500">{clean(allActivities).slice(0,2).join(" • ")}</p></div><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-orange-500 text-2xl font-light text-orange-600">{isOpen?"−":"+"}</span></button>{isOpen&&<div className="border-t bg-slate-50/60 p-5 md:p-6"><div className="grid gap-5 md:grid-cols-3">{(["morning","afternoon","evening"] as const).map(period=><div key={period} className="rounded-xl bg-white p-4 shadow-sm"><h4 className="font-bold capitalize text-[#153e75]">{period}</h4><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">{day[period].map((item,i)=><li key={`${item}-${i}`} className="flex gap-2"><span className="text-orange-500">•</span><span>{item}</span></li>)}</ul></div>)}</div><div className="mt-5 grid gap-4 md:grid-cols-2"><div className="rounded-xl border border-orange-100 bg-orange-50 p-4"><h4 className="font-bold text-slate-900">Today&apos;s Experience</h4><p className="mt-2 text-sm leading-6 text-slate-600">{experience(day)}</p></div><div className="rounded-xl border border-blue-100 bg-blue-50 p-4"><h4 className="font-bold text-slate-900">What this day is known for</h4><p className="mt-2 text-sm leading-6 text-slate-600">{experience(day)}</p></div></div><div className="mt-4 rounded-xl border bg-white p-4"><h4 className="font-bold text-slate-900">Detailed Day Schedule</h4><ol className="mt-3 space-y-2 text-sm leading-6 text-slate-600">{allActivities.map((item,i)=><li key={`${item}-${i}`}><b className="text-[#153e75]">{i+1}.</b> {item}</li>)}</ol><p className="mt-4 text-xs leading-5 text-slate-500">Note: Exact timings may change depending on weather, traffic, attraction slots, local restrictions and hotel location.</p></div></div>}</div></div>})}
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><button type="button" onClick={()=>toggle("places")} className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-slate-50" aria-expanded={openSection==="places"}><span className="font-extrabold text-[#153e75]">Places Covered &amp; What They Are Famous For</span><span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#153e75] text-xl font-light text-[#153e75]">{openSection==="places"?"−":"+"}</span></button>{openSection==="places"&&<div className="space-y-3 border-t bg-white p-5">{places.map(p=><div key={p.name} className="rounded-xl bg-slate-50 p-4"><h4 className="font-bold text-slate-900">{p.name}</h4><p className="mt-2 text-sm leading-7 text-slate-600"><span className="font-bold text-[#153e75]">Famous for:</span> {p.famous}</p></div>)}</div>}</section>
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><button type="button" onClick={()=>toggle("things")} className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-slate-50" aria-expanded={openSection==="things"}><span className="font-extrabold text-[#153e75]">Things to Carry</span><span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#153e75] text-xl font-light text-[#153e75]">{openSection==="things"?"−":"+"}</span></button>{openSection==="things"&&<div className="space-y-3 border-t bg-white p-5">{things.map((x,i)=><div key={`${x}-${i}`} className="rounded-xl bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700"><span className="mr-2 font-bold text-sky-600">{i+1}.</span>{x}</div>)}</div>}</section>
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-extrabold text-[#153e75]">Questions Travellers Often Ask</h3><p className="mt-2 text-sm leading-6 text-slate-600">Answers are based on this package&apos;s destination, theme and published day-wise itinerary.</p><div className="mt-4 space-y-3">{qa.map((item,index)=>{const isOpen=openQuestion===index;return <div key={item.question} className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50"><button type="button" onClick={()=>setOpenQuestion(isOpen?null:index)} className="flex w-full items-center justify-between gap-4 p-4 text-left text-sm font-semibold leading-6 text-slate-800 hover:bg-white" aria-expanded={isOpen}><span>{item.question}</span><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#153e75] text-xl font-light text-[#153e75]">{isOpen?"−":"+"}</span></button>{isOpen&&<div className="border-t border-slate-200 bg-white px-4 pb-5 pt-4 text-sm leading-7 text-slate-600"><p>{item.answer}</p></div>}</div>})}</div></section>
  </div>;
}
