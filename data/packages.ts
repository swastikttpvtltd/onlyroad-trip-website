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
import himachalPackages from "./packages/himachal-packages";
import ladakhPackages from "./packages/ladakh-packages";
import nextStatesPackages from "./packages/next-states-packages";
import islandPackages from "./packages/island-packages";
import { defaultPackageExclusions } from "./defaultPackageExclusions";
import { defaultPackageInclusions } from "./defaultPackageInclusions";
import { makePackageRates } from "./packagePricing";
import { getBestTime } from "./packageBestTime";
import { packageImageGalleries } from "./packageImages";

const rawPackages=[...islandPackages,...nextStatesPackages,...ladakhPackages,...himachalPackages,...kashmirPackages,...newMultiStatePackages,...uttarPradeshPackages,...uttarakhandPackages,rajasthanGrandTour,jaipurJodhpurUdaipur,jodhpurJaisalmer,udaipurMountAbu,jaipurAjmerPushkar,jaipurHeritage,gujaratGrandTour,dwarkaSomnath,girNationalPark,ramUtsav,saputara,statueOfUnity];
const standardHotels=[{name:"3-Star Hotel / Similar",category:"3-Star",star:"3-Star Hotel"}];
const standardMeals=["Buffet Breakfast at hotel (subject to hotel service format and occupancy)","Buffet Dinner at hotel (subject to hotel service format and occupancy)"];

const makePackageId=(id:unknown,slug?:unknown,title?:unknown)=>{
  const source = id ?? slug ?? title ?? "package";
  const safeId = String(source).trim();
  return `ORT-${safeId.toUpperCase().replace(/[^A-Z0-9]+/g,"-").replace(/^-|-$/g,"")}`;
};

export const packages=rawPackages.map((pkg)=>{
  const groupRates=makePackageRates(pkg);
  const mappedGallery=packageImageGalleries[pkg.slug];
  const gallery=mappedGallery?.length===5?mappedGallery:pkg.gallery;
  const cover=gallery?.[0]?.image ?? pkg.hero?.image ?? pkg.image;
  return {...pkg,packageId:makePackageId(pkg.id,pkg.slug,pkg.title),price:groupRates[6],groupRates,bestTime:getBestTime(pkg),bestTimeToVisit:getBestTime(pkg),priceBasis:"Per Person | 3-Star Hotel / Similar | Breakfast & Dinner | Standard Transport & Sightseeing",image:cover,hero:{...(pkg.hero||{}),image:cover,shortDescription:pkg.hero?.shortDescription??pkg.short??pkg.overview},gallery,hotels:standardHotels.map((hotel)=>({...hotel})),meals:[...standardMeals],exclusions:[...defaultPackageExclusions,"Lunch and any meals other than the included breakfast and dinner"],inclusions:[...defaultPackageInclusions,"Accommodation in 3-Star Hotels / Similar","Breakfast and Dinner at hotel; buffet service subject to hotel policy and occupancy"]};
});
export default packages;