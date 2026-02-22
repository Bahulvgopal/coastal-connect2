"use client";

import { useState } from "react";
import { 
  MapPin, 
  ArrowRight, 
  Anchor, 
  Waves, 
  Palmtree, 
  Mountain, 
  Ship 
} from "lucide-react";

export default function DistrictSelector({ onSelect }: { onSelect: (d: string) => void }) {
  const [selected, setSelected] = useState("");

  const districts = [
    { name: "Ernakulam", icon: <Anchor size={20} />, description: "The Queen of the Arabian Sea" },
    { name: "Alappuzha", icon: <Waves size={20} />, description: "Venice of the East" },
    { name: "Thiruvananthapuram", icon: <Palmtree size={20} />, description: "The Evergreen City of India" },
    { name: "Kozhikode", icon: <Ship size={20} />, description: "The City of Spices and Sculpture" },
    { name: "Wayanad", icon: <Mountain size={20} />, description: "The Land of Paddy Fields" },
  ];

  const handleContinue = () => {
    if (selected) onSelect(selected);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4 md:p-6">
      <div className="w-full max-w-md space-y-6 md:space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-blue-600 text-white rounded-2xl shadow-lg mb-2">
            <MapPin size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Where to next?
          </h1>
          <p className="text-gray-500 font-medium px-4">
            Select a district to explore coastal wonders and highland retreats.
          </p>
        </div>

        {/* Scrollable Card Container */}
        <div className="grid gap-3 max-h-[50vh] overflow-y-auto px-2 py-1 custom-scrollbar">
          {districts.map((d) => (
            <button
              key={d.name}
              onClick={() => setSelected(d.name)}
              className={`group relative flex items-center p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                selected === d.name
                  ? "border-blue-600 bg-blue-50 shadow-md ring-4 ring-blue-600/10"
                  : "border-gray-100 bg-white hover:border-blue-200 hover:shadow-sm"
              }`}
            >
              <div className={`p-3 rounded-xl mr-4 transition-colors ${
                selected === d.name 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-50 text-gray-400 group-hover:text-blue-500"
              }`}>
                {d.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-bold text-lg truncate ${
                  selected === d.name ? "text-blue-900" : "text-gray-800"
                }`}>
                  {d.name}
                </h3>
                <p className="text-xs text-gray-500 truncate">{d.description}</p>
              </div>
              {selected === d.name && (
                <div className="h-3 w-3 bg-blue-600 rounded-full animate-pulse flex-shrink-0 ml-2" />
              )}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            disabled={!selected}
            onClick={handleContinue}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg transition-all transform active:scale-[0.98] ${
              selected
                ? "bg-blue-600 text-white shadow-xl shadow-blue-200 hover:bg-blue-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Explore Now
            <ArrowRight size={20} />
          </button>
          
          <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-6">
            Discovering Kerala
          </p>
        </div>
      </div>
    </div>
  );
}