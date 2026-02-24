"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { useState } from "react";
import {
  ArrowLeft,
  Star,
  CheckCircle,
  Zap,
  ImageIcon,
  Users,
  Clock,
} from "lucide-react";

const activities = [
  { id: 1, name: "Kayaking", price: 1200, rating: 4.8, duration: "2 Hours", thumb: "/providers/a1.jpg", tag: "Adventure" },
  { id: 2, name: "Boating", price: 800, rating: 4.6, duration: "1 Hour", thumb: "/providers/a2.jpg", tag: "Leisure" },
  { id: 3, name: "Village Tour", price: 500, rating: 4.9, duration: "4 Hours", thumb: "/providers/a3.jpg", tag: "Cultural" },
  { id: 4, name: "Fishing Experience", price: 900, rating: 4.7, duration: "3 Hours", thumb: "/providers/a4.jpg", tag: "Nature" },
];

export default function ActivitiesPage() {
  const params = useSearchParams();
  const router = useRouter();

  const place = params.get("place") || "Destination";
  const lat = params.get("lat");
  const lng = params.get("lng");

  const [selected, setSelected] = useState<any>(null);
  const [hovered, setHovered] = useState<any>(null);

  const preview = hovered || selected;

  function confirmActivity() {
    if (!selected) return;
    router.push(
      `/activity-booking?place=${place}&activity=${selected.name}&price=${selected.price}&lat=${lat}&lng=${lng}`
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700;900&display=swap');

        :root {
          --blue-50:  #eff6ff;
          --blue-100: #dbeafe;
          --blue-200: #bfdbfe;
          --blue-400: #60a5fa;
          --blue-500: #3b82f6;
          --blue-600: #2563eb;
          --blue-700: #1d4ed8;
          --slate-50:  #f8fafc;
          --slate-100: #f1f5f9;
          --slate-200: #e2e8f0;
          --slate-300: #cbd5e1;
          --slate-400: #94a3b8;
          --slate-500: #64748b;
          --slate-700: #334155;
          --slate-900: #0f172a;
        }

        .ap-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100svh;
          background: #f0f7ff;
        }

        /* Decorative top-right blob */
        .ap-blob {
          position: fixed;
          top: -120px;
          right: -120px;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .ap-blob-2 {
          position: fixed;
          bottom: -80px;
          left: -80px;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .ap-page {
          position: relative;
          z-index: 1;
          max-width: 1160px;
          margin: 0 auto;
          padding: clamp(1.5rem, 4vw, 3rem) clamp(1rem, 4vw, 2rem) 6rem;
        }

        /* ── Back ── */
        .ap-back {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--blue-600);
          background: white;
          border: 1.5px solid var(--blue-100);
          padding: 0.55rem 1.1rem;
          border-radius: 2rem;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: clamp(2rem, 5vw, 3rem);
          box-shadow: 0 2px 8px rgba(59,130,246,0.08);
        }
        .ap-back:hover {
          background: var(--blue-50);
          border-color: var(--blue-300, #93c5fd);
          box-shadow: 0 4px 16px rgba(59,130,246,0.14);
        }

        /* ── Header ── */
        .ap-header { margin-bottom: clamp(2rem, 5vw, 3rem); }
        .ap-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.6rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--blue-500);
          margin-bottom: 0.75rem;
          background: var(--blue-50);
          padding: 0.35rem 0.9rem;
          border-radius: 2rem;
          border: 1px solid var(--blue-100);
        }
        .ap-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 7vw, 5rem);
          font-weight: 700;
          font-style: italic;
          color: var(--slate-900);
          line-height: 1.05;
          margin: 0 0 0.75rem;
        }
        .ap-title em {
          font-style: normal;
          color: var(--blue-500);
          position: relative;
        }
        .ap-title em::after {
          content: '.';
          color: var(--blue-400);
        }
        .ap-subtitle {
          font-size: 0.85rem;
          font-weight: 400;
          color: var(--slate-400);
        }

        /* ── Layout grid ── */
        .ap-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        @media (min-width: 1024px) {
          .ap-grid {
            display: grid;
            grid-template-columns: 1fr 400px;
            gap: 2rem;
            align-items: start;
          }
          .ap-right {
            position: sticky;
            top: 5.5rem;
          }
        }

        /* ── Cards ── */
        .ap-card {
          display: grid;
          grid-template-columns: 36px auto 1fr auto;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border-radius: 1.5rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 2px solid white;
          background: white;
          box-shadow: 0 2px 12px rgba(15,23,42,0.05);
          position: relative;
          overflow: hidden;
        }
        .ap-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--blue-500);
          border-radius: 0 2px 2px 0;
          transform: scaleY(0);
          transition: transform 0.25s ease;
        }
        .ap-card:hover {
          border-color: var(--blue-100);
          transform: translateX(6px);
          box-shadow: 0 8px 30px rgba(59,130,246,0.1);
        }
        .ap-card:hover::before { transform: scaleY(1); }
        .ap-card.active {
          border-color: var(--blue-500);
          transform: translateX(10px);
          background: linear-gradient(135deg, var(--blue-50) 0%, white 100%);
          box-shadow: 0 8px 32px rgba(59,130,246,0.15), 0 0 0 1px rgba(59,130,246,0.1);
        }
        .ap-card.active::before { transform: scaleY(1); }

        .ap-num {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1.5px solid var(--slate-200);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.62rem;
          font-weight: 800;
          color: var(--slate-400);
          flex-shrink: 0;
          transition: all 0.2s;
          font-variant-numeric: tabular-nums;
        }
        .ap-card.active .ap-num,
        .ap-card:hover .ap-num {
          border-color: var(--blue-400);
          color: var(--blue-500);
          background: var(--blue-50);
        }

        .ap-thumb {
          width: clamp(60px, 10vw, 76px);
          height: clamp(60px, 10vw, 76px);
          border-radius: 1.1rem;
          overflow: hidden;
          flex-shrink: 0;
          background: var(--slate-100);
        }
        .ap-thumb img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .ap-card:hover .ap-thumb img { transform: scale(1.08); }

        .ap-info { min-width: 0; }
        .ap-info-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(0.95rem, 2vw, 1.1rem);
          font-weight: 700;
          color: var(--slate-900);
          margin: 0 0 0.35rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ap-info-meta {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }
        .ap-price-badge {
          font-size: 0.85rem;
          font-weight: 900;
          color: var(--blue-600);
        }
        .ap-rating {
          display: flex;
          align-items: center;
          gap: 0.2rem;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--slate-400);
        }
        .ap-dur {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--slate-400);
          background: var(--slate-100);
          padding: 0.18rem 0.55rem;
          border-radius: 2rem;
        }

        /* Tag pill top-right */
        .ap-tag {
          font-size: 0.55rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--blue-500);
          background: var(--blue-50);
          border: 1px solid var(--blue-100);
          padding: 0.2rem 0.6rem;
          border-radius: 2rem;
          white-space: nowrap;
          align-self: flex-start;
        }

        .ap-check {
          width: 26px; height: 26px;
          border-radius: 50%;
          border: 2px solid var(--slate-200);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        .ap-card.active .ap-check {
          background: var(--blue-500);
          border-color: var(--blue-500);
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(59,130,246,0.35);
        }

        /* Staggered load animation */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ap-card { animation: fadeUp 0.45s ease both; }
        .ap-card:nth-child(1) { animation-delay: 0.05s; }
        .ap-card:nth-child(2) { animation-delay: 0.12s; }
        .ap-card:nth-child(3) { animation-delay: 0.19s; }
        .ap-card:nth-child(4) { animation-delay: 0.26s; }

        /* ── Preview panel ── */
        .ap-panel {
          background: white;
          border-radius: 2rem;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(59,130,246,0.1), 0 2px 8px rgba(15,23,42,0.06);
          border: 1.5px solid var(--blue-100);
          animation: fadeUp 0.45s 0.1s ease both;
        }

        .ap-hero {
          position: relative;
          height: clamp(200px, 32vw, 360px);
          overflow: hidden;
          background: var(--slate-100);
        }
        .ap-hero img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .ap-panel:hover .ap-hero img { transform: scale(1.04); }
        .ap-hero-scrim {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(15,23,42,0.82) 0%, rgba(15,23,42,0.15) 55%, transparent 100%);
        }
        .ap-hero-content {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: clamp(1.25rem, 4vw, 2rem);
        }
        .ap-hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.55rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          color: white;
          background: rgba(59,130,246,0.75);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 0.3rem 0.75rem;
          border-radius: 2rem;
          margin-bottom: 0.75rem;
        }
        .ap-hero-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 4vw, 2.2rem);
          font-weight: 700;
          color: white;
          margin: 0 0 0.4rem;
          line-height: 1.15;
        }
        .ap-hero-sub {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.6);
          font-weight: 500;
        }

        /* Empty state */
        .ap-empty {
          height: clamp(200px, 32vw, 360px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          background: var(--blue-50);
          padding: 2rem;
          text-align: center;
        }
        .ap-empty-ring {
          width: 64px; height: 64px;
          border-radius: 50%;
          border: 1.5px dashed var(--blue-200);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--blue-200);
        }
        .ap-empty-title {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-style: italic;
          color: var(--slate-400);
          margin: 0;
        }
        .ap-empty-hint {
          font-size: 0.7rem;
          color: var(--slate-300);
          font-weight: 500;
          max-width: 190px;
          line-height: 1.6;
          margin: 0;
        }

        /* Price + CTA */
        .ap-price-area {
          padding: clamp(1.25rem, 4vw, 1.75rem);
        }
        .ap-price-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--slate-100);
        }
        .ap-price-lbl {
          font-size: 0.6rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--slate-300);
          margin-bottom: 0.3rem;
        }
        .ap-price-val {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 2.75rem);
          font-weight: 700;
          color: var(--slate-900);
          line-height: 1;
        }
        .ap-price-val span {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85em;
          font-weight: 400;
          color: var(--blue-400);
          margin-right: 0.1em;
        }
        .ap-live {
          text-align: right;
        }
        .ap-live-dot {
          display: inline-block;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #22c55e;
          margin-right: 0.35rem;
          animation: blink 2s infinite;
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        .ap-live-text {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #22c55e;
        }
        .ap-live-sub {
          display: block;
          font-size: 0.6rem;
          color: var(--slate-300);
          margin-top: 0.2rem;
        }

        .ap-cta {
          width: 100%;
          background: linear-gradient(135deg, var(--blue-700) 0%, var(--blue-500) 100%);
          color: white;
          border: none;
          border-radius: 1rem;
          padding: 1rem 1.5rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
          box-shadow: 0 8px 24px rgba(59,130,246,0.28);
          position: relative;
          overflow: hidden;
        }
        .ap-cta::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .ap-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(59,130,246,0.38);
        }
        .ap-cta:hover::after { opacity: 1; }
        .ap-cta:active { transform: scale(0.97); }
        .ap-cta:disabled {
          background: var(--slate-100);
          color: var(--slate-300);
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }

        /* Tiny phone */
        @media (max-width: 400px) {
          .ap-card { grid-template-columns: auto 1fr; }
          .ap-num { display: none; }
          .ap-thumb { width: 56px; height: 56px; }
          .ap-check { display: none; }
          .ap-tag { display: none; }
        }
      `}</style>

      {/* Background blobs */}
      <div className="ap-blob" />
      <div className="ap-blob-2" />

      <div className="ap-root">
        <Navbar />

        <div className="ap-page">

          {/* Back */}
          <button className="ap-back" onClick={() => router.back()}>
            <ArrowLeft size={13} /> Back to results
          </button>

          {/* Header */}
          <div className="ap-header">
            <div className="ap-eyebrow">
              <Zap size={11} /> Curated Experiences
            </div>
            <h1 className="ap-title">
              Activities in <em>{place}</em>
            </h1>
            <p className="ap-subtitle">Hover to preview · Click to select · Book instantly</p>
          </div>

          {/* Grid */}
          <div className="ap-grid">

            {/* Activity list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {activities.map((a, i) => (
                <div
                  key={a.id}
                  className={`ap-card ${selected?.id === a.id ? "active" : ""}`}
                  onClick={() => setSelected(a)}
                  onMouseEnter={() => setHovered(a)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="ap-num">{String(i + 1).padStart(2, "0")}</div>

                  <div className="ap-thumb">
                    <img src={a.thumb} alt={a.name} />
                  </div>

                  <div className="ap-info">
                    <h4 className="ap-info-name">{a.name}</h4>
                    <div className="ap-info-meta">
                      <span className="ap-price-badge">₹{a.price.toLocaleString()}</span>
                      <span className="ap-rating">
                        <Star size={11} style={{ fill: "#fbbf24", color: "#fbbf24" }} />
                        {a.rating}
                      </span>
                      <span className="ap-dur">
                        <Clock size={9} /> {a.duration}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem", flexShrink: 0 }}>
                    <span className="ap-tag">{a.tag}</span>
                    <div className="ap-check">
                      {selected?.id === a.id && (
                        <CheckCircle size={14} color="white" strokeWidth={3} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Preview panel */}
            <div className="ap-right">
              <div className="ap-panel">

                {preview ? (
                  <div className="ap-hero">
                    <img
                      key={preview.id}
                      src={preview.thumb}
                      alt={preview.name}
                      style={{ animation: "fadeUp 0.4s ease both" }}
                    />
                    <div className="ap-hero-scrim" />
                    <div className="ap-hero-content">
                      <div className="ap-hero-pill">
                        <Zap size={9} /> {preview.tag} · {preview.duration}
                      </div>
                      <h2 className="ap-hero-name">{preview.name}</h2>
                      <p className="ap-hero-sub">
                        <Users size={13} /> Local Guided Experience
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="ap-empty">
                    <div className="ap-empty-ring">
                      <ImageIcon size={26} strokeWidth={1.2} />
                    </div>
                    <p className="ap-empty-title">Hover to preview</p>
                    <p className="ap-empty-hint">Move over any activity to see a live preview here</p>
                  </div>
                )}

                <div className="ap-price-area">
                  <div className="ap-price-row">
                    <div>
                      <p className="ap-price-lbl">Per Person</p>
                      <div className="ap-price-val">
                        <span>₹</span>
                        {selected ? selected.price.toLocaleString() : "—"}
                      </div>
                    </div>
                    <div className="ap-live">
                      <div>
                        <span className="ap-live-dot" />
                        <span className="ap-live-text">Instant</span>
                      </div>
                      <span className="ap-live-sub">Confirmed in seconds</span>
                    </div>
                  </div>

                  <button
                    className="ap-cta"
                    onClick={confirmActivity}
                    disabled={!selected}
                  >
                    {selected ? `Book ${selected.name} →` : "Select an Activity"}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}