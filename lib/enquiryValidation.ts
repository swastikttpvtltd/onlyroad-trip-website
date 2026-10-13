export type PublicEnquiry = {
  fullName: string; mobile: string; email: string; destination: string; travelDate: string;
  travellers: number; travelType: string; budget: string; message: string;
};

export function validateEnquiry(body: unknown): PublicEnquiry {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid enquiry form.");
  const input = body as Record<string, unknown>;
  const text = (key: string, maximum: number, required = false) => {
    const value = input[key] == null ? "" : input[key];
    if (typeof value !== "string" || value.length > maximum) throw new Error(`Invalid ${key}.`);
    const cleaned = value.trim();
    if ((required && !cleaned) || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(cleaned)) throw new Error(`Invalid ${key}.`);
    return cleaned;
  };
  const mobile = text("mobile", 30, true).replace(/[\s()-]/g, "");
  if (!/^\+?[1-9]\d{6,14}$/.test(mobile)) throw new Error("Please enter a valid phone number including country code.");
  const email = text("email", 254);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Please enter a valid email address.");
  const travelDate = text("travelDate", 10, true);
  const parsedDate = new Date(travelDate + "T00:00:00Z");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(travelDate) || !Number.isFinite(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== travelDate) throw new Error("Please choose a valid travel date.");
  const travellers = Number(input.travellers);
  if (!Number.isInteger(travellers) || travellers < 1 || travellers > 10000) throw new Error("Please enter a valid group size.");
  return { fullName: text("fullName", 150, true), mobile, email, destination: text("destination", 250, true), travelDate, travellers, travelType: text("travelType", 100, true), budget: text("budget", 100), message: text("message", 3000) };
}
