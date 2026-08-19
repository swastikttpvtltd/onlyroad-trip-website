const stay = "3-Star Hotels / Similar";
const meals = "Breakfast & Dinner";

type Day = { day: string; title: string; morning: string[]; afternoon: string[]; evening: string[] };

const mk = (x: any) => {
  const base = `/images/packages/multi-state/${x.slug}`;
  return {
    ...x,
    state: x.state || "Multi-State",
    category: "Jyotirlinga Yatra",
    themes: ["Jyotirlinga"],
    hero: x.hero || { image: `${base}/hero.jpg`, shortDescription: x.short },
    gallery: x.gallery || [1, 2, 3, 4, 5].map((n) => ({ image: `${base}/gallery${n}.jpg`, alt: `${x.title} – image ${n}` })),
    hotels: [{ name: stay, category: "3-Star", star: "3-Star Hotel" }],
    meals: ["Breakfast", "Dinner"],
    inclusions: ["3-Star hotel / similar accommodation", "Breakfast & Dinner", "Private AC cab for intercity transfers and sightseeing as per itinerary", "Airport / railway station pickup & drop where selected", "Jyotirlinga-focused itinerary"],
    exclusions: ["Flight / train fare – client selects and pays separately", "Personal expenses", "Special darshan / puja charges unless specifically included", "Travel insurance", "Anything not mentioned in inclusions"],
    groupSize: "2-30 Persons",
    difficulty: "Easy to Moderate",
    quickFacts: { pickup: x.pickup, drop: x.drop, transport: "Private AC Cab", meals, hotelCategory: stay, bestSeason: x.bestTime || "October – March" },
    customizable: true,
    travelModes: ["Flight", "Train", "Own Arrival"],
    travelModeNote: "Client can select Flight, Train or Own Arrival. Flight/train fare is not included in the displayed package price. Private AC cab remains part of the ground package.",
  };
};

const day = (n: number, title: string, morning: string[], afternoon: string[], evening: string[]): Day => ({ day: `Day ${n}`, title, morning, afternoon, evening });
const circuit = (x: any) => mk(x);

// STRICT THEME: only routes built around one or more of the 12 traditional Jyotirlingas.

export const northEastJyotirlinga = circuit({
  id: "jyotirlinga-north-east-6n7d", slug: "kashi-baidyanath-kedarnath-jyotirlinga-yatra", title: "Kashi – Baidyanath – Kedarnath Jyotirlinga Yatra", duration: "6 Nights / 7 Days", destination: "Kashi • Baidyanath Dham • Kedarnath", state: "Multi-State",
  short: "A dedicated three-Jyotirlinga circuit with private cab ground transport and a separate client choice of flight, train or own arrival.",
  overview: "A pilgrimage-only circuit connecting Kashi Vishwanath, Baba Baidyanath and Kedarnath. The ground package includes private AC cab transfers; clients can separately choose flight, train or own arrival for intercity access.",
  highlights: ["Kashi Vishwanath Jyotirlinga", "Baba Baidyanath Jyotirlinga", "Kedarnath Jyotirlinga", "Private AC Cab", "Flight / Train / Own Arrival choice", "Fully Customizable"], bestTime: "May – October for Kedarnath subject to shrine opening dates; October – March for Kashi/Baidyanath",
  pickup: "Varanasi / Deoghar / Haridwar / Delhi as customised", drop: "Haridwar / Delhi / Varanasi as customised",
  itinerary: [
    day(1,"Arrival Varanasi – Kashi Vishwanath Jyotirlinga",["Client arrives by selected flight, train or own arrangement","Private cab pickup"],["Hotel check-in","Kashi Vishwanath Jyotirlinga darshan subject to temple timings"],["Optional darshan as per temple schedule","Overnight Varanasi"]),
    day(2,"Kashi – Baidyanath Sector",["Breakfast and checkout","Private cab/selected intercity connection"],["Continue to Deoghar","Hotel check-in"],["Baba Baidyanath Jyotirlinga darshan subject to timings","Overnight Deoghar"]),
    day(3,"Baidyanath – Uttarakhand Sector",["Breakfast and checkout","Private cab to selected airport/railway station"],["Client-selected flight/train or own travel toward Delhi/Haridwar","Private cab connection"],["Overnight at selected halt"]),
    day(4,"Kedarnath Base",["Breakfast","Private cab to Kedarnath route base"],["Hotel check-in/rest","Prepare for pilgrimage"],["Briefing and rest","Overnight base"]),
    day(5,"Kedarnath Jyotirlinga Darshan",["Early start by approved trekking/helicopter option as selected","Kedarnath Jyotirlinga darshan subject to shrine operations"],["Return toward base","Rest"],["Overnight at confirmed sector"]),
    day(6,"Kedarnath Sector – Return",["Breakfast","Private cab return"],["Transfer to selected airport/railway station","Optional hotel halt if required"],["Overnight as customised"]),
    day(7,"Departure",["Breakfast and checkout","Private cab transfer"],["Client-selected airport/railway station/own departure"],["Tour concludes"]),
  ],
});

