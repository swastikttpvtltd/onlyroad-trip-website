const stay = "3-Star Hotels / Similar";
const meals = "Breakfast & Dinner";

type Temple = { name: string; city: string; state: string };
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
    inclusions: ["3-Star hotel / similar accommodation", "Breakfast & Dinner", "Private AC cab for intercity transfers", "Airport / railway station transfers as selected", "Jyotirlinga darshan route as per itinerary"],
    exclusions: ["Flights / trains unless selected in the quotation", "Personal expenses", "Special darshan / puja charges unless specifically included", "Travel insurance", "Anything not mentioned in inclusions"],
    groupSize: "2-30 Persons",
    difficulty: "Easy to Moderate",
    quickFacts: {
      pickup: x.pickup,
      drop: x.drop,
      transport: "Flight + Cab / Train + Cab / Private Cab",
      meals,
      hotelCategory: stay,
      bestSeason: x.bestTime || "October – March",
    },
    customizable: true,
    travelModes: ["Flight + Cab", "Train + Cab", "Private Cab"],
  };
};

const day = (n: number, title: string, morning: string[], afternoon: string[], evening: string[]): Day => ({ day: `Day ${n}`, title, morning, afternoon, evening });

const circuit = (x: any) => mk(x);

// IMPORTANT: This theme is intentionally limited to packages whose route is built around one or more of the 12 traditional Jyotirlingas.
// No generic Ayodhya, Varanasi, Dwarka, Somnath, Rameshwaram, etc. package is included unless its itinerary explicitly covers the corresponding Jyotirlinga.

export const northEastJyotirlinga = circuit({
  id: "jyotirlinga-north-east-6n7d",
  slug: "kashi-baidyanath-kedarnath-jyotirlinga-yatra",
  title: "Kashi – Baidyanath – Kedarnath Jyotirlinga Yatra",
  duration: "6 Nights / 7 Days",
  destination: "Kashi • Baidyanath Dham • Kedarnath",
  state: "Multi-State",
  short: "A dedicated Jyotirlinga circuit connecting Kashi Vishwanath, Baba Baidyanath and Kedarnath with flight/train and private-cab flexibility.",
  overview: "A pilgrimage-only circuit built around three Jyotirlingas: Kashi Vishwanath, Baba Baidyanath and Kedarnath. The route can be customised around the traveller's preferred airport or railway entry point and hotel category.",
  highlights: ["Kashi Vishwanath Jyotirlinga", "Baba Baidyanath Jyotirlinga", "Kedarnath Jyotirlinga", "Flight + Cab option", "Train + Cab option", "Fully Customizable"],
  bestTime: "May – October for Kedarnath subject to shrine opening dates; October – March for Kashi/Baidyanath",
  pickup: "Varanasi / Deoghar / Haridwar / Delhi as customised",
  drop: "Haridwar / Delhi / Varanasi as customised",
  itinerary: [
    day(1, "Arrival Varanasi – Kashi Vishwanath Jyotirlinga", ["Arrival at Varanasi Airport / Railway Station by flight or train", "Private cab transfer to hotel"], ["Hotel check-in", "Kashi Vishwanath Jyotirlinga darshan subject to temple timings and booking"], ["Optional evening darshan as per temple schedule", "Overnight Varanasi"]),
    day(2, "Kashi Vishwanath – Deoghar Transfer", ["Breakfast and checkout", "Transfer towards Deoghar by selected flight/train/cab combination"], ["Continue journey and hotel check-in at Deoghar", "Rest before darshan"], ["Baba Baidyanath Jyotirlinga darshan subject to temple timings", "Overnight Deoghar"]),
    day(3, "Baidyanath – Kedarnath Sector Transfer", ["Early breakfast and checkout", "Transfer to selected airport/railway station"], ["Flight/train connection towards Delhi/Haridwar as per customised plan", "Private cab connection to Uttarakhand"], ["Hotel stay at the selected overnight halt", "Overnight"]),
    day(4, "Kedarnath Route – Base Transfer", ["Breakfast", "Drive towards Kedarnath route base as per season and selected transport plan"], ["Hotel check-in / rest", "Prepare for Kedarnath pilgrimage"], ["Briefing and rest", "Overnight at base"]),
    day(5, "Kedarnath Jyotirlinga Darshan", ["Early start for Kedarnath by approved route / helicopter or trekking option as selected", "Kedarnath Jyotirlinga darshan subject to shrine operations"], ["Return towards base according to selected route", "Rest"], ["Overnight at base / Kedarnath sector as per confirmed plan"]),
    day(6, "Kedarnath Sector – Return", ["Breakfast", "Return transfer from Kedarnath sector"], ["Private cab towards Haridwar / Delhi or selected airport/railway station"], ["Hotel stay if required by customised routing", "Overnight"]),
    day(7, "Departure", ["Breakfast and checkout", "Airport / railway station transfer"], ["Tour concludes as per selected departure city"], ["End of Jyotirlinga Yatra"]),
  ],
});

