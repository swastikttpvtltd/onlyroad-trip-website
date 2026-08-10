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
import lakshadweepPackages from "./packages/lakshadweep/lakshadweep-packages";
import andhraPradeshPackages from "./packages/andhra-pradesh/andhra-pradesh-packages";
import { defaultPackageExclusions } from "./defaultPackageExclusions";
import { defaultPackageInclusions } from "./defaultPackageInclusions";
import { makePackageRates } from "./packagePricing";
import { getBestTime } from "./packageBestTime";
import { packageMedia } from "./packageMedia";

const stateWisePackages = [
  ...gujaratPackages,
  ...rajasthanPackages,
  ...andamanPackages,
  ...lakshadweepPackages,
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
  "Lakshadweep": "lakshadweep",
  "Andhra Pradesh": "andhra-pradesh",
};

const getPackageImageFolder = (pkg: any) => {
  const stateFolder = packageStateFolders[String(pkg.state ?? "").trim()];
  return stateFolder ? `${stateFolder}/${pkg.slug}` : `multi-state/${pkg.slug}`;
};

const getPackageMedia = (mediaFolder: string, title: string) =>
  (packageMedia[mediaFolder] ?? []).slice(0, 10).map((image, index) => ({
    image,
    alt: `${title} – image ${index + 1}`,
  }));

const clean = (value: unknown) => String(value ?? "").replace(/\s+/g, " ").trim();
const unique = (items: string[]) => Array.from(new Set(items.filter(Boolean)));

/*
 * Common search names/aliases are added only when the package itself
 * mentions the corresponding destination. This keeps SEO natural and
 * prevents unrelated destination keywords from being attached to a page.
 */
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
  { match: ["lakshadweep"], aliases: ["Lakshadweep Tour Package", "Lakshadweep Holiday", "Lakshadweep Island Tour"] },
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

