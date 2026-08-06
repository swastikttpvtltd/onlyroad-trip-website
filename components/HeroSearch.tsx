"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Search, Users } from "lucide-react";

export default function HeroSearch() {
  const router = useRouter();

  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travellers, setTravellers] = useState(2);

  const handleSearch = () => {
    if (!destination) {
      alert("Please select a destination.");
      return;
    }

    const params = new URLSearchParams();

    params.append("destination", destination);

    if (travelDate) {
      params.append("date", travelDate);
    }

    params.append("travellers", travellers.toString());

    router.push(`/destinations?${params.toString()}`);
  };

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/20 bg-white/10 p-5 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.35)]">

      {/* Glass Glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-white/5 to-blue-500/10"></div>

      <div className="relative z-10 grid grid-cols-1 gap-5 lg:grid-cols-4">

        {/* Destination */}
        <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:bg-white/15 hover:shadow-lg">
          <div className="mb-3 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-cyan-300" />

            <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Destination
            </span>
          </div>

          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-transparent text-lg font-semibold text-white outline-none"
          >
            <option className="text-black" value="">
              Select Destination
            </option>

            <option className="text-black" value="Varanasi">
              Varanasi
            </option>

            <option className="text-black" value="Ayodhya">
              Ayodhya
            </option>

            <option className="text-black" value="Kedarnath">
              Kedarnath
            </option>

            <option className="text-black" value="Badrinath">
              Badrinath
            </option>

            <option className="text-black" value="Amarnath">
              Amarnath
            </option>

            <option className="text-black" value="Goa">
              Goa
            </option>

            <option className="text-black" value="Kerala">
              Kerala
            </option>

            <option className="text-black" value="Kashmir">
              Kashmir
            </option>

            <option className="text-black" value="Leh Ladakh">
              Leh Ladakh
            </option>
          </select>
        </div>

        {/* Travel Date */}

        <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:bg-white/15 hover:shadow-lg">
          <div className="mb-3 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-cyan-300" />

            <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Travel Date
            </span>
          </div>

          <input
            type="date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className="w-full bg-transparent text-lg font-semibold text-white outline-none"
          />
        </div>
                {/* Travellers */}
        <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:bg-white/15 hover:shadow-lg">
          <div className="mb-3 flex items-center gap-2">
            <Users className="h-5 w-5 text-cyan-300" />

            <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Travellers
            </span>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                setTravellers((prev) => Math.max(1, prev - 1))
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/15 text-xl font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-cyan-500 hover:border-cyan-400"
            >
              −
            </button>

            <span className="text-2xl font-bold text-white">
              {travellers}
            </span>

            <button
              type="button"
              onClick={() => setTravellers((prev) => prev + 1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/15 text-xl font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-cyan-500 hover:border-cyan-400"
            >
              +
            </button>
          </div>
        </div>

        {/* Search Button */}
        <button
          type="button"
          onClick={handleSearch}
          className="group flex items-center justify-center gap-3 rounded-3xl border border-cyan-400/40 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 px-6 py-5 text-lg font-bold text-white shadow-[0_15px_40px_rgba(6,182,212,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(6,182,212,0.55)]"
        >
          <Search className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
          Search Tours
        </button>

      </div>
    </div>
  );
}