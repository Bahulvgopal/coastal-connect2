"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";

export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const bookingId = params.get("id");
  const place = params.get("place");
  const provider = params.get("provider");
  const total = Number(params.get("total"));
  const type = params.get("type");

  const people = Number(params.get("people")) || 1;
  const activityDate = params.get("date");
  const timeSlot =
  params.get("time") ||
  params.get("timeSlot") ||
  "";
  const notes = params.get("notes");
  const checkIn = params.get("checkIn");
  const checkOut = params.get("checkOut");

  const latParam = params.get("lat");
  const lngParam = params.get("lng");
  const lat = latParam ? Number(latParam) : null;
  const lng = lngParam ? Number(lngParam) : null;

  const [data, setData] = useState<any>(null);
  const hasSaved = useRef(false);

  useEffect(() => {
  async function init() {

    // 🔹 Case 1: Open from dashboard (existing booking)
    if (bookingId) {
      try {
        const ref = doc(db, "bookings", bookingId);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setData({ id: snap.id, ...snap.data() });
        }
      } catch (err) {
        console.error("Error loading booking:", err);
      }
      return;
    }

    // 🔹 Case 2: After payment → save booking
    if (!user || hasSaved.current) return;
    hasSaved.current = true;

    try {
      const txnId = "TXN" + Math.floor(Math.random() * 1000000);

      const booking = {
        userId: user.uid,

        placeName: place || "Unknown",
        provider: provider || "Provider",
        type: type || "stay",

        total: Number(total) || 0,
        txnId,

        date: new Date().toLocaleDateString(),

        // Optional booking details
        people: Number(people) || 1,
       bookingDate: activityDate || params.get("checkIn") || "",
timeSlot: timeSlot || "",
        notes: notes || "",
        checkIn: checkIn || "",
        checkOut: checkOut || "",
        location:
          lat && lng && !isNaN(Number(lat)) && !isNaN(Number(lng))
            ? { lat: Number(lat), lng: Number(lng) }
            : null,

        status: "confirmed",
        paymentStatus: "paid",
      };

      const docRef = await addDoc(collection(db, "bookings"), booking);

      setData({ id: docRef.id, ...booking });

    } catch (err) {
      console.error("Booking save error:", err);
    }
  }

  init();
}, []);   // ✅ IMPORTANT — keep empty
  if (!data) return null;

  const isActivity =
  data.type === "activity" || data.type === "guide";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600;700;900&display=swap');

        :root {
          --blue-50:  #eff6ff;
          --blue-100: #dbeafe;
          --blue-400: #60a5fa;
          --blue-500: #3b82f6;
          --blue-600: #2563eb;
          --blue-700: #1d4ed8;
          --green-50:  #f0fdf4;
          --green-400: #4ade80;
          --green-500: #22c55e;
          --green-600: #16a34a;
          --slate-100: #f1f5f9;
          --slate-200: #e2e8f0;
          --slate-300: #cbd5e1;
          --slate-400: #94a3b8;
          --slate-500: #64748b;
          --slate-900: #0f172a;
        }

        .psp-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100svh;
          background: #f0f7ff;
          position: relative;
          overflow: hidden;
        }

        /* background blobs */
        .psp-blob {
          position: fixed;
          top: -100px; right: -100px;
          width: 420px; height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(96,165,250,0.13) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .psp-blob-2 {
          position: fixed;
          bottom: -80px; left: -80px;
          width: 340px; height: 340px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        .psp-page {
          position: relative; z-index: 1;
          max-width: 540px;
          margin: 0 auto;
          padding: clamp(2rem, 5vw, 3.5rem) clamp(1rem, 4vw, 1.5rem) 4rem;
        }

        /* ── Success card ── */
        .psp-card {
          background: white;
          border-radius: 2rem;
          overflow: hidden;
          box-shadow: 0 8px 48px rgba(59,130,246,0.1), 0 2px 8px rgba(15,23,42,0.06);
          border: 1.5px solid var(--blue-100);
          animation: cardIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Success banner ── */
        .psp-banner {
          background: linear-gradient(135deg, #16a34a 0%, #22c55e 60%, #4ade80 100%);
          padding: clamp(2rem, 5vw, 2.75rem) clamp(1.5rem, 5vw, 2.5rem);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .psp-banner::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 240px; height: 240px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
        }
        .psp-banner::after {
          content: '';
          position: absolute;
          bottom: -80px; left: -40px;
          width: 280px; height: 280px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
        }

        /* Animated checkmark ring */
        .psp-check-ring {
          width: 72px; height: 72px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          border: 2px solid rgba(255,255,255,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
          position: relative; z-index: 1;
          animation: popIn 0.5s 0.2s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .psp-check-ring svg {
          width: 36px; height: 36px;
          stroke: white;
          stroke-width: 2.5;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .psp-check-path {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: drawCheck 0.4s 0.5s ease forwards;
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }

        .psp-banner-label {
          font-size: 0.6rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: rgba(255,255,255,0.75);
          margin-bottom: 0.4rem;
          position: relative; z-index: 1;
        }
        .psp-banner-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 5vw, 2rem);
          font-weight: 700;
          color: white;
          margin: 0;
          position: relative; z-index: 1;
        }
        .psp-txn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: 1rem;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.25);
          padding: 0.35rem 1rem;
          border-radius: 2rem;
          font-size: 0.7rem;
          font-weight: 700;
          color: rgba(255,255,255,0.9);
          letter-spacing: 0.05em;
          position: relative; z-index: 1;
        }

        /* ── Details body ── */
        .psp-body {
          padding: clamp(1.5rem, 5vw, 2rem) clamp(1.5rem, 5vw, 2.25rem);
        }

        .psp-section-label {
          font-size: 0.6rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          color: var(--slate-300);
          margin-bottom: 1rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid var(--slate-100);
        }

        .psp-rows {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 1.5rem;
        }
        .psp-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }
        .psp-row-key {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--slate-400);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .psp-row-val {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--slate-900);
          text-align: right;
          word-break: break-all;
        }

        /* Total highlight */
        .psp-total-box {
          background: var(--blue-50);
          border: 1.5px solid var(--blue-100);
          border-radius: 1.25rem;
          padding: 1.1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.75rem;
        }
        .psp-total-label {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--blue-400);
          margin-bottom: 0.2rem;
        }
        .psp-total-val {
          font-family: semibold;
          font-size: clamp(1.75rem, 5vw, 2.25rem);
          font-weight: 700;
          color: var(--slate-900);
          line-height: 1;
        }
        .psp-paid-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: var(--green-50);
          border: 1.5px solid #bbf7d0;
          color: var(--green-600);
          font-size: 0.62rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          padding: 0.35rem 0.85rem;
          border-radius: 2rem;
        }
        .psp-paid-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--green-500);
          animation: blink 2s infinite;
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* CTA */
        .psp-cta {
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
        .psp-cta::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .psp-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(59,130,246,0.38);
        }
        .psp-cta:hover::after { opacity: 1; }
        .psp-cta:active { transform: scale(0.97); }

        .psp-footnote {
          text-align: center;
          font-size: 0.65rem;
          color: var(--slate-300);
          font-weight: 500;
          margin-top: 1rem;
        }

        /* Divider */
        .psp-divider {
          height: 1px;
          background: var(--slate-100);
          margin: 1.5rem 0;
        }
      `}</style>

      <div className="psp-blob" />
      <div className="psp-blob-2" />

      <div className="psp-root">
        <Navbar />

        <div className="psp-page">
          <div className="psp-card">

            {/* ── Green success banner ── */}
            <div className="psp-banner">
              <div className="psp-check-ring">
                <svg viewBox="0 0 40 40">
                  <polyline className="psp-check-path" points="8,21 17,30 32,12" />
                </svg>
              </div>
              <p className="psp-banner-label">Payment Successful</p>
              <h2 className="psp-banner-title">Booking Confirmed!</h2>
              <div className="psp-txn">
                # {data.txnId}
              </div>
            </div>

            {/* ── Details ── */}
            <div className="psp-body">

              <p className="psp-section-label">Booking Details</p>

              <div className="psp-rows">
                <div className="psp-row">
                  <span className="psp-row-key">Property</span>
                  <span className="psp-row-val">{data.placeName}</span>
                </div>
                <div className="psp-row">
                  <span className="psp-row-key">Provider</span>
                  <span className="psp-row-val">{data.provider}</span>
                </div>
                <div className="psp-row">
                  <span className="psp-row-key">Booked On</span>
                  <span className="psp-row-val">{data.date}</span>
                </div>
                {/* Stay Booking (Hotel / Homestay / Resort) */}
{data.type === "stay" && data.checkIn && (
  <div className="psp-row">
    <span className="psp-row-key">Check-In</span>
    <span className="psp-row-val">{data.checkIn}</span>
  </div>
)}

{data.type === "stay" && data.checkOut && (
  <div className="psp-row">
    <span className="psp-row-key">Check-Out</span>
    <span className="psp-row-val">{data.checkOut}</span>
  </div>
)}

{/* Activity / Guide Booking */}
{(data.type === "activity" || data.type === "guide") && (
  <>
    {data.bookingDate && (
      <div className="psp-row">
        <span className="psp-row-key">Activity Date</span>
        <span className="psp-row-val">{data.bookingDate}</span>
      </div>
    )}

    {data.timeSlot && (
      <div className="psp-row">
        <span className="psp-row-key">Time Slot</span>
        <span className="psp-row-val">{data.timeSlot}</span>
      </div>
    )}

    {data.people && (
      <div className="psp-row">
        <span className="psp-row-key">Participants</span>
        <span className="psp-row-val">{data.people}</span>
      </div>
    )}
  </>
)}
               
                {data.notes && (
                  <div className="psp-row">
                    <span className="psp-row-key">Notes</span>
                    <span className="psp-row-val">{data.notes}</span>
                  </div>
                )}
              </div>

              <div className="psp-divider" />

              {/* Total */}
              <div className="psp-total-box">
                <div>
                  <p className="psp-total-label">Total Paid</p>
                  <div className="psp-total-val">₹{data.total.toLocaleString()}</div>
                </div>
                <div className="psp-paid-badge">
                  <span className="psp-paid-dot" />
                  Paid
                </div>
              </div>

              {/* CTA */}
              <button className="psp-cta" onClick={() => router.push("/dashboard")}>
                Go to Dashboard →
              </button>
              <p className="psp-footnote">
                A confirmation has been saved to your account.
              </p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}