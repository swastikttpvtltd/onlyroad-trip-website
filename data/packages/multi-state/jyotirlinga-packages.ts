const d = (n:string,t:string,m:string[],a:string[],e:string[],distance?:string,driveTime?:string) => ({ day:`Day ${n}`, title:t, morning:m, afternoon:a, evening:e, distance, driveTime });
const commonThemes = ["Jyotirlinga", "Pilgrimage", "Spiritual", "Senior Citizen", "Family"];

const twoJyotirlinga = {
  id: "jyotirlinga-2-gujarat-3n4d",
  slug: "2-jyotirlinga-dwarka-somnath",
  state: "Gujarat",
  title: "2 Jyotirlinga Yatra – Dwarka & Somnath",
  duration: "3 Nights / 4 Days",
  destination: "Ahmedabad • Dwarka • Nageshwar • Somnath",
  category: "Pilgrimage",
  themes: commonThemes,
  short: "A focused Gujarat yatra covering Nageshwar and Somnath Jyotirlingas with Dwarkadhish darshan.",
  overview: "A compact Jyotirlinga pilgrimage designed for travellers who want two sacred Shiva shrines in one comfortable Gujarat circuit. The route combines Nageshwar and Somnath with Dwarkadhish and key local pilgrimage sites.",
  highlights: ["Nageshwar Jyotirlinga", "Somnath Jyotirlinga", "Dwarkadhish Temple", "Bet Dwarka", "Bhalka Tirth", "Triveni Sangam"],
  quickFacts: { pickup:"Ahmedabad", drop:"Ahmedabad", transport:"Private AC Vehicle", meals:"Breakfast & Dinner", hotelCategory:"3-Star Hotels / Similar", bestSeason:"October – March" },
  itinerary: [
    d("1","Ahmedabad – Dwarka",["Pickup from Ahmedabad Airport / Railway Station","Begin road journey to Dwarka"],["En-route meal / comfort stops at own expense","Hotel check-in"],["Dwarkadhish Temple evening darshan if time permits","Dinner and overnight in Dwarka"],"Approx. 440 KM","8–9 Hours"),
    d("2","Dwarka – Nageshwar – Bet Dwarka",["Breakfast","Dwarkadhish Temple darshan","Proceed to Nageshwar Jyotirlinga"],["Nageshwar darshan","Bet Dwarka / ferry access subject to local operations"],["Return to Dwarka","Dinner and overnight stay"],"Approx. 80–120 KM","Full-day circuit"),
    d("3","Dwarka – Porbandar – Somnath",["Breakfast and checkout","Drive towards Porbandar","Kirti Mandir / selected stop"],["Continue to Somnath","Hotel check-in"],["Somnath Jyotirlinga darshan / evening temple programme subject to official schedule","Dinner and overnight in Somnath"],"Approx. 235 KM","5–6 Hours including stops"),
    d("4","Somnath – Ahmedabad Departure",["Breakfast and checkout","Bhalka Tirth and Triveni Sangam"],["Return drive to Ahmedabad","Lunch at own expense"],["Airport / railway station drop","Yatra concludes"],"Approx. 410 KM","8–9 Hours")
  ],
  bestTime: "October – March", groupSize: "2-12 Persons", difficulty: "Easy"
};

