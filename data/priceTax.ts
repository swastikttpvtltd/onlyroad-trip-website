// Store catalogue prices inclusive of 5% GST, rounded to the nearest rupee.
export const addGSTToRate = (baseRate: number): number => Math.round(baseRate * 1.05);
