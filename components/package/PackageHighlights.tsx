interface PackageHighlightsProps {
  data: {
    highlights: string[];
  };
}

export default function PackageHighlights({
  data,
}: PackageHighlightsProps) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Package Highlights
          </h2>

          <p className="mt-3 max-w-3xl text-gray-600">
            Explore the key spiritual attractions and experiences included in
            this carefully curated pilgrimage tour.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.highlights.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-gray-200 bg-white p-6 transition duration-300 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {item}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}