export const madhyaPradeshJyotirlinga = circuit({
  id:"jyotirlinga-mp-3n4d", slug:"mahakaleshwar-omkareshwar-jyotirlinga-yatra", title:"Mahakaleshwar – Omkareshwar Jyotirlinga Yatra", duration:"3 Nights / 4 Days", destination:"Ujjain • Omkareshwar • Indore", state:"Madhya Pradesh",
  short:"A focused two-Jyotirlinga Madhya Pradesh circuit with private cab ground transport.", overview:"A compact route covering only Mahakaleshwar and Omkareshwar Jyotirlingas. Client may separately choose flight, train or own arrival; private cab handles the ground itinerary.", highlights:["Mahakaleshwar Jyotirlinga","Omkareshwar Jyotirlinga","Private AC Cab","Flight / Train / Own Arrival","Customizable"], bestTime:"October – March", pickup:"Indore Airport / Railway Station", drop:"Indore Airport / Railway Station",
  itinerary:[
    day(1,"Indore – Ujjain | Mahakaleshwar",["Client arrival by selected mode","Private cab to Ujjain"],["Hotel check-in","Mahakaleshwar Jyotirlinga darshan subject to timings"],["Optional darshan","Overnight Ujjain"]),
    day(2,"Ujjain – Omkareshwar",["Breakfast and checkout","Final Mahakaleshwar darshan if required"],["Private cab to Omkareshwar","Hotel check-in"],["Omkareshwar Jyotirlinga and Mamleshwar darshan","Overnight Omkareshwar"]),
    day(3,"Omkareshwar Jyotirlinga",["Early darshan","Temple rituals subject to rules"],["Additional spiritual time","Rest"],["Evening darshan/aarti subject to schedule","Overnight"]),
    day(4,"Omkareshwar – Indore | Departure",["Breakfast and checkout","Private cab to Indore"],["Airport/railway station/own departure"],["Tour concludes"]),
  ],
});

export const gujaratJyotirlinga = circuit({
  id:"jyotirlinga-gujarat-3n4d", slug:"somnath-nageshwar-jyotirlinga-yatra", title:"Somnath – Nageshwar Jyotirlinga Yatra", duration:"3 Nights / 4 Days", destination:"Nageshwar • Somnath", state:"Gujarat",
  short:"A dedicated Gujarat Jyotirlinga circuit covering Nageshwar and Somnath only.", overview:"A pilgrimage-only route centred on Nageshwar and Somnath Jyotirlingas. Private AC cab is the ground transport; client separately chooses flight, train or own arrival.", highlights:["Nageshwar Jyotirlinga","Somnath Jyotirlinga","Private AC Cab","Flight / Train / Own Arrival","Customizable"], bestTime:"October – March", pickup:"Jamnagar / Rajkot / Ahmedabad as customised", drop:"Diu / Rajkot / Ahmedabad as customised",
  itinerary:[
    day(1,"Arrival – Nageshwar",["Selected flight/train/own arrival","Private cab pickup"],["Transfer to Nageshwar sector","Hotel check-in"],["Nageshwar Jyotirlinga darshan","Overnight"]),
    day(2,"Nageshwar – Somnath",["Breakfast","Final Nageshwar darshan if required"],["Private cab to Somnath","Hotel check-in"],["Somnath Jyotirlinga darshan/aarti subject to schedule","Overnight"]),
    day(3,"Somnath Jyotirlinga",["Breakfast","Somnath Jyotirlinga darshan"],["Additional darshan/puja time","Rest"],["Evening darshan subject to schedule","Overnight"]),
    day(4,"Somnath – Departure",["Breakfast and checkout","Private cab transfer"],["Selected airport/railway station or own departure"],["Tour concludes"]),
  ],
});