const fourJyotirlinga = {
  id: "jyotirlinga-4-gujarat-mp-7n8d",
  slug: "4-jyotirlinga-gujarat-madhya-pradesh",
  state: "Multi-State",
  title: "4 Jyotirlinga Yatra – Gujarat & Madhya Pradesh",
  duration: "7 Nights / 8 Days",
  destination: "Ahmedabad • Dwarka • Somnath • Ujjain • Omkareshwar",
  category: "Pilgrimage",
  themes: commonThemes,
  short: "A west-central India circuit covering Nageshwar, Somnath, Mahakaleshwar and Omkareshwar Jyotirlingas.",
  overview: "A high-value four-Jyotirlinga circuit combining Gujarat and Madhya Pradesh. It is designed to reduce backtracking while adding Dwarka and selected spiritual highlights around Ujjain and Omkareshwar.",
  highlights: ["Nageshwar Jyotirlinga", "Somnath Jyotirlinga", "Mahakaleshwar Jyotirlinga", "Omkareshwar Jyotirlinga", "Dwarkadhish Temple", "Mahakal Lok"],
  quickFacts: { pickup:"Ahmedabad", drop:"Indore / Ahmedabad", transport:"Private AC Vehicle + Intercity Transfer", meals:"Breakfast & Dinner", hotelCategory:"3-Star Hotels / Similar", bestSeason:"October – March" },
  itinerary: [
    d("1","Ahmedabad – Dwarka",["Pickup and start for Dwarka"],["Road journey with comfort stops"],["Dwarkadhish darshan if arrival permits","Dinner and stay"],"Approx. 440 KM","8–9 Hours"),
    d("2","Dwarka – Nageshwar – Bet Dwarka",["Breakfast","Dwarkadhish darshan","Nageshwar Jyotirlinga"],["Bet Dwarka subject to ferry/weather","Gopi Talav / selected sites"],["Return and rest","Dinner and stay"],"Approx. 80–120 KM","Full day"),
    d("3","Dwarka – Porbandar – Somnath",["Breakfast and checkout","Drive to Porbandar"],["Kirti Mandir / selected stop","Continue to Somnath"],["Somnath Jyotirlinga darshan","Dinner and stay"],"Approx. 235 KM","5–6 Hours"),
    d("4","Somnath – Indore / Ujjain Transfer",["Breakfast and checkout","Intercity transfer as booked"],["Travel day with meal breaks"],["Hotel check-in and rest","Dinner and stay"],"Long intercity transfer","Subject to booked mode"),
    d("5","Ujjain – Mahakaleshwar",["Early morning darshan option / official booking as applicable","Breakfast"],["Mahakal Lok","Harsiddhi / Ram Ghat as time permits"],["Leisure","Dinner and stay"],"Local","Local sightseeing"),
    d("6","Ujjain – Omkareshwar",["Breakfast and drive to Omkareshwar"],["Omkareshwar Jyotirlinga darshan","Narmada ghats / Mamleshwar"],["Return / stay as booked","Dinner"],"Approx. 140 KM one way from Ujjain","Full day"),
    d("7","Omkareshwar – Indore",["Breakfast and checkout","Optional parikrama subject to time"],["Drive to Indore","Local leisure"],["Final shopping / rest","Dinner and stay"],"Approx. 80 KM","2–3 Hours"),
    d("8","Indore Departure",["Breakfast and checkout"],["Transfer to Indore Airport / Railway Station"],["Yatra concludes"])
  ],
  bestTime: "October – March", groupSize: "2-12 Persons", difficulty: "Easy"
};

