"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .pay-root {
    min-height: 100vh;
    background: #f5f4f0;
    font-family: 'DM Sans', sans-serif;
    color: #1a1a1a;
  }

  .pay-header {
    padding: 48px 24px 32px;
    max-width: 680px;
    margin: 0 auto;
    border-bottom: 1px solid #e2e1dc;
  }

  .header-label {
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #888;
    font-weight: 500;
    margin-bottom: 8px;
  }

  .header-title {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(26px, 4vw, 40px);
    font-weight: 400;
    color: #111;
    line-height: 1.1;
  }

  .pay-body {
    max-width: 680px;
    margin: 0 auto;
    padding: 32px 24px 64px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* Booking summary strip */
  .summary-strip {
    background: #1a1a1a;
    border-radius: 16px;
    padding: 24px 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .strip-meta { display: flex; flex-direction: column; gap: 4px; }

  .strip-place {
    font-family: 'DM Serif Display', serif;
    font-size: 20px;
    color: #fff;
    font-weight: 400;
  }

  .strip-sub {
    font-size: 12px;
    color: #666;
    letter-spacing: 0.03em;
  }

  .strip-amount {
    text-align: right;
    flex-shrink: 0;
  }

  .strip-amount-label {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #555;
    margin-bottom: 2px;
  }

  .strip-amount-value {
    font-family: 'DM Serif Display', serif;
    font-size: 32px;
    color: #fff;
    line-height: 1;
  }

  /* Section */
  .section {
    background: #fff;
    border-radius: 16px;
    padding: 28px;
  }

  .section-label {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #bbb;
    font-weight: 500;
    margin-bottom: 20px;
  }

  /* Payment method selector */
  .method-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  @media (max-width: 480px) {
    .method-grid { grid-template-columns: 1fr; }
  }

  .method-btn {
    padding: 16px 12px;
    border-radius: 12px;
    border: 1.5px solid #e8e8e4;
    background: #f8f8f6;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    transition: border-color 0.18s, background 0.18s;
    font-family: 'DM Sans', sans-serif;
    color: #444;
    font-size: 13px;
    font-weight: 500;
  }

  .method-btn .method-icon {
    font-size: 22px;
    line-height: 1;
  }

  .method-btn.selected {
    border-color: #1a1a1a;
    background: #fff;
    color: #1a1a1a;
  }

  .method-btn:hover:not(.selected) {
    border-color: #ccc;
    background: #fff;
  }

  /* Input fields */
  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 14px;
  }

  .field:last-child { margin-bottom: 0; }

  .field label {
    font-size: 12px;
    color: #888;
    font-weight: 500;
    letter-spacing: 0.03em;
  }

  .field input, .field select {
    background: #f8f8f6;
    border: 1.5px solid transparent;
    border-radius: 10px;
    padding: 12px 14px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    color: #1a1a1a;
    transition: border-color 0.2s, background 0.2s;
    outline: none;
    width: 100%;
  }

  .field input:focus, .field select:focus {
    border-color: #1a1a1a;
    background: #fff;
  }

  .field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  /* Secure note */
  .secure-note {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #aaa;
    padding: 0 4px;
  }

  .secure-dot {
    width: 6px;
    height: 6px;
    background: #22c55e;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* CTA */
  .cta-btn {
    width: 100%;
    padding: 18px;
    border-radius: 14px;
    background: #1a1a1a;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    letter-spacing: 0.03em;
    transition: opacity 0.18s, transform 0.1s;
  }

  .cta-btn:hover { opacity: 0.88; }
  .cta-btn:active { transform: scale(0.985); }

  .cta-sub {
    text-align: center;
    font-size: 11px;
    color: #aaa;
    margin-top: 10px;
    letter-spacing: 0.04em;
  }

  /* UPI details */
  .upi-field { position: relative; }
  .upi-field input { padding-right: 60px; }
  .upi-suffix {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    color: #aaa;
    pointer-events: none;
  }
`;

const METHODS = [
  { id: "upi",        icon: "⚡", label: "UPI" },
  { id: "card",       icon: "💳", label: "Card" },
  { id: "netbanking", icon: "🏦", label: "Net Banking" },
];

export default function PaymentPage() {
  const params   = useSearchParams();
  const router   = useRouter();

  const place    = params.get("place")    || "Homestay";
const provider = params.get("provider") || "Provider";

const checkIn  = params.get("checkIn")  || params.get("date") || "";
const checkOut = params.get("checkOut") || "";

const total = params.get("total") || "0";

const type = params.get("type") || "stay";
const lat  = params.get("lat");
const lng  = params.get("lng");

const people = params.get("people") || "";
const date   = params.get("date") || "";
const time   = params.get("time") || "";
const notes  = params.get("notes") || "";
  const [method,  setMethod]  = useState("upi");
  const [upiId,   setUpiId]   = useState("");
  const [cardNum, setCardNum] = useState("");
  const [expiry,  setExpiry]  = useState("");
  const [cvv,     setCvv]     = useState("");
  const [name,    setName]    = useState("");
  const [bank,    setBank]    = useState("");

  const dateLabel = checkIn
    ? checkOut ? `${checkIn} → ${checkOut}` : checkIn
    : "—";

function payNow() {
  const query = new URLSearchParams({
    place: place || "",
    provider: provider || "",
    total: String(total || 0),
    type: type || "activity",

    lat: lat ? String(lat) : "",
    lng: lng ? String(lng) : "",

    people: String(people || 1),
    date: String(date || ""),
    time: String(time || ""),
    notes: String(notes || ""),

    checkIn: String(checkIn || ""),
    checkOut: String(checkOut || ""),
  });

  router.push(`/payment-success?${query.toString()}`);
}
  return (
    <div className="pay-root">
      <style>{styles}</style>
      <Navbar />

      <header className="pay-header">
        <p className="header-label">Secure Checkout</p>
        <h1 className="header-title">Complete your booking</h1>
      </header>

      <main className="pay-body">

        {/* Booking summary */}
        <div className="summary-strip">
          <div className="strip-meta">
            <span className="strip-place">{place}</span>
            <span className="strip-sub">{provider} · {dateLabel}</span>
          </div>
          <div className="strip-amount">
            <p className="strip-amount-label">Total</p>
            <p className="strip-amount-value">₹{total}</p>
          </div>
        </div>

        {/* Method selector */}
        <div className="section">
          <p className="section-label">Payment Method</p>
          <div className="method-grid">
            {METHODS.map(m => (
              <button
                key={m.id}
                className={`method-btn ${method === m.id ? "selected" : ""}`}
                onClick={() => setMethod(m.id)}
              >
                <span className="method-icon">{m.icon}</span>
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Method-specific inputs */}
        <div className="section">
          <p className="section-label">
            {method === "upi" && "UPI Details"}
            {method === "card" && "Card Details"}
            {method === "netbanking" && "Bank Details"}
          </p>

          {method === "upi" && (
            <div className="field">
              <label>UPI ID</label>
              <div className="upi-field" style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                  style={{ paddingRight: 0 }}
                />
              </div>
            </div>
          )}

          {method === "card" && (
            <>
              <div className="field">
                <label>Name on Card</label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="field">
                <label>Card Number</label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  value={cardNum}
                  onChange={e => {
                    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
                    setCardNum(raw.replace(/(.{4})/g, "$1 ").trim());
                  }}
                />
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Expiry</label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    maxLength={7}
                    value={expiry}
                    onChange={e => {
                      const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
                      setExpiry(raw.length > 2 ? raw.slice(0,2) + " / " + raw.slice(2) : raw);
                    }}
                  />
                </div>
                <div className="field">
                  <label>CVV</label>
                  <input
                    type="password"
                    placeholder="•••"
                    maxLength={4}
                    value={cvv}
                    onChange={e => setCvv(e.target.value.replace(/\D/g, "").slice(0,4))}
                  />
                </div>
              </div>
            </>
          )}

          {method === "netbanking" && (
            <div className="field">
              <label>Select Bank</label>
              <select value={bank} onChange={e => setBank(e.target.value)}>
                <option value="">Choose your bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="kotak">Kotak Mahindra</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}
        </div>

        {/* CTA */}
        <div>
          <button className="cta-btn" onClick={payNow}>
            Pay ₹{total} →
          </button>
          <p className="cta-sub">
            <span style={{ marginRight: 6 }}>🔒</span>
            256-bit encrypted · Your data is never stored
          </p>
        </div>

      </main>
    </div>
  );
}