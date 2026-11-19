"use client";
export const supportLabels: Record<string, string> = { none: "Not required", wheelchair: "Wheelchair", assistance: "Assistance", both: "Wheelchair + Assistance" };
export default function SupportFields({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <label>Travel support (optional)<select value={value} onChange={event => onChange(event.target.value)}>{Object.entries(supportLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select><small>Leave as “Not required” if no support is needed. Requested support is subject to confirmation by the travel team.</small></label>;
}
