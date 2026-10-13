// Owner exclusions apply to SEO additions, notifications and AI tools.
export function isExcludedSeoPath(path: string): boolean {
  return /(?:varanasi|kashi|char-dham|do-dham|gujarat|dwarka-somnath|gir-national-park|rann-utsav|saputara|statue-of-unity)/i.test(path);
}
