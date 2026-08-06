interface Hotel {
  name: string;
  category?: string;
  location?: string;
  roomType?: string;
  star?: string;
  amenities?: string[];
}

interface PackageHotelsProps {
  data: {
    hotels: Hotel[];
  };
}

export default function PackageHotels({
  data,
}: PackageHotelsProps) {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Hotels Included
          </h2>

          <p className="mt-3 text-gray-600">
            Carefully selected hotels for a comfortable stay during your journey.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.hotels.map((hotel) => (
            <div
              key={hotel.name}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Hotel Image</span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold">{hotel.name}</h3>

                <p className="mt-2 text-sm text-gray-500">
                  📍 {hotel.location ?? "Gujarat"}
                </p>

                <p className="mt-2">
                  ⭐ {hotel.star ?? hotel.category ?? "4 Star"}
                </p>

                <p className="mt-2">
                  🛏 {hotel.roomType ?? "Standard Room"}
                </p>

                <div className="mt-4">
                  <h4 className="font-medium">Amenities</h4>

                  <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                    {(hotel.amenities ?? [
                      "Free WiFi",
                      "Breakfast",
                      "Air Conditioning",
                    ]).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <p className="mt-6 text-xs text-gray-400">
                  * Similar hotel may be provided subject to availability.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}