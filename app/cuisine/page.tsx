"use client";

import Navbar from "../components/Navbar";
import { foodData } from "../data/food";

export default function CuisinePage() {
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
          --slate-100: #f1f5f9;
          --slate-200: #e2e8f0;
          --slate-300: #cbd5e1;
          --slate-400: #94a3b8;
          --slate-500: #64748b;
          --slate-900: #0f172a;
        }

        .cp-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100svh;
          background: #f0f7ff;
          position: relative;
          overflow-x: hidden;
        }

        /* Background blobs */
        .cp-blob {
          position: fixed;
          top: -120px; right: -120px;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(96,165,250,0.13) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .cp-blob-2 {
          position: fixed;
          bottom: -100px; left: -100px;
          width: 380px; height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        .cp-page {
          position: relative; z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: clamp(2rem, 5vw, 3.5rem) clamp(1rem, 4vw, 2rem) 5rem;
        }

        /* ── Header ── */
        .cp-header {
          margin-bottom: clamp(2rem, 5vw, 3.5rem);
          animation: fadeUp 0.5s ease both;
        }
        .cp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.6rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--blue-500);
          background: var(--blue-50);
          border: 1px solid var(--blue-100);
          padding: 0.35rem 0.9rem;
          border-radius: 2rem;
          margin-bottom: 0.9rem;
        }
        .cp-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 6vw, 4rem);
          font-weight: 700;
          font-style: italic;
          color: var(--slate-900);
          line-height: 1.08;
          margin: 0 0 0.6rem;
        }
        .cp-title em {
          font-style: normal;
          color: var(--blue-500);
        }
        .cp-subtitle {
          font-size: 0.88rem;
          color: var(--slate-400);
          font-weight: 400;
          max-width: 480px;
          line-height: 1.6;
        }

        /* ── Grid ── */
        .cp-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 640px) {
          .cp-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .cp-grid { grid-template-columns: repeat(3, 1fr); gap: 1.75rem; }
        }

        /* ── Food card ── */
        .cp-card {
          background: white;
          border-radius: 1.75rem;
          overflow: hidden;
          border: 1.5px solid white;
          box-shadow: 0 2px 16px rgba(15,23,42,0.06);
          transition: all 0.32s cubic-bezier(0.34,1.56,0.64,1);
          cursor: default;
          animation: fadeUp 0.5s ease both;
        }
        .cp-card:hover {
          transform: translateY(-6px);
          border-color: var(--blue-100);
          box-shadow: 0 16px 48px rgba(59,130,246,0.13), 0 2px 8px rgba(15,23,42,0.06);
        }

        /* Stagger */
        .cp-card:nth-child(1) { animation-delay: 0.05s; }
        .cp-card:nth-child(2) { animation-delay: 0.1s; }
        .cp-card:nth-child(3) { animation-delay: 0.15s; }
        .cp-card:nth-child(4) { animation-delay: 0.2s; }
        .cp-card:nth-child(5) { animation-delay: 0.25s; }
        .cp-card:nth-child(6) { animation-delay: 0.3s; }

        /* Image wrapper */
        .cp-img-wrap {
          position: relative;
          overflow: hidden;
          height: clamp(170px, 22vw, 220px);
        }
        .cp-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .cp-card:hover .cp-img-wrap img { transform: scale(1.06); }

        /* Gradient scrim over image bottom */
        .cp-img-scrim {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 60%;
          background: linear-gradient(to top, rgba(15,23,42,0.55) 0%, transparent 100%);
        }

        /* Number badge on image */
        .cp-num {
          position: absolute;
          top: 1rem; left: 1rem;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.62rem;
          font-weight: 900;
          color: var(--blue-600);
          border: 1.5px solid rgba(255,255,255,0.6);
        }

        /* Card body */
        .cp-body {
          padding: clamp(1rem, 3vw, 1.4rem) clamp(1rem, 3vw, 1.4rem) clamp(1.1rem, 3vw, 1.5rem);
        }

        .cp-food-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.05rem, 2.5vw, 1.2rem);
          font-weight: 700;
          color: var(--slate-900);
          margin: 0 0 0.5rem;
          line-height: 1.25;
        }

        .cp-desc {
          font-size: 0.78rem;
          color: var(--slate-400);
          line-height: 1.65;
          margin: 0 0 1.1rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Info pills row */
        .cp-meta {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .cp-meta-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.73rem;
          font-weight: 500;
          color: var(--slate-500);
        }
        .cp-meta-icon {
          width: 26px; height: 26px;
          border-radius: 0.5rem;
          background: var(--blue-50);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          flex-shrink: 0;
        }
        .cp-meta-label {
          font-size: 0.6rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--slate-300);
          margin-right: 0.15rem;
        }

        /* Divider inside card */
        .cp-divider {
          height: 1px;
          background: var(--slate-100);
          margin: 0.9rem 0;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="cp-blob" />
      <div className="cp-blob-2" />

      <div className="cp-root">
        <Navbar />

        <div className="cp-page">

          {/* Header */}
          <div className="cp-header">
            <div className="cp-eyebrow">
              🍛 Local Cuisine Guide
            </div>
            <h1 className="cp-title">
              Kerala <em>on a Plate</em>
            </h1>
            <p className="cp-subtitle">
              Discover the authentic flavours, best places to eat, and the perfect time to savour each dish.
            </p>
          </div>

          {/* Grid */}
          <div className="cp-grid">
            {foodData.map((food, i) => (
              <div key={food.id} className="cp-card">

                {/* Image */}
                <div className="cp-img-wrap">
                  <img src={food.image} alt={food.name} />
                  <div className="cp-img-scrim" />
                  <div className="cp-num">{String(i + 1).padStart(2, "0")}</div>
                </div>

                {/* Body */}
                <div className="cp-body">
                  <h3 className="cp-food-name">{food.name}</h3>
                  <p className="cp-desc">{food.description}</p>

                  <div className="cp-divider" />

                  <div className="cp-meta">
                    <div className="cp-meta-row">
                      <div className="cp-meta-icon">🍽</div>
                      <span>
                        <span className="cp-meta-label">Best at </span>
                        {food.hotel}
                      </span>
                    </div>
                    <div className="cp-meta-row">
                      <div className="cp-meta-icon">⏰</div>
                      <span>
                        <span className="cp-meta-label">Best time </span>
                        {food.bestTime}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}