const sixJyotirlinga = {
  id: "jyotirlinga-6-west-central-10n11d",
  slug: "6-jyotirlinga-west-central-india",
  state: "Multi-State",
  title: "6 Jyotirlinga Yatra – West & Central India",
  duration: "10 Nights / 11 Days",
  destination: "Ujjain • Omkareshwar • Dwarka • Somnath • Nashik • Grishneshwar",
  category: "Pilgrimage",
  themes: commonThemes,
  short: "A six-shrine circuit covering Mahakaleshwar, Omkareshwar, Nageshwar, Somnath, Trimbakeshwar and Grishneshwar.",
  overview: "A premium west-central Jyotirlinga circuit following a practical route through Madhya Pradesh, Gujarat and Maharashtra. The itinerary balances temple darshan with realistic road-transfer buffers.",
  highlights: ["Mahakaleshwar Jyotirlinga", "Omkareshwar Jyotirlinga", "Nageshwar Jyotirlinga", "Somnath Jyotirlinga", "Trimbakeshwar Jyotirlinga", "Grishneshwar Jyotirlinga"],
  quickFacts: { pickup:"Indore", drop:"Aurangabad / Mumbai", transport:"Private AC Vehicle + Intercity Transfer", meals:"Breakfast & Dinner", hotelCategory:"3-Star Hotels / Similar", bestSeason:"October – March" },
  itinerary: [
    d("1","Arrival Indore – Ujjain",["Pickup from Indore Airport / Railway Station","Transfer to Ujjain"],["Hotel check-in","Mahakal Lok if time permits"],["Rest / optional evening temple circuit","Dinner and stay"],"Approx. 55 KM","1.5–2 Hours"),
    d("2","Mahakaleshwar Darshan",["Early morning Mahakaleshwar darshan; special aarti only with official booking","Breakfast"],["Ujjain local spiritual circuit","Ram Ghat / Harsiddhi"],["Leisure","Dinner and stay"],"Local","Local sightseeing"),
    d("3","Ujjain – Omkareshwar – Indore",["Breakfast and checkout","Drive to Omkareshwar"],["Omkareshwar Jyotirlinga","Narmada ghats"],["Proceed to Indore","Dinner and stay"],"Approx. 140 KM + onward transfer","Full day"),
    d("4","Indore – Ahmedabad / Rajkot Transfer",["Breakfast and checkout","Intercity transfer as booked"],["Travel day with comfort breaks"],["Hotel check-in","Dinner and stay"],"Long intercity transfer","Subject to booked mode"),
    d("5","Ahmedabad / Rajkot – Dwarka",["Breakfast and proceed to Dwarka"],["Road journey","Hotel check-in"],["Dwarkadhish darshan if time permits","Dinner and stay"],"Approx. 230–440 KM depending on gateway","5–9 Hours"),
    d("6","Nageshwar – Bet Dwarka",["Breakfast","Nageshwar Jyotirlinga darshan"],["Bet Dwarka / ferry subject to operations","Gopi Talav / Rukmini Devi Temple"],["Return to Dwarka","Dinner and stay"],"Approx. 80–120 KM","Full day"),
    d("7","Dwarka – Porbandar – Somnath",["Breakfast and checkout","Drive to Porbandar"],["Kirti Mandir / selected stop","Continue to Somnath"],["Somnath Jyotirlinga darshan","Dinner and stay"],"Approx. 235 KM","5–6 Hours"),
    d("8","Somnath – Nashik Transfer",["Breakfast and checkout","Intercity transfer"],["Travel with comfort breaks"],["Nashik hotel check-in","Dinner and stay"],"Long intercity transfer","Subject to booked mode"),
    d("9","Trimbakeshwar – Nashik",["Breakfast","Trimbakeshwar Jyotirlinga darshan"],["Kushavarta / Panchavati as time permits","Lunch at own expense"],["Nashik leisure","Dinner and stay"],"Approx. 60 KM local circuit","2–4 Hours"),
    d("10","Nashik – Grishneshwar – Aurangabad",["Breakfast and checkout","Drive towards Ellora"],["Grishneshwar Jyotirlinga darshan","Ellora Caves subject to official opening"],["Hotel check-in / rest","Dinner and stay"],"Approx. 210 KM","5–6 Hours"),
    d("11","Aurangabad Departure",["Breakfast and checkout"],["Optional Daulatabad / Ellora buffer depending on departure","Airport / railway station transfer"],["Yatra concludes"])
  ],
  bestTime: "October – March", groupSize: "2-12 Persons", difficulty: "Moderate"
};

