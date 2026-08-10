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

const buildDetailedPackageDescription = (pkg: any) => {
  const title = clean(pkg.title);
  const destination = clean(pkg.destination);
  const duration = clean(pkg.duration);
  const category = clean(pkg.category);
  const state = clean(pkg.state);
  const original = clean(pkg.overview);
  const highlights = Array.isArray(pkg.highlights)
    ? unique(pkg.highlights.map(clean)).slice(0, 6)
    : [];
  const itinerary = Array.isArray(pkg.itinerary) ? pkg.itinerary : [];
  const dayTitles = unique(
    itinerary.map((day: any) => clean(day?.title)).filter(Boolean)
  );
  const activities = unique(
    itinerary
      .flatMap((day: any) => [
        ...(Array.isArray(day?.morning) ? day.morning : []),
        ...(Array.isArray(day?.afternoon) ? day.afternoon : []),
        ...(Array.isArray(day?.evening) ? day.evening : []),
      ])
      .map(clean)
  ).slice(0, 7);
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

  const tone = categoryTone[category] ||
    `a carefully planned ${category ? category.toLowerCase() : "holiday"} experience`;

  const intro = original && original.length > 40
    ? `${original.replace(/\.$/, "")}.`
    : `${title} is ${tone} across ${destination || "the destinations included in the itinerary"}${state ? ` in ${state}` : ""}.`;

  let route = "";
  if (dayTitles.length >= 2) {
    const first = dayTitles[0];
    const middle = dayTitles.slice(1, -1).slice(0, 3);
    const last = dayTitles[dayTitles.length - 1];
    route = middle.length
      ? `The journey begins with ${first.toLowerCase()}, moves through ${middle.map((x: string) => x.toLowerCase()).join(", ")}, and concludes with ${last.toLowerCase()}.`
      : `The journey begins with ${first.toLowerCase()} and concludes with ${last.toLowerCase()}.`;
  } else if (dayTitles.length === 1) {
    route = `The itinerary is centred around ${dayTitles[0].toLowerCase()}, with the remaining time arranged around the experiences included in the package.`;
  }

  const experience = highlights.length
    ? `The experience is shaped by ${highlights.slice(0, 4).join(", ")}${highlights.length > 4 ? `, along with ${highlights.slice(4).join(" and ")}` : ""}.`
    : "The experience follows the sightseeing, leisure and local activities specifically included in the itinerary.";

  const activitySentence = activities.length
    ? `Depending on the day, guests can expect ${activities.slice(0, 5).join(", ")}${activities.length > 5 ? ` and ${activities[5]}` : ""}, as detailed in the day-wise plan.`
    : "Transfers, sightseeing and leisure time are arranged according to the day-wise itinerary.";

  const staySentence = `The stay is planned at ${hotelText}, with ${meals.length ? meals.join(" and ").toLowerCase() : "the meals specified in the package"}.`;

  const closing = `The itinerary is paced around the character of ${destination || "the destination"}, giving travellers time to enjoy the main experiences without turning the trip into a rushed checklist. Any sightseeing, transfers or activities remain subject to the operating conditions and schedules mentioned in the package.`;

  return [intro, route, experience, activitySentence, staySentence, closing]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
};

export const packages = rawPackages.map((pkg) => {
  const groupRates = makePackageRates(pkg);
  const mediaFolder = getPackageImageFolder(pkg);
  const gallery = getPackageMedia(mediaFolder, pkg.title);
  const cover = gallery[0]?.image ?? "/images/package-placeholder.jpg";
  const detailedDescription = buildDetailedPackageDescription(pkg);

  return {
    ...pkg,
    packageId: makePackageId(pkg.id, pkg.slug, pkg.title),
    price: groupRates[6],
    groupRates,
    bestTime: getBestTime(pkg),
    bestTimeToVisit: getBestTime(pkg),
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
