import dwarkaSomnath from "./packages/gujarat/dwarka-somnath";
import girNationalPark from "./packages/gujarat/gir-national-park";
import ramUtsav from "./packages/gujarat/rann-utsav";
import saputara from "./packages/gujarat/saputara";
import statueOfUnity from "./packages/gujarat/statue-of-unity";
import gujaratGrandTour from "./packages/gujarat/gujarat-grand-tour";
import { defaultPackageExclusions } from "./defaultPackageExclusions";
import { defaultPackageInclusions } from "./defaultPackageInclusions";

const rawPackages = [
  gujaratGrandTour,
  dwarkaSomnath,
  girNationalPark,
  ramUtsav,
  saputara,
  statueOfUnity,
];

const standardHotels = [{ name: "3-Star Hotel / Similar", category: "3-Star", star: "3-Star Hotel" }];
const standardMeals = [
  "Buffet Breakfast at hotel (subject to hotel service format and occupancy)",
  "Buffet Dinner at hotel (subject to hotel service format and occupancy)",
];

export const packages = rawPackages.map((pkg) => ({
  ...pkg,
  hotels: standardHotels.map((hotel) => ({ ...hotel })),
  meals: [...standardMeals],
  exclusions: [...defaultPackageExclusions, "Lunch and any meals other than the included breakfast and dinner"],
  inclusions: [...defaultPackageInclusions, "Accommodation in 3-Star Hotels / Similar", "Breakfast and Dinner at hotel; buffet service subject to hotel policy and occupancy"],
}));

export default packages;