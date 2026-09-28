// Temporary booking pause for the eleven packages tagged Group Tour.
// Remove the slug from this set to reopen its booking buttons.
const pausedGroupTourSlugs = new Set([
  "goa-weekend-vibe-escape",
  "jibhi-weekend-group-tour",
  "kasol-weekend-group-tour",
  "kanatal-weekend-group-tour",
  "mcleodganj-weekend-group-tour",
  "udaipur-weekend-group-tour",
  "nainital-weekend-group-tour",
  "char-dham-yatra",
  "kedarnath-badrinath-do-dham",
  "kedarnath-yatra",
  "vaishno-devi-group-yatra",
]);

export function isGroupTourBookingPaused(slug: string): boolean {
  return pausedGroupTourSlugs.has(slug);
}