const twelveJyotirlinga = {
  id: "jyotirlinga-12-grand-18n19d",
  slug: "12-jyotirlinga-mahayatra-india",
  state: "Multi-State",
  title: "12 Jyotirlinga Mahayatra – Complete India Circuit",
  duration: "18 Nights / 19 Days",
  destination: "Delhi • Somnath • Dwarka • Maharashtra • South India • Varanasi • Deoghar • Kedarnath",
  category: "Pilgrimage",
  themes: commonThemes,
  short: "The flagship all-India Jyotirlinga pilgrimage covering all twelve sacred Shiva shrines.",
  overview: "A premium long-haul Mahayatra designed around all twelve Jyotirlingas. The route uses a mix of flights and private road transfers to avoid unnecessary backtracking, with dedicated buffer planning for Kedarnath.",
  highlights: ["All 12 Jyotirlingas", "Somnath & Nageshwar", "Maharashtra Jyotirlinga Circuit", "Rameshwaram & Mallikarjuna", "Kashi Vishwanath & Baidyanath", "Kedarnath"],
  quickFacts: { pickup:"Delhi", drop:"Delhi", transport:"Flights + Private AC Vehicle + Local Transfers", meals:"Breakfast & Dinner", hotelCategory:"3-Star Hotels / Similar", bestSeason:"October–March for most legs; Kedarnath subject to seasonal opening" },
  itinerary: [
    d("1","Delhi – Somnath",["Flight to Rajkot / Ahmedabad as booked","Road transfer to Somnath"],["Hotel check-in","Rest"],["Somnath Jyotirlinga darshan if schedule permits","Dinner and stay"],"Gateway-dependent","Flight + road"),
    d("2","Somnath – Dwarka",["Early darshan / temple programme subject to official schedule","Breakfast and checkout"],["Drive via Porbandar","Reach Dwarka"],["Dwarkadhish darshan","Dinner and stay"]),
    d("3","Nageshwar – Flight / Transfer to Maharashtra",["Nageshwar Jyotirlinga darshan","Breakfast"],["Bet Dwarka subject to operations","Transfer towards Maharashtra gateway"],["Hotel check-in / rest","Dinner and stay"]),
    d("4","Bhimashankar Jyotirlinga",["Early departure","Bhimashankar darshan"],["Forest / local spiritual circuit","Proceed towards Nashik"],["Hotel check-in","Dinner and stay"]),
    d("5","Trimbakeshwar Jyotirlinga",["Breakfast","Trimbakeshwar darshan"],["Kushavarta / Panchavati","Proceed towards Aurangabad"],["Rest","Dinner and stay"]),
    d("6","Grishneshwar Jyotirlinga – Ellora",["Breakfast","Grishneshwar darshan"],["Ellora Caves subject to official opening","Daulatabad if time permits"],["Proceed to gateway / rest","Dinner and stay"]),
    d("7","Maharashtra – Rameshwaram Transfer",["Breakfast and checkout","Flight / train transfer as booked"],["Intercity travel","Madurai gateway"],["Rameshwaram transfer and hotel check-in","Dinner and stay"]),
    d("8","Rameshwaram Jyotirlinga",["Early Ramanathaswamy Temple darshan","Breakfast"],["Dhanushkodi / Pamban Bridge subject to conditions","Local sightseeing"],["Agni Theertham / leisure","Dinner and stay"]),
    d("9","Rameshwaram – Srisailam / Hyderabad Transfer",["Breakfast and checkout","Flight/train as booked"],["Travel day","Hyderabad onward transfer"],["Srisailam hotel check-in","Dinner and stay"]),
    d("10","Mallikarjuna Jyotirlinga",["Breakfast","Mallikarjuna darshan"],["Bhramaramba Devi Temple","Krishna River / local sightseeing"],["Rest","Dinner and stay"]),
    d("11","Srisailam – Varanasi Transfer",["Breakfast and checkout","Flight connection as booked"],["Arrival Varanasi","Hotel check-in"],["Ganga Aarti subject to official schedule","Dinner and stay"]),
    d("12","Kashi Vishwanath Jyotirlinga",["Early darshan / official slot as booked","Breakfast"],["Kashi Corridor and ghats","Sarnath if time permits"],["Ganga Aarti / leisure","Dinner and stay"]),
    d("13","Varanasi – Deoghar",["Breakfast and checkout","Flight/road transfer as booked"],["Baidyanath Dham darshan","Temple complex"],["Hotel stay","Dinner"],"Gateway-dependent","Flight/road"),
    d("14","Deoghar – Delhi / Dehradun – Kedarnath Gateway",["Early transfer / flight as booked","Proceed to Rishikesh / Guptkashi"],["Mountain transfer","Hotel check-in"],["Briefing and early rest","Dinner and stay"],"Long transfer","Subject to route"),
    d("15","Kedarnath Jyotirlinga",["Helicopter / trek option as separately booked","Kedarnath darshan"],["Temple area / Bhairavnath subject to time and weather","Return to base if feasible"],["Overnight base / Kedarnath as booked","Dinner"],"Mountain route","Weather dependent"),
    d("16","Kedarnath Base – Rishikesh / Delhi",["Breakfast","Return transfer"],["Road journey","Rest / buffer"],["Hotel stay","Dinner"],"Mountain route","Weather dependent"),
    d("17","Buffer / Recovery Day",["Breakfast","Dedicated contingency for weather, transport or darshan disruptions"],["Optional local sightseeing if no recovery is required"],["Rest","Dinner and stay"]),
    d("18","Delhi – Final Buffer",["Breakfast and checkout","Transfer to Delhi"],["Optional Delhi spiritual / heritage stop","Airport / railway station buffer"],["Final overnight if required","Dinner"]),
    d("19","Delhi Departure",["Breakfast and checkout"],["Airport / railway station transfer"],["Mahayatra concludes"])
  ],
  bestTime: "October–March for most circuit legs; Kedarnath is strictly subject to official seasonal opening and weather conditions", groupSize: "2-12 Persons", difficulty: "Challenging"
};

export const jyotirlingaPackageLibrary = [twoJyotirlinga, fourJyotirlinga, sixJyotirlinga, twelveJyotirlinga];
export default jyotirlingaPackageLibrary;
