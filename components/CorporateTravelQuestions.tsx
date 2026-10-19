import Link from "next/link";

const questions = [
  {
    question: "What should a company share for a business trip booking?",
    answer: "Send the destination, travel dates, number of employees, meeting timings, preferred flight and hotel standards, transfer needs and budget. Include any company approval or travel-policy requirements so the proposed arrangements fit the brief.",
  },
  {
    question: "Can we request flights, hotels and transfers together?",
    answer: "Yes. Our Gurugram team can coordinate the agreed flight, accommodation and ground-transport requirements in one plan. Review the proposed suppliers, timings, room choices, inclusions and total quote before confirming the booking.",
  },
  {
    question: "Do you plan corporate offsites from Gurugram and Delhi NCR?",
    answer: "We can discuss destinations, travel, stays and meeting or team-activity requirements for your group. Pickup points, venue access, meals and optional activities are included only where agreed in the proposal, subject to availability.",
  },
  {
    question: "How are changes, cancellation terms and invoices handled?",
    answer: "Ask for the applicable fare, hotel and service conditions before booking. Changes and cancellations follow those conditions and may carry charges. Our team provides GST invoices and organised documentation for the arrangements it manages.",
  },
];

export default function CorporateTravelQuestions() {
  return (
    <section aria-labelledby="corporate-questions-heading" className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
      <h2 id="corporate-questions-heading" className="text-3xl font-semibold text-slate-950">Corporate travel booking questions</h2>
      <p className="mt-4 max-w-3xl leading-7 text-slate-600">Practical details for companies planning business travel with our Gurugram team.</p>
      <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
        {questions.map((item) => (
          <details key={item.question} className="py-6">
            <summary className="cursor-pointer font-semibold text-slate-950">{item.question}</summary>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">{item.answer}</p>
          </details>
        ))}
      </div>
      <Link href="/contact" className="mt-7 inline-flex font-semibold text-blue-800">Share your corporate travel brief →</Link>
    </section>
  );
}
