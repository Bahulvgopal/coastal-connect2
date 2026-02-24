"use client";

import Navbar from "../components/Navbar";
import { providers } from "../data/providers";
import { Wallet, TrendingUp, Shield } from "lucide-react";

export default function ProvidersPage() {
  const totalPartners =
    providers.homestays.length + providers.activities.length;

  return (
    <>
      <style>{`
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
          --slate-600: #475569;
          --slate-700: #334155;
          --slate-800: #1e293b;
          --slate-900: #0f172a;
        }

        .pp-root {
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          min-height: 100svh;
          background: #f0f7ff;
        }

        /* background blob */
        .pp-blob {
          position: fixed;
          top: -140px; right: -140px;
          width: 560px; height: 560px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(96,165,250,0.1) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        .pp-page {
          position: relative; z-index: 1;
          max-width: 1120px;
          margin: 0 auto;
          padding: clamp(2rem, 5vw, 3.5rem) clamp(1rem, 4vw, 2rem) 5rem;
        }

        /* ── Hero header ── */
        .pp-hero {
          margin-bottom: clamp(2.5rem, 6vw, 4rem);
          animation: fadeUp 0.5s ease both;
        }
        .pp-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }
        .pp-breadcrumb-line {
          width: 28px; height: 2px;
          background: var(--blue-500);
          border-radius: 99px;
        }
        .pp-breadcrumb-text {
          font-size: 0.6rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--blue-600);
        }
        .pp-title {
          font-size: clamp(1.9rem, 5vw, 3.25rem);
          font-weight: 300;
          color: var(--slate-900);
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 0 0.75rem;
        }
        .pp-title strong {
          font-weight: 700;
          color: var(--blue-600);
        }
        .pp-desc {
          font-size: 0.88rem;
          color: var(--slate-400);
          max-width: 520px;
          line-height: 1.7;
          margin: 0 0 2rem;
        }

        /* Stat strip */
        .pp-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .pp-stat {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: white;
          border: 1.5px solid var(--blue-100);
          border-radius: 0.875rem;
          padding: 0.55rem 1rem;
          box-shadow: 0 1px 4px rgba(59,130,246,0.07);
        }
        .pp-stat-icon {
          width: 28px; height: 28px;
          border-radius: 0.5rem;
          background: var(--blue-50);
          display: flex; align-items: center; justify-content: center;
          color: var(--blue-500);
          flex-shrink: 0;
        }
        .pp-stat-val {
          font-size: 1rem;
          font-weight: 800;
          color: var(--slate-900);
          line-height: 1;
        }
        .pp-stat-lbl {
          font-size: 0.62rem;
          font-weight: 600;
          color: var(--slate-400);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* ── Section ── */
        .pp-section { margin-bottom: clamp(2rem, 5vw, 3.5rem); }
        .pp-section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1.5px solid var(--slate-200);
        }
        .pp-section-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .pp-section-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: var(--blue-500);
          box-shadow: 0 0 0 3px rgba(59,130,246,0.18);
        }
        .pp-section-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--slate-800);
          letter-spacing: -0.01em;
        }
        .pp-section-count {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--slate-400);
          background: var(--slate-100);
          padding: 0.25rem 0.65rem;
          border-radius: 2rem;
          letter-spacing: 0.05em;
        }
        .pp-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 768px) {
          .pp-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* ── Provider card ── */
        .pp-card {
          background: white;
          border: 1.5px solid var(--slate-200);
          border-radius: 1.5rem;
          padding: clamp(1.25rem, 3vw, 1.75rem);
          transition: all 0.28s cubic-bezier(0.34,1.2,0.64,1);
          animation: fadeUp 0.45s ease both;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .pp-card:hover {
          border-color: var(--blue-200);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(59,130,246,0.1), 0 2px 8px rgba(15,23,42,0.05);
        }

        /* Card top row */
        .pp-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }
        .pp-card-name {
          font-size: 1rem;
          font-weight: 700;
          color: var(--slate-900);
          margin: 0 0 0.25rem;
          letter-spacing: -0.01em;
        }
        .pp-verified {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.58rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--blue-500);
          background: var(--blue-50);
          border: 1px solid var(--blue-100);
          padding: 0.2rem 0.6rem;
          border-radius: 2rem;
        }
        .pp-card-icon {
          width: 40px; height: 40px;
          border-radius: 0.875rem;
          background: var(--blue-50);
          border: 1.5px solid var(--blue-100);
          display: flex; align-items: center; justify-content: center;
          color: var(--blue-500);
          flex-shrink: 0;
          transition: all 0.2s;
        }
        .pp-card:hover .pp-card-icon {
          background: var(--blue-500);
          color: white;
          border-color: var(--blue-500);
        }

        /* Pill group label */
        .pp-pill-label {
          font-size: 0.6rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--slate-300);
          margin-bottom: 0.5rem;
        }
        .pp-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .pp-pill-blue {
          padding: 0.25rem 0.7rem;
          font-size: 0.7rem;
          font-weight: 600;
          background: var(--blue-50);
          color: var(--blue-600);
          border: 1px solid var(--blue-100);
          border-radius: 2rem;
        }
        .pp-pill-grey {
          padding: 0.25rem 0.7rem;
          font-size: 0.7rem;
          font-weight: 600;
          background: var(--slate-100);
          color: var(--slate-600);
          border: 1px solid var(--slate-200);
          border-radius: 2rem;
        }

        /* Facilities list */
        .pp-facilities {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .pp-facility {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: var(--slate-600);
          font-weight: 500;
        }
        .pp-facility::before {
          content: '';
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--blue-400);
          flex-shrink: 0;
        }

        /* Divider */
        .pp-divider { height: 1px; background: var(--slate-100); }

        /* Financials */
        .pp-fin {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }
        .pp-fin-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .pp-fin-key {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--slate-400);
        }
        .pp-fin-val {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--slate-700);
        }
        .pp-fin-val-blue {
          font-size: 0.88rem;
          font-weight: 800;
          color: var(--blue-600);
        }

        /* Progress bar */
        .pp-bar-labels {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.4rem;
        }
        .pp-bar-label-blue {
          font-size: 0.62rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--blue-500);
        }
        .pp-bar-label-grey {
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--slate-300);
        }
        .pp-bar-track {
          height: 6px;
          width: 100%;
          background: var(--slate-100);
          border-radius: 99px;
          overflow: hidden;
        }
        .pp-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--blue-600) 0%, var(--blue-400) 100%);
          border-radius: 99px;
          transition: width 0.8s ease;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="pp-blob" />
      <div className="pp-root">
        <Navbar />

        <main className="pp-page">

          {/* Hero */}
          <div className="pp-hero">
            <div className="pp-breadcrumb">
              <div className="pp-breadcrumb-line" />
              <span className="pp-breadcrumb-text">Provider Dashboard</span>
            </div>

            <h1 className="pp-title">
              Partner Facilities<br />
              <strong>&amp; Earnings</strong>
            </h1>
            <p className="pp-desc">
              Explore our trusted local partners, their facilities, amenities, and
              how revenue is distributed fairly between providers and the platform.
            </p>

            <div className="pp-stats">
              <div className="pp-stat">
                <div className="pp-stat-icon"><Shield size={15} /></div>
                <div>
                  <div className="pp-stat-val">{totalPartners}</div>
                  <div className="pp-stat-lbl">Partners</div>
                </div>
              </div>
              <div className="pp-stat">
                <div className="pp-stat-icon"><TrendingUp size={15} /></div>
                <div>
                  <div className="pp-stat-val">{providers.homestays.length}</div>
                  <div className="pp-stat-lbl">Homestays</div>
                </div>
              </div>
              <div className="pp-stat">
                <div className="pp-stat-icon"><Wallet size={15} /></div>
                <div>
                  <div className="pp-stat-val">{providers.activities.length}</div>
                  <div className="pp-stat-lbl">Activities</div>
                </div>
              </div>
            </div>
          </div>

          {/* Homestays */}
          <Section title="Homestays" data={providers.homestays} />

          {/* Activities */}
          <Section title="Activities" data={providers.activities} />

        </main>
      </div>
    </>
  );
}


/* ── Section ── */
function Section({ title, data }: any) {
  return (
    <section className="pp-section">
      <div className="pp-section-head">
        <div className="pp-section-left">
          <div className="pp-section-dot" />
          <h2 className="pp-section-title">{title}</h2>
        </div>
        <span className="pp-section-count">{data.length} Partners</span>
      </div>

      <div className="pp-grid">
        {data.map((p: any, i: number) => (
          <ProviderCard key={p.id} provider={p} index={i} />
        ))}
      </div>
    </section>
  );
}


/* ── Provider Card ── */
function ProviderCard({ provider, index }: any) {
  const platformFee = provider.price - provider.earnings;
  const providerPercent = Math.round((provider.earnings / provider.price) * 100);

  return (
    <div
      className="pp-card"
      style={{ animationDelay: `${index * 0.07}s` }}
    >

      {/* Top */}
      <div className="pp-card-top">
        <div>
          <h3 className="pp-card-name">{provider.name}</h3>
          <span className="pp-verified">✓ Verified Partner</span>
        </div>
        <div className="pp-card-icon">
          <Wallet size={18} />
        </div>
      </div>

      {/* Room Types */}
      {provider.roomTypes && (
        <div>
          <p className="pp-pill-label">Room Types</p>
          <div className="pp-pills">
            {provider.roomTypes.map((room: string, i: number) => (
              <span key={i} className="pp-pill-blue">{room}</span>
            ))}
          </div>
        </div>
      )}

      {/* Amenities */}
      {provider.amenities && (
        <div>
          <p className="pp-pill-label">Amenities</p>
          <div className="pp-pills">
            {provider.amenities.map((item: string, i: number) => (
              <span key={i} className="pp-pill-grey">{item}</span>
            ))}
          </div>
        </div>
      )}

      {/* Facilities */}
      {provider.facilities && (
        <div>
          <p className="pp-pill-label">Special Facilities</p>
          <div className="pp-facilities">
            {provider.facilities.map((f: string, i: number) => (
              <div key={i} className="pp-facility">{f}</div>
            ))}
          </div>
        </div>
      )}

      <div className="pp-divider" />

      {/* Financials */}
      <div className="pp-fin">
        <div className="pp-fin-row">
          <span className="pp-fin-key">Booking Price</span>
          <span className="pp-fin-val">₹{provider.price.toLocaleString()}</span>
        </div>
        <div className="pp-fin-row">
          <span className="pp-fin-key" style={{ color: "var(--blue-500)" }}>Provider Earnings</span>
          <span className="pp-fin-val-blue">₹{provider.earnings.toLocaleString()}</span>
        </div>
        <div className="pp-fin-row">
          <span className="pp-fin-key">Platform Fee</span>
          <span className="pp-fin-val">₹{platformFee.toLocaleString()}</span>
        </div>
      </div>

      <div className="pp-divider" />

      {/* Progress bar */}
      <div>
        <div className="pp-bar-labels">
          <span className="pp-bar-label-blue">{providerPercent}% to Partner</span>
          <span className="pp-bar-label-grey">{100 - providerPercent}% Platform</span>
        </div>
        <div className="pp-bar-track">
          <div className="pp-bar-fill" style={{ width: `${providerPercent}%` }} />
        </div>
      </div>

    </div>
  );
}