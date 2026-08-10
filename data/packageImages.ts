export type PackagePhoto={image:string;alt:string};

// Local package folders are the single source of truth for package images.
// Every live package uses exactly 4 AVIF files:
// hero.avif + gallery1.avif + gallery2.avif + gallery3.avif
// under public/images/packages/<state-or-multi-state>/<package-slug>/.
// Keep this registry empty: data/packages.ts builds the paths deterministically
// from each package's state and slug so filenames cannot drift from the folders.
export const packageImageGalleries:Record<string,PackagePhoto[]>={};

export default packageImageGalleries;
