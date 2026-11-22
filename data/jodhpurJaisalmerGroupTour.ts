import type { DetailedItineraryDay } from "./itineraryDetails";

// A separate group-tour draft. The existing private Jodhpur-Jaisalmer package is unchanged.
export const jodhpurJaisalmerGroupTour = {
  slug: "jodhpur-jaisalmer-group-tour",
  packageId: "ORT-GROUP-JODHPUR-JAISALMER-4N5D",
  title: "Jodhpur & Jaisalmer Group Tour",
  duration: "4 Nights / 5 Days in Rajasthan",
  overallDuration: "6 Nights / 7 Days including Delhi road travel",
  bookingMode: "offline",
  departureDates: ["2026-12-15", "2026-12-23"],
  departureSummary: "15 and 23 December 2026; the first and third Thursday of every month from January 2027.",
  groupRates: { sharingRates: [
    { type: "Triple Sharing", price: 21000 },
    { type: "Double Sharing", price: 23000 },
  ] },
  destination: "Jodhpur · Jaisalmer · Tanot Mata · Sam Sand Dunes",
  route: "Delhi → Jodhpur → Jaisalmer → Tanot Mata → Sam → Jaisalmer → Jodhpur → Delhi",
  overview: "Travel from the Blue City to the Golden Fort and the Thar dunes, combining Marwar heritage, Tanot Mata darshan and a desert evening. The return through Jodhpur leaves a final sightseeing day before the overnight road journey to Delhi.",
  hero: "/images/packages/rajasthan/jodhpur-jaisalmer/group-landscape.jpg",
  highlights: [
    { title: "Mehrangarh & Jaswant Thada", detail: "Explore Jodhpur’s hilltop fort, palace galleries and marble royal memorial, with time to appreciate Marwar’s architecture rather than just take a roadside photograph." },
    { title: "The living Golden Fort", detail: "Walk through Jaisalmer Fort’s lanes and public palace-museum areas. The Jain temple interiors are scheduled for the morning after the Sam visit to allow for their shorter visiting hours." },
    { title: "Havelis & Gadisar Lake", detail: "See Patwon Ki Haveli’s ornate merchant architecture, the street-facing façades of Nathmal and Salim Singh havelis, and Gadisar’s lakeside ghats and gateway." },
    { title: "Tanot Mata & the desert route", detail: "Set aside an early-start excursion for Tanot Mata Temple. Longewala is a conditional detour only when local access and the planned arrival time at Sam permit it." },
    { title: "Sam dunes & desert sunset", detail: "Visit the Sam area for desert scenery and sunset, with a camp stay when available or a Jaisalmer hotel otherwise. Desert safaris, camel rides and other activities are optional and paid directly to the local provider; they are not included in the package." },
    { title: "More of Jodhpur on the return", detail: "Use the final city day for Umaid Bhawan’s public museum, Mandore Garden, Rao Jodha Desert Rock Park and Toorji Ka Jhalra before the overnight road journey to Delhi." },
  ],
  gallery: [
    { image: "/images/packages/rajasthan/jodhpur-jaisalmer/gallery1.jpg", alt: "Jodhpur heritage on the Rajasthan group route" },
    { image: "/images/packages/rajasthan/jodhpur-jaisalmer/gallery2.jpg", alt: "Jaisalmer sandstone architecture" },
    { image: "/images/packages/rajasthan/jodhpur-jaisalmer/gallery3.jpg", alt: "Jaisalmer merchant haveli detail" },
    { image: "/images/packages/rajasthan/jodhpur-jaisalmer/gallery4.jpg", alt: "Thar Desert and Sam dunes" },
    { image: "/images/packages/rajasthan/jodhpur-jaisalmer/gallery5.jpg", alt: "Desert sunset near Jaisalmer" },
  ],
  hotels: [
    { location: "Jodhpur", name: "Karni Bhawan Heritage Hotel or similar", nights: 2, detail: "One night on arrival and one night after returning from Jaisalmer." },
    { location: "Jaisalmer city", name: "The Golden House or similar", nights: 1, detail: "City stay after the Jodhpur–Jaisalmer transfer." },
    { location: "Sam / Jaisalmer", name: "Sam Sand Dunes Desert Camp or similar / The Golden House or similar", nights: 1, detail: "Camp stay when available; otherwise a Jaisalmer hotel with the return transfer after the desert programme." },
  ],
  meals: ["4 breakfasts", "4 lunches", "4 dinners"],
  inclusions: [
    "Four overnight stays on a double- or triple-sharing basis: two in Jodhpur, one in Jaisalmer city and one at Sam camp or a Jaisalmer hotel.",
    "4 breakfasts on Days 3–6, with 4 lunches and 4 dinners on Days 2–5; served as a buffet, set menu or arranged group meal.",
    "Return overnight road travel between Delhi and Jodhpur by Volvo coach, bus or Tempo Traveller, allocated according to group size, plus shared transfers and sightseeing in Rajasthan as listed in the itinerary.",
    "Tour-coordinator assistance for the scheduled Rajasthan programme, driver allowance, route tolls and parking for the allocated group vehicle.",
    "Two bottles of packaged drinking water per person on each Rajasthan sightseeing day.",
    "5% GST included in the quoted per-person price.",
  ],
  exclusions: [
    "Flights, trains, travel to the Delhi boarding point and individual transfers outside the confirmed group pickup/drop arrangements.",
    "Monument, palace-museum, Jain temple and park entry tickets, camera fees, audio guides and private local guides.",
    "All recreational activities, including desert and jeep safaris, camel rides, boating, quad biking, parasailing and separately ticketed cultural programmes. These are optional and must be arranged and paid for directly with the local provider. Only Road Trip does not arrange or include these activities.",
    "Visits to the international border, any required permits and special local transport. A visit to Longewala is not guaranteed.",
    "Breakfast on Rajasthan arrival day, lunch and dinner on the final Rajasthan day, meals during both Delhi road journeys, snacks and extra beverages.",
    "Room upgrades, extra nights, early check-in or late checkout outside the confirmed hotel arrangement, laundry, shopping, porterage and personal expenses.",
    "Travel insurance and additional expenses arising from medical needs or unplanned route, transport or accommodation changes.",
  ],
};

