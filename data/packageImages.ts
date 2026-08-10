export type PackagePhoto={image:string;alt:string};

// Local package folders are now the single source of truth for package images.
// Each live package provides its own hero.jpg and gallery1.jpg through gallery5.jpg
// under public/images/packages/<state-or-multi-state>/<package-slug>/.
export const packageImageGalleries:Record<string,PackagePhoto[]>={};

export default packageImageGalleries;
