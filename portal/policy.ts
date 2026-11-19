export type Policy = { version: string; approved: boolean; bands: { minimumHours: number; chargeBasisPoints: number }[] };
export type Quote = { available: boolean; reason?: string; policyVersion?: string; paidPaise: number; chargePaise?: number; supplierPaise?: number; refundPaise?: number };
// Amounts are integer paise. Only an approved, booking-bound snapshot is executable.
export function refundQuote(input: { policy: Policy | null; totalPaise: number; paidPaise: number; supplierPaise: number | null; departure: string; acknowledgedAt: string | null }): Quote {
  const { policy, totalPaise, paidPaise, supplierPaise, departure, acknowledgedAt } = input;
  const unavailable = (reason: string): Quote => ({ available: false, reason, paidPaise });
  if (!policy?.approved || !policy.version) return unavailable("Your booking’s approved policy snapshot is not available. Our team will confirm your estimate.");
  if (supplierPaise === null) return unavailable("Supplier deductions are awaiting verification.");
  if (!acknowledgedAt) return unavailable("An estimate becomes available after the team acknowledges your written request.");
  if (![totalPaise, paidPaise, supplierPaise].every(n => Number.isSafeInteger(n) && n >= 0) || paidPaise > totalPaise) return unavailable("Payment reconciliation is required.");
  const hours = (Date.parse(departure) - Date.parse(acknowledgedAt)) / 3600000;
  if (!Array.isArray(policy.bands)) return unavailable("Policy validation is required.");
  const bands = [...policy.bands].sort((a, b) => b.minimumHours - a.minimumHours);
  if (!Number.isFinite(hours) || !bands.length || !bands.every(b => Number.isFinite(b.minimumHours) && b.minimumHours >= 0 && Number.isInteger(b.chargeBasisPoints) && b.chargeBasisPoints >= 0 && b.chargeBasisPoints <= 10000) || bands[bands.length - 1].minimumHours !== 0 || new Set(bands.map(b => b.minimumHours)).size !== bands.length) return unavailable("Policy validation is required.");
  const band = bands.find(b => hours >= b.minimumHours) ?? bands[bands.length - 1];
  const chargePaise = Math.round(totalPaise * band.chargeBasisPoints / 10000);
  return { available: true, policyVersion: policy.version, paidPaise, chargePaise, supplierPaise, refundPaise: Math.max(0, paidPaise - chargePaise - supplierPaise) };
}
