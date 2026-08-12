import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Headphones,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

type Variant =
  | "char-dham"
  | "kedarnath"
  | "corporate-mice"
  | "solo-women";

type PageConfig = {
  badge: string;
  title: string;
  accent: string;
  intro: string;
  secondary: string;
  primaryCta: string;
  heroPoints: string[];
  sectionLabel: string;
  sectionTitle: string;
  sectionText: string;
  services: { title: string; text: string }[];
  benefits: string[];
  steps: { number: string; title: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

const configs: Record<Variant, PageConfig> = {
  "char-dham": {
    badge: "Char Dham Yatra Packages",
    title: "Char Dham Yatra Packages from Delhi",
    accent: "Yatra planned around your comfort.",
    intro:
      "Plan a meaningful Char Dham Yatra with a customized itinerary, comfortable stays, reliable transportation and dedicated travel support from Only Road Trip.",
    secondary:
      "Choose a suitable route, travel date and vehicle option for your family or group. We can customize the journey around your pace and requirements.",
    primaryCta: "Get Char Dham Quote",
    heroPoints: [
      "Customized Char Dham itineraries",
      "Delhi, Haridwar and Rishikesh departure options",
      "Family, senior-citizen and group travel support",
    ],
    sectionLabel: "Char Dham Travel Planning",
    sectionTitle: "A pilgrimage journey that is planned, not rushed.",
    sectionText:
      "A Char Dham Yatra involves long road journeys, changing terrain, hotel check-ins and multiple pilgrimage stops. Our team helps bring these pieces together into one practical itinerary so travelers can focus on the spiritual experience.",
    services: [
      { title: "Customized Itinerary", text: "Plan the route, number of nights, departure point and pace around your group rather than forcing everyone into one fixed schedule." },
      { title: "Comfortable Transport", text: "Choose suitable cars, SUVs, Tempo Travellers or larger vehicles based on group size and route requirements." },
      { title: "Hotel Coordination", text: "We can arrange stays at practical locations to make the daily journey and temple visits easier to manage." },
      { title: "Senior-Friendly Planning", text: "We can build a slower itinerary and discuss accessibility, rest stops and other practical requirements for senior travelers." },
      { title: "Group & Family Tours", text: "Coordinate travel, accommodation and local movements for families, friends, community groups and larger pilgrimage groups." },
      { title: "Travel Support", text: "Our team remains available for agreed travel coordination and assistance when plans need to change during the journey." },
    ],
    benefits: [
      "Customized dates and route planning",
      "Transparent package discussions based on your requirements",
      "Comfort-focused transport and stay options",
      "Support for families and senior citizens",
      "End-to-end coordination for group travel",
      "Personalized assistance before and during the trip",
    ],
    steps: [
      { number: "01", title: "Share your travel plan", text: "Tell us your preferred dates, departure city, group size and any special requirements." },
      { number: "02", title: "Receive your itinerary", text: "We prepare suitable route, stay and transport options around your travel pace and budget." },
      { number: "03", title: "Confirm and travel", text: "Once you approve the plan, we coordinate the agreed bookings and travel arrangements." },
    ],
    faqs: [
      { question: "Can you customize a Char Dham Yatra package?", answer: "Yes. Char Dham itineraries can be customized around your dates, departure city, group size, vehicle preference, hotel requirements and preferred pace." },
      { question: "Can senior citizens travel with your Char Dham packages?", answer: "Yes. We can discuss a more comfortable itinerary with additional rest time and suitable transportation. Travelers should also consider their individual fitness and medical advice before undertaking a high-altitude pilgrimage." },
      { question: "Can you arrange Char Dham trips for groups?", answer: "Yes. We can plan family groups, friends, community groups and larger pilgrimage groups with suitable vehicles and accommodation arrangements." },
    ],
  },
  kedarnath: {
    badge: "Kedarnath Yatra Packages",
    title: "Kedarnath Yatra Package from Delhi",
    accent: "Plan the journey with confidence.",
    intro:
      "Book a customized Kedarnath Yatra with practical road planning, accommodation coordination, transport options and travel support from Only Road Trip.",
    secondary:
      "We help plan Kedarnath trips from Delhi and other starting points, with itineraries that can be adapted for families, couples, groups and senior travelers.",
    primaryCta: "Get Kedarnath Quote",
    heroPoints: [
      "Delhi, Haridwar and Rishikesh route options",
      "Customized family and group itineraries",
      "Hotel, vehicle and journey coordination",
    ],
    sectionLabel: "Kedarnath Travel Planning",
    sectionTitle: "More than a booking — a properly coordinated yatra.",
    sectionText:
      "Kedarnath travel needs careful planning because the journey combines road travel, mountain routes, changing weather and the final pilgrimage segment. We help organize the practical parts of your trip into one clear plan.",
    services: [
      { title: "Delhi to Kedarnath Planning", text: "Build a complete itinerary from Delhi or another preferred departure point with sensible overnight stops." },
      { title: "Transport Options", text: "Choose a suitable vehicle for your group and coordinate transfers around the planned route." },
      { title: "Stay Coordination", text: "Arrange practical accommodation for the road journey and return route based on availability and your requirements." },
      { title: "Yatra Support", text: "Get clear information about the planned journey and assistance with the travel arrangements handled by our team." },
      { title: "Family & Group Trips", text: "Customize the itinerary for couples, families, friends and pilgrimage groups with different travel needs." },
      { title: "Senior-Friendly Options", text: "Discuss a slower travel schedule, rest breaks and suitable arrangements where practical for older travelers." },
    ],
    benefits: [
      "Customized travel dates and departure points",
      "Clear itinerary before booking",
      "Comfort-focused vehicle options",
      "Family and group travel coordination",
      "Accommodation planning along the route",
      "Responsive travel assistance",
    ],
    steps: [
      { number: "01", title: "Tell us your dates", text: "Share your preferred travel dates, group size, starting point and hotel or vehicle preferences." },
      { number: "02", title: "Choose your plan", text: "We prepare a practical itinerary with transport and stay options suited to your requirements." },
      { number: "03", title: "Confirm your yatra", text: "After confirmation, we coordinate the agreed arrangements for your journey." },
    ],
    faqs: [
      { question: "Can I book a Kedarnath package from Delhi?", answer: "Yes. We can plan a Kedarnath Yatra from Delhi, with route and overnight stops customized around your travel dates and group size." },
      { question: "Can the Kedarnath itinerary be customized?", answer: "Yes. The number of nights, departure point, vehicle, accommodation and pace can be discussed according to your requirements." },
      { question: "Is the Kedarnath Yatra suitable for senior citizens?", answer: "Senior travelers should assess their fitness and seek appropriate medical advice before the trip. We can help with a more comfortable road itinerary and additional rest time where possible." },
    ],
  },
  "corporate-mice": {
    badge: "Corporate MICE Travel",
    title: "Corporate MICE Travel & Business Events",
    accent: "One travel partner for the whole programme.",
    intro:
      "Only Road Trip helps businesses plan MICE travel, corporate offsites, incentive trips, conferences, meetings and employee group travel across India and international destinations.",
    secondary:
      "From accommodation and airport transfers to group transport, local movements and leisure activities, we coordinate the travel requirements around your event schedule.",
    primaryCta: "Get Corporate MICE Quote",
    heroPoints: [
      "Meetings, incentives, conferences and exhibitions",
      "Corporate offsites and employee group travel",
      "Domestic and international MICE coordination",
    ],
    sectionLabel: "MICE & Corporate Events",
    sectionTitle: "Business travel that keeps the programme moving.",
    sectionText:
      "Corporate events have multiple moving parts: attendee arrivals, rooming, transfers, meeting schedules, group movements, meals and departures. We coordinate the travel side so your internal team has fewer vendors and fewer details to chase.",
    services: [
      { title: "Meetings & Conferences", text: "Coordinate accommodation, airport transfers, local transport and group movements around your event schedule." },
      { title: "Incentive Travel", text: "Design group travel programmes that combine business objectives with destination experiences and leisure time." },
      { title: "Corporate Offsites", text: "Plan employee retreats and team trips with hotels, transportation, activities and practical logistics." },
      { title: "Dealer & Partner Meets", text: "Arrange travel and hospitality logistics for dealer meets, channel events and partner programmes." },
      { title: "Group Flights & Hotels", text: "Coordinate group travel requirements for domestic and international business events." },
      { title: "On-Trip Coordination", text: "Keep agreed travel arrangements connected so changes and group movements can be handled efficiently." },
    ],
    benefits: [
      "Single point of coordination",
      "Domestic and international group travel support",
      "Customized programmes around company budgets",
      "Accommodation and group transport planning",
      "GST invoices and organized documentation",
      "Support for planned and last-minute requirements",
    ],
    steps: [
      { number: "01", title: "Share the brief", text: "Tell us the destination, dates, group size, event format, budget and travel requirements." },
      { number: "02", title: "Review the proposal", text: "We build suitable travel and logistics options around your programme and business requirements." },
      { number: "03", title: "We coordinate", text: "Once approved, we coordinate the agreed bookings, group movements and travel support." },
    ],
    faqs: [
      { question: "What does MICE travel include?", answer: "MICE covers Meetings, Incentives, Conferences and Exhibitions. Travel arrangements can include flights, hotels, transfers, local transport, group movements and leisure activities." },
      { question: "Can you handle international corporate groups?", answer: "Yes. We can coordinate international corporate travel requirements, subject to destination, supplier and documentation availability." },
      { question: "Can you plan a corporate offsite for a large team?", answer: "Yes. We can coordinate accommodation, transportation, activities and group logistics for corporate offsites of different sizes." },
    ],
  },
  "solo-women": {
    badge: "Solo Women Travel Packages",
    title: "Solo Women Travel Packages in India",
    accent: "Independent travel, thoughtfully planned.",
    intro:
      "Explore customized solo women travel packages with practical itineraries, reliable travel arrangements and support from Only Road Trip.",
    secondary:
      "Whether you want a short getaway, a road trip, a spiritual journey or a longer holiday, we can help build a plan around your comfort, preferences and budget.",
    primaryCta: "Plan My Solo Trip",
    heroPoints: [
      "Customized itineraries for solo women travelers",
      "Practical transport and accommodation planning",
      "Domestic and international trip options",
    ],
    sectionLabel: "Solo Women Travel",
    sectionTitle: "Your trip, your pace, your plan.",
    sectionText:
      "Solo travel should feel empowering, not unnecessarily complicated. We help with the practical planning — routes, stays, transport and itinerary structure — while keeping your personal preferences at the center of the trip.",
    services: [
      { title: "Customized Itineraries", text: "Build a trip around your preferred destinations, travel style, duration, budget and pace." },
      { title: "Stay Planning", text: "Discuss accommodation options in practical locations with your preferred comfort level and budget." },
      { title: "Reliable Transport", text: "Plan private transfers, cabs, intercity transport or other suitable options for your itinerary." },
      { title: "Short Getaways", text: "Create practical weekend and short-break itineraries for travelers who want a quick escape." },
      { title: "Road Trips", text: "Customize scenic road trips with route planning, stays and vehicle arrangements around your preferences." },
      { title: "International Options", text: "We can also help plan international holidays, subject to destination requirements, documentation and availability." },
    ],
    benefits: [
      "Personalized itinerary planning",
      "Comfort-focused accommodation options",
      "Transport and transfer coordination",
      "Domestic and international holiday options",
      "Clear travel plan before booking",
      "Travel support for agreed arrangements",
    ],
    steps: [
      { number: "01", title: "Tell us what you want", text: "Share your destination, dates, preferred style, budget and any travel preferences." },
      { number: "02", title: "We build the itinerary", text: "We prepare suitable stay, transport and sightseeing options around your plan." },
      { number: "03", title: "Travel your way", text: "After confirmation, we coordinate the agreed arrangements and provide travel support." },
    ],
    faqs: [
      { question: "Can I customize a solo women travel package?", answer: "Yes. You can choose the destination, duration, hotel category, transport style and activities based on your preferences and budget." },
      { question: "Do you offer international solo travel packages?", answer: "Yes. International trips can be planned subject to destination requirements, availability and applicable travel documentation." },
      { question: "Do you guarantee that a destination is completely safe?", answer: "No travel company can guarantee zero risk. We focus on practical planning and reliable arrangements, and travelers should follow local advisories and use their own judgment throughout the trip." },
    ],
  },
};

export default function NicheLandingPage({ variant }: { variant: Variant }) {
  const config = configs[variant];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-100 bg-white">
        <div className="absolute -right-24 top-0 h-[500px] w-[500px] rounded-full bg-blue-50 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-slate-100 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-8 lg:pb-28 lg:pt-40">
          <div className="grid items-center gap-14 lg:grid-cols-[1.12fr_.88fr]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-800">
                <Sparkles size={15} /> {config.badge}
              </div>
              <h1 className="mt-7 text-5xl font-semibold leading-[1.05] tracking-tight text-slate-950 md:text-6xl lg:text-7xl">
                {config.title}
                <span className="mt-3 block text-blue-800">{config.accent}</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">{config.intro}</p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">{config.secondary}</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-blue-800 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/10 transition hover:bg-blue-900">
                  {config.primaryCta} <ArrowRight size={18} />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50">
                  Talk to Our Travel Team
                </Link>
              </div>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
              <div className="rounded-[24px] bg-slate-950 p-7 text-white md:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-300">Only Road Trip</p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight">Travel planned around your requirements.</h2>
                <div className="mt-8 space-y-4">
                  {config.heroPoints.map((point) => (
                    <div key={point} className="flex items-start gap-3 border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-blue-300" size={19} />
                      <span className="text-sm leading-6 text-slate-200">{point}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6 text-center">
                  <div><MapPinned className="mx-auto text-blue-300" size={20} /><p className="mt-2 text-xs text-slate-400">Custom Routes</p></div>
                  <div><Users className="mx-auto text-blue-300" size={20} /><p className="mt-2 text-xs text-slate-400">Flexible Groups</p></div>
                  <div><Headphones className="mx-auto text-blue-300" size={20} /><p className="mt-2 text-xs text-slate-400">Travel Support</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">{config.sectionLabel}</p><h2 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">{config.sectionTitle}</h2></div>
            <p className="text-base leading-8 text-slate-600 md:text-lg">{config.sectionText}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">What We Can Arrange</p><h2 className="mt-4 text-4xl font-semibold text-slate-950 md:text-5xl">Complete travel support in one plan.</h2></div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {config.services.map((service) => (
              <div key={service.title} className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-800 group-hover:bg-blue-800 group-hover:text-white"><CheckCircle2 size={23} /></div>
                <h3 className="mt-6 text-xl font-semibold text-slate-950">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-300">Why Only Road Trip</p><h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">A travel plan built around real requirements.</h2><p className="mt-6 text-base leading-8 text-slate-300 md:text-lg">We focus on practical planning, clear communication and coordinated travel arrangements instead of pushing every traveler into the same package.</p></div>
            <div className="grid gap-3 sm:grid-cols-2">
              {config.benefits.map((benefit) => <div key={benefit} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5"><ShieldCheck className="mt-0.5 shrink-0 text-blue-300" size={20} /><span className="text-sm leading-6 text-slate-200">{benefit}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center"><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">How It Works</p><h2 className="mt-4 text-4xl font-semibold text-slate-950 md:text-5xl">Simple from the first conversation.</h2></div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {config.steps.map((step) => <div key={step.number} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"><span className="text-sm font-bold text-blue-700">{step.number}</span><h3 className="mt-5 text-xl font-semibold text-slate-950">{step.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center"><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">Frequently Asked Questions</p><h2 className="mt-4 text-4xl font-semibold text-slate-950 md:text-5xl">Questions travelers usually ask.</h2></div>
          <div className="mt-10 space-y-4">
            {config.faqs.map((faq) => <details key={faq.question} className="group rounded-2xl border border-slate-200 bg-slate-50 p-6"><summary className="cursor-pointer list-none pr-8 text-base font-semibold text-slate-950 marker:hidden">{faq.question}</summary><p className="mt-4 text-sm leading-7 text-slate-600">{faq.answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="overflow-hidden rounded-[32px] bg-blue-800 px-7 py-12 text-white md:px-12 md:py-14 lg:px-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-200">Start Planning</p><h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">Ready to plan your journey?</h2><p className="mt-5 max-w-2xl text-base leading-7 text-blue-100 md:text-lg">Share your dates, destination, group size and requirements with us. We will discuss suitable options and prepare your travel plan.</p></div>
              <Link href="/contact" className="!inline-flex !w-fit !items-center !gap-2 !rounded-full !bg-white !px-7 !py-3.5 !text-sm !font-bold !text-blue-900 !no-underline shadow-sm transition hover:!bg-blue-50"><span>{config.primaryCta}</span><ArrowRight size={18} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