export const maharashtraJyotirlinga = circuit({
  id:"jyotirlinga-maharashtra-4n5d", slug:"maharashtra-three-jyotirlinga-yatra", title:"Maharashtra 3 Jyotirlinga Yatra", duration:"4 Nights / 5 Days", destination:"Bhimashankar • Trimbakeshwar • Grishneshwar", state:"Maharashtra",
  short:"A dedicated three-Jyotirlinga Maharashtra circuit with private AC cab ground transport.", overview:"A route covering only Bhimashankar, Trimbakeshwar and Grishneshwar Jyotirlingas. Client separately chooses flight, train or own arrival; cab remains the ground transport.", highlights:["Bhimashankar Jyotirlinga","Trimbakeshwar Jyotirlinga","Grishneshwar Jyotirlinga","Private AC Cab","Flight / Train / Own Arrival","Customizable"], bestTime:"October – March", pickup:"Mumbai / Pune / Nashik as customised", drop:"Aurangabad / Mumbai / Pune as customised",
  itinerary:[
    day(1,"Pune – Bhimashankar",["Selected arrival","Private cab transfer"],["Hotel check-in","Bhimashankar Jyotirlinga darshan"],["Spiritual time","Overnight"]),
    day(2,"Bhimashankar – Trimbakeshwar",["Breakfast","Checkout"],["Private cab to Nashik/Trimbakeshwar","Hotel check-in"],["Trimbakeshwar Jyotirlinga darshan","Overnight Nashik"]),
    day(3,"Trimbakeshwar Jyotirlinga",["Early darshan","Temple rituals subject to rules"],["Additional darshan/spiritual time","Rest"],["Optional evening darshan","Overnight"]),
    day(4,"Trimbakeshwar – Grishneshwar",["Breakfast and checkout","Private cab transfer"],["Hotel check-in","Grishneshwar Jyotirlinga darshan"],["Spiritual time","Overnight Aurangabad sector"]),
    day(5,"Grishneshwar – Departure",["Breakfast and checkout","Final darshan if required"],["Private cab to selected airport/railway station"],["Tour concludes"]),
  ],
});

export const southJyotirlinga = circuit({
  id:"jyotirlinga-south-5n6d", slug:"mallikarjuna-rameshwaram-jyotirlinga-yatra", title:"Mallikarjuna – Rameshwaram Jyotirlinga Yatra", duration:"5 Nights / 6 Days", destination:"Srisailam • Rameshwaram", state:"Multi-State",
  short:"A dedicated South India two-Jyotirlinga circuit with private cab ground transport and separate travel-mode choice.", overview:"A pilgrimage-only circuit covering Mallikarjuna and Rameshwaram Jyotirlingas. Client can choose flight, train or own arrival separately; private cab is used for the ground route.", highlights:["Mallikarjuna Jyotirlinga","Rameshwaram Jyotirlinga","Private AC Cab","Flight / Train / Own Arrival","Customizable"], bestTime:"October – March", pickup:"Hyderabad / Madurai as customised", drop:"Madurai / Hyderabad as customised",
  itinerary:[
    day(1,"Hyderabad – Srisailam",["Selected arrival at Hyderabad","Private cab to Srisailam"],["Hotel check-in","Rest"],["Mallikarjuna Jyotirlinga darshan","Overnight Srisailam"]),
    day(2,"Mallikarjuna Jyotirlinga",["Early darshan","Temple rituals subject to rules"],["Additional spiritual time","Rest"],["Evening darshan subject to schedule","Overnight"]),
    day(3,"Srisailam – Madurai Sector",["Breakfast and checkout","Private cab to selected gateway"],["Client-selected flight/train or own travel to Madurai","Private cab to Rameshwaram"],["Hotel check-in","Overnight Rameshwaram"]),
    day(4,"Rameshwaram Jyotirlinga",["Early Ramanathaswamy Jyotirlinga darshan","Theertham rituals subject to temple rules"],["Temple pilgrimage time","Rest"],["Optional evening darshan","Overnight"]),
    day(5,"Rameshwaram Jyotirlinga – Additional Darshan",["Breakfast","Further darshan/ritual time"],["Private cab local transfer","Spiritual time"],["Optional evening darshan","Overnight"]),
    day(6,"Departure",["Breakfast and checkout","Private cab transfer"],["Selected airport/railway station or own departure"],["Tour concludes"]),
  ],
});

