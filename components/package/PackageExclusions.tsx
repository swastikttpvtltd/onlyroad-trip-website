interface PackageExclusionsProps {
  data: {
    exclusions: string[];
  };
}

export default function PackageExclusions({
  data,
}: PackageExclusionsProps) {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            What's Not Included
          </h2>

          <p className="mt-3 text-gray-600">
            The following services are not included in this package.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {data.exclusions.map((item) => (
            <div
              key={item}
              className="flex items-center rounded-xl border border-red-200 bg-red-50 p-4"
            >
              <span className="mr-3 text-xl">❌</span>

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