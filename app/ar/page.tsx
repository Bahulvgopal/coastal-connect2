"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { Camera, Box, Navigation, RefreshCcw, X, Info, Scan, Gpu } from "lucide-react";

export default function ARPage() {
  const [hasPermission, setHasPermission] = useState(false);
  const [activePoi, setActivePoi] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const poiData = [
    { id: 1, name: "Chinese Fishing Nets", distance: "50m", type: "Heritage", info: "Historic nets introduced by Chinese explorers in the 14th century. They are unique to Kochi outside of China." },
    { id: 2, name: "St. Francis Church", distance: "200m", type: "Landmark", info: "Built in 1503, it is the oldest European church in India and once housed Vasco da Gama's remains." }
  ];

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasPermission(true);
      }
    } catch (err) {
      alert("Camera access is required for the AR experience.");
    }
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="h-screen flex flex-col bg-black overflow-hidden font-sans">
      <Navbar />

      <main className="flex-1 relative overflow-hidden">
        
        {/* BACKGROUND: REAL VIDEO STREAM */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${hasPermission ? "opacity-100" : "opacity-0"}`}
        />

        {/* OVERLAY: PERMISSION SCREEN */}
        {!hasPermission && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950 p-8 text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
              <div className="relative bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-xl">
                <Camera size={48} className="text-blue-400 mx-auto" />
              </div>
            </div>
            <h2 className="text-3xl font-light tracking-tight text-white mb-4">Augmented Reality</h2>
            <p className="text-slate-400 max-w-xs mb-10 leading-relaxed">
              Overlaying digital history onto your physical surroundings.
            </p>
            <button
              onClick={startCamera}
              className="group relative flex items-center gap-3 bg-white text-slate-950 px-8 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95"
            >
              <Scan size={18} /> ENABLE CAMERA
            </button>
          </div>
        )}

        {/* HUD: AR ELEMENTS */}
        {hasPermission && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            {/* Target Reticle */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <div className="w-64 h-64 border border-white/20 rounded-full" />
              <div className="absolute w-1 h-8 bg-white/40" />
              <div className="absolute h-1 w-8 bg-white/40" />
            </div>

            {/* Floating POI Tag */}
            <div 
              className="absolute top-[40%] left-[20%] pointer-events-auto group cursor-pointer"
              onClick={() => setActivePoi(poiData[0])}
            >
              <div className="relative">
                {/* Ping Animation */}
                <div className="absolute -inset-4 bg-blue-500/30 rounded-full animate-ping pointer-events-none" />
                
                <div className="relative bg-slate-900/80 backdrop-blur-md border border-white/20 p-1 pl-1 pr-4 rounded-full flex items-center gap-3 shadow-2xl transition-transform active:scale-90">
                  <div className="bg-blue-600 p-2.5 rounded-full shadow-lg shadow-blue-500/40">
                    <Box size={16} className="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 leading-none mb-1">
                      {poiData[0].distance}
                    </span>
                    <h4 className="text-sm font-bold text-white leading-none">
                      {poiData[0].name}
                    </h4>
                  </div>
                </div>
                {/* Connecting Line to Floor */}
                <div className="w-[1px] h-20 bg-gradient-to-t from-transparent via-blue-500/50 to-blue-500 mx-auto mt-2" />
              </div>
            </div>

            {/* Navigation UI */}
            <div className="absolute bottom-12 inset-x-0 px-8 flex justify-between items-center pointer-events-auto">
              <button className="w-14 h-14 bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white transition-all hover:bg-slate-800">
                <RefreshCcw size={20} />
              </button>
              
              <div className="group relative">
                <div className="absolute -inset-2 bg-white/20 rounded-full blur group-active:bg-white/40 transition-all" />
                <button className="relative w-20 h-20 bg-white rounded-full border-[6px] border-slate-900 shadow-xl flex items-center justify-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                </button>
              </div>

              <button className="w-14 h-14 bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white transition-all hover:bg-slate-800">
                <Navigation size={20} />
              </button>
            </div>
          </div>
        )}

        {/* MODAL: POI DETAILS */}
        {activePoi && (
          <div className="absolute inset-x-0 bottom-0 z-50 p-4 pointer-events-auto animate-in slide-in-from-bottom-full duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
                      <Box size={24} />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                        {activePoi.type} • {activePoi.distance}
                      </span>
                      <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                        {activePoi.name}
                      </h3>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActivePoi(null)}
                    className="p-2 bg-slate-100 text-slate-400 rounded-full hover:bg-slate-200 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <p className="text-slate-600 leading-relaxed mb-8">
                  {activePoi.info}
                </p>

                <div className="flex gap-3">
                  <button className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                    <Navigation size={18} /> ROUTE
                  </button>
                  <button className="w-16 bg-slate-100 text-slate-900 py-4 rounded-2xl font-bold flex items-center justify-center hover:bg-slate-200 transition-colors">
                    <Info size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}