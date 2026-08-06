type PackageQuickFactsProps = {
  data: {
    packageFacts: {
      duration: string;
      pickup: string;
      drop: string;
      transport: string;
      hotelCategory: string;
      meals: string;
      difficulty: string;
      bestSeason: string;
      totalDistance: string;
    };
  };
};

export default function PackageQuickFacts({
  data,
}: PackageQuickFactsProps) {
  const facts = [
    {
      title: "Duration",
      value: data.packageFacts.duration,
      icon: "🗓️",
    },
    {
      title: "Pickup",
      value: data.packageFacts.pickup,
      icon: "📍",
    },
    {
      title: "Drop",
      value: data.packageFacts.drop,
      icon: "🏁",
    },
    {
      title: "Transport",
      value: data.packageFacts.transport,
      icon: "🚌",
    },
    {
      title: "Hotel",
      value: data.packageFacts.hotelCategory,
      icon: "🏨",
    },
    {
      title: "Meals",
      value: data.packageFacts.meals,
      icon: "🍽️",
    },
    {
      title: "Difficulty",
      value: data.packageFacts.difficulty,
      icon: "🥾",
    },
    {
      title: "Best Season",
      value: data.packageFacts.bestSeason,
      icon: "🌤️",
    },
    {
      title: "Distance",
      value: data.packageFacts.totalDistance,
      icon: "🛣️",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Quick Package Facts
          </h2>

          <p className="mt-3 text-gray-600">
            Everything you need to know before booking.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact) => (
            <div
              key={fact.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
            >
              <div className="text-4xl">
                {fact.icon}
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {fact.title}
              </h3>

              <p className="mt-2 text-gray-600">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}