export const jodhpurJaisalmerDays: DetailedItineraryDay[] = [
  {
    day: 1, title: "Delhi departure · Overnight journey to Jodhpur",
    morning: [], afternoon: [],
    evening: ["Report at the confirmed Delhi group-vehicle boarding point, meet the group and begin the overnight road journey to Jodhpur. Keep your photo ID, a light overnight bag and essential medication with you. The boarding location and reporting time will be provided with the confirmed departure."],
    overnightStay: "Overnight road travel · not a hotel night", meals: "Transit meals at own expense",
  },
  {
    day: 2, title: "Jodhpur arrival, Mehrangarh & Blue City",
    morning: ["Arrive in Jodhpur, meet the Rajasthan coordinator and transfer to the hotel. Allow time to freshen up and rest after the overnight journey; room access is subject to the confirmed check-in arrangements. The Blue City grew beneath the fort established by Rao Jodha in the fifteenth century."],
    afternoon: ["After the arranged lunch, visit Mehrangarh Fort. Walk its historic gateways and public museum route, with palace rooms such as Moti Mahal and Phool Mahal and displays of royal objects, arms and palanquins where open. Allow roughly two hours rather than treating the fort as a quick exterior stop.", "Continue to Jaswant Thada before its closing time. The finely worked white-marble cenotaph honours Maharaja Jaswant Singh II; its grounds and portrait displays provide a quieter introduction to Marwar’s rulers. If road arrival is late, move this paid visit to the final Jodhpur day."],
    evening: ["Explore the Clock Tower and Sardar Market area and take a short walk through accessible Blue City lanes. This is a living neighbourhood and trading area: keep the group together and respect residents’ privacy. Return for dinner."],
    overnightStay: "Jodhpur · hotel night 1 of 4", meals: "Lunch & dinner",
    notes: ["Fort and museum visits must finish within current visitor hours; arrival delays are handled by moving a stop to the return day, not by promising an after-hours visit."],
  },
  {
    day: 3, title: "Jodhpur → Jaisalmer, Golden Fort & Gadisar",
    morning: ["Have an early breakfast and leave Jodhpur around 6:30–7:00 AM, with packing completed beforehand. Travel towards Jaisalmer through western Rajasthan, with comfort breaks. The drive covers approximately 300 km and takes 5–6 hours before sightseeing; the final drive time depends on stops and traffic."],
    afternoon: ["On reaching Jaisalmer, make a short stop at Bada Bagh to see the royal cenotaphs before lunch and hotel check-in. These carved memorials recall the city’s former rulers and make an architectural introduction to the Golden City.", "Explore Jaisalmer Fort’s publicly accessible palace-museum route, lanes and viewpoints. Founded by Rawal Jaisal in the twelfth century, this sandstone citadel is part of UNESCO’s Hill Forts of Rajasthan listing and remains a living neighbourhood. Private residences are not part of the visit."],
    evening: ["Continue to Gadisar Lake, a historic water-storage landscape edged by ghats, shrines and a carved gateway. Enjoy lakeside time near sunset, then browse the old-city market before dinner. Boating, if operating, is optional and separately paid."],
    overnightStay: "Jaisalmer city · hotel night 2 of 4", meals: "Breakfast, lunch & dinner",
    notes: ["Jain temple interiors and the havelis are reserved for the morning after Sam, so their visiting windows are not missed after a long transfer."],
  },
  {
    day: 4, title: "Tanot Mata → Sam dunes & sunset",
    morning: ["Have an early breakfast or collect a packed breakfast and leave at about 6:00 AM for Tanot Mata Temple, around 120 km from Jaisalmer. The temple is closely associated with local faith and the border region’s wartime history. Allow time for darshan and the permitted visitor areas; follow all local security and photography instructions."],
    afternoon: ["Return via the Lodurva side for a short visit to the Jain temple, known for its carved stonework and association with Jaisalmer’s earlier capital. Have an arranged lunch and continue towards Sam for the desert sunset.", "Longewala War Memorial is an alternative detour only if the route is cleared and the group’s timings allow it; it replaces the Lodurva stop to keep the day manageable. The memorial recalls the 1971 battle. An actual international-border visit is a different activity and is not included."],
    evening: ["Enjoy the Sam desert surroundings and sunset. Desert and jeep safaris, camel rides and other recreational activities are optional. Guests must arrange and pay for them directly with the local provider; Only Road Trip does not arrange or include them. Dinner follows the included meal plan. Overnight at Sam camp when available; if camp accommodation is unavailable, return with the group to the allocated Jaisalmer hotel after the desert visit."],
    overnightStay: "Sam camp or Jaisalmer hotel · night 3 of 4", meals: "Breakfast, lunch & dinner",
    optionalActivities: ["Longewala memorial detour subject to access and available driving time; not a promised stop.", "Desert and jeep safaris, camel rides, quad biking, parasailing and separately ticketed cultural programmes are optional and must be arranged and paid for directly with the local provider."],
    notes: ["This is a long excursion day. Tanot darshan and the Sam sunset visit take priority over a Longewala detour; Lodurva and Longewala are alternative routes, not two guaranteed visits.", "Optional activities depend on the local provider’s availability, safety instructions and charges."],
  },
  {
    day: 5, title: "Kuldhara, Jain temples & havelis → Jodhpur",
    morning: ["Leave Sam early after breakfast and make a short visit to Kuldhara on the return towards Jaisalmer, when visitor access is open. The abandoned Paliwal settlement preserves lanes and building remains; stories of an overnight disappearance are local tradition, not established historical fact.", "Reach the fort area in the morning for its Jain temple complex, known for intricately carved stone interiors. Respect current entry rules, attire and worship hours. Continue to Patwon Ki Haveli for an interior visit: its richly worked merchant houses reflect the prosperity of the old trading city."],
    afternoon: ["See the street-facing façades of Nathmal Ki Haveli and Salim Singh Ki Haveli on the old-town walk; private or separately managed interiors are not promised. Have lunch, then leave Jaisalmer by roughly 1:00–1:30 PM for the return to Jodhpur. Keep this afternoon for the 5–6-hour road transfer rather than adding another distant attraction."],
    evening: ["Arrive in Jodhpur, check in and have dinner. Keep the evening restful after the city walk and drive. Jodhpur’s remaining sights are scheduled for the following day before the overnight Delhi road journey."],
    overnightStay: "Jodhpur · hotel night 4 of 4", meals: "Breakfast, lunch & dinner",
    notes: ["If staying in Jaisalmer instead of Sam, the coordinator schedules Kuldhara during the transfers between the city and Sam; the stop is not repeated.", "Temple visitor windows are reconfirmed locally. Keep the morning sequence flexible so Jain interiors are visited while access is permitted."],
  },
  {
    day: 6, title: "Jodhpur palaces, gardens & Delhi return",
    morning: ["Have breakfast and check out. Store your luggage in the group vehicle. Visit the public museum section of Umaid Bhawan Palace, which introduces the royal residence and its twentieth-century context. The private palace residence and hotel areas are not included.", "Continue to Mandore Garden, the former capital area of Marwar, to see its landscaped grounds and royal memorial architecture. This is a garden-and-cenotaph visit; separately managed museum interiors depend on current access."],
    afternoon: ["After a separately paid lunch, explore Rao Jodha Desert Rock Park on its designated walking trail. The restored rocky landscape introduces the native plants and ecology of the Thar’s margins; choose a shorter trail if the group needs an easier pace.", "Visit Toorji Ka Jhalra, the historic stepwell near the old city, viewing the architecture safely from the permitted area. Use the return-day window to complete any fort or Jaswant Thada visit moved from arrival day, adjusting the rock-park walk rather than missing the scheduled departure."],
    evening: ["Collect luggage and transfer to the confirmed Jodhpur group-vehicle boarding point with sufficient time before departure. Begin the overnight journey to Delhi by the allocated Volvo coach, bus or Tempo Traveller. Dinner and other transit meals are separately paid."],
    overnightStay: "Overnight road travel · return transit night", meals: "Breakfast",
    notes: ["No additional hotel night is included after checkout. The local sequence follows current opening hours and the confirmed vehicle reporting time."],
  },
  {
    day: 7, title: "Delhi arrival · Tour concludes",
    morning: ["Arrive at the confirmed Delhi drop-off point and collect your luggage. The group tour ends on arrival. Keep onward connections flexible because the overnight road arrival is an estimate, not a guaranteed reporting time."],
    afternoon: [], evening: [], overnightStay: "Tour ends · no overnight stay", meals: "No meals included",
  },
];

