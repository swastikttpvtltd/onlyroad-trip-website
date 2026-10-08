/** Normalize numeric days and legacy Day strings, preserving overnight Day 0. */
export function formatItineraryDay(value: string | number | undefined, fallback: number) {
  const number = String(value ?? fallback).trim().replace(/^(?:day\s*)+/i, "").trim();
  return `Day ${number || fallback}`;
}
