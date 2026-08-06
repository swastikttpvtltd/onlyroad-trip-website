import dwarkaSomnath from "./packages/gujarat/dwarka-somnath";
import girNationalPark from "./packages/gujarat/gir-national-park";
import ramUtsav from "./packages/gujarat/rann-utsav";
import saputara from "./packages/gujarat/saputara";
import statueOfUnity from "./packages/gujarat/statue-of-unity";
import { defaultPackageExclusions } from "./defaultPackageExclusions";
import { defaultPackageInclusions } from "./defaultPackageInclusions";

const rawPackages = [
  dwarkaSomnath,
  girNationalPark,
  ramUtsav,
  saputara,
  statueOfUnity,
];

export const packages = rawPackages.map((pkg) => ({
  ...pkg,
  exclusions: [...defaultPackageExclusions],
  inclusions: [...defaultPackageInclusions],
}));

export default packages;