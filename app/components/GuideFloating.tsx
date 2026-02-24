"use client";

import { useRouter } from "next/navigation";
import { User, MapPin, ArrowRight } from "lucide-react";

export default function GuideFloating({ place }: { place: any }) {
  const router = useRouter();

  function bookGuide() {
    router.push(
      `/guide-booking?place=${place.name}&lat=${place.lat}&lng=${place.lng}`
    );
  }

  return (
    <>
      <style>{`
        .gf-ring {
          position: fixed;
          bottom: 1.5rem;
          left: 1.5rem;
          z-index: 49;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 2px solid rgba(59, 130, 246, 0.35);
          pointer-events: none;
          animation: gfRing 2.8s ease-out infinite;
        }
        @keyframes gfRing {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(2.4); opacity: 0;   }
        }

        .gf-btn {
          position: fixed;
          bottom: 1.5rem;
          left: 1.5rem;
          z-index: 50;
          display: flex;
          align-items: center;
          gap: 0;
          background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%);
          color: #fff;
          border: none;
          border-radius: 2rem;
          padding: 0;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4), 0 1px 4px rgba(15, 23, 42, 0.1);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          overflow: hidden;
          font-family: 'DM Sans', -apple-system, sans-serif;
        }
        .gf-btn:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 12px 32px rgba(59, 130, 246, 0.45), 0 2px 8px rgba(15, 23, 42, 0.12);
        }
        .gf-btn:active { transform: scale(0.97); }

        .gf-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin: 3px 0 3px 3px;
          transition: background 0.2s;
        }
        .gf-btn:hover .gf-icon { background: rgba(255, 255, 255, 0.28); }

        .gf-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0 0.9rem 0 0.7rem;
          gap: 0.05rem;
        }
        .gf-text-top {
          font-size: 0.58rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1;
        }
        .gf-text-main {
          font-size: 0.88rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.01em;
          line-height: 1.2;
          white-space: nowrap;
        }

        .gf-arrow {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 0.6rem;
          flex-shrink: 0;
          transition: transform 0.2s, background 0.2s;
        }
        .gf-btn:hover .gf-arrow {
          transform: translateX(3px);
          background: rgba(255, 255, 255, 0.25);
        }

        .gf-location {
          position: fixed;
          bottom: 5.2rem;
          left: 1.5rem;
          z-index: 50;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: white;
          border: 1.5px solid #dbeafe;
          border-radius: 2rem;
          padding: 0.3rem 0.75rem;
          font-family: 'DM Sans', -apple-system, sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          color: #2563eb;
          box-shadow: 0 2px 12px rgba(59, 130, 246, 0.12);
          pointer-events: none;
          animation: gfBadgeIn 0.5s 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes gfBadgeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Pulse ring */}
      <div className="gf-ring" />

      {/* Location badge */}
      <div className="gf-location">
        <MapPin size={11} />
        {place.name}
      </div>

      {/* Main FAB */}
      <button className="gf-btn" onClick={bookGuide} aria-label="Book a local guide">
        <div className="gf-icon">
          <User size={20} />
        </div>
        <div className="gf-text">
          <span className="gf-text-top">Local Expert</span>
          <span className="gf-text-main">Book a Guide</span>
        </div>
        <div className="gf-arrow">
          <ArrowRight size={14} />
        </div>
      </button>
    </>
  );
}