export const cancellationPolicyPath = "/cancellation-policy";

export const tourCancellationCharges = [
  ["30 days or more before departure", "10%"],
  ["15–29 days before departure", "25%"],
  ["07–14 days before departure", "50%"],
  ["03–06 days before departure", "75%"],
  ["Less than 72 hours or No Show", "100%"],
] as const;

export const tourCancellationTiming = "Cancellation charges depend upon the date on which the written cancellation request is received by the Company. The effective cancellation date shall be the date on which we acknowledge the request.";
export const tourCancellationConditions = "The above charges are indicative and may vary depending on supplier policies, airline rules, hotel terms, seasonal demand, and destination-specific conditions.";
export const cancellationRequest = "Submit your request in writing from the email address used to book or through an official support channel. Include your booking reference, traveller name and registered mobile number.";
