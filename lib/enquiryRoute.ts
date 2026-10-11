export function enquiryRoute(packageTitle: string | undefined, travelDate: string): string {
  const params = new URLSearchParams();
  params.set("destination", (packageTitle || "").slice(0, 250));
  if (/^\d{4}-\d{2}-\d{2}$/.test(travelDate)) params.set("travelDate", travelDate);
  return "/plan-your-trip?" + params.toString();
}
