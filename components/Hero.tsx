import HeroSearch from "./HeroSearch";

const heroImages = [
  "/images/hero/hero.png",
  "/images/hero/hero-2.png",
  "/images/hero/hero-3.png",
  "/images/hero/hero-4.png",
  "/images/hero/hero-5.png",
  "/images/hero/hero-6.png",
  "/images/hero/hero-7.png",
  "/images/hero/hero-8.png",
  "/images/hero/hero-9.png",
  "/images/hero/hero-10.png",
];

export default function Hero() {
  return (
    <>
      {/* Hero Image Slider */}
      <section className="relative overflow-hidden bg-black">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className="hero-slide absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("${image}")`,
              animationDelay: `${index * 5}s`,
            }}
          />
        ))}

        {/* Dark Overlay */}
        <div className="absolute inset-0 z-[1] bg-black/55" />

        {/* Hero Content */}
        <div className="relative z-[2] mx-auto flex min-h-[560px] max-w-7xl items-center px-6 pb-20 pt-28 lg:min-h-[600px] lg:px-8">
          <div className="max-w-3xl">
            {/* Heading */}
            <h1 className="text-5xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
              Explore Incredible India
              <br />
              <span className="text-cyan-300">
                With Only Road Trip
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-200">
              Experience handcrafted journeys across India with premium
              pilgrimage tours, family vacations, honeymoon packages,
              wildlife adventures, luxury holidays and corporate travel
              solutions—all planned by travel experts.
            </p>
          </div>
        </div>
      </section>

      {/* Search Card — placed below hero image */}
      <div className="relative z-20 mx-auto mt-6 max-w-7xl px-6 lg:px-8">
        <HeroSearch />
      </div>
    </>
  );
}