import { parsePhoneNumberFromString } from "libphonenumber-js";

export function normalizeLeadContact(mobile = "", countryCode = "+91", email = "") {
  const digits = mobile.replace(/\D/g, "");
  const dial = countryCode.replace(/\D/g, "") || "91";
  const international = mobile.trim().startsWith("+") ? `+${digits}` : `+${dial}${digits}`;
  const phone = parsePhoneNumberFromString(international);
  // Capture Indian mobile numbers only when all ten national digits are present.
  const validPhone = phone?.isValid() && (phone.countryCallingCode !== "91" || /^[6-9]\d{9}$/.test(phone.nationalNumber));
  const cleanedEmail = email.trim().toLowerCase();
  const validEmail = cleanedEmail.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanedEmail);
  return { mobile: validPhone ? phone!.number : "", email: validEmail ? cleanedEmail : "" };
}
