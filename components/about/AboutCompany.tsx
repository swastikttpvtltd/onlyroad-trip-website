import Image from "next/image";

export default function AboutCompany() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left Image */}
          <div className="relative">

            <Image
              src="/images/about/about-company.jpg"
              alt="Only Road Trip"
              width={700}
              height={800}
              className="rounded-3xl object-cover shadow-2xl"
            />

          </div>

          {/* Right Content */}
          <div>

            <span className="text-sm font-bold uppercase tracking-[3px] text-cyan-600">
              ABOUT US
            </span>

            <h2 className="mt-4 text-4xl font-bold text-slate-900 lg:text-5xl">
              Crafting Memorable Journeys Across India
            </h2>

            <p className="mt-8 text-lg leading-9 text-slate-600">
              Only Road Trip is the flagship travel brand of
              <strong> Swastik Tour And Travels Private Limited</strong>,
              established with a vision to redefine the way people explore
              India. We believe that every journey is more than just reaching
              a destination—it's about creating unforgettable memories,
              discovering diverse cultures, and experiencing the incredible
              beauty, heritage, and spirituality that India has to offer.
            </p>

            <p className="mt-6 text-lg leading-9 text-slate-600">
              We specialize in thoughtfully curated road trips, pilgrimage
              tours, family vacations, group departures, corporate travel,
              luxury holidays, and fully customized travel experiences across
              India. Whether it's a spiritual retreat to Kedarnath, an
              adventure through the Himalayas, a relaxing holiday in Kerala,
              or a corporate offsite, every itinerary is carefully planned to
              provide the perfect balance of comfort, convenience, and
              authentic local experiences.
            </p>

            <p className="mt-6 text-lg leading-9 text-slate-600">
              At Only Road Trip, customer satisfaction is at the heart of
              everything we do. We collaborate with trusted hotels, verified
              transport partners, experienced drivers, and reliable local
              service providers to ensure every journey is smooth, safe, and
              memorable. From the moment you book until you return home, our
              dedicated support team works to provide a hassle-free travel
              experience with transparent pricing and personalized assistance.
            </p>

            <p className="mt-6 text-lg leading-9 text-slate-600">
              We understand that every traveler has unique needs. That's why
              we also offer <strong>selected travel packages specially
              designed for senior citizens and differently-abled
              travelers</strong>. These carefully curated itineraries focus on
              greater comfort, flexible schedules, minimal physical strain,
              and accessible travel arrangements where available, making
              travel more inclusive without compromising on quality.
            </p>

            <p className="mt-6 text-lg leading-9 text-slate-600">
              Driven by innovation and a passion for travel, we continuously
              expand our destinations, strengthen our partnerships, and
              improve our services to meet the evolving expectations of modern
              travelers. Whether you're planning a family holiday, a spiritual
              journey, a romantic getaway, a corporate trip, or a customized
              road trip, our experienced team is committed to delivering
              exceptional service and unforgettable experiences.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}