const buildDetailedPackageDescription = (pkg: any) => {
  const title = clean(pkg.title);
  const destination = clean(pkg.destination);
  const category = clean(pkg.category);
  const state = clean(pkg.state);
  const original = clean(pkg.overview);
  const highlights = Array.isArray(pkg.highlights)
    ? unique(pkg.highlights.map(clean)).slice(0, 6)
    : [];
  const itinerary = Array.isArray(pkg.itinerary) ? pkg.itinerary : [];
  const dayTitles = unique(itinerary.map((day: any) => clean(day?.title)).filter(Boolean));
  const activities = unique(
    itinerary
      .flatMap((day: any) => [
        ...(Array.isArray(day?.morning) ? day.morning : []),
        ...(Array.isArray(day?.afternoon) ? day.afternoon : []),
        ...(Array.isArray(day?.evening) ? day.evening : []),
      ])
      .map(clean)
  ).slice(0, 8);
  const meals = Array.isArray(pkg.meals) ? unique(pkg.meals.map(clean)).slice(0, 2) : [];
  const hotels = Array.isArray(pkg.hotels)
    ? pkg.hotels.map((hotel: any) => clean(hotel?.name)).filter(Boolean).slice(0, 2)
    : [];
  const hotelText = hotels.length ? hotels.join(" or ") : "3-Star Hotel / Similar";

  const categoryTone: Record<string, string> = {
    "Pilgrimage Tours": "a thoughtfully planned spiritual journey",
    "Spiritual Tours": "a thoughtfully planned spiritual journey",
    "Wildlife Safaris": "an immersive wildlife and nature escape",
    "Road Trips": "a scenic road journey",
    "Luxury Holidays": "a comfortable and experience-led holiday",
    "Family Vacations": "a relaxed family holiday",
    "Adventure & Spiritual": "an experience combining mountain scenery, local culture and meaningful sightseeing",
    "Honeymoon": "a relaxed romantic escape",
  };

  const tone = categoryTone[category] || `a carefully planned ${category ? category.toLowerCase() : "holiday"} experience`;

  const intro = original && original.length > 40
    ? `${original.replace(/\.$/, "")}.`
    : `${title} is ${tone} across ${destination || "the destinations included in the itinerary"}${state ? ` in ${state}` : ""}.`;

  const route = dayTitles.length >= 2
    ? `The journey begins with ${dayTitles[0].toLowerCase()} and then moves through ${dayTitles.slice(1, -1).slice(0, 3).map((x: string) => x.toLowerCase()).join(", ")}${dayTitles.length > 2 ? `, before ${dayTitles[dayTitles.length - 1].toLowerCase()}` : ""}.`
    : dayTitles.length === 1
      ? `The itinerary is centred around ${dayTitles[0].toLowerCase()}, with the remaining time arranged around the experiences included in the package.`
      : "The day-wise plan combines the main sightseeing and leisure experiences included in the package.";

  const experience = highlights.length
    ? `Travellers can look forward to ${highlights.slice(0, 4).join(", ")}${highlights.length > 4 ? `, along with ${highlights.slice(4).join(" and ")}` : ""}. The itinerary has been arranged to leave room for enjoying the destination rather than simply moving from one sightseeing point to another.`
    : "The itinerary combines the sightseeing, local experiences and leisure time specifically included in the package, with enough room to enjoy the destination at a comfortable pace.";

  const activitySentence = activities.length
    ? `Depending on the day, the planned experiences include ${activities.slice(0, 6).join(", ")}${activities.length > 6 ? ` and ${activities[6]}` : ""}. These follow the sequence and conditions mentioned in the day-wise itinerary.`
    : "Transfers, sightseeing and leisure time follow the day-wise itinerary and the operating conditions of the destination.";

  const staySentence = `Accommodation is planned at ${hotelText}, with ${meals.length ? meals.join(" and ").toLowerCase() : "the meals specified in the package"}.`;
  const closing = `Overall, ${title.toLowerCase()} is designed around the character of ${destination || "the destination"}, bringing together its key experiences in a comfortable and easy-going journey. Sightseeing, transfers and activities remain subject to local schedules, weather, access and other operating conditions mentioned in the package.`;

  const paragraphOne = `${intro} ${route}`;
  const paragraphTwo = `${experience} ${activitySentence}`;
  const paragraphThree = `${staySentence} ${closing}`;

  return `${paragraphOne}\n\n${paragraphTwo}\n\n${paragraphThree}`;
};

export const packages = rawPackages.map((pkg) => {
  const groupRates = makePackageRates(pkg);
  const mediaFolder = getPackageImageFolder(pkg);
  const gallery = getPackageMedia(mediaFolder, pkg.title);
  const cover = gallery[0]?.image ?? "/images/package-placeholder.jpg";
  const detailedDescription = buildDetailedPackageDescription(pkg);
  const seoKeywords = getPackageSeoAliases(pkg);

  return {
    ...pkg,
    packageId: makePackageId(pkg.id, pkg.slug, pkg.title),
    price: groupRates[6],
    groupRates,
    bestTime: getBestTime(pkg),
    bestTimeToVisit: getBestTime(pkg),
    seoKeywords,
    priceBasis: "Per Person | 3-Star Hotel / Similar | Breakfast & Dinner | Standard Transport & Sightseeing",
    image: cover,
    hero: {
      ...(pkg.hero || {}),
      image: cover,
      shortDescription: pkg.hero?.shortDescription ?? pkg.short ?? pkg.overview,
    },
    overview: detailedDescription,
    gallery,
    hotels: standardHotels.map((hotel) => ({ ...hotel })),
    meals: [...standardMeals],
    exclusions: [...defaultPackageExclusions, "Lunch and any meals other than the included breakfast and dinner"],
    inclusions: [
      ...defaultPackageInclusions,
      "Accommodation in 3-Star Hotels / Similar",
      "Breakfast and Dinner at hotel; buffet service subject to hotel policy and occupancy",
    ],
  };
});

export default packages;
