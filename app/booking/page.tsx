"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { providers } from "../data/providers";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import {
  Star,
  CheckCircle,
  MapPin,
  CreditCard,
  ArrowLeft,
  Home,
  Zap,
  ImageIcon
} from "lucide-react";

export default function BookingPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const place = params.get("place");
  const type = params.get("type");
  const lat = Number(params.get("lat"));
  const lng = Number(params.get("lng"));

  // Determine list based on type
  const list = type === "homestay" ? providers.homestays : providers.activities;

  const [selected, setSelected] = useState<any>(null);

  // Calculations
  const platformFee = selected ? Math.round(selected.price * 0.1) : 0;
  const total = selected ? selected.price + platformFee : 0;

  function confirmBooking() {
    if (!user) return router.push("/login");
    if (!selected) return;

    router.push(
      `/booking-details?place=${place}&type=${type}&provider=${selected.name}&price=${selected.price}&lat=${lat}&lng=${lng}`
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f7ff] font-sans pb-20">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 pt-10">
        
        {/* Header Section */}
        <div className="mb-10">
          <button 
            className="flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl mb-6 hover:bg-blue-100 transition-all active:scale-95"
            onClick={() => router.back()}
          >
            <ArrowLeft size={16} /> Back to Search
          </button>

          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-black text-blue-500 mb-2">
            {type === "homestay" ? <Home size={12} /> : <Zap size={12} />}
            {type === "homestay" ? "Premium Homestays" : "Curated Activities"}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light text-slate-900 leading-tight">
            {place}<span className="text-blue-500 font-black">.</span>
          </h1>
          <p className="text-slate-400 text-sm mt-3 flex items-center gap-1 font-medium">
            <MapPin size={14} className="text-blue-400" /> Discover the best {type} options in this area
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: List (Spans 7/12) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4 px-1">
              Available Partners ({list.length})
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              {list.map((p: any) => (
                <div
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className={`group flex items-center gap-5 p-5 rounded-[2rem] cursor-pointer transition-all border-2 bg-white ${
                    selected?.id === p.id 
                    ? "border-blue-500 ring-8 ring-blue-500/5 translate-x-2" 
                    : "border-white hover:border-blue-200 shadow-sm"
                  }`}
                >
                  {/* Small Thumbnail in List */}
                  <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100">
                    <img src={p.thumb} alt="" className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 text-lg">{p.name}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-blue-600 font-black text-sm">₹{p.price}</span>
                      <span className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                        <Star size={12} className="fill-amber-400 text-amber-400" /> {p.rating}
                      </span>
                      <span className="text-slate-300 text-[10px] uppercase font-bold tracking-tighter">
                        {p.location}
                      </span>
                    </div>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    selected?.id === p.id ? "bg-blue-500 scale-110 shadow-lg shadow-blue-200" : "bg-slate-50"
                  }`}>
                    <CheckCircle className={selected?.id === p.id ? "text-white" : "text-slate-200"} size={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Preview & Pricing (Spans 5/12) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            
            {/* Main Preview Image */}
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-4 border-white h-[400px] relative group">
              {selected ? (
                <>
                  <img 
                    src={selected.thumb} 
                    alt={selected.name} 
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Floating Details */}
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-2">Selected Destination</p>
                    <h2 className="text-3xl font-bold mb-1">{selected.name}</h2>
                    <p className="text-sm opacity-70 flex items-center gap-1">
                      <MapPin size={14} /> {selected.location}
                    </p>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-inner mb-4">
                    <ImageIcon size={32} strokeWidth={1.5} className="text-slate-200" />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-300">Select a provider</p>
                </div>
              )}
            </div>

            {/* Price Breakdown Card */}
            {selected && (
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-blue-900/5 border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-blue-500 tracking-widest">
                    <CreditCard size={14} /> Payment Details
                  </div>
                  <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                    Best Value
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400 font-medium">Provider Base Rate</span>
                    <span className="font-bold text-slate-800 tracking-tight">₹{selected.price}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400 font-medium">Platform Fee (10%)</span>
                    <span className="font-bold text-slate-800 tracking-tight">₹{platformFee}</span>
                  </div>
                  <div className="h-px bg-slate-100 w-full" />
                  <div className="flex justify-between items-end pt-2">
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-300 mb-1">Total to Pay</p>
                      <span className="text-4xl font-black text-slate-900 tracking-tighter">₹{total}</span>
                    </div>
                    <div className="text-right pb-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Incl. Taxes</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={confirmBooking}
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-200"
                >
                  Confirm & Continue
                </button>
                
                <p className="text-center text-[10px] text-slate-400 font-medium mt-4">
                  By continuing, you agree to our booking policy and terms.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}