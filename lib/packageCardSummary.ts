import type { packages } from "@/data/packages";

export type PackageCardSummary = Pick<(typeof packages)[number], "slug" | "title" | "category" | "destination" | "state" | "duration" | "image" | "price" | "displayPriceBasis" | "themes">;

export function packageCardSummary(pkg: (typeof packages)[number]): PackageCardSummary {
  const { slug, title, category, destination, state, duration, image, price, displayPriceBasis, themes } = pkg;
  return { slug, title, category, destination, state, duration, image, price, displayPriceBasis, themes };
}
