const stats = [
  { number: "500+", label: "Happy Travelers" },
  { number: "100+", label: "Tour Packages" },
  { number: "50+", label: "Travel Destinations" },
  { number: "24×7", label: "Customer Support" },
];

export default function CompanyStats() {
  return (
    <section className="bg-cyan-700 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 text-center md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <h3 className="text-5xl font-extrabold">{stat.number}</h3>
              <p className="mt-3 text-lg text-cyan-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}