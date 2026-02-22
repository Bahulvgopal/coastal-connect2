"use client";

import { useParams, useRouter } from "next/navigation";
import { placesData } from "@/app/data/places";
import Navbar from "@/app/components/Navbar";
import WeatherCard from "@/app/components/WeatherCard";
import dynamic from "next/dynamic"; // For SSR fix

import {
  MapPin,
  Utensils,
  Camera,
  History,
  ArrowLeft,
  Navigation,
  Home,
  Zap,
} from "lucide-react";

import Link from "next/link";

// Fix 1: Dynamically import Map to prevent SSR errors during build
const PlacesMap = dynamic(() => import("@/app/components/PlacesMap"), { 
  ssr: false,
  loading: () => <div className="map-wrap animate-pulse bg-slate-100 flex items-center justify-center text-slate-400 text-xs">LOADING MAP...</div>
});

export default function PlacePage() {
  const params = useParams();
  const router = useRouter();

  const name = decodeURIComponent(params.name as string);

  let place: any = null;

  Object.values(placesData).forEach((district: any) => {
    district.forEach((p: any) => {
      if (p.name === name) place = p;
    });
  });

  if (!place)
    return (
      <div style={{
        minHeight: "100vh",
        background: "#f0f7ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, -apple-system, sans-serif",
        color: "#94a3b8",
        fontSize: "1rem",
        fontWeight: 500,
      }}>
        Place not found
      </div>
    );

  const images = place.images?.length > 0 ? place.images : ["/placeholder.jpg"];

  const book = (type: string) => {
    router.push(`/booking?place=${place.name}&type=${type}&lat=${place.lat}&lng=${place.lng}`);
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .page-root {
          min-height: 100vh;
          background: #f0f7ff;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #0c2340;
          padding-bottom: 88px;
        }

        @media (min-width: 768px) { .page-root { padding-bottom: 0; } }

        .page-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.25rem 3rem;
        }

        /* Back link */
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #0369a1;
          text-decoration: none;
          margin-bottom: 2rem;
          padding: 7px 13px;
          border-radius: 9px;
          border: 1px solid #bae6fd;
          background: #e0f2fe;
          transition: all 0.18s ease;
        }

        .back-link:hover {
          background: #bae6fd;
          border-color: #7dd3fc;
        }

        /* Content grid */
        .content-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        @media (min-width: 1024px) {
          .content-grid { grid-template-columns: 1fr 340px; gap: 1.75rem; }
        }

        .left-col { display: flex; flex-direction: column; gap: 1.25rem; }
        .right-col { display: flex; flex-direction: column; gap: 1rem; }

        /* Card base */
        .card {
          background: #fff;
          border: 1px solid #daeeff;
          border-radius: 18px;
          overflow: hidden;
        }

        /* Place header */
        .place-header {
          padding: 1.5rem 1.75rem;
        }

        .type-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #0369a1;
          background: #e0f2fe;
          border: 1px solid #bae6fd;
          padding: 3px 10px;
          border-radius: 999px;
          margin-bottom: 0.875rem;
        }

        .place-title {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 300;
          letter-spacing: -0.04em;
          color: #0c2340;
          line-height: 1.1;
          margin-bottom: 0.5rem;
        }

        .place-title em {
          font-style: normal;
          color: #0ea5e9;
        }

        .place-coords {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.78rem;
          color: #94a3b8;
          font-weight: 400;
        }

        /* Image grid */
        .image-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0;
        }

        .image-grid.single { grid-template-columns: 1fr; }

        .img-wrap {
          overflow: hidden;
          aspect-ratio: 4/3;
          background: #e0f2fe;
        }

        .image-grid.single .img-wrap { aspect-ratio: 16/7; }

        .img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .img-wrap:hover img { transform: scale(1.04); }

        /* Description */
        .desc-card {
          padding: 1.5rem 1.75rem;
          font-size: 0.9375rem;
          line-height: 1.8;
          color: #475569;
          font-weight: 400;
        }

        /* Map */
        .map-wrap {
          height: 300px;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid #daeeff;
        }

        /* Booking card */
        .booking-card {
          padding: 1.5rem;
        }

        .booking-label {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #0ea5e9;
          margin-bottom: 0.875rem;
          display: block;
        }

        .book-btn {
          width: 100%;
          padding: 13px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-weight: 700;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          transition: all 0.18s ease;
          margin-bottom: 8px;
        }

        .book-btn:last-of-type { margin-bottom: 0; }

        .btn-primary {
          background: #0ea5e9;
          color: #fff;
          box-shadow: 0 4px 16px rgba(14,165,233,0.25);
        }

        .btn-primary:hover {
          background: #0284c7;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(14,165,233,0.35);
        }

        .btn-secondary {
          background: #f0f9ff;
          border: 1px solid #bae6fd;
          color: #0369a1;
        }

        .btn-secondary:hover {
          background: #e0f2fe;
          border-color: #7dd3fc;
        }

        /* Info cards */
        .info-card {
          padding: 1rem 1.25rem;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          border-bottom: 1px solid #eef6ff;
          transition: background 0.18s;
        }

        .info-card:last-child { border-bottom: none; }
        .info-card:hover { background: #f8fbff; }

        .info-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #e0f2fe;
          border: 1px solid #bae6fd;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0369a1;
          flex-shrink: 0;
        }

        .info-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #0c2340;
          margin-bottom: 2px;
        }

        .info-text {
          font-size: 0.78rem;
          color: #94a3b8;
          line-height: 1.5;
        }

        /* Mobile booking bar */
        .mobile-bar {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          background: rgba(255,255,255,0.97);
          border-top: 1px solid #daeeff;
          padding: 0.875rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          backdrop-filter: blur(16px);
          z-index: 50;
          box-shadow: 0 -4px 20px rgba(14,165,233,0.08);
        }

        @media (min-width: 768px) { .mobile-bar { display: none; } }

        .bar-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: #0c2340;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
        }

        .bar-btn {
          background: #0ea5e9;
          color: #fff;
          padding: 10px 22px;
          border-radius: 10px;
          border: none;
          font-weight: 700;
          font-size: 0.875rem;
          cursor: pointer;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(14,165,233,0.3);
          transition: all 0.18s ease;
        }

        .bar-btn:hover {
          background: #0284c7;
          transform: translateY(-1px);
        }
      `}</style>

      <div className="page-root">
        <Navbar />

        <main className="page-main">
          <Link href="/" className="back-link">
            <ArrowLeft size={13} />
            Back to Explore
          </Link>

          <div className="content-grid">
            {/* LEFT */}
            <div className="left-col">

              {/* Header */}
              <div className="card">
                <div className="place-header">
                  <div className="type-badge">
                    <MapPin size={10} /> {place.type}
                  </div>
                  <h1 className="place-title">
                    {place.name}<em>.</em>
                  </h1>
                  <div className="place-coords">
                    <Navigation size={12} />
                    {place.lat?.toFixed(4)}, {place.lng?.toFixed(4)}
                  </div>
                </div>

                {/* Images attached to header card */}
                <div className={`image-grid${images.length === 1 ? " single" : ""}`}>
                  {images.map((img: string, i: number) => (
                    <div className="img-wrap" key={i}>
                      <img src={img} alt={place.name} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="card">
                <div className="desc-card">{place.description}</div>
              </div>

              {/* Weather */}
              <WeatherCard lat={place.lat} lng={place.lng} />

              {/* Map */}
              <div className="map-wrap">
                {/* Fix 2: Explicitly pass selectedPlace={place} to satisfy TypeScript */}
                <PlacesMap places={[place]} selectedPlace={place} />
              </div>
            </div>

            {/* RIGHT */}
            <aside className="right-col">

              {/* Booking */}
              <div className="card">
                <div className="booking-card">
                  <span className="booking-label">Book Your Visit</span>
                  <button className="book-btn btn-primary" onClick={() => book("homestay")}>
                    <Home size={15} /> Book Homestay
                  </button>
                  <button className="book-btn btn-secondary" onClick={() => book("activity")}>
                    <Zap size={15} /> Book Activity
                  </button>
                </div>
              </div>

              {/* Info cards */}
              <div className="card">
                <InfoCard icon={<History size={15} />} title="History" text="Rich cultural heritage spanning centuries of coastal tradition." />
                <InfoCard icon={<Utensils size={15} />} title="Cuisine" text="Authentic Kerala flavours — seafood, coconut curries & more." />
                <InfoCard icon={<Camera size={15} />} title="Activities" text="Photography, backwater cruises & cultural exploration." />
              </div>

            </aside>
          </div>
        </main>

        {/* Mobile sticky bar */}
        <div className="mobile-bar">
          <span className="bar-name">{place.name}</span>
          <button className="bar-btn" onClick={() => book("homestay")}>
            Book Now
          </button>
        </div>
      </div>
    </>
  );
}

function InfoCard({ icon, title, text }: any) {
  return (
    <div className="info-card">
      <div className="info-icon">{icon}</div>
      <div>
        <div className="info-title">{title}</div>
        <div className="info-text">{text}</div>
      </div>
    </div>
  );
}