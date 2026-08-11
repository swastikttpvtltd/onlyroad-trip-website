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
      <section className="relative overflow-hidden bg-slate-950">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className="hero-slide absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url("${image}")`, animationDelay: `${index * 5}s` }}
            aria-hidden="true"
          />
        ))}

        <div className="absolute inset-0 z-[1] bg-slate-950/60" aria-hidden="true" />

        <div className="relative z-[2] mx-auto flex min-h-[500px] max-w-7xl items-center px-4 pb-16 pt-28 sm:min-h-[540px] sm:px-6 sm:pb-20 sm:pt-32 lg:min-h-[600px] lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-[2.35rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Explore Incredible India
              <br />
              <span className="text-cyan-300">With Only Road Trip</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-100 sm:mt-7 sm:text-lg sm:leading-9">
              Experience handcrafted journeys across India with premium pilgrimage tours, family vacations, honeymoon packages, wildlife adventures, luxury holidays and corporate travel solutions—all planned by travel experts.
            </p>
          </div>
        </div>
      </section>

      <div className="relative z-20 mx-auto mt-4 max-w-7xl px-3 sm:mt-6 sm:px-6 lg:px-8">
        <HeroSearch />
      </div>
    </>
  );
}
