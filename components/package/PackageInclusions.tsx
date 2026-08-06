interface PackageInclusionsProps {
  data: {
    inclusions: string[];
  };
}

export default function PackageInclusions({
  data,
}: PackageInclusionsProps) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            What's Included
          </h2>

          <p className="mt-3 text-gray-600">
            Everything included in your tour package.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {data.inclusions.map((item) => (
            <div
              key={item}
              className="flex items-center rounded-xl border border-green-200 bg-green-50 p-4"
            >
              <span className="mr-3 text-xl">✅</span>

              <span className="text-gray-700">
                {item}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}