export const madhyaPradeshJyotirlinga = circuit({
  id: "jyotirlinga-mp-3n4d",
  slug: "mahakaleshwar-omkareshwar-jyotirlinga-yatra",
  title: "Mahakaleshwar – Omkareshwar Jyotirlinga Yatra",
  duration: "3 Nights / 4 Days",
  destination: "Ujjain • Omkareshwar • Indore",
  state: "Madhya Pradesh",
  short: "A focused Madhya Pradesh Jyotirlinga circuit covering Mahakaleshwar and Omkareshwar only.",
  overview: "A compact two-Jyotirlinga journey designed around Ujjain and Omkareshwar, with Indore airport/railway connectivity and private cab transfers.",
  highlights: ["Mahakaleshwar Jyotirlinga", "Omkareshwar Jyotirlinga", "Mamleshwar darshan", "Flight + Cab", "Train + Cab", "Customizable"],
  bestTime: "October – March",
  pickup: "Indore Airport / Railway Station",
  drop: "Indore Airport / Railway Station",
  itinerary: [
    day(1, "Indore – Ujjain | Mahakaleshwar Jyotirlinga", ["Arrival Indore by flight/train", "Private cab to Ujjain"], ["Hotel check-in", "Mahakaleshwar Jyotirlinga darshan subject to temple timings"], ["Optional evening darshan / temple time", "Overnight Ujjain"]),
    day(2, "Ujjain – Omkareshwar", ["Breakfast and checkout", "Final Mahakaleshwar darshan if required"], ["Private cab to Omkareshwar", "Hotel check-in"], ["Omkareshwar Jyotirlinga and Mamleshwar darshan subject to timings", "Overnight Omkareshwar"]),
    day(3, "Omkareshwar Jyotirlinga Darshan", ["Early darshan", "Temple rituals subject to temple rules"], ["Additional Jyotirlinga darshan / spiritual time", "Rest"], ["Evening aarti / darshan subject to schedule", "Overnight Omkareshwar"]),
    day(4, "Omkareshwar – Indore | Departure", ["Breakfast and checkout", "Private cab to Indore"], ["Airport / railway station drop"], ["Tour concludes"]),
  ],
});

export const gujaratJyotirlinga = circuit({
  id: "jyotirlinga-gujarat-3n4d",
  slug: "somnath-nageshwar-jyotirlinga-yatra",
  title: "Somnath – Nageshwar Jyotirlinga Yatra",
  duration: "3 Nights / 4 Days",
  destination: "Dwarka • Nageshwar • Somnath",
  state: "Gujarat",
  short: "A dedicated Gujarat Jyotirlinga circuit covering Nageshwar and Somnath without unrelated sightseeing.",
  overview: "A pilgrimage-only Gujarat route centred on Nageshwar Jyotirlinga and Somnath Jyotirlinga, with Jamnagar/Rajkot/Diu/Ahmedabad connectivity customised around the traveller.",
  highlights: ["Nageshwar Jyotirlinga", "Somnath Jyotirlinga", "Jyotirlinga darshan", "Flight + Cab", "Train + Cab", "Customizable"],
  bestTime: "October – March",
  pickup: "Jamnagar / Rajkot / Ahmedabad Airport or Railway Station",
  drop: "Diu / Rajkot / Ahmedabad as customised",
  itinerary: [
    day(1, "Arrival – Nageshwar Sector", ["Arrival by flight/train at selected gateway", "Private cab to Dwarka/Nageshwar sector"], ["Hotel check-in", "Nageshwar Jyotirlinga darshan subject to temple timings"], ["Spiritual time / rest", "Overnight"]),
    day(2, "Nageshwar – Somnath", ["Breakfast", "Final Nageshwar darshan if required"], ["Private cab transfer to Somnath", "Hotel check-in"], ["Somnath Jyotirlinga darshan / evening aarti subject to schedule", "Overnight Somnath"]),
    day(3, "Somnath Jyotirlinga Darshan", ["Breakfast", "Somnath Jyotirlinga darshan"], ["Additional temple darshan / puja time as selected", "Rest"], ["Evening darshan subject to temple schedule", "Overnight Somnath"]),
    day(4, "Somnath – Departure", ["Breakfast and checkout", "Private cab to selected airport/railway station"], ["Departure transfer"], ["Tour concludes"]),
  ],
});