export const jodhpurJaisalmerFaqs = [
  { title: "Your route & sightseeing", items: [
    { question: "Why does the itinerary cover seven calendar days?", paragraphs: ["The Rajasthan programme contains five days and four accommodation nights. Delhi departure is the previous evening and the return group vehicle reaches Delhi the following morning: two road-transit nights are additional, giving six nights / seven calendar days overall."] },
    { question: "Which places are covered in each city?", paragraphs: ["Jodhpur: Mehrangarh, Jaswant Thada, Blue City lanes, Clock Tower/Sardar Market, Umaid Bhawan’s public museum, Mandore Garden, Rao Jodha Desert Rock Park and Toorji Ka Jhalra. Jaisalmer: Bada Bagh, fort and public palace-museum route, Jain temple interiors, Patwon Ki Haveli, Nathmal and Salim Singh façades, Gadisar Lake and Kuldhara. Tanot Mata, the Lodurva return route and the Sam desert programme have their own excursion day; Longewala is a conditional alternative to Lodurva."] },
    { question: "Are Longewala and the actual border included?", paragraphs: ["Tanot Mata is planned. Longewala is a conditional detour, not a guaranteed inclusion, because it adds driving and must fit the Sam sunset programme. The actual international-border visit is not included and requires separate permission and arrangements."] },
  ] },
  { title: "Transport & departures", items: [
    { question: "Where does the trip start and finish?", paragraphs: ["Delhi to Delhi. Both long-distance legs are overnight road journeys by Volvo coach, bus or Tempo Traveller, allocated according to group size; Rajasthan transfers and sightseeing are by shared bus or Tempo Traveller. Delhi departures are available on 15 and 23 December 2026, then on the first and third Thursday of every month from January 2027. The team will provide the boarding point and reporting time when confirming your booking."] },
    { question: "Can I join in Jodhpur instead?", paragraphs: ["Joining directly in Jodhpur needs a separate confirmed quotation and meeting arrangement. Do not assume the Delhi-inclusive price automatically applies or that a private airport transfer is included."] },
  ] },
  { title: "Hotels, meals & sharing", items: [
    { question: "How are the accommodation nights divided?", paragraphs: ["Two nights in Jodhpur on separate parts of the route, one night in Jaisalmer city and one night at Sam camp or a Jaisalmer hotel. The two overnight road journeys are additional road-transit nights, not hotel nights."] },
    { question: "What if the desert camp is unavailable?", paragraphs: ["A Jaisalmer hotel is used for that night with the desert evening and return transport arranged. The listed properties or similar accommodation will be used. Any replacement hotel or resort will be in the same or a higher category. The selected camp/hotel arrangement will be stated before booking."] },
    { question: "Are lunch, breakfast and dinner included?", paragraphs: ["Yes: four breakfasts, four lunches and four dinners during the Rajasthan stay, following the day-wise meal plan. Arrival-day breakfast, final-day lunch/dinner and meals on Delhi road journeys are separately paid."] },
    { question: "Which sharing options will be offered?", paragraphs: ["Triple sharing is ₹21,000/- and double sharing is ₹23,000/- per person, including 5% GST. Quad sharing is not offered. Triple rooms may use an extra bed or mattress according to the confirmed property’s room arrangement."] },
  ] },
  { title: "Booking & pricing", items: [
    { question: "Which departures are available, and how do I book?", paragraphs: ["Delhi departures are available on 15 and 23 December 2026. From January 2027, departures run on the first and third Thursday of each month. Contact the Only Road Trip team to confirm your seats and sharing. This tour is booked offline through the team; online checkout and online payment booking are not offered on this page."] },
    { question: "What is the per-person price?", paragraphs: ["Starting from ₹21,000/- per person on triple sharing; double sharing is ₹23,000/- per person. Both rates include 5% GST. The final bill depends on the selected sharing and number of travellers; optional activities and paid entrance tickets remain separate."] },
    { question: "Are desert safaris, camel rides and other activities included?", paragraphs: ["No. Desert and jeep safaris, camel rides, boating, quad biking, parasailing and other recreational activities are not included or arranged by Only Road Trip. If you choose an activity, arrange and pay for it directly with the local provider. The scheduled Sam visit, accommodation and meals listed in the itinerary remain included. Paid monument tickets, private guides and separately ticketed cultural programmes are also extra."] },
  ] },
  { title: "Policies & travel preparation", items: [
    { question: "Which booking and cancellation terms apply?", paragraphs: ["The published booking, cancellation, refund and group-traveller terms linked below apply, together with the departure-specific quotation and supplier terms shared by the team before you confirm your booking with the team."] },
    { question: "What should I carry for the desert and heritage walks?", paragraphs: ["Carry government photo ID, comfortable walking shoes, sun protection, a warm layer for desert evenings and your regular medication. The forts, havelis and temples involve uneven surfaces and steps; discuss any mobility requirements before booking."] },
  ] },
];

