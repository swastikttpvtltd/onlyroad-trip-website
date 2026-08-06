"use client";

import { useState } from "react";

interface ItineraryDay {
  day: string;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  meals: string;
  hotel: string;
  distance: string;
  driveTime: string;
  notes: string;
}

interface PackageItineraryProps {
  data: {
    itinerary: ItineraryDay[];
  };
}

export default function PackageItinerary({
  data,
}: PackageItineraryProps) {
  const [activeDay, setActiveDay] = useState<number>(0);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Day Wise Itinerary
          </h2>

          <p className="mt-3 text-gray-600">
            Click on a day to view complete itinerary details.
          </p>
        </div>

        <div className="space-y-5">
          {data.itinerary.map((item, index) => {
            const isOpen = activeDay === index;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm"
              >
                <button
  onClick={() => setActiveDay(isOpen ? -1 : index)}
  className={`flex w-full items-center justify-between rounded-t-2xl border-b px-8 py-7 text-left transition-all duration-300 ${
    isOpen
      ? "border-blue-200 bg-blue-600/10 backdrop-blur-xl"
      : "border-gray-200 bg-white hover:bg-blue-50"
  }`}
>
  <div>

    <p className="text-lg font-semibold uppercase tracking-[0.25em] text-blue-700">
      {item.day}
    </p>

    <h3 className="mt-2 text-3xl font-bold text-gray-900">
      {item.title}
    </h3>

    <p className="mt-3 text-base text-gray-500">
      Pilgrimage • Sightseeing • Comfortable Stay
    </p>

  </div>

  <span className="text-5xl font-extralight text-blue-700">
    {isOpen ? "−" : "+"}
  </span>
</button>

                {isOpen && (
  <div className="border-t border-blue-100 bg-gradient-to-br from-white to-blue-50 p-8">

    <div className="grid gap-8 lg:grid-cols-2">

      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <h4 className="mb-3 text-xl font-semibold text-blue-700">
          Morning
        </h4>

        <p className="leading-8 text-gray-700">
          {item.morning}
        </p>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <h4 className="mb-3 text-xl font-semibold text-blue-700">
          Afternoon
        </h4>

        <p className="leading-8 text-gray-700">
          {item.afternoon}
        </p>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <h4 className="mb-3 text-xl font-semibold text-blue-700">
          Evening
        </h4>

        <p className="leading-8 text-gray-700">
          {item.evening}
        </p>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">

        <div className="space-y-5">

          <div>
            <h4 className="font-semibold text-blue-700">
              Meals
            </h4>

            <p className="mt-1 text-gray-700">
              {item.meals}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-blue-700">
              Hotel
            </h4>

            <p className="mt-1 text-gray-700">
              {item.hotel}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-blue-700">
              Distance
            </h4>

            <p className="mt-1 text-gray-700">
              {item.distance}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-blue-700">
              Drive Time
            </h4>

            <p className="mt-1 text-gray-700">
              {item.driveTime}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-blue-700">
              Important Notes
            </h4>

            <p className="mt-1 text-gray-700">
              {item.notes}
            </p>
          </div>

        </div>

      </div>

    </div>

  </div>
)}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}