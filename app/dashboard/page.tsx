"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import dynamic from "next/dynamic";

import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Trash2,
  Calendar,
  CreditCard,
  Map as MapIcon,
  Compass,
  BookOpen,
  ArrowRight,
  TrendingUp
} from "lucide-react";

// Dynamically import map to avoid SSR issues
const PlacesMap = dynamic(() => import("../components/PlacesMap"), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-100 animate-pulse rounded-2xl" />
});

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  const [trips, setTrips] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"trips" | "bookings">("trips");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    async function fetchData() {
      try {
        const tripsQuery = query(collection(db, "trips"), where("userId", "==", user.uid));
        const tripsSnap = await getDocs(tripsQuery);
        setTrips(tripsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

        const bookingQuery = query(collection(db, "bookings"), where("userId", "==", user.uid));
        const bookingSnap = await getDocs(bookingQuery);
        setBookings(bookingSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user, router]);

  async function deleteTrip(id: string) {
    if (!confirm("Are you sure you want to delete this trip?")) return;
    await deleteDoc(doc(db, "trips", id));
    setTrips((prev) => prev.filter((t) => t.id !== id));
  }

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        
        {/* Header Section */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Compass size={14} className="text-blue-600" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-600">
              Personal Command Center
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-slate-900">
            My Dashboard<span className="text-blue-600">.</span>
          </h1>
          <p className="text-slate-400 mt-4 text-sm font-medium uppercase tracking-wider">
            {user?.email?.split("@")[0]} • Regional Explorer
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <StatCard icon={<MapIcon size={16}/>} label="Trips" value={trips.length} />
          <StatCard icon={<CreditCard size={16}/>} label="Bookings" value={bookings.length} />
          <StatCard icon={<MapPin size={16}/>} label="Points" value={trips.reduce((a, t) => a + (t.locations?.length || 0), 0)} />
          <StatCard 
            icon={<TrendingUp size={16}/>} 
            label="Spent" 
            value={`₹${bookings.reduce((a, b) => a + (Number(b.total) || 0), 0).toLocaleString()}`} 
          />
        </div>

        {/* Tab System */}
        <div className="flex p-1 bg-slate-200/50 backdrop-blur-sm rounded-2xl w-fit mb-8">
          <button
            onClick={() => setActiveTab("trips")}
            className={`px-8 py-3 rounded-xl text-xs font-bold tracking-widest transition-all flex items-center gap-2 ${
              activeTab === "trips" ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <BookOpen size={14} /> TRIPS
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-8 py-3 rounded-xl text-xs font-bold tracking-widest transition-all flex items-center gap-2 ${
              activeTab === "bookings" ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <CreditCard size={14} /> BOOKINGS
          </button>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 gap-6">
          {activeTab === "trips" ? (
            trips.length === 0 ? <EmptyState icon={<MapIcon size={32}/>} msg="No journeys planned." /> : 
            trips.map((trip) => (
              <div key={trip.id} className="group bg-white border border-slate-100 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
                <div className="p-8 flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-medium text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {trip.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><Calendar size={12} /> {trip.date}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={12} /> {trip.locations?.length || 0} stops</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteTrip(trip.id)}
                    className="p-3 bg-red-50 text-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {trip.content && (
                  <div className="px-8 pb-8 text-slate-500 leading-relaxed text-sm max-w-2xl border-b border-slate-50">
                    {trip.content}
                  </div>
                )}

                {trip.locations?.length > 0 && (
                  <div className="h-[300px] w-full bg-slate-50">
                    <PlacesMap places={trip.locations} selectedPlace={null} />
                  </div>
                )}
              </div>
            ))
          ) : (
            bookings.length === 0 ? <EmptyState icon={<CreditCard size={32}/>} msg="No active bookings." /> :
            bookings.map((b) => (
              <div key={b.id} className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden flex flex-col md:flex-row h-full md:h-64">
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div>
                    
<div>
  
  {/* Hotel / Provider */}
  <h3 className="text-2xl font-medium text-slate-900">
    {b.provider || "Hotel"}
  </h3>

  {/* Place */}
  <p className="text-slate-500 text-sm mt-1">
    {b.placeName || "Location"}
  </p>

  {/* Date + Price */}
  <div className="flex items-center gap-4 mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
    <span className="flex items-center gap-1.5">
      <Calendar size={12} /> {b.date || "N/A"}
    </span>

    <span className="text-slate-900 text-sm font-semibold">
      ₹{b.total || 0}
    </span>
  </div>
</div>                   
{b.people && (
  <p className="text-xs text-slate-500 mt-1">
    👥 {b.people} people
  </p>
)}
<span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-full">
  {b.type}
</span>
{b.activityDate && (
  <p className="text-xs text-slate-500">
    📅 {b.activityDate}
  </p>
)}

{b.timeSlot && (
  <p className="text-xs text-slate-500">
    ⏰ {b.timeSlot}
  </p>
)}
                  </div>
                 <button
  onClick={() => router.push(`/payment-success?id=${b.id}`)}
  className="flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest mt-6 group"
>
  View Receipt
  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
</button>
                </div>
                
                {b.location &&
  typeof b.location.lat === "number" &&
  typeof b.location.lng === "number" &&
  !isNaN(b.location.lat) &&
  !isNaN(b.location.lng) && (
    <div className="w-full md:w-[40%] h-48 md:h-full bg-slate-100 border-l border-slate-50">
      <PlacesMap
        places={[
          {
            name: b.placeName,
            lat: b.location.lat,
            lng: b.location.lng,
          },
        ]}
      />
    </div>
)}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

// Internal Components for Cleanliness
function StatCard({ icon, label, value }: any) {
  return (
    <div className="bg-white border border-slate-100 p-6 rounded-3xl">
      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 mb-4">
        {icon}
      </div>
      <div className="text-2xl font-light tracking-tight text-slate-900">{value}</div>
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{label}</div>
    </div>
  );
}

function EmptyState({ icon, msg }: any) {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-300 mb-6">
        {icon}
      </div>
      <p className="text-slate-400 font-medium">{msg}</p>
      <button className="mt-4 text-blue-600 text-xs font-bold uppercase tracking-widest hover:underline">
        Get Started
      </button>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-white p-12 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}