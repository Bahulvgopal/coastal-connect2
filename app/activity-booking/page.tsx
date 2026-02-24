"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function ActivityBookingPage() {
  const params = useSearchParams();
  const router = useRouter();

  const place = params.get("place");
  const activity = params.get("activity");
  const price = Number(params.get("price")) || 0;
  const lat = params.get("lat");
  const lng = params.get("lng");

  const [people, setPeople] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("Morning");
  const [notes, setNotes] = useState("");

  const total = people * price;

  function proceedToPayment() {
    router.push(
      `/payment?place=${place}&provider=${activity}&total=${total}&type=activity&lat=${lat}&lng=${lng}&people=${people}&date=${date}&time=${time}&notes=${notes}`
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,600;0,9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&display=swap');

        .abp-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100svh;
          background: #f0f7ff;
        }

        /* ── page wrapper ── */
        .abp-page {
          min-height: calc(100svh - 64px);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: clamp(1.25rem, 5vw, 3rem) clamp(1rem, 4vw, 1.5rem);
        }

        /* ── card ── */
        .abp-card {
          width: 100%;
          max-width: 520px;
          background: #ffffff;
          border-radius: 2rem;
          box-shadow:
            0 1px 2px rgba(15,23,42,.04),
            0 8px 40px rgba(59,130,246,.07);
          overflow: hidden;
        }

        /* ── card header ── */
        .abp-header {
          background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 60%, #60a5fa 100%);
          padding: clamp(1.5rem, 5vw, 2.25rem) clamp(1.5rem, 5vw, 2.25rem) clamp(1.25rem, 4vw, 2rem);
          position: relative;
          overflow: hidden;
        }
        .abp-header::before {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 180px; height: 180px;
          border-radius: 50%;
          background: rgba(255,255,255,.07);
        }
        .abp-header::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -20px;
          width: 220px; height: 220px;
          border-radius: 50%;
          background: rgba(255,255,255,.05);
        }
        .abp-eyebrow {
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,.65);
          margin-bottom: 0.5rem;
          position: relative; z-index: 1;
        }
        .abp-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(1.5rem, 5vw, 2rem);
          font-weight: 300;
          color: #ffffff;
          margin: 0 0 0.5rem;
          line-height: 1.2;
          position: relative; z-index: 1;
        }
        .abp-location {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255,255,255,.7);
          background: rgba(255,255,255,.12);
          padding: 0.3rem 0.75rem;
          border-radius: 2rem;
          position: relative; z-index: 1;
          backdrop-filter: blur(4px);
        }
        .abp-location svg {
          width: 12px; height: 12px;
          fill: none;
          stroke: rgba(255,255,255,.8);
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          flex-shrink: 0;
        }

        /* ── card body ── */
        .abp-body {
          padding: clamp(1.5rem, 5vw, 2.25rem);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* ── field group ── */
        .abp-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .abp-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #94a3b8;
        }
        .abp-input,
        .abp-select,
        .abp-textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1.5px solid #e2e8f0;
          border-radius: 0.875rem;
          padding: 0.75rem 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          color: #1e293b;
          background: #f8fafc;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
        }
        .abp-input:focus,
        .abp-select:focus,
        .abp-textarea:focus {
          border-color: #3b82f6;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(59,130,246,.1);
        }
        .abp-select-wrap {
          position: relative;
        }
        .abp-select-wrap::after {
          content: '';
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          width: 0; height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid #94a3b8;
          pointer-events: none;
        }
        .abp-textarea {
          resize: vertical;
          min-height: 90px;
        }

        /* ── people stepper ── */
        .abp-stepper {
          display: flex;
          align-items: center;
          gap: 0;
          border: 1.5px solid #e2e8f0;
          border-radius: 0.875rem;
          overflow: hidden;
          background: #f8fafc;
        }
        .abp-stepper-btn {
          width: 48px;
          flex-shrink: 0;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.25rem;
          font-weight: 300;
          color: #3b82f6;
          padding: 0.6rem 0;
          transition: background 0.15s;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .abp-stepper-btn:hover { background: #eff6ff; }
        .abp-stepper-btn:disabled { color: #cbd5e1; cursor: not-allowed; }
        .abp-stepper-val {
          flex: 1;
          text-align: center;
          font-size: 1rem;
          font-weight: 700;
          color: #1e293b;
          border-left: 1.5px solid #e2e8f0;
          border-right: 1.5px solid #e2e8f0;
          padding: 0.6rem 0;
          background: #fff;
          user-select: none;
        }

        /* ── divider ── */
        .abp-divider {
          height: 1px;
          background: #f1f5f9;
        }

        /* ── price summary ── */
        .abp-price-box {
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 1.25rem;
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .abp-price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
        }
        .abp-price-label { color: #94a3b8; font-weight: 500; }
        .abp-price-value { color: #1e293b; font-weight: 600; }
        .abp-price-total-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-top: 0.5rem;
          border-top: 1px solid #e2e8f0;
        }
        .abp-total-label {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #94a3b8;
        }
        .abp-total-value {
          font-family: semibold;
          font-size: clamp(1.75rem, 6vw, 2.25rem);
          font-weight: 600;
          color: #0f172a;
          letter-spacing: -0.03em;
          line-height: 1;
        }

        /* ── CTA button ── */
        .abp-cta {
          width: 100%;
          background: linear-gradient(135deg, #1d4ed8, #3b82f6);
          color: #fff;
          border: none;
          border-radius: 1rem;
          padding: 1rem 1.5rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 8px 24px rgba(59,130,246,.3);
        }
        .abp-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(59,130,246,.4);
        }
        .abp-cta:active {
          transform: scale(0.98);
        }
        .abp-policy {
          text-align: center;
          font-size: 0.65rem;
          color: #cbd5e1;
          font-weight: 500;
          margin-top: -0.25rem;
        }

        /* ── responsive tweaks ── */
        @media (max-width: 480px) {
          .abp-card { border-radius: 1.5rem; }
          .abp-header { border-radius: 0; }
        }
      `}</style>

      <div className="abp-root">
        <Navbar />

        <div className="abp-page">
          <div className="abp-card">

            {/* Header */}
            <div className="abp-header">
              <p className="abp-eyebrow">Activity Booking</p>
              <h2 className="abp-title">{activity}</h2>
              <span className="abp-location">
                <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                {place}
              </span>
            </div>

            {/* Body */}
            <div className="abp-body">

              {/* People */}
              <div className="abp-field">
                <label className="abp-label">Number of People</label>
                <div className="abp-stepper">
                  <button
                    className="abp-stepper-btn"
                    onClick={() => setPeople(p => Math.max(1, p - 1))}
                    disabled={people <= 1}
                    aria-label="Decrease"
                  >−</button>
                  <div className="abp-stepper-val">{people}</div>
                  <button
                    className="abp-stepper-btn"
                    onClick={() => setPeople(p => p + 1)}
                    aria-label="Increase"
                  >+</button>
                </div>
              </div>

              {/* Date */}
              <div className="abp-field">
                <label className="abp-label">Select Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="abp-input"
                />
              </div>

              {/* Time */}
              <div className="abp-field">
                <label className="abp-label">Time Slot</label>
                <div className="abp-select-wrap">
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="abp-select"
                  >
                    <option>Morning (8AM - 11AM)</option>
                    <option>Afternoon (12PM - 3PM)</option>
                    <option>Evening (4PM - 7PM)</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="abp-field">
                <label className="abp-label">Special Requests</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="abp-textarea"
                  placeholder="Optional..."
                />
              </div>

              <div className="abp-divider" />

              {/* Price Summary */}
              <div className="abp-price-box">
                <div className="abp-price-row">
                  <span className="abp-price-label">Price per person</span>
                  <span className="abp-price-value">₹{price.toLocaleString()}</span>
                </div>
                <div className="abp-price-row">
                  <span className="abp-price-label">People</span>
                  <span className="abp-price-value">× {people}</span>
                </div>
                <div className="abp-price-total-row">
                  <div>
                    <p className="abp-total-label">Total</p>
                    <span className="abp-total-value">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button className="abp-cta" onClick={proceedToPayment}>
                Proceed to Payment →
              </button>
              <p className="abp-policy">
                By continuing you agree to our booking policy and terms.
              </p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}