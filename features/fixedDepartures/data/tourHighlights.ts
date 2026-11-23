export function uniqueTourHighlights(highlights: readonly string[]) {
  const seen = new Set<string>();
  return highlights.filter(item => {
    const key = item.split(" — ")[0].toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
