import Image from "next/image";

interface PackageHeroProps {
  data: {
    title: string;
    duration: string;
    location: string;
    hero: {
      image: string;
      shortDescription: string;
    };
  };
}

export default function PackageHero({ data }: PackageHeroProps) {
  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src={data.hero.image}
        alt={data.title}
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="max-w-3xl text-white">
            <p className="mb-3 text-sm uppercase tracking-[4px] text-blue-200">
              Gujarat • Pilgrimage Tour
            </p>

            <h1 className="mb-5 text-5xl font-bold leading-tight">
              {data.title}
            </h1>

            <p className="mb-8 text-lg leading-8 text-gray-200">
              {data.hero.shortDescription}
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-white/15 px-5 py-2 backdrop-blur">
                {data.duration}
              </span>

              <span className="rounded-full bg-white/15 px-5 py-2 backdrop-blur">
                {data.location}
              </span>
            </div>

            <div className="mt-8 flex gap-4">
              <button className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800">
                Book Now
              </button>

              <button className="rounded-lg border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-black">
                Download Itinerary
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}