import dwarkaSomnath from "./packages/gujarat/dwarka-somnath";
import girNationalPark from "./packages/gujarat/gir-national-park";
import ramUtsav from "./packages/gujarat/rann-utsav";
import saputara from "./packages/gujarat/saputara";
import statueOfUnity from "./packages/gujarat/statue-of-unity";
import gujaratGrandTour from "./packages/gujarat/gujarat-grand-tour";
import jaipurHeritage from "./packages/rajasthan/jaipur-heritage";
import jodhpurJaisalmer from "./packages/rajasthan/jodhpur-jaisalmer";
import udaipurMountAbu from "./packages/rajasthan/udaipur-mount-abu";
import jaipurAjmerPushkar from "./packages/rajasthan/jaipur-ajmer-pushkar";
import jaipurJodhpurUdaipur from "./packages/rajasthan/jaipur-jodhpur-udaipur";
import rajasthanGrandTour from "./packages/rajasthan/rajasthan-grand-tour";
import uttarakhandPackages from "./packages/uttarakhand/uttarakhand-packages";
import uttarPradeshPackages from "./packages/uttar-pradesh/uttar-pradesh-packages";
import newMultiStatePackages from "./packages/multi-state/new-multi-state-packages";
import kashmirPackages from "./packages/kashmir/kashmir-packages";
import { defaultPackageExclusions } from "./defaultPackageExclusions";
import { defaultPackageInclusions } from "./defaultPackageInclusions";

const rawPackages = [
  ...kashmirPackages,
  ...newMultiStatePackages,
  ...uttarPradeshPackages,
  ...uttarakhandPackages,
  rajasthanGrandTour, jaipurJodhpurUdaipur, jodhpurJaisalmer, udaipurMountAbu, jaipurAjmerPushkar, jaipurHeritage,
  gujaratGrandTour, dwarkaSomnath, girNationalPark, ramUtsav, saputara, statueOfUnity,
];
const standardHotels = [{ name: "3-Star Hotel / Similar", category: "3-Star", star: "3-Star Hotel" }];
const standardMeals = ["Buffet Breakfast at hotel (subject to hotel service format and occupancy)","Buffet Dinner at hotel (subject to hotel service format and occupancy)"];
export const packages = rawPackages.map((pkg) => ({...pkg,hotels: standardHotels.map((hotel) => ({ ...hotel })),meals: [...standardMeals],exclusions: [...defaultPackageExclusions, "Lunch and any meals other than the included breakfast and dinner"],inclusions: [...defaultPackageInclusions, "Accommodation in 3-Star Hotels / Similar", "Breakfast and Dinner at hotel; buffet service subject to hotel policy and occupancy"],}));
export default packages;