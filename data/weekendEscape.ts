// These prices are final per-person amounts inclusive of 5% GST.
export const weekendEscapeSlugs = new Set([
  "jibhi-weekend-group-tour",
  "kasol-weekend-group-tour",
  "kanatal-weekend-group-tour",
  "mcleodganj-weekend-group-tour",
  "udaipur-weekend-group-tour",
  "nainital-weekend-group-tour",
  "jim-corbett-weekend"
]);

export const isWeekendEscape = (pkg: any): boolean => weekendEscapeSlugs.has(String(pkg?.slug ?? ""));

export const getWeekendEscapeSharingRates = () => [
  { type: "Quad Sharing" as const, price: 8984 },
  { type: "Triple Sharing" as const, price: 9485 },
  { type: "Double Sharing" as const, price: 10500 },
];
