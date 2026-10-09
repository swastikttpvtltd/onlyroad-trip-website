import reviewedSeasons from "./packageVisitSeasons.json";

type VisitSeason = { bestTime: string; note: string };
const seasons: Record<string, VisitSeason> = reviewedSeasons;

export function getBestTime(pkg: { slug?: string }): string {
  const season = seasons[String(pkg.slug ?? "")];
  if (!season) throw new Error(`Visit season has not been reviewed for package: ${pkg.slug}`);
  return season.note ? `${season.bestTime}. ${season.note}` : season.bestTime;
}
