type TourLocation = { title: string; destination: string; state?: string };
type DestinationLocation = { title: string; state?: string; matches?: readonly string[] };
const normalize = (value: string) => value.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();

export function getDestinationPackages<T extends TourLocation>(catalogue: readonly T[], destination: DestinationLocation): T[] {
  const places = [destination.title, destination.state ?? "", ...(destination.matches ?? [])].map(normalize).filter(Boolean);
  return catalogue.filter(pkg => {
    // Geographic fields only. "Puri" must not match "Shivpuri", and a mention
    // of a beach in the overview must not make a Goa tour a Lakshadweep tour.
    const route = ` ${normalize([pkg.title, pkg.destination, pkg.state ?? ""].join(" "))} `;
    return places.some(place => route.includes(` ${place} `));
  });
}
