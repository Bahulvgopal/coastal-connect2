"use client";

import dynamic from "next/dynamic";
import { Map as MapIcon } from "lucide-react";

// Dynamic import with a custom Loading skeleton
const MapInner = dynamic(() => import("./PlacesMapInner"), {
  ssr: false,
  loading: () => <MapLoadingSkeleton />,
});

interface PlacesMapProps {
  places: any[];
  selectedPlace: any | null;
}

export default function PlacesMap({ places, selectedPlace }: PlacesMapProps) {
  return (
    <div className="relative w-full h-full bg-gray-100 overflow-hidden">
      {/* The actual Map component */}
      <MapInner places={places} selectedPlace={selectedPlace} />

      {/* Optional: Overlay info for Mobile when a place is selected */}
      {selectedPlace && (
        <div className="absolute bottom-20 left-4 right-4 md:hidden z-[1000] animate-in fade-in slide-in-from-bottom-5">
          <div className="bg-white p-4 rounded-2xl shadow-2xl border border-blue-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{selectedPlace.type}</p>
              <h4 className="font-bold text-gray-900">{selectedPlace.name}</h4>
            </div>
            <button className="bg-blue-600 text-white p-2 rounded-xl">
              <MapIcon size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// A sleek loading state so the UI doesn't "jump"
function MapLoadingSkeleton() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
        <MapIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600" size={24} />
      </div>
      <p className="text-gray-400 font-medium animate-pulse text-sm uppercase tracking-widest">
        Loading Map...
      </p>
    </div>
  );
}