import { buildCustomerOverview } from "./packageCustomerCopy";
import { isWeekendEscape } from "./weekendEscape";
import gujaratPackages from "./packages/gujarat/gujarat-packages";
import rajasthanPackages from "./packages/rajasthan/rajasthan-packages";
import uttarakhandPackages from "./packages/uttarakhand/uttarakhand-packages";
import uttarPradeshPackages from "./packages/uttar-pradesh/uttar-pradesh-packages";
import newMultiStatePackages from "./packages/multi-state/new-multi-state-packages";
import kashmirPackages from "./packages/kashmir/kashmir-packages";
import himachalPackages from "./packages/himachal-packages";
import ladakhPackages from "./packages/ladakh/ladakh-packages";
import punjabPackages from "./packages/punjab/punjab-packages";
import keralaPackages from "./packages/kerala/kerala-packages";
import goaPackages from "./packages/goa/goa-packages";
import maharashtraPackages from "./packages/maharashtra/maharashtra-packages";
import madhyaPradeshPackages from "./packages/madhya-pradesh/madhya-pradesh-packages";
import sikkimPackages from "./packages/sikkim/sikkim-packages";
import westBengalPackages from "./packages/west-bengal/west-bengal-packages";
import assamPackages from "./packages/assam/assam-packages";
import meghalayaPackages from "./packages/meghalaya/meghalaya-packages";
import karnatakaPackages from "./packages/karnataka/karnataka-packages";
import tamilNaduPackages from "./packages/tamil-nadu/tamil-nadu-packages";
import andamanPackages from "./packages/andaman-nicobar/andaman-nicobar-packages";
import andhraPradeshPackages from "./packages/andhra-pradesh/andhra-pradesh-packages";
import { defaultPackageExclusions } from "./defaultPackageExclusions";
import { defaultPackageInclusions } from "./defaultPackageInclusions";
import { makePackageRates } from "./packagePricing";
import { getGroupSharingRates } from "./groupTourPricing";
import { getBestTime } from "./packageBestTime";
import { packageMedia } from "./packageMedia";
import { getDetailedItinerary } from "./itineraryDetails";

const stateWisePackages = [
  ...gujaratPackages,
  ...rajasthanPackages,
  ...andamanPackages,
  ...punjabPackages,
  ...keralaPackages,
  ...goaPackages,
  ...maharashtraPackages,
  ...madhyaPradeshPackages,
  ...sikkimPackages,
  ...westBengalPackages,
  ...assamPackages,
  ...meghalayaPackages,
  ...karnatakaPackages,
  ...tamilNaduPackages,
  ...andhraPradeshPackages,
];

const rawPackages = [
  ...stateWisePackages,
  ...ladakhPackages,
  ...himachalPackages,
  ...kashmirPackages,
  ...newMultiStatePackages,
  ...uttarPradeshPackages,
  ...uttarakhandPackages,
];

const standardHotels = [{ name: "3-Star Hotel / Similar", category: "3-Star", star: "3-Star Hotel" }];
const standardMeals = [
  "Buffet Breakfast at hotel (subject to hotel service format and occupancy)",
  "Buffet Dinner at hotel (subject to hotel service format and occupancy)",
];

