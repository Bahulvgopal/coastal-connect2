"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import { Search, Landmark, Music, BookOpen, History as HistoryIcon, ArrowRight } from "lucide-react";

export default function Archive() {
  const [filter, setFilter] = useState("All");

  const categories = [
    { name: "All", icon: <BookOpen size={16} /> },
    { name: "Art Forms", icon: <Music size={16} /> },
    { name: "Landmarks", icon: <Landmark size={16} /> },
    { name: "History", icon: <HistoryIcon size={16} /> },
  ];

  const archiveItems = [
    {
      title: "Kathakali Artform",
      category: "Art Forms",
      image: "https://www.istockphoto.com/photos/kathakali-masks",
      description: "A blend of dance, music and ritual, one of the oldest theater traditions."
    },
    {
      title: "Bekal Fort",
      category: "Landmarks",
      image: "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?q=80&w=1000",
      description: "The largest fortress in Kerala, built in the 17th century by Shivappa Nayaka."
    },
    {
      title: "Muziris Heritage",
      category: "History",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1000",
      description: "Exploring the ancient spice route and the lost port of the Roman era."
    }
  ];

  const filteredItems = filter === "All" 
    ? archiveItems 
    : archiveItems.filter(item => item.category === filter);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HEADER SECTION */}
      <section className="bg-gray-950 py-16 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">
            The Heritage Archive
          </h1>
          <p className="text-gray-400 text-lg">
            Preserving the soul of Kerala through its traditions, folklore, and historic landmarks.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-10">
        
        {/* SEARCH & FILTER BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex bg-gray-100 p-1 rounded-2xl w-full md:w-auto overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setFilter(cat.name)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  filter === cat.name 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search history..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* ARCHIVE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative h-72 w-full rounded-3xl overflow-hidden mb-4 shadow-lg">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-600">
                    {item.category}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 mt-2 text-sm line-clamp-2 leading-relaxed">
                {item.description}
              </p>
              <div className="mt-4 flex items-center text-blue-600 text-xs font-bold uppercase tracking-wider group-hover:gap-2 transition-all">
                Read Archive <ArrowRight size={14} className="ml-1" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