export const twelveJyotirlinga = circuit({
  id:"jyotirlinga-12-18n19d", slug:"12-jyotirlinga-maha-yatra", title:"12 Jyotirlinga Maha Yatra", duration:"18 Nights / 19 Days", destination:"All 12 Traditional Jyotirlingas", state:"Multi-State",
  short:"A complete 12-Jyotirlinga pilgrimage with private cab ground transport and flexible flight/train/own-arrival choices between sectors.", overview:"The flagship Jyotirlinga pilgrimage covering all 12 traditional Jyotirlingas. The exact sequence, flights/trains and hotel nights can be customised around the traveller's departure city, season and pace.", highlights:["All 12 Jyotirlingas","Private AC Cab","Flight / Train / Own Arrival","Customizable","Multi-State Pilgrimage"], bestTime:"Best planned in seasonally suitable phases; Kedarnath subject to shrine opening dates", pickup:"Any major airport / railway station as customised", drop:"Any major airport / railway station as customised",
  itinerary:[
    day(1,"Varanasi – Kashi Vishwanath",["Selected arrival","Private cab pickup"],["Hotel check-in","Kashi Vishwanath Jyotirlinga darshan"],["Spiritual time","Overnight"]),
    day(2,"Kashi – Baidyanath Sector",["Breakfast","Checkout"],["Selected flight/train/own travel plus private cab","Deoghar check-in"],["Baba Baidyanath Jyotirlinga darshan","Overnight"]),
    day(3,"Baidyanath – Mahakaleshwar Sector",["Breakfast","Transfer"],["Selected intercity travel","Private cab to Ujjain"],["Hotel check-in","Overnight"]),
    day(4,"Mahakaleshwar",["Early Mahakaleshwar Jyotirlinga darshan","Breakfast"],["Additional darshan","Rest"],["Optional evening darshan","Overnight"]),
    day(5,"Omkareshwar",["Private cab to Omkareshwar","Breakfast"],["Omkareshwar Jyotirlinga darshan","Hotel check-in"],["Mamleshwar/spiritual time","Overnight"]),
    day(6,"Gujarat Sector – Nageshwar",["Breakfast and transfer","Selected travel mode"],["Private cab to Nageshwar","Check-in"],["Nageshwar Jyotirlinga darshan","Overnight"]),
    day(7,"Somnath",["Breakfast","Private cab transfer"],["Somnath Jyotirlinga darshan","Rest"],["Evening darshan/aarti subject to schedule","Overnight"]),
    day(8,"Maharashtra Sector",["Breakfast","Selected travel connection"],["Private cab to next Jyotirlinga sector","Hotel check-in"],["Rest","Overnight"]),
    day(9,"Bhimashankar",["Bhimashankar Jyotirlinga darshan","Breakfast"],["Spiritual time","Rest"],["Overnight"]),
    day(10,"Trimbakeshwar",["Private cab transfer","Breakfast"],["Trimbakeshwar Jyotirlinga darshan","Rest"],["Overnight Nashik"]),
    day(11,"Grishneshwar",["Breakfast","Private cab transfer"],["Grishneshwar Jyotirlinga darshan","Rest"],["Overnight Aurangabad sector"]),
    day(12,"South India Sector – Mallikarjuna",["Selected flight/train/own travel","Private cab"],["Srisailam check-in","Mallikarjuna Jyotirlinga darshan subject to timings"],["Rest","Overnight"]),
    day(13,"Mallikarjuna",["Early darshan","Breakfast"],["Additional spiritual time","Rest"],["Overnight"]),
    day(14,"Rameshwaram Sector",["Selected travel connection","Private cab"],["Rameshwaram check-in","Rest"],["Ramanathaswamy Jyotirlinga darshan subject to timings","Overnight"]),
    day(15,"Rameshwaram",["Early darshan","Theertham rituals subject to rules"],["Additional pilgrimage time","Rest"],["Overnight"]),
    day(16,"Kedarnath Sector",["Selected flight/train/own travel to Uttarakhand gateway","Private cab"],["Base hotel","Prepare for Kedarnath"],["Rest","Overnight"]),
    day(17,"Kedarnath Jyotirlinga",["Early trek/helicopter/approved route as selected","Kedarnath darshan subject to shrine operations"],["Return to base","Rest"],["Overnight base"]),
    day(18,"Kedarnath Sector – Return",["Breakfast","Private cab"],["Transfer to selected airport/railway station","Departure connection"],["Overnight if required"]),
    day(19,"Departure",["Breakfast","Private cab transfer"],["Selected departure city/own departure"],["12 Jyotirlinga Maha Yatra concludes"]),
  ],
});

const packages = [northEastJyotirlinga, madhyaPradeshJyotirlinga, gujaratJyotirlinga, maharashtraJyotirlinga, southJyotirlinga, twelveJyotirlinga];
export default packages;
