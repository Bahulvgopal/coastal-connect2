"use client";

export default function PlaceCard({ place, onSelect }: any) {
  return (
    <div
      onClick={() => onSelect(place)}
      className="p-4 border rounded-lg hover:bg-gray-100 cursor-pointer"
    >
      <h2 className="font-bold">{place.name}</h2>
      <p className="text-sm">{place.description}</p>
      <p className="text-xs text-blue-600">{place.category}</p>
    </div>
  );
}