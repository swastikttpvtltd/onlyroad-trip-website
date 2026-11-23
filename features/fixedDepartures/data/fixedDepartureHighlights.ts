import { uniqueTourHighlights } from "@/features/fixedDepartures/data/tourHighlights";
import {expandedAttractions,expandedFactSources} from "@/features/fixedDepartures/data/fixedDepartureExpanded";
import type { DepartureReview } from "@/features/fixedDepartures/data/fixedDepartureDetails";

type Highlight = { title: string; description: string };
const varanasiArrival = ["Ganga Aarti — Varanasi’s evening riverfront ceremony brings together lamps, prayer and devotional music beside the Ganga. Watch the ceremony from the designated ghat area after the arrival transfer; the flight must allow sufficient time to reach it."];
const prayagraj = ["Triveni Sangam, Prayagraj — This sacred confluence brings together the Ganga and Yamuna and, in Hindu tradition, the unseen Saraswati. Visit the riverfront on the journey to Ayodhya; the included standard boat ride operates only when conditions and permissions allow."];
const ayodhya = ["Shri Ram Janmabhoomi Mandir — This temple in Ayodhya is dedicated to Lord Ram and stands at a site revered by devotees as his birthplace. Visit for darshan in the morning, allowing time for the applicable entry arrangements, security and queues.", "Saryu riverfront — Ayodhya’s riverbank is an important setting for pilgrimage and devotional life. Spend time by the river after the temple visit before beginning the return journey to Varanasi; an evening Saryu Aarti is not scheduled on this day."];
const varanasiTemples = [
  "Shri Kashi Vishwanath Temple — Dedicated to Lord Shiva, this shrine is a central focus of worship in Kashi. Begin the local sightseeing day with darshan, allowing time for security and queues.",
  "Kaal Bhairav Temple — Devotees traditionally honour Kaal Bhairav as the guardian, or Kotwal, of Kashi. Visit this longstanding place of worship as part of the morning temple circuit.",
  "Sankat Mochan Hanuman Temple — This well-known Varanasi shrine is dedicated to Lord Hanuman. Spend time in prayer during the afternoon temple circuit, following the temple’s visitor arrangements.",
  "Tulsi Manas Mandir — Dedicated to Lord Ram, the temple has verses from the Ramcharitmanas inscribed on its walls. Look for these inscriptions during the visit and explore its connection with the city’s devotional literature.",
  "Shri Vishwanath Mandir, BHU — Located inside Banaras Hindu University, this modern temple was planned by Pandit Madan Mohan Malaviya and built by the Birlas. Visit the campus shrine during the afternoon circuit; it is distinct from the old-city Kashi Vishwanath Temple.",
  "Varanasi local markets — The city’s craft traditions include Banarasi silk weaving and textiles. Enjoy free time browsing fabrics and local crafts, then meet at the agreed pickup point; purchases are at your own expense.",
];
const points: Record<string, string[][]> = {
  "varanasi-prayagraj-ayodhya": [varanasiArrival, prayagraj, ayodhya, varanasiTemples, []],
  "varanasi-ayodhya-prayagraj-gaya-bodh-gaya": [varanasiArrival, prayagraj, ayodhya, ["Mahabodhi Temple, Bodh Gaya — This UNESCO World Heritage temple complex marks the place associated with the Buddha’s enlightenment beneath the Bodhi Tree. Explore the temple precinct within the visitor-access window after reaching Bodh Gaya, then stay overnight in town."], ["Vishnupad Temple, Gaya — Dedicated to Lord Vishnu, this shrine beside the Phalgu River is known for a sacred footprint revered by devotees. Visit where entry is permitted before the return drive to Varanasi; pind-daan, priests and ritual materials are separate services."], []],
};
export function getDayAttractions(tour: DepartureReview, index: number): string[] {
  return (points[tour.slug] ?? expandedAttractions[tour.slug])?.[index] ?? [];
}
export function getTourHighlights(tour: DepartureReview): Highlight[] {
  if (!tour.slug.startsWith("varanasi")) return uniqueTourHighlights((expandedAttractions[tour.slug] ?? []).flat().filter(text=>!/^Journey|^Return through|^Srinagar arrival|^Haridwar to|^Kedarnath return/.test(text))).slice(0,9).map(text=>{const [title,...rest]=text.split(" — ");return {title,description:rest.join(" — ")};});
  const highlights: Highlight[] = [
    { title: "Varanasi to Varanasi", description: "Start and finish in Varanasi, with an overnight stay in Ayodhya along the way." },
    { title: "Evening Ganga Aarti", description: "Experience the riverfront ceremony on arrival day, with a suitably timed flight." },
    { title: "Prayagraj and Triveni Sangam", description: "Visit the confluence en route to Ayodhya; the standard boat ride is subject to safe operation and permissions." },
    { title: "Shri Ram Janmabhoomi and Saryu", description: "Visit the temple and riverfront before returning to Varanasi on Day 3." },
  ];
  if (tour.nights === 4) highlights.push(
    { title: "Kashi Vishwanath and Kaal Bhairav", description: "Begin the Varanasi local day with these temple visits." },
    { title: "Sankat Mochan, Tulsi Manas and BHU temple", description: "Continue the local temple circuit with breaks between visits." },
    { title: "Varanasi market time", description: "Spend the evening shopping for Banarasi textiles and local crafts at your own expense." },
  );
  else highlights.push(
    { title: "Mahabodhi Temple, Bodh Gaya", description: "Explore the temple precinct within visitor hours and stay overnight in Bodh Gaya." },
    { title: "Vishnupad Temple, Gaya", description: "Visit where entry is permitted, then return to Varanasi for the final night. Ritual services are separate." },
  );
  return highlights;
}

export const attractionFactSources = [
  ...expandedFactSources,
  { title: "Varanasi district — temple descriptions", url: "https://varanasi.nic.in/temples-of-importance/" },
  { title: "Prayagraj district — Triveni Sangam", url: "https://prayagraj.nic.in/" },
  { title: "Uttar Pradesh Religious Affairs — Ram Janmabhoomi Temple", url: "https://www.upitims.in/temple/details/shri-ram-janmabhoomi-temple" },
  { title: "Incredible India — Ayodhya riverfront", url: "https://www.incredibleindia.gov.in/en/uttar-pradesh/ayodhya/ram-ki-paidi" },
  { title: "Incredible India — Varanasi", url: "https://www.incredibleindia.gov.in/en/uttar-pradesh/varanasi" },
  { title: "Incredible India — Gaya and Mahabodhi", url: "https://www.incredibleindia.gov.in/en/bihar/gaya" },
  { title: "Bihar Tourism — Vishnupad Temple", url: "https://tourism.bihar.gov.in/in/en/home/destinations/gaya/vishnupad-temple" },
];