const makePackageId = (id: unknown, slug?: unknown, title?: unknown) => {
  const source = id ?? slug ?? title ?? "package";
  const safeId = String(source).trim();
  return `ORT-${safeId.toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
};

const packageStateFolders: Record<string, string> = {
  "Gujarat": "gujarat",
  "Rajasthan": "rajasthan",
  "Uttarakhand": "uttarakhand",
  "Uttar Pradesh": "uttar-pradesh",
  "Kashmir": "kashmir",
  "Jammu & Kashmir": "kashmir",
  "Himachal Pradesh": "himachal-pradesh",
  "Ladakh": "ladakh",
  "Punjab": "punjab",
  "Kerala": "kerala",
  "Goa": "goa",
  "Maharashtra": "maharashtra",
  "Madhya Pradesh": "madhya-pradesh",
  "Sikkim": "sikkim",
  "West Bengal": "west-bengal",
  "Assam": "assam",
  "Meghalaya": "meghalaya",
  "Karnataka": "karnataka",
  "Tamil Nadu": "tamil-nadu",
  "Andaman & Nicobar Islands": "andaman-nicobar",
  "Andaman and Nicobar Islands": "andaman-nicobar",
  "Andhra Pradesh": "andhra-pradesh",
};

const getPackageImageFolder = (pkg: any) => {
  // Reuse the existing Chopta photos without duplicating image files.
  if (pkg.slug === "chopta-tungnath-weekend-group-tour") return "uttarakhand/chopta-tungnath";
  const stateFolder = packageStateFolders[String(pkg.state ?? "").trim()];
  return stateFolder ? `${stateFolder}/${pkg.slug}` : `multi-state/${pkg.slug}`;
};

const getPackageMedia = (mediaFolder: string, title: string) =>
  (packageMedia[mediaFolder] ?? []).map((image, index) => ({
    image,
    alt: `${title} – image ${index + 1}`,
  }));

const clean = (value: unknown) => String(value ?? "").replace(/\s+/g, " ").trim();
const unique = (items: string[]) => Array.from(new Set(items.filter(Boolean)));

const destinationSearchAliases: Array<{ match: string[]; aliases: string[] }> = [
  { match: ["varanasi", "kashi", "banaras"], aliases: ["Varanasi Tour", "Kashi Yatra", "Kashi Tour", "Banaras Tour", "Varanasi Yatra"] },
  { match: ["ayodhya", "ram mandir"], aliases: ["Ayodhya Tour", "Ayodhya Yatra", "Ram Mandir Yatra", "Ram Mandir Tour"] },
  { match: ["mathura", "vrindavan"], aliases: ["Mathura Vrindavan Tour", "Krishna Janmabhoomi Yatra", "Vrindavan Yatra", "Braj Yatra"] },
  { match: ["kedarnath"], aliases: ["Kedarnath Yatra", "Kedarnath Dham Yatra", "Kedarnath Tour"] },
  { match: ["badrinath"], aliases: ["Badrinath Yatra", "Badrinath Dham Yatra", "Badrinath Tour"] },
  { match: ["char dham", "chardham"], aliases: ["Char Dham Yatra", "Chardham Yatra", "Char Dham Tour"] },
  { match: ["haridwar"], aliases: ["Haridwar Yatra", "Haridwar Tour", "Ganga Aarti Tour"] },
  { match: ["rishikesh"], aliases: ["Rishikesh Tour", "Rishikesh Trip", "Yoga Capital of India Tour"] },
  { match: ["vaishno devi", "katra"], aliases: ["Vaishno Devi Yatra", "Mata Vaishno Devi Tour", "Katra Tour"] },
  { match: ["amarnath"], aliases: ["Amarnath Yatra", "Amarnath Dham Yatra", "Amarnath Tour"] },
  { match: ["dwarka", "somnath"], aliases: ["Dwarka Somnath Tour", "Dwarka Yatra", "Somnath Yatra", "Gujarat Pilgrimage Tour"] },
  { match: ["goa"], aliases: ["Goa Tour Package", "Goa Holiday Package", "Goa Beach Holiday"] },
  { match: ["kashmir", "srinagar", "gulmarg", "pahalgam", "sonamarg"], aliases: ["Kashmir Tour Package", "Kashmir Holiday", "Srinagar Tour", "Gulmarg Tour", "Kashmir Family Tour"] },
  { match: ["ladakh", "leh"], aliases: ["Leh Ladakh Tour", "Ladakh Road Trip", "Leh Ladakh Bike Trip", "Ladakh Holiday"] },
  { match: ["manali"], aliases: ["Manali Tour Package", "Manali Holiday", "Manali Trip from Delhi"] },
  { match: ["shimla"], aliases: ["Shimla Tour Package", "Shimla Manali Tour", "Shimla Holiday"] },
  { match: ["dharamshala", "dharamsala"], aliases: ["Dharamshala Tour", "McLeod Ganj Tour", "Dharamshala Holiday"] },
  { match: ["dalhousie"], aliases: ["Dalhousie Tour", "Dalhousie Khajjiar Tour", "Dalhousie Holiday"] },
  { match: ["rajasthan", "jaipur", "udaipur", "jaisalmer", "jodhpur"], aliases: ["Rajasthan Tour Package", "Rajasthan Holiday", "Rajasthan Heritage Tour", "Golden Triangle Tour"] },
  { match: ["agra", "taj mahal"], aliases: ["Agra Tour", "Taj Mahal Tour", "Agra Jaipur Delhi Tour", "Golden Triangle Tour"] },
  { match: ["kerala", "munnar", "alleppey", "alappuzha", "kovalam"], aliases: ["Kerala Tour Package", "Kerala Holiday", "Kerala Backwaters Tour", "Munnar Tour", "Alleppey Houseboat Tour"] },
  { match: ["andaman", "havelock", "swaraj dweep", "shaheed dweep", "neil island"], aliases: ["Andaman Tour Package", "Andaman Holiday", "Havelock Island Tour", "Swaraj Dweep Tour", "Island Holiday"] },
  { match: ["sikkim", "gangtok"], aliases: ["Sikkim Tour Package", "Gangtok Tour", "Sikkim Holiday", "North Sikkim Tour"] },
  { match: ["darjeeling"], aliases: ["Darjeeling Tour Package", "Darjeeling Gangtok Tour", "Darjeeling Holiday"] },
  { match: ["meghalaya", "shillong", "cherrapunji", "sohra"], aliases: ["Meghalaya Tour Package", "Shillong Tour", "Cherrapunji Tour", "Northeast India Tour"] },
  { match: ["assam", "kaziranga", "guwahati"], aliases: ["Assam Tour Package", "Kaziranga National Park Tour", "Guwahati Tour", "Northeast India Tour"] },
  { match: ["punjab", "amritsar", "golden temple"], aliases: ["Punjab Tour Package", "Amritsar Tour", "Golden Temple Yatra", "Golden Temple Tour"] },
  { match: ["karnataka", "coorg", "kodagu", "mysore", "mysuru"], aliases: ["Karnataka Tour Package", "Coorg Tour", "Mysore Tour", "South India Tour"] },
  { match: ["tamil nadu", "rameswaram", "madurai", "ooty", "kodaikanal"], aliases: ["Tamil Nadu Tour Package", "Rameswaram Tour", "Madurai Temple Tour", "South India Pilgrimage Tour"] },
  { match: ["maharashtra", "mumbai", "lonavala", "shirdi", "nashik"], aliases: ["Maharashtra Tour Package", "Mumbai Tour", "Lonavala Tour", "Shirdi Tour", "Maharashtra Pilgrimage Tour"] },
  { match: ["madhya pradesh", "khajuraho", "ujjain", "omkareshwar", "kanha", "bandhavgarh"], aliases: ["Madhya Pradesh Tour Package", "Khajuraho Tour", "Ujjain Mahakal Yatra", "Omkareshwar Yatra", "Madhya Pradesh Wildlife Tour"] },
  { match: ["gujarat", "rann of kutch", "kutch", "ahmedabad", "statue of unity"], aliases: ["Gujarat Tour Package", "Rann of Kutch Tour", "Kutch Holiday", "Statue of Unity Tour", "Gujarat Heritage Tour"] },
  { match: ["andhra pradesh", "tirupati", "visakhapatnam", "vizag", "araku"], aliases: ["Andhra Pradesh Tour Package", "Tirupati Balaji Yatra", "Tirupati Tour", "Vizag Tour"] },
];

const getPackageSeoAliases = (pkg: any) => {
  const haystack = [pkg.title, pkg.destination, pkg.state, pkg.overview, ...(Array.isArray(pkg.highlights) ? pkg.highlights : [])]
    .map(clean)
    .join(" ")
    .toLowerCase();
  const aliases = destinationSearchAliases
    .filter(({ match }) => match.some((term) => haystack.includes(term.toLowerCase())))
    .flatMap(({ aliases }) => aliases);
  return unique([clean(pkg.title), clean(pkg.destination), clean(pkg.state), ...aliases]);
};

const buildDetailedPackageDescription = buildCustomerOverview;

// These weekends count the outbound road journey as Night 1 and only one hotel night.
const overnightWeekendSlugs = new Set([
  "jibhi-weekend-group-tour",
  "kasol-weekend-group-tour",
  "kanatal-weekend-group-tour",
  "mcleodganj-weekend-group-tour",
  "udaipur-weekend-group-tour",
  "nainital-weekend-group-tour",
  "chopta-tungnath-weekend-group-tour",
  "jim-corbett-weekend"
]);

export const packages = rawPackages.map((original) => {
  const isEscape = isWeekendEscape(original);
  const isOvernightWeekend = overnightWeekendSlugs.has(String(original.slug));

  const packageId = makePackageId(original.id, original.slug, original.title);
  const pkg = {
    ...original,
    ...(isOvernightWeekend ? {
      hotels: [{ name: isEscape ? "3-Star Hotel / Similar — 2 nights (Nights 2 & 3)" : "3-Star Hotel / Similar — 1 night (Night 2)", category: "3-Star", star: "3-Star Hotel" }],
      meals: isEscape ? ["2 dinners at hotel on Days 2 & 3", "2 breakfasts at hotel on Days 3 & 4"] : ["1 dinner at hotel on Day 2", "1 breakfast at hotel on Day 3"],
      quickFacts: {
        ...original.quickFacts,
        pickup: "Delhi",
        drop: original.quickFacts?.drop || "Delhi",
        meals: isEscape ? "2 dinners (Days 2 & 3) & 2 breakfasts (Days 3 & 4)" : "1 dinner (Day 2) & 1 breakfast (Day 3)",
        hotelCategory: isEscape ? "3-Star Hotel / Similar — 2 nights (Nights 2 & 3)" : "3-Star Hotel / Similar — 1 night (Night 2)",
      },
    } : {}),
    itinerary: getDetailedItinerary(original.slug, packageId, original.itinerary ?? []),
  };
  const groupRates = makePackageRates(pkg);
  const sharingRates = getGroupSharingRates(pkg) ?? groupRates.sharingRates;
  const displayPrice = sharingRates?.length
    ? Math.max(...sharingRates.map((rate) => rate.price))
    : groupRates[2];
  const mediaFolder = getPackageImageFolder(pkg);
  const gallery = getPackageMedia(mediaFolder, pkg.title);
  const cover = gallery[0]?.image ?? "/images/package-placeholder.jpg";
  const detailedDescription = buildDetailedPackageDescription(pkg);
  const seoKeywords = getPackageSeoAliases(pkg);

  return {
    ...pkg,
    packageId,
    price: displayPrice,
    displayPriceBasis: sharingRates?.length ? "Double Sharing" : "2 Travellers",
    groupRates,
    bestTime: getBestTime(pkg),
    bestTimeToVisit: getBestTime(pkg),
    seoKeywords,
    priceBasis: isEscape
      ? "Per Person | 5% GST Included | 2 hotel nights (Nights 2 & 3) | 2 Dinners & 2 Breakfasts | Standard Transport & Sightseeing"
      : isOvernightWeekend
      ? "Per Person | 5% GST Included | 1 hotel night (Night 2) | 1 Dinner & 1 Breakfast | Standard Transport & Sightseeing"
      : "Per Person | 5% GST Included | 3-Star Hotel / Similar | Breakfast & Dinner | Standard Transport & Sightseeing",
    image: cover,
    hero: {
      ...(pkg.hero || {}),
      image: cover,
      shortDescription: pkg.hero?.shortDescription ?? pkg.short ?? pkg.overview,
    },
    overview: detailedDescription,
    gallery,
    hotels: isOvernightWeekend ? pkg.hotels : standardHotels.map((hotel) => ({ ...hotel })),
    meals: isOvernightWeekend ? pkg.meals : [...standardMeals],
    exclusions: pkg.slug === "chopta-tungnath-weekend-group-tour" ? pkg.exclusions : [...defaultPackageExclusions, isOvernightWeekend
      ? (isEscape ? "Arrival breakfast, all lunches, journey meals and refreshments; only hotel dinners on Days 2 & 3 and hotel breakfasts on Days 3 & 4 are included" : "Arrival breakfast, all lunches, journey meals and refreshments; only Day 2 hotel dinner and Day 3 hotel breakfast are included")
      : "Lunch and any meals other than the included breakfast and dinner"],
    inclusions: pkg.slug === "chopta-tungnath-weekend-group-tour" ? pkg.inclusions : [
      ...defaultPackageInclusions,
      ...(/\b(?:Varanasi|Kashi)\b/i.test(String(pkg.destination ?? ""))
        ? ["Boat-ride charges in Varanasi included; operation is subject to river conditions and local permissions."] : []),
      ...(/\b(?:Prayagraj|Allahabad)\b/i.test(String(pkg.destination ?? ""))
        ? ["Boat-ride charges at Triveni Sangam, Prayagraj (Allahabad), included; operation is subject to river conditions and local permissions."] : []),
      isOvernightWeekend
        ? (isEscape ? "2 nights in a 3-Star Hotel / Similar on Nights 2 & 3; Night 1 is the overnight road journey from Delhi" : "1 night in a 3-Star Hotel / Similar on Night 2; Night 1 is the overnight road journey from Delhi")
        : "Accommodation in 3-Star Hotels / Similar",
      isOvernightWeekend
        ? (isEscape ? "2 hotel dinners on Days 2 & 3 and 2 hotel breakfasts on Days 3 & 4; service subject to hotel policy and occupancy" : "1 hotel dinner on Day 2 and 1 hotel breakfast on Day 3; service subject to hotel policy and occupancy")
        : "Breakfast and Dinner at hotel; buffet service subject to hotel policy and occupancy",
    ],
  };
});

export default packages;
