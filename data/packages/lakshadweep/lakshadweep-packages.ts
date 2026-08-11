import { packageMedia } from "../../packageMedia";

const stay="3-Star Hotels / Similar";

function mediaFor(slug: string) {
  const files = packageMedia[`lakshadweep/${slug}`] ?? [];
  const hero = files.find((file) => /\/hero\.[^/]+$/i.test(file)) ?? files[0];
  return {
    hero: hero ?? `/images/lakshadweep/${slug}/hero.jpg`,
    gallery: files.map((image) => ({ image, alt: `${slug.replace(/-/g, " ")} travel experience` })),
  };
}

const make=(x:any)=>{
  const media = mediaFor(x.slug);
  return {
    ...x,
    state:"Lakshadweep",
    hero:{image:media.hero,shortDescription:x.short},
    gallery:media.gallery,
    hotels:[{name:stay,category:"3-Star",star:"3-Star Hotel"}],
    meals:["Breakfast","Dinner"],
    inclusions:[],
    exclusions:[],
    groupSize:x.groupSize||"2-12 Persons",
    difficulty:x.difficulty||"Easy",
    quickFacts:{pickup:x.pickup||"Agatti / confirmed gateway",drop:x.drop||"Agatti / confirmed gateway",transport:"Local transfers / ferry / flight as per itinerary",meals:"Breakfast & Dinner",hotelCategory:stay,bestSeason:x.bestTime||"October – May"}
  };
};

const d=(n:string,t:string,m:string[],a:string[],e:string[])=>({day:`Day ${n}`,title:t,morning:m,afternoon:a,evening:e});
const p:any[]=[];

p.push(make({id:"ldp-kavaratti-4n5d",slug:"lakshadweep-kavaratti-island",title:"Lakshadweep Kavaratti Island Escape",duration:"4 Nights / 5 Days",destination:"Kavaratti • Lakshadweep",category:"Island & Beach",themes:["Couple","Family","Beach","Nature"],pickup:"Lakshadweep gateway as per confirmed transport",short:"A tropical Lakshadweep escape focused on lagoon scenery and Kavaratti island leisure.",overview:"An island holiday built around Kavaratti's lagoon and marine landscapes. Entry permits, transport and island availability must be confirmed before booking.",highlights:["Kavaratti","Lagoon","Coral landscapes","Beach leisure","Optional water activities"],bestTime:"October – May, subject to transport and island operations",itinerary:[d("1","Arrival / Island Transfer",["Arrive at confirmed gateway","Transfer to island subject to operational schedule"],["Check-in and orientation"],["Beach leisure and dinner","Overnight island stay"]),d("2","Kavaratti Island",["Breakfast","Island sightseeing"],["Lagoon / beach leisure","Optional activity subject to operator"],["Sunset leisure","Dinner and stay"]),d("3","Lagoon & Leisure Day",["Breakfast","Lagoon experience subject to weather"],["Optional snorkelling/kayaking if booked and operational"],["Beach leisure","Dinner"]),d("4","Island Leisure",["Breakfast","Free morning"],["Optional marine activity / local sightseeing"],["Relaxed evening","Dinner and stay"]),d("5","Departure",["Breakfast and checkout"],["Island transfer to confirmed gateway"],["Tour concludes"])]}));

p.push(make({id:"ldp-agatti-3n4d",slug:"lakshadweep-agatti-island",title:"Lakshadweep Agatti Island Holiday",duration:"3 Nights / 4 Days",destination:"Agatti • Lakshadweep",category:"Island & Beach",themes:["Couple","Beach","Short Break"],pickup:"Agatti",short:"A compact Agatti island getaway with turquoise lagoon scenery.",overview:"A short Lakshadweep holiday centred on Agatti, with beach leisure and optional marine activities subject to permits, weather and local operations.",highlights:["Agatti","Lagoon","Beach leisure","Marine scenery"],bestTime:"October – May",itinerary:[d("1","Arrival Agatti",["Arrive Agatti","Resort transfer and check-in"],["Orientation and beach leisure"],["Sunset","Dinner and stay"]),d("2","Agatti Island Leisure",["Breakfast","Island/beach sightseeing"],["Lagoon leisure","Optional water activity subject to operation"],["Relaxed evening","Dinner"]),d("3","Lagoon Experience",["Breakfast","Optional snorkelling/kayaking"],["Beach and resort leisure"],["Sunset","Dinner and stay"]),d("4","Departure",["Breakfast and checkout"],["Transfer to Agatti airport / confirmed gateway"],["Tour concludes"])]}));

p.push(make({id:"ldp-honeymoon-4n5d",slug:"lakshadweep-honeymoon",title:"Romantic Lakshadweep Honeymoon",duration:"4 Nights / 5 Days",destination:"Agatti / Available Resort Island",category:"Honeymoon",themes:["Honeymoon","Couple","Romantic","Beach"],pickup:"Agatti / confirmed gateway",short:"A secluded tropical honeymoon with lagoon and beach leisure.",overview:"A romantic Lakshadweep package designed around the island and resort inventory available for the travel dates, with permits and transfers confirmed before booking.",highlights:["Lagoon views","Beach leisure","Couple time","Optional water activities"],bestTime:"October – May",itinerary:[d("1","Arrival & Island Transfer",["Arrive at confirmed gateway","Island/resort transfer"],["Check-in and rest"],["Romantic sunset","Dinner and stay"]),d("2","Beach Leisure",["Breakfast","Private/couple beach time"],["Optional activity subject to booking/weather"],["Sunset and dinner","Stay"]),d("3","Lagoon Day",["Breakfast","Lagoon excursion subject to operation"],["Optional snorkelling/kayaking"],["Couple leisure","Dinner"]),d("4","Romantic Leisure Day",["Breakfast","Free morning"],["Optional resort/marine experience"],["Farewell romantic dinner","Stay"]),d("5","Departure",["Breakfast and checkout"],["Transfer to confirmed gateway"],["Tour concludes"])]}));

p.push(make({id:"ldp-adventure-4n5d",slug:"lakshadweep-water-sports",title:"Lakshadweep Lagoon & Water Sports Escape",duration:"4 Nights / 5 Days",destination:"Agatti / Operational Island",category:"Adventure & Beach",themes:["Adventure","Friends","Beach","Water Sports"],pickup:"Agatti / confirmed gateway",short:"A lagoon-focused island break for travellers interested in optional marine activities.",overview:"An adventure-oriented Lakshadweep holiday with optional snorkelling, kayaking or other locally available activities; all activities depend on weather, safety rules and operator availability.",highlights:["Lagoon","Snorkelling optional","Kayaking optional","Beach leisure","Marine life"],difficulty:"Easy to Moderate",bestTime:"October – May",itinerary:[d("1","Arrival",["Arrive Agatti / confirmed gateway","Transfer and check-in"],["Safety briefing and beach leisure"],["Dinner and stay"]),d("2","Lagoon & Optional Activities",["Breakfast","Lagoon excursion"],["Snorkelling/kayaking subject to safety, weather and operator availability"],["Beach leisure","Dinner"]),d("3","Island Leisure",["Breakfast","Beach and local exploration"],["Optional marine activity"],["Relaxed evening","Dinner"]),d("4","Optional Marine Experience",["Breakfast","Confirmed water activity"],["Free afternoon"],["Sunset and dinner","Stay"]),d("5","Departure",["Breakfast and checkout"],["Transfer to confirmed gateway"],["Tour concludes"])]}));

export const lakshadweepPackages=p;
export default lakshadweepPackages;
