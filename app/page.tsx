"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DistrictSelector from "./components/DistrictSelector";
import Navbar from "./components/Navbar";
import { placesData } from "./data/places";
import dynamic from "next/dynamic"; // For SSR fix
import {
  Map as MapIcon,
  List,
  MapPin,
  Navigation,
  RefreshCcw,
  ArrowUpRight,
} from "lucide-react";

// Fix 1: Dynamically import Map to prevent "window is not defined" errors during build
const PlacesMap = dynamic(() => import("./components/PlacesMap"), { 
  ssr: false,
  loading: () => <div className="map-panel animate-pulse bg-slate-100" />
});

export default function Home() {
  const router = useRouter();
  const [district, setDistrict] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("district");
    if (saved) setDistrict(saved);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!district) {
    return (
      <DistrictSelector
        onSelect={(d: string) => {
          localStorage.setItem("district", d);
          setDistrict(d);
        }}
      />
    );
  }

  const places = placesData[district] || [];

  const handleReset = () => {
    localStorage.removeItem("district");
    window.location.reload();
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .home-root {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: #f0f7ff;
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #0c2340;
        }

        .main-layout {
          display: flex;
          flex: 1;
          overflow: hidden;
          position: relative;
        }

        /* ── Sidebar ── */
        .sidebar {
          display: flex;
          flex-direction: column;
          width: 100%;
          background: #ffffff;
          border-right: 1px solid #daeeff;
          z-index: 20;
          overflow: hidden;
          transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        @media (min-width: 768px) {
          .sidebar {
            width: 400px;
            flex-shrink: 0;
            transform: none !important;
          }
        }

        @media (min-width: 1024px) {
          .sidebar { width: 440px; }
        }

        .sidebar.map-active {
          transform: translateY(100%);
        }

        /* ── Sidebar Header ── */
        .sidebar-header {
          padding: 2rem 2rem 1.5rem;
          border-bottom: 1px solid #eef6ff;
        }

        .header-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .region-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #0ea5e9;
        }

        .reset-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #94a3b8;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
          padding: 0;
        }

        .reset-btn:hover { color: #0ea5e9; }
        .reset-btn:hover svg { transform: rotate(180deg); }
        .reset-btn svg { transition: transform 0.5s ease; }

        .district-name {
          font-size: clamp(2rem, 5vw, 2.75rem);
          font-weight: 300;
          letter-spacing: -0.04em;
          color: #0c2340;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .district-name em {
          font-style: normal;
          color: #0ea5e9;
        }

        .place-count-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: #94a3b8;
          font-weight: 400;
        }

        .count-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0ea5e9;
          flex-shrink: 0;
        }

        /* ── Places List ── */
        .places-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
        }

        .places-scroll::-webkit-scrollbar { width: 3px; }
        .places-scroll::-webkit-scrollbar-track { background: transparent; }
        .places-scroll::-webkit-scrollbar-thumb { background: #dbeafe; border-radius: 99px; }

        .place-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border-radius: 14px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s ease;
          background: transparent;
          text-align: left;
          width: 100%;
          margin-bottom: 4px;
        }

        .place-item:hover {
          background: #f0f9ff;
          border-color: #bae6fd;
        }

        .place-item:hover .item-arrow {
          opacity: 1;
          transform: translate(0, 0);
          background: #0ea5e9;
          color: #fff;
        }

        .item-left {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          min-width: 0;
        }

        .item-index {
          font-size: 0.65rem;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: #cbd5e1;
          margin-top: 3px;
          flex-shrink: 0;
          width: 18px;
        }

        .item-content { min-width: 0; }

        .item-name {
          font-size: 0.9375rem;
          font-weight: 500;
          color: #0c2340;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.2s;
          display: block;
          margin-bottom: 3px;
        }

        .place-item:hover .item-name { color: #0284c7; }

        .item-meta {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .item-type {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0ea5e9;
          background: #e0f2fe;
          padding: 2px 8px;
          border-radius: 999px;
        }

        .item-desc {
          font-size: 0.75rem;
          color: #94a3b8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 160px;
        }

        .item-arrow {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #cbd5e1;
          flex-shrink: 0;
          opacity: 0;
          transform: translate(-4px, 4px);
          transition: all 0.2s ease;
        }

        /* ── Map Panel ── */
        .map-panel {
          flex: 1;
          position: relative;
          background: #e0f2fe;
          overflow: hidden;
        }

        .map-panel.hidden-mobile {
          display: none;
        }

        @media (min-width: 768px) {
          .map-panel.hidden-mobile { display: block; }
        }

        .map-overlay {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          z-index: 10;
          display: none;
          flex-direction: column;
          gap: 0;
        }

        @media (min-width: 768px) {
          .map-overlay { display: flex; }
        }

        .map-controls {
          background: #fff;
          border: 1px solid #dbeafe;
          border-radius: 12px;
          padding: 0.6rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          box-shadow: 0 2px 12px rgba(14,165,233,0.08);
        }

        .map-ctrl-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          background: transparent;
        }

        .map-ctrl-btn:hover {
          background: #f0f9ff;
          color: #0ea5e9;
        }

        .ctrl-divider {
          width: 16px;
          height: 1px;
          background: #e0f2fe;
        }

        /* ── Mobile Toggle ── */
        .mobile-toggle {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
        }

        @media (min-width: 768px) {
          .mobile-toggle { display: none; }
        }

        .toggle-track {
          display: flex;
          background: #0c2340;
          border-radius: 999px;
          padding: 4px;
          gap: 4px;
          box-shadow: 0 8px 32px rgba(12,35,64,0.25);
        }

        .toggle-btn {
          padding: 8px 24px;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          color: rgba(255,255,255,0.4);
          background: transparent;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .toggle-btn.active {
          background: #0ea5e9;
          color: #fff;
          box-shadow: 0 2px 10px rgba(14,165,233,0.4);
        }
      `}</style>

      <div className="home-root">
        <Navbar />

        <main className="main-layout">
          {/* Sidebar */}
          <aside className={`sidebar${showMap ? " map-active" : ""}`}>
            <div className="sidebar-header">
              <div className="header-top-row">
                <span className="region-label">Regional Guide</span>
                <button className="reset-btn" onClick={handleReset}>
                  Change <RefreshCcw size={10} />
                </button>
              </div>

              <h1 className="district-name">
                {district}<em>.</em>
              </h1>

              <div className="place-count-row">
                <span className="count-dot" />
                {places.length} curated destinations
              </div>
            </div>

            <div className="places-scroll">
              {places.map((p: any, i: number) => (
                <button
                  key={i}
                  className="place-item"
                  onClick={() => router.push(`/place/${encodeURIComponent(p.name)}`)}
                >
                  <div className="item-left">
                    <span className="item-index">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="item-content">
                      <span className="item-name">{p.name}</span>
                      <div className="item-meta">
                        <span className="item-type">{p.type}</span>
                        <span className="item-desc">{p.description}</span>
                      </div>
                    </div>
                  </div>
                  <div className="item-arrow">
                    <ArrowUpRight size={14} />
                  </div>
                </button>
              ))}
            </div>
          </aside>

          {/* Map */}
          <section className={`map-panel${!showMap ? " hidden-mobile" : ""}`}>
            {/* Fix 2: Explicitly pass selectedPlace={null} to satisfy TypeScript */}
            <PlacesMap places={places} selectedPlace={null} />

            <div className="map-overlay">
              <div className="map-controls">
                <button className="map-ctrl-btn" title="Navigate">
                  <Navigation size={16} />
                </button>
                <div className="ctrl-divider" />
                <button className="map-ctrl-btn" title="Pin">
                  <MapPin size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* Mobile Toggle */}
          <div className="mobile-toggle">
            <div className="toggle-track">
              <button
                className={`toggle-btn${!showMap ? " active" : ""}`}
                onClick={() => setShowMap(false)}
              >
                <List size={13} /> Index
              </button>
              <button
                className={`toggle-btn${showMap ? " active" : ""}`}
                onClick={() => setShowMap(true)}
              >
                <MapIcon size={13} /> Map
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}