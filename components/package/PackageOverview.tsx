interface PackageOverviewProps {
  data: {
    overview: string;
    quickFacts: {
      pickup: string;
      drop: string;
      transport: string;
      meals: string;
      hotelCategory: string;
      bestSeason: string;
    };
  };
}

export default function PackageOverview({
  data,
}: PackageOverviewProps) {
  const facts = [
    { label: "Pickup", value: data.quickFacts.pickup },
    { label: "Drop", value: data.quickFacts.drop },
    { label: "Transport", value: data.quickFacts.transport },
    { label: "Meals", value: data.quickFacts.meals },
    { label: "Hotel Category", value: data.quickFacts.hotelCategory },
    { label: "Best Season", value: data.quickFacts.bestSeason },
  ];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-3xl font-bold text-gray-900">
          Package Overview
        </h2>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          {data.overview}
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-gray-500">
                {fact.label}
              </p>

              <h3 className="mt-2 text-lg font-semibold text-gray-900">
                {fact.value}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}