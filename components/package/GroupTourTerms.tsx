import Link from "next/link";

export const groupTourTerms = [
  [
    "Group Size & Departure Confirmation",
    "Each departure requires a minimum of 4 confirmed travellers. Group sizes may range from 4 to 100+ travellers, subject to availability and operational arrangements. Individual travellers may book a seat and join the group. Larger groups may be accommodated across multiple vehicles or hotels, as communicated before departure. If minimum participation is not achieved, travellers will be notified at least 5 days before departure and offered an alternative departure or an applicable refund under our published policies. Any alternative involving additional charges requires the traveller’s prior agreement."
  ],
  [
    "Accommodation",
    "Accommodation will be provided in 3-star hotels. The hotel name and room category will be specified in the booking confirmation. Any proposed change will be communicated before departure, together with the available options."
  ],
  [
    "Room Sharing & Occupancy",
    "Rooms follow the double, triple or quad-sharing arrangement selected at booking. Triple and quad occupancy may involve extra beds or mattresses, depending on the property. Single occupancy and room upgrades are subject to availability and additional charges agreed upon in advance."
  ],
  [
    "Transport & Seating",
    "Vehicle allocation depends on the confirmed group size, route and operating conditions. Transport is shared with fellow participants, and larger groups may travel in multiple vehicles. Specific seats or vehicle models are guaranteed only when confirmed in writing."
  ],
  [
    "Vehicle Usage",
    "The package vehicle is available exclusively for scheduled transfers and sightseeing in the confirmed itinerary. It is not available for unrestricted or 24-hour use. Additional journeys require prior agreement and are subject to availability and separate charges."
  ],
  [
    "Vehicle Access & Additional Local Transport",
    "The package vehicle will operate only up to points permitted by the relevant authorities and safe for the allocated vehicle. Beyond these points, any additional vehicle, local taxi or other onward transport is chargeable separately and payable by the traveller. Charges will be communicated before use. Drivers must not be asked to violate traffic, parking, road-access or safety restrictions."
  ],
  [
    "Pickup, Drop-off & Reporting Time",
    "Travellers must reach the designated pickup point at the reporting time stated in the booking confirmation. Alternative pickup or drop-off locations require prior agreement and may attract additional charges. Missed departures are governed by the published No Show Policy."
  ],
  [
    "Meals & Dietary Requirements",
    "Only meals listed in the package are included. Menus, timings and buffet or set-menu service depend on the hotel or venue. Dietary preferences and allergies must be disclosed before booking; requested arrangements are subject to availability and confirmation."
  ],
  [
    "Hotel Check-in & Check-out",
    "The hotel’s standard check-in and check-out timings apply. Early check-in and late check-out are subject to availability and additional charges."
  ],
  [
    "Itinerary & Sightseeing Adjustments",
    "The itinerary outlines the planned journey. Routes, timings and sightseeing order may change due to weather, traffic, road conditions, attraction closures, government restrictions or safety requirements. Material changes and available alternatives will be communicated as soon as reasonably possible."
  ],
  [
    "Inclusions & Exclusions",
    "Only services expressly listed in the confirmed package are included. Entrance fees, optional activities, personal expenses and other excluded services are payable separately. Additional services require the traveller’s agreement before charges are incurred."
  ],
  [
    "Booking Confirmation & Payments",
    "Bookings are subject to availability and written confirmation after receipt of the required advance. The package price, advance amount, remaining balance and payment deadlines will be displayed during booking or stated in the confirmed quotation. Travellers must verify their booking details before payment."
  ],
  [
    "Government Taxes",
    "GST is included where expressly stated in the confirmed package price. Any subsequent statutory increase or decrease in applicable taxes will be reflected in the payable amount and communicated to the traveller."
  ],
  [
    "Cancellations, Rescheduling & Refunds",
    "Requests are governed by the Cancellation Policy and Refund Policy published on the Only Road Trip website, together with package-specific conditions disclosed before booking. Requests must be submitted through the official channels specified in those policies."
  ],
  [
    "Identification, Travel Documents & Permits",
    "All travellers, including children, must carry valid original identification appropriate to their age and destination requirements. Accepted documents and required permits will be communicated before departure. Travellers should not rely solely on a PAN card for travel identification. Entry remains subject to the relevant authority’s requirements."
  ],
  [
    "Health, Accessibility & Special Assistance",
    "Relevant medical conditions, mobility limitations and special assistance requirements must be disclosed before booking. Accessible rooms, wheelchair arrangements and other assistance are available only where confirmed in writing. Facilities may vary by destination."
  ],
  [
    "Luggage & Personal Belongings",
    "Travellers must comply with the luggage limits communicated for the allocated transport. Oversized or additional luggage requires prior confirmation. Identification documents, medicines, valuables and personal belongings should remain in the traveller’s care."
  ],
  [
    "Children & Accompanying Adults",
    "Children must travel under the supervision of a responsible parent or authorised guardian. Child pricing, bedding, meals and seating arrangements must be confirmed before booking."
  ],
  [
    "Traveller Conduct, Women’s Safety & Complaint Response",
    "All travellers, drivers, tour coordinators, guides, tour managers and accommodation staff must treat one another with dignity and respect. These requirements apply to all group departures, including open groups of previously unfamiliar travellers, college groups, corporate groups and privately organised groups. Abusive language, intimidation, threats, bullying, discrimination, violence and disrespectful behaviour towards travellers or service personnel are prohibited. Only Road Trip prioritises women’s safety and maintains a zero-tolerance policy towards sexual harassment, unwanted physical contact, inappropriate comments or gestures, stalking, coercion and violations of consent, privacy or personal boundaries. These protections apply to everyone, and misconduct by travellers or service personnel will be treated with equal seriousness. Concerns may be reported at any time through our 24/7 helpline: +91 92117 96168. There is no requirement to wait until the tour ends or the traveller returns home. Safety and harassment complaints receive immediate priority: we commit to contacting the complainant and initiating appropriate protective measures within one hour of receiving the complaint, with earlier intervention wherever possible. Measures may include separating those involved, arranging a safe location, suspending participation or service duties, replacing personnel or contacting the authorities. Final resolution may require additional time for investigation, third-party cooperation or police involvement. Where serious misconduct, including harassment, sexual harassment, violence, threats or behaviour endangering any person, is reasonably established following an assessment of the incident, Only Road Trip may immediately terminate the offending traveller’s participation at that location and remove them from the group. No refund will ordinarily be provided for the unused portion of the tour resulting from such termination, except where required by applicable law. Additional accommodation, onward transport and other expenses arising from removal will be the traveller’s responsibility where legally recoverable. Removal arrangements will take account of immediate safety requirements. Incidents and reasons for termination will be documented, and immediate protective action may be taken while the assessment is underway. Appropriate action against service personnel may include removal or replacement and referral to their employer or service provider. Suspected criminal conduct may be reported to the police or other competent authorities. Only Road Trip will cooperate with lawful investigations; criminal penalties will be determined by the competent authorities under applicable Indian law. Reports will be handled sensitively, with information shared only as reasonably necessary to protect safety, arrange assistance, investigate the incident or fulfil legal obligations. Retaliation against anyone reporting a concern or assisting an investigation is prohibited. Travellers and service personnel may contact the police or emergency services directly."
  ],
  [
    "Service Concerns & Assistance",
    "Service concerns should be reported promptly to the tour coordinator or official support team so that assistance can be arranged during the journey. Subsequent complaints should include the booking reference and relevant supporting information."
  ],
  [
    "Applicable Booking Terms",
    "These conditions apply to Only Road Trip, operated by Swastik Tour And Travels Private Limited, together with the confirmed package details and published website policies. Package-specific conditions must be disclosed before payment. Nothing in these terms limits rights available under applicable law."
  ]
] as const;

export default function GroupTourTerms() {
 return <section id="group-tour-terms" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm"><h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Terms &amp; Conditions</h2><details className="mt-5 rounded-xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer font-bold text-slate-900">View Group Tour Terms &amp; Conditions</summary><ol className="mt-5 list-decimal space-y-5 pl-5 text-slate-600">{groupTourTerms.map(([title, text]) => <li key={title} className="pl-1"><h3 className="font-bold text-slate-900">{title}</h3><p className="mt-2 leading-7">{text}</p></li>)}</ol><p className="mt-6 flex flex-wrap gap-4 text-sm font-semibold text-blue-800"><Link href="/terms-and-conditions">Website Terms &amp; Conditions</Link><Link href="/cancellation-policy">Cancellation Policy</Link><Link href="/refund-policy">Refund Policy</Link></p></details></section>;
}