export const maharashtraJyotirlinga = circuit({
  id: "jyotirlinga-maharashtra-4n5d",
  slug: "maharashtra-three-jyotirlinga-yatra",
  title: "Maharashtra 3 Jyotirlinga Yatra",
  duration: "4 Nights / 5 Days",
  destination: "Bhimashankar • Trimbakeshwar • Grishneshwar",
  state: "Maharashtra",
  short: "A dedicated Maharashtra circuit covering Bhimashankar, Trimbakeshwar and Grishneshwar Jyotirlingas.",
  overview: "A three-Jyotirlinga Maharashtra pilgrimage with Pune/Mumbai/Aurangabad connectivity and private cab transfers. The route is built only around the three Jyotirlingas covered in the circuit.",
  highlights: ["Bhimashankar Jyotirlinga", "Trimbakeshwar Jyotirlinga", "Grishneshwar Jyotirlinga", "Flight + Cab", "Train + Cab", "Customizable"],
  bestTime: "October – March",
  pickup: "Mumbai / Pune / Nashik Airport or Railway Station",
  drop: "Aurangabad / Mumbai / Pune as customised",
  itinerary: [
    day(1, "Pune – Bhimashankar", ["Arrival at Pune by flight/train", "Private cab to Bhimashankar"], ["Hotel check-in", "Bhimashankar Jyotirlinga darshan subject to temple timings"], ["Spiritual time / rest", "Overnight Bhimashankar"]),
    day(2, "Bhimashankar – Trimbakeshwar", ["Breakfast and checkout", "Final darshan if required"], ["Private cab to Nashik/Trimbakeshwar", "Hotel check-in"], ["Trimbakeshwar Jyotirlinga darshan subject to timings", "Overnight Nashik"]),
    day(3, "Trimbakeshwar Jyotirlinga Darshan", ["Early darshan", "Temple rituals subject to rules"], ["Additional darshan / spiritual time", "Rest"], ["Optional evening darshan subject to schedule", "Overnight Nashik"]),
    day(4, "Trimbakeshwar – Grishneshwar", ["Breakfast and checkout", "Private cab towards Grishneshwar"], ["Hotel check-in", "Grishneshwar Jyotirlinga darshan subject to temple timings"], ["Spiritual time / rest", "Overnight Aurangabad sector"]),
    day(5, "Grishneshwar – Departure", ["Breakfast and checkout", "Final Grishneshwar darshan if required"], ["Airport / railway station transfer"], ["Tour concludes"]),
  ],
});

