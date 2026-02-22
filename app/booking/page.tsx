"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { providers } from "../data/providers";
import { useAuth } from "../context/AuthContext";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import {
  Star,
  CheckCircle,
  MapPin,
  CreditCard,
  ArrowLeft,
  Home,
  Zap,
} from "lucide-react";

export default function BookingPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const place = params.get("place");
  const type = params.get("type");
  const lat = Number(params.get("lat"));
  const lng = Number(params.get("lng"));

  const list = type === "homestay" ? providers.homestays : providers.activities;

  const [selected, setSelected] = useState<any>(null);
  const [confirming, setConfirming] = useState(false);

  const platformFee = selected ? Math.round(selected.price * 0.1) : 0;
  const total = selected ? selected.price + platformFee : 0;

  async function confirmBooking() {
    if (!user) return router.push("/login");
    try {
      setConfirming(true);
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        placeName: place,
        type,
        provider: selected.name,
        price: selected.price,
        platformFee,
        total,
        date: new Date().toLocaleDateString(),
        location: { lat, lng },
      });
      router.push("/dashboard");
    } catch {
      alert("Failed to confirm booking");
    } finally {
      setConfirming(false);
    }
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .booking-root {
          min-height: 100vh;
          background: #f0f7ff;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #0c2340;
        }

        .booking-main {
          max-width: 680px;
          margin: 0 auto;
          padding: 2.5rem 1.25rem 4rem;
        }

        /* Header */
        .bk-back {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #0369a1;
          background: #e0f2fe;
          border: 1px solid #bae6fd;
          padding: 7px 13px;
          border-radius: 9px;
          cursor: pointer;
          transition: all 0.18s;
          margin-bottom: 1.75rem;
          text-decoration: none;
          border: none;
        }

        .bk-back:hover { background: #bae6fd; }

        .bk-eyebrow {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #0ea5e9;
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 0.4rem;
        }

        .bk-title {
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 300;
          letter-spacing: -0.04em;
          color: #0c2340;
          margin-bottom: 3px;
        }

        .bk-title em { font-style: normal; color: #0ea5e9; }

        .bk-sub {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.8rem;
          color: #94a3b8;
          margin-bottom: 2rem;
        }

        /* Section label */
        .section-label {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #0ea5e9;
          margin-bottom: 0.75rem;
        }

        /* Provider list */
        .provider-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 1.5rem;
        }

        .provider-item {
          background: #fff;
          border: 1px solid #daeeff;
          border-radius: 14px;
          padding: 1rem 1.25rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: all 0.18s ease;
          position: relative;
        }

        .provider-item:hover {
          border-color: #7dd3fc;
          background: #f8fbff;
        }

        .provider-item.selected {
          border-color: #0ea5e9;
          background: #f0f9ff;
          box-shadow: 0 0 0 3px rgba(14,165,233,0.1);
        }

        .provider-radio {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #daeeff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.18s;
        }

        .provider-item.selected .provider-radio {
          border-color: #0ea5e9;
          background: #0ea5e9;
        }

        .radio-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fff;
          opacity: 0;
          transition: opacity 0.18s;
        }

        .provider-item.selected .radio-dot { opacity: 1; }

        .provider-info { flex: 1; min-width: 0; }

        .provider-name {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #0c2340;
          margin-bottom: 3px;
        }

        .provider-meta {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .provider-price {
          font-size: 0.8rem;
          font-weight: 700;
          color: #0369a1;
        }

        .provider-rating {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: 0.78rem;
          color: #64748b;
        }

        /* Breakdown card */
        .breakdown-card {
          background: #fff;
          border: 1px solid #daeeff;
          border-radius: 18px;
          overflow: hidden;
          animation: fadeUp 0.25s ease forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .breakdown-header {
          padding: 1rem 1.25rem;
          background: #f0f9ff;
          border-bottom: 1px solid #daeeff;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #0369a1;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .breakdown-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .breakdown-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #eef6ff;
          font-size: 0.875rem;
        }

        .breakdown-row:last-of-type { border-bottom: none; }

        .breakdown-label { color: #64748b; }

        .breakdown-val { font-weight: 600; color: #0c2340; }

        .breakdown-total-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          background: #f0f9ff;
          border-top: 1px solid #daeeff;
        }

        .total-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #0369a1;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .total-val {
          font-size: 1.5rem;
          font-weight: 300;
          letter-spacing: -0.04em;
          color: #0c2340;
        }

        .total-val em { font-style: normal; color: #0ea5e9; }

        .confirm-btn {
          width: 100%;
          padding: 14px;
          border: none;
          background: #0ea5e9;
          color: #fff;
          font-family: inherit;
          font-size: 0.9375rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.18s ease;
          margin-top: 1.25rem;
          border-radius: 13px;
          box-shadow: 0 4px 16px rgba(14,165,233,0.25);
        }

        .confirm-btn:hover:not(:disabled) {
          background: #0284c7;
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(14,165,233,0.35);
        }

        .confirm-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .spinner {
          width: 17px;
          height: 17px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .empty-state {
          text-align: center;
          padding: 2.5rem 1rem;
          background: #fff;
          border: 1px solid #daeeff;
          border-radius: 18px;
          color: #94a3b8;
          font-size: 0.875rem;
        }
      `}</style>

      <div className="booking-root">
        <Navbar />

        <div className="booking-main">

          <button className="bk-back" onClick={() => router.back()}>
            <ArrowLeft size={13} /> Back
          </button>

          <div className="bk-eyebrow">
            {type === "homestay" ? <Home size={11} /> : <Zap size={11} />}
            {type === "homestay" ? "Homestay" : "Activity"} Booking
          </div>
          <h1 className="bk-title">{place}<em>.</em></h1>
          <div className="bk-sub">
            <MapPin size={12} />
            Select a provider and confirm your booking
          </div>

          {/* Provider list */}
          <div className="section-label">Available providers</div>

          {list.length === 0 ? (
            <div className="empty-state">No providers available for this location.</div>
          ) : (
            <div className="provider-list">
              {list.map((p: any) => (
                <div
                  key={p.id}
                  className={`provider-item${selected?.id === p.id ? " selected" : ""}`}
                  onClick={() => setSelected(p)}
                >
                  <div className="provider-radio">
                    <div className="radio-dot" />
                  </div>
                  <div className="provider-info">
                    <div className="provider-name">{p.name}</div>
                    <div className="provider-meta">
                      <span className="provider-price">₹{p.price}</span>
                      <span className="provider-rating">
                        <Star size={11} fill="#f59e0b" color="#f59e0b" />
                        {p.rating}
                      </span>
                    </div>
                  </div>
                  {selected?.id === p.id && (
                    <CheckCircle size={18} color="#0ea5e9" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Price breakdown */}
          {selected && (
            <div>
              <div className="section-label">Price breakdown</div>
              <div className="breakdown-card">
                <div className="breakdown-header">
                  <CreditCard size={13} />
                  {selected.name}
                </div>

                <div className="breakdown-body">
                  <div className="breakdown-row">
                    <span className="breakdown-label">Provider price</span>
                    <span className="breakdown-val">₹{selected.price}</span>
                  </div>
                  <div className="breakdown-row">
                    <span className="breakdown-label">Platform fee (10%)</span>
                    <span className="breakdown-val">₹{platformFee}</span>
                  </div>
                </div>

                <div className="breakdown-total-row">
                  <span className="total-label">Total payable</span>
                  <span className="total-val"><em>₹</em>{total}</span>
                </div>

                <div style={{ padding: "0 1.25rem 1.25rem" }}>
                  <button
                    className="confirm-btn"
                    onClick={confirmBooking}
                    disabled={confirming}
                  >
                    {confirming
                      ? <><div className="spinner" /> Confirming…</>
                      : <><CheckCircle size={16} /> Confirm Booking</>
                    }
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}