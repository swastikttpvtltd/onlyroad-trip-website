import packageData from "@/data/packages/gujarat/dwarka-somnath";

import PackageHero from "@/components/package/PackageHero";
import PackageOverview from "@/components/package/PackageOverview";
import PackageItinerary from "@/components/package/PackageItinerary";
import PackageHotels from "@/components/package/PackageHotels";
import PackageInclusions from "@/components/package/PackageInclusions";
import PackageExclusions from "@/components/package/PackageExclusions";
import PackageHighlights from "@/components/package/PackageHighlights";

const heroData = {
  title: packageData.title,
  duration: packageData.duration,
  location: packageData.destination,
  hero: packageData.hero,
};

const hotelData = {
  hotels: packageData.hotels.map((hotel) => ({
    name: hotel.name,
    location: packageData.destination,
    roomType: hotel.category ?? "Standard",
    star: hotel.category ?? "4 Star",
    amenities: ["Free WiFi", "Breakfast", "Air Conditioning"],
  })),
};

export default function DwarkaSomnathPage() {
  return (
    <main className="bg-gray-50">
      <PackageHero data={heroData} />

      <PackageOverview data={packageData} />

      <PackageHighlights data={packageData} />
      <PackageItinerary data={packageData} />
      <PackageHotels data={hotelData} />
      <PackageInclusions data={packageData} />
      <PackageExclusions data={packageData} />
    </main>
  );
}