export const southJyotirlinga = circuit({
  id: "jyotirlinga-south-5n6d",
  slug: "mallikarjuna-rameshwaram-jyotirlinga-yatra",
  title: "Mallikarjuna – Rameshwaram Jyotirlinga Yatra",
  duration: "5 Nights / 6 Days",
  destination: "Srisailam • Mallikarjuna • Rameshwaram",
  state: "Multi-State",
  short: "A South India Jyotirlinga circuit covering Mallikarjuna and Rameshwaram with flight/train connectivity and private cab transfers.",
  overview: "A pilgrimage-only South India circuit covering Mallikarjuna Jyotirlinga at Srisailam and Ramanathaswamy Jyotirlinga at Rameshwaram. Flights/trains between sectors can be customised.",
  highlights: ["Mallikarjuna Jyotirlinga", "Ramanathaswamy Jyotirlinga", "Flight + Cab", "Train + Cab", "Private Cab", "Customizable"],
  bestTime: "October – March",
  pickup: "Hyderabad / Madurai Airport or Railway Station",
  drop: "Madurai / Hyderabad as customised",
  itinerary: [
    day(1, "Hyderabad – Srisailam", ["Arrival Hyderabad by flight/train", "Private cab to Srisailam"], ["Hotel check-in", "Rest"], ["Mallikarjuna Jyotirlinga darshan subject to temple timings", "Overnight Srisailam"]),
    day(2, "Mallikarjuna Jyotirlinga Darshan", ["Early darshan", "Bhramaramba Devi darshan only if selected separately"], ["Additional Mallikarjuna spiritual time", "Rest"], ["Evening darshan subject to schedule", "Overnight Srisailam"]),
    day(3, "Srisailam – Madurai Sector", ["Breakfast and checkout", "Transfer to Hyderabad airport/railway station"], ["Flight/train to Madurai as customised", "Private cab to Rameshwaram"], ["Hotel check-in", "Overnight Rameshwaram"]),
    day(4, "Rameshwaram Jyotirlinga Darshan", ["Early Ramanathaswamy Jyotirlinga darshan", "Theertham rituals subject to temple rules"], ["Temple complex and pilgrimage time"], ["Optional evening darshan", "Overnight Rameshwaram"]),
    day(5, "Rameshwaram – Additional Darshan", ["Breakfast", "Additional Ramanathaswamy temple time / puja as selected"], ["Spiritual rest", "Optional temple darshan"], ["Overnight Rameshwaram"]),
    day(6, "Rameshwaram – Madurai | Departure", ["Breakfast and checkout", "Private cab to Madurai"], ["Airport / railway station drop"], ["Tour concludes"]),
  ],
});

