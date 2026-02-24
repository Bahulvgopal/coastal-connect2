"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { 
  ArrowLeft, 
  Users, 
  Calendar, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  CreditCard,
  MapPin
} from "lucide-react";

export default function GuideBookingPage() {
  const params = useSearchParams();
  const router = useRouter();

  const place = params.get("place") || "the area";
  const lat = params.get("lat");
  const lng = params.get("lng");

  const [people, setPeople] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const pricePerPerson = 1500;
  const total = pricePerPerson * people;

  function continuePayment() {
    if (!date || !time) return alert("Please select a date and time");
    router.push(
      `/payment?place=${place}&provider=Local Guide&total=${total}&type=guide&lat=${lat}&lng=${lng}&people=${people}&date=${date}&time=${time}&notes=${notes}`
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] font-sans pb-20">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 pt-28">
        
        {/* Header Section */}
        <div className="mb-8">
          <button 
            className="flex items-center gap-2 text-sm font-bold text-blue-600 bg-white border border-blue-100 px-4 py-2 rounded-xl mb-6 hover:bg-blue-50 transition-all shadow-sm"
            onClick={() => router.back()}
          >
            <ArrowLeft size={16} /> Back
          </button>

          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-black text-blue-500 mb-2">
            <ShieldCheck size={12} className="fill-blue-500 text-white" /> Verified Local Guide
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light text-slate-900 leading-tight">
            Explore {place}<span className="text-blue-500 font-black">.</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm flex items-center gap-1 font-medium">
            <MapPin size={14} className="text-blue-400" /> Professional guiding services for your trip
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form Details (7/12) */}
          <div className="lg:col-span-7 space-y-6">
            
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                📝 Booking Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* People Count */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-400 flex items-center gap-1 tracking-widest">
                    <Users size={12} /> Number of People
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={people}
                    onChange={(e) => setPeople(Number(e.target.value))}
                    className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-semibold"
                  />
                </div>

                {/* Date Selection */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-400 flex items-center gap-1 tracking-widest">
                    <Calendar size={12} /> Preferred Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-semibold"
                  />
                </div>

                {/* Time Selection */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-400 flex items-center gap-1 tracking-widest">
                    <Clock size={12} /> Starting Time
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-semibold"
                  />
                </div>
              </div>

              {/* Special Notes */}
              <div className="space-y-2 pt-2">
                <label className="text-[11px] font-black uppercase text-slate-400 flex items-center gap-1 tracking-widest">
                  <MessageSquare size={12} /> Special Requirements
                </label>
                <textarea
                  placeholder="Tell your guide about interests, language preferences, or health needs..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all min-h-[120px]"
                />
              </div>
            </section>

            {/* Trust Badge */}
            <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 flex items-center gap-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm text-emerald-500">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="font-bold text-emerald-800 text-sm">Flexible Cancellation</p>
                <p className="text-emerald-600 text-xs">Cancel up to 24 hours in advance for a full refund.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Summary (5/12) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5 border border-slate-100 overflow-hidden relative">
              {/* Decorative Circle */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50" />
              
              <h3 className="text-xl font-bold text-slate-900 mb-6 relative">Price Summary</h3>
              
              <div className="space-y-4 mb-8 relative">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Base Guide Rate (per person)</span>
                  <span className="font-bold text-slate-800">₹{pricePerPerson}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium font-bold">Total Group ({people} {people === 1 ? 'person' : 'people'})</span>
                  <span className="font-bold text-slate-800">₹{total}</span>
                </div>
                
                <div className="h-px bg-slate-100 w-full my-4" />
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-300 mb-1 tracking-widest">Amount to Pay</p>
                    <span className="text-4xl font-black text-slate-900 tracking-tighter">₹{total}</span>
                  </div>
                  <div className="bg-blue-600 text-white p-2 rounded-xl">
                    <CreditCard size={20} />
                  </div>
                </div>
              </div>

              <button
                onClick={continuePayment}
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-200"
              >
                Proceed to Payment
              </button>
              
              <p className="text-center text-[10px] text-slate-400 font-bold uppercase mt-4 tracking-tighter">
                Secure checkout powered by Razorpay
              </p>
            </div>

            {/* Helper Info */}
            <div className="text-center px-4">
              <p className="text-slate-400 text-xs font-medium">
                Need a custom itinerary? <span className="text-blue-500 cursor-pointer hover:underline">Chat with your guide</span>
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}