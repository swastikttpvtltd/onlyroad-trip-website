type PackageHighlightsProps = {
  data: {
    highlights: string[];
  };
};

export default function PackageHighlights({
  data,
}: PackageHighlightsProps) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Tour Highlights
          </h2>

          <p className="mt-3 text-gray-600">
            Discover the best experiences included in this package.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.highlights.map((highlight) => (
            <div
              key={highlight}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-lg"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>

                <p className="font-medium text-gray-800">
                  {highlight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}