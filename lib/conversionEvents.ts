import { isExcludedSeoPath } from "./seoWorkScope";

export type ConversionEvent = "view_item" | "begin_checkout" | "generate_lead";

export function conversionPayload(event: ConversionEvent, formId: string) {
  if (!/^[a-z0-9-]{1,60}$/.test(formId)) throw new Error("Invalid public form identifier");
  return { event, form_id: formId };
}

export function reportConversion(event: ConversionEvent, formId: string) {
  if (typeof window === "undefined" || isExcludedSeoPath(window.location.pathname)) return;
  const payload = conversionPayload(event, formId);
  // Local-only diagnostics by default: no identifiers, contacts or form text.
  window.dispatchEvent(new CustomEvent("ort:conversion", { detail: payload }));
  const analytics = window as typeof window & { ortAnalyticsConsent?: boolean; dataLayer?: Record<string, unknown>[] };
  if (process.env.NEXT_PUBLIC_ORT_ANALYTICS_ENABLED === "true" && analytics.ortAnalyticsConsent === true) {
    (analytics.dataLayer ||= []).push(payload);
  }
}
