export type PackagePhoto={image:string;alt:string};

// Local package folders are now the single source of truth for package images.
// Each live package provides exactly 4 JPGs:
// hero.jpg + gallery1.jpg + gallery2.jpg + gallery3.jpg
// under public/images/packages/<state-or-multi-state>/<package-slug>/.
export const packageImageGalleries:Record<string,PackagePhoto[]>={};

export default packageImageGalleries;
