/** Editorial market targeting only; not a claim of a physical office abroad. */
export const internationalMarkets = {
  "united-states": { country: "United States", demonym: "US", locale: "en-US", currency: "USD", keywords: ["India private tours from USA", "India pilgrimage tours for US travellers", "India senior-friendly tours from USA"] },
  "united-kingdom": { country: "United Kingdom", demonym: "UK", locale: "en-GB", currency: "GBP", keywords: ["India tours from UK", "India private travel planning for UK visitors", "India heritage and pilgrimage tours from UK"] },
  canada: { country: "Canada", demonym: "Canadian", locale: "en-CA", currency: "CAD", keywords: ["India tours from Canada", "India private tours for Canadian travellers", "India family pilgrimage tours from Canada"] },
  australia: { country: "Australia", demonym: "Australian", locale: "en-AU", currency: "AUD", keywords: ["India tours from Australia", "India customized tours for Australians", "India senior-friendly travel planning from Australia"] },
} as const;
export type InternationalMarketSlug = keyof typeof internationalMarkets;
export const internationalMarketSlugs = Object.keys(internationalMarkets) as InternationalMarketSlug[];
export function isInternationalMarketSlug(value: string): value is InternationalMarketSlug {
  return Object.prototype.hasOwnProperty.call(internationalMarkets, value);
}