export const jodhpurJaisalmerSources = [
  "https://www.tourism.rajasthan.gov.in/jodhpur.html",
  "https://www.tourism.rajasthan.gov.in/jaisalmer.html",
  "https://www.tourism.rajasthan.gov.in/suggested-itineraries.html",
  "https://www.mehrangarh.org/visit/jaswant-thada/",
  "https://www.mehrangarh.org/visit/",
  "https://whc.unesco.org/en/list/247/",
  "https://www.incredibleindia.gov.in/en/rajasthan/jaisalmer/tanot-mata-temple",
  "https://www.karnihotels.com/",
  "https://thegoldenhousejsm.com/",
  "https://samsanddunesdesertcamp.com/",
];




// Two departures per month, rather than an endless fortnightly sequence that
// would occasionally create three departures in a five-Thursday month.
export function getJodhpurDeparturesForMonth(month: string): string[] {
  if (!/^\d{4}-\d{2}$/.test(month)) return [];
  const [year, monthNumber] = month.split("-").map(Number);
  if (monthNumber < 1 || monthNumber > 12 || month < "2026-12") return [];
  if (month === "2026-12") return [...jodhpurJaisalmerGroupTour.departureDates];
  const weekday = new Date(Date.UTC(year, monthNumber - 1, 1)).getUTCDay();
  const firstThursday = 1 + (4 - weekday + 7) % 7;
  return [firstThursday, firstThursday + 14].map(day => month + "-" + String(day).padStart(2, "0"));
}

export type JodhpurDepartureMonth = { month: string; dates: string[] };

export function getJodhpurDepartureCalendar(now = new Date()): JodhpurDepartureMonth[] {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  const start = today.slice(0, 7) < "2026-12" ? "2026-12" : today.slice(0, 7);
  const [year, month] = start.split("-").map(Number);
  const calendar: JodhpurDepartureMonth[] = [];
  for (let offset = 0; calendar.length < 13; offset++) {
    const cursor = new Date(Date.UTC(year, month - 1 + offset, 1));
    const key = cursor.toISOString().slice(0, 7);
    const dates = getJodhpurDeparturesForMonth(key).filter(date => date >= today);
    if (dates.length) calendar.push({ month: key, dates });
  }
  return calendar;
}
