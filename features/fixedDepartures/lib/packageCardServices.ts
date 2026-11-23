export type PackageCardServices = { meals: boolean; hotel: boolean; transport: boolean; flights: boolean };
type ServiceSource = { meals?: unknown[]; hotels?: unknown[]; inclusions?: string[]; quickFacts?: { transport?: string } };
export function getPackageCardServices(pkg: ServiceSource): PackageCardServices {
  const lines = pkg.inclusions ?? [];
  const text = lines.join(" ");
  return {
    meals: Boolean(pkg.meals?.length) || /meals (?:as|included)|breakfast.*dinner/i.test(text),
    hotel: Boolean(pkg.hotels?.length) || /accommodation|hotel stay/i.test(text),
    transport: /transfers|sightseeing.*vehicle|transport.*included/i.test(text),
    flights: lines.some(line => /(?:flights?|airfare|air tickets?).*(?:included)|(?:included).*(?:flights?|airfare)/i.test(line) && !/if specified|if specifically|unless|not included|excluded|no flights/i.test(line)),
  };
}
