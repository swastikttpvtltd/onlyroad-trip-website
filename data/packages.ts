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

const buildDetailedPackageDescription = (pkg: any) => {
  const destination = clean(pkg.destination);
  const duration = clean(pkg.duration);
  const category = clean(pkg.category);
  const highlights = Array.isArray(pkg.highlights) ? pkg.highlights.filter(Boolean).slice(0, 6).map(clean) : [];
  const itinerary = Array.isArray(pkg.itinerary) ? pkg.itinerary : [];
  const dayTitles = itinerary.slice(0, 6).map((day: any) => clean(day?.title)).filter(Boolean);
  const dayActivities = itinerary
    .slice(0, 5)
    .flatMap((day: any) => [
      ...(Array.isArray(day?.morning) ? day.morning : []),
      ...(Array.isArray(day?.afternoon) ? day.afternoon : []),
      ...(Array.isArray(day?.evening) ? day.evening : []),
    ])
    .map(clean)
    .filter(Boolean)
    .filter((item: string, index: number, all: string[]) => all.indexOf(item) === index)
    .slice(0, 8);
  const meals = Array.isArray(pkg.meals) ? pkg.meals.map(clean).filter(Boolean).slice(0, 2) : [];
  const hotel = Array.isArray(pkg.hotels) && pkg.hotels[0]?.name ? clean(pkg.hotels[0].name) : "comfortable hotel / similar";
  const original = clean(pkg.overview);

  const opening = `The ${clean(pkg.title)} is a ${duration || "carefully planned"} ${category.toLowerCase() || "travel"} experience covering ${destination || "the destinations listed in the itinerary"}.`;
  const route = dayTitles.length
    ? `The day-wise journey is planned around ${dayTitles.slice(0, 4).join(", ")}${dayTitles.length > 4 ? `, followed by ${dayTitles.slice(4).join(", ")}` : ""}.`
    : "The journey follows the package's published day-wise itinerary and destination route.";
  const experiences = highlights.length
    ? `Key experiences and highlights include ${highlights.join(", ")}.`
    : "The itinerary focuses on the package's listed sightseeing, local experiences and leisure time.";
  const activities = dayActivities.length
    ? `Across the scheduled days, the plan includes ${dayActivities.join(", ")}, subject to the access, weather, operating schedules and conditions stated in the itinerary.`
    : "Daily sightseeing and activities follow the published itinerary and local operating conditions.";
  const stay = `Accommodation is planned at ${hotel}, with ${meals.length ? meals.join(" and ").toLowerCase() : "the meals specified in the package"}.`;
  const context = original && !original.toLowerCase().includes("generic description") ? ` Overall, the package is designed around its actual route and experiences: ${original}` : "";

  return `${opening} ${route} ${experiences} ${activities} ${stay}${context}`.replace(/\s+/g, " ").trim();
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
