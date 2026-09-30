// Keep online booking paused for Udaipur and Lonavala only.
// Remove a slug from this set to reopen its booking buttons.
const pausedGroupTourSlugs = new Set([
  "udaipur-weekend-group-tour",
  "lonavala-khandala-weekend",
]);

export function isGroupTourBookingPaused(slug: string): boolean {
  return pausedGroupTourSlugs.has(slug);
}