export const mahaJyotirlinga = circuit({
  id: "jyotirlinga-all-12-18n19d",
  slug: "12-jyotirlinga-maha-yatra",
  title: "12 Jyotirlinga Maha Yatra",
  duration: "18 Nights / 19 Days",
  destination: "Somnath • Nageshwar • Omkareshwar • Mahakaleshwar • Kedarnath • Kashi • Baidyanath • Bhimashankar • Trimbakeshwar • Grishneshwar • Mallikarjuna • Rameshwaram",
  state: "Multi-State",
  short: "The complete 12 Jyotirlinga pilgrimage across India, designed as a fully customizable flight/train + cab circuit.",
  overview: "A dedicated Maha Yatra covering all 12 traditional Jyotirlingas and no unrelated holiday sector. The route can be rearranged around flight schedules, train connectivity, shrine opening dates, preferred hotel category and pace.",
  highlights: ["All 12 Jyotirlingas", "Multi-state pilgrimage", "Flight + Cab option", "Train + Cab option", "Private Cab option", "Fully Customizable"],
  bestTime: "Subject to individual shrine opening dates; a full-circuit plan is best built around the seasonal access of Kedarnath",
  pickup: "Major Airport / Railway Station as customised",
  drop: "Major Airport / Railway Station as customised",
  itinerary: [
    day(1, "Somnath – Somnath Jyotirlinga", ["Arrival at selected Gujarat gateway", "Private cab transfer"], ["Hotel check-in", "Somnath Jyotirlinga darshan"], ["Evening darshan subject to temple schedule", "Overnight"]),
    day(2, "Nageshwar Jyotirlinga", ["Breakfast and transfer to Nageshwar sector", "Nageshwar Jyotirlinga darshan"], ["Spiritual time", "Transfer / rest"], ["Overnight"]),
    day(3, "Gujarat – Omkareshwar Sector", ["Breakfast and checkout", "Airport/railway transfer as required"], ["Flight/train + cab connection to Indore", "Hotel check-in"], ["Omkareshwar Jyotirlinga darshan if timings permit", "Overnight"]),
    day(4, "Omkareshwar Jyotirlinga", ["Early darshan", "Mamleshwar darshan"], ["Additional spiritual time", "Transfer towards Ujjain"], ["Overnight Ujjain"]),
    day(5, "Mahakaleshwar Jyotirlinga", ["Early Mahakaleshwar Jyotirlinga darshan", "Temple rituals subject to booking"], ["Additional darshan / rest"], ["Overnight Ujjain"]),
    day(6, "Ujjain – Kedarnath Sector", ["Breakfast and checkout", "Transfer to selected airport/railway station"], ["Flight/train towards Uttarakhand gateway", "Private cab connection"], ["Overnight base"]),
    day(7, "Kedarnath Route", ["Early start as per approved seasonal route", "Proceed towards Kedarnath"], ["Kedarnath Jyotirlinga darshan subject to shrine opening and access"], ["Overnight Kedarnath sector/base as confirmed"]),
    day(8, "Kedarnath – Kashi Sector", ["Return from Kedarnath route", "Transfer towards airport/railway station"], ["Flight/train connection to Varanasi as customised"], ["Hotel check-in / rest", "Overnight Varanasi"]),
    day(9, "Kashi Vishwanath Jyotirlinga", ["Early Kashi Vishwanath Jyotirlinga darshan", "Temple rituals subject to booking"], ["Additional darshan / spiritual time"], ["Evening darshan subject to schedule", "Overnight Varanasi"]),
    day(10, "Kashi – Baidyanath Sector", ["Breakfast and checkout", "Transfer to Deoghar by selected flight/train/cab combination"], ["Hotel check-in", "Rest"], ["Baba Baidyanath Jyotirlinga darshan subject to timings", "Overnight Deoghar"]),
    day(11, "Baidyanath – Maharashtra Sector", ["Breakfast and checkout", "Transfer to airport/railway station"], ["Flight/train connection to Pune/Mumbai", "Private cab to selected overnight halt"], ["Rest", "Overnight"]),
    day(12, "Bhimashankar Jyotirlinga", ["Early Bhimashankar Jyotirlinga darshan", "Temple rituals subject to timings"], ["Spiritual time", "Transfer towards Nashik"], ["Overnight Nashik"]),
    day(13, "Trimbakeshwar Jyotirlinga", ["Early Trimbakeshwar Jyotirlinga darshan", "Kushavarta ritual time subject to rules"], ["Additional darshan / rest"], ["Overnight Nashik"]),
    day(14, "Grishneshwar Jyotirlinga", ["Breakfast and checkout", "Private cab to Grishneshwar"], ["Grishneshwar Jyotirlinga darshan", "Rest"], ["Overnight Aurangabad sector"]),
    day(15, "Maharashtra – Srisailam Sector", ["Breakfast and checkout", "Airport/railway transfer"], ["Flight/train connection towards Hyderabad", "Private cab to Srisailam"], ["Hotel check-in", "Overnight Srisailam"]),
    day(16, "Mallikarjuna Jyotirlinga", ["Early Mallikarjuna Jyotirlinga darshan", "Temple rituals subject to timings"], ["Additional spiritual time", "Rest"], ["Overnight Srisailam"]),
    day(17, "Srisailam – Rameshwaram", ["Breakfast and checkout", "Transfer to Hyderabad airport/railway station"], ["Flight/train to Madurai as customised", "Private cab to Rameshwaram"], ["Hotel check-in", "Overnight Rameshwaram"]),
    day(18, "Rameshwaram Jyotirlinga", ["Early Ramanathaswamy Jyotirlinga darshan", "Theertham rituals subject to temple rules"], ["Additional temple darshan / spiritual time"], ["Final pilgrimage evening", "Overnight Rameshwaram"]),
    day(19, "Rameshwaram – Madurai | Departure", ["Breakfast and checkout", "Private cab to Madurai"], ["Airport / railway station drop"], ["12 Jyotirlinga Maha Yatra concludes"]),
  ],
});

const jyotirlingaPackages = [
  northEastJyotirlinga,
  madhyaPradeshJyotirlinga,
  gujaratJyotirlinga,
  maharashtraJyotirlinga,
  southJyotirlinga,
  mahaJyotirlinga,
];

export default jyotirlingaPackages;
