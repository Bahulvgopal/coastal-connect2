"use client";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { useState, useMemo } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .booking-root {
    min-height: 100vh;
    background: #f5f4f0;
    font-family: 'DM Sans', sans-serif;
    color: #1a1a1a;
  }

  .booking-header {
    padding: 48px 24px 32px;
    max-width: 1100px;
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
    font-size: clamp(28px, 5vw, 48px);
    font-weight: 400;
    line-height: 1.1;
    color: #111;
  }

  .header-subtitle {
    font-size: 14px;
    color: #888;
    margin-top: 6px;
    font-weight: 400;
  }

  .booking-grid {
    max-width: 1100px;
    margin: 0 auto;
    padding: 40px 24px;
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 32px;
    align-items: start;
  }

  @media (max-width: 900px) {
    .booking-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Sections */
  .section {
    background: #fff;
    border-radius: 16px;
    padding: 28px;
    margin-bottom: 16px;
  }

  .section-label {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #bbb;
    font-weight: 500;
    margin-bottom: 20px;
  }

  .field-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 500px) {
    .field-grid { grid-template-columns: 1fr; }
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .field label {
    font-size: 12px;
    color: #888;
    font-weight: 500;
    letter-spacing: 0.03em;
  }

  .field input,
  .field select,
  .field textarea {
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

  .field input:focus,
  .field select:focus,
  .field textarea:focus {
    border-color: #1a1a1a;
    background: #fff;
  }

  .field textarea {
    resize: none;
    min-height: 80px;
  }

  /* Availability badge */
  .availability {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 500;
    padding: 6px 12px;
    border-radius: 20px;
    margin-top: 12px;
  }

  .availability.ok {
    background: #e8f5e9;
    color: #2e7d32;
  }

  .availability.no {
    background: #fce4ec;
    color: #c62828;
  }

  /* AC Toggle */
  .toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    background: #f8f8f6;
    border-radius: 10px;
    cursor: pointer;
    border: 1.5px solid transparent;
    transition: border-color 0.2s, background 0.2s;
    user-select: none;
    margin-bottom: 16px;
  }

  .toggle-row.active {
    border-color: #1a1a1a;
    background: #fff;
  }

  .toggle-info { flex: 1; }

  .toggle-name {
    font-size: 14px;
    font-weight: 500;
    color: #1a1a1a;
  }

  .toggle-desc {
    font-size: 12px;
    color: #aaa;
    margin-top: 2px;
  }

  .toggle-price {
    font-size: 13px;
    font-weight: 600;
    color: #1a1a1a;
    margin-left: 16px;
  }

  .toggle-pill {
    width: 36px;
    height: 20px;
    background: #ddd;
    border-radius: 10px;
    margin-left: 12px;
    position: relative;
    transition: background 0.2s;
    flex-shrink: 0;
  }

  .toggle-pill.on { background: #1a1a1a; }

  .toggle-pill::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    background: #fff;
    border-radius: 50%;
    top: 3px;
    left: 3px;
    transition: transform 0.2s;
  }

  .toggle-pill.on::after {
    transform: translateX(16px);
  }

  /* Summary Card */
  .summary-card {
    background: #1a1a1a;
    border-radius: 20px;
    padding: 32px 28px;
    position: sticky;
    top: 24px;
    color: #fff;
  }

  .summary-title {
    font-family: 'DM Serif Display', serif;
    font-size: 22px;
    font-weight: 400;
    margin-bottom: 28px;
    color: #fff;
  }

  .summary-rows {
    border-top: 1px solid #333;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #aaa;
  }

  .summary-row span:last-child {
    color: #fff;
    font-weight: 500;
  }

  .summary-total {
    border-top: 1px solid #333;
    padding-top: 20px;
    margin-bottom: 28px;
  }

  .total-label {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #666;
    margin-bottom: 4px;
  }

  .total-amount {
    font-family: 'DM Serif Display', serif;
    font-size: 40px;
    font-weight: 400;
    color: #fff;
    line-height: 1;
  }

  .total-tax {
    font-size: 11px;
    color: #666;
    margin-top: 4px;
  }

  .cta-btn {
    width: 100%;
    padding: 16px;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: opacity 0.2s, transform 0.1s;
    letter-spacing: 0.02em;
  }

  .cta-btn.active {
    background: #fff;
    color: #1a1a1a;
  }

  .cta-btn.active:hover { opacity: 0.9; }
  .cta-btn.active:active { transform: scale(0.98); }

  .cta-btn.disabled {
    background: #333;
    color: #666;
    cursor: not-allowed;
  }

  .cta-note {
    text-align: center;
    font-size: 11px;
    color: #555;
    margin-top: 12px;
    letter-spacing: 0.04em;
  }
`;

export default function BookingDetailsPage() {
  const params = useSearchParams();
  const router = useRouter();

  const place = params.get("place") || "Homestay Details";
  const provider = params.get("provider") || "Unknown Provider";
  const basePrice = Number(params.get("price")) || 0;

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [ac, setAc] = useState(true);
  const [meal, setMeal] = useState("breakfast");
  const [phone, setPhone] = useState("");
  const [request, setRequest] = useState("");

  const unavailableDates = ["2026-03-10", "2026-03-15"];
  const available = checkIn && !unavailableDates.includes(checkIn);

  const { nights, total, mealCost, acCost } = useMemo(() => {
    const acPrice = ac ? 500 : 0;
    const mPrice = { breakfast: 200, half: 400, full: 700, none: 0 }[meal] || 0;
    let stayNights = 1;
    if (checkIn && checkOut) {
      const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
      stayNights = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }
    return {
      acCost: acPrice,
      mealCost: mPrice,
      nights: stayNights,
      total: (basePrice + acPrice + mPrice) * rooms * stayNights,
    };
  }, [basePrice, ac, meal, rooms, checkIn, checkOut]);

  function proceedPayment() {
    if (!checkIn || !checkOut) return alert("Please select stay dates");
    if (!available) return alert("Selected dates are not available");
    if (!phone) return alert("Please provide a contact number");
    router.push(
      `/payment?place=${place}&provider=${provider}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&rooms=${rooms}&total=${total}`
    );
  }

  return (
    <div className="booking-root">
      <style>{styles}</style>
      <Navbar />

      {/* Header */}
      <header className="booking-header">
        <p className="header-label">Booking Details</p>
        <h1 className="header-title">{place}</h1>
        <p className="header-subtitle">{provider}</p>
      </header>

      {/* Main Grid */}
      <div className="booking-grid">
        {/* LEFT COLUMN */}
        <div>

          {/* Stay Dates */}
          <div className="section">
            <p className="section-label">Stay Dates</p>
            <div className="field-grid">
              <div className="field">
                <label>Check-in</label>
                <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
              </div>
              <div className="field">
                <label>Check-out</label>
                <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
              </div>
            </div>
            {checkIn && (
              <div className={`availability ${available ? "ok" : "no"}`}>
                {available ? "✓ Available" : "✕ Fully booked"}
              </div>
            )}
          </div>

          {/* Guests & Rooms */}
          <div className="section">
            <p className="section-label">Occupancy</p>
            <div className="field-grid">
              <div className="field">
                <label>Guests</label>
                <input
                  type="number" min="1" value={guests}
                  onChange={e => setGuests(Number(e.target.value))}
                />
              </div>
              <div className="field">
                <label>Rooms</label>
                <input
                  type="number" min="1" value={rooms}
                  onChange={e => setRooms(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="section">
            <p className="section-label">Preferences</p>

            <div
              className={`toggle-row ${ac ? "active" : ""}`}
              onClick={() => setAc(!ac)}
            >
              <div className="toggle-info">
                <div className="toggle-name">Air Conditioning</div>
                <div className="toggle-desc">Climate control for your room</div>
              </div>
              <span className="toggle-price">+₹500</span>
              <div className={`toggle-pill ${ac ? "on" : ""}`} />
            </div>

            <div className="field">
              <label>Meal Plan</label>
              <select value={meal} onChange={e => setMeal(e.target.value)}>
                <option value="none">No Meals</option>
                <option value="breakfast">Breakfast (+₹200)</option>
                <option value="half">Half Board (+₹400)</option>
                <option value="full">Full Board (+₹700)</option>
              </select>
            </div>
          </div>

          {/* Contact */}
          <div className="section">
            <p className="section-label">Contact</p>
            <div className="field" style={{ marginBottom: 16 }}>
              <label>Phone Number</label>
              <input
                type="tel" placeholder="+91 98765 43210"
                value={phone} onChange={e => setPhone(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Special Requests (optional)</label>
              <textarea
                placeholder="Any specific requirements..."
                value={request} onChange={e => setRequest(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — Summary */}
        <div>
          <div className="summary-card">
            <h2 className="summary-title">Price Summary</h2>

            <div className="summary-rows">
              <div className="summary-row">
                <span>{rooms} room × {nights} night{nights > 1 ? "s" : ""}</span>
                <span>₹{basePrice * rooms * nights}</span>
              </div>
              {ac && (
                <div className="summary-row">
                  <span>AC add-on</span>
                  <span>₹{acCost * rooms * nights}</span>
                </div>
              )}
              {meal !== "none" && (
                <div className="summary-row">
                  <span>Meal plan</span>
                  <span>₹{mealCost * rooms * nights}</span>
                </div>
              )}
            </div>

            <div className="summary-total">
              <p className="total-label">Total</p>
              <p className="total-amount">₹{total}</p>
              <p className="total-tax">Inclusive of all taxes</p>
            </div>

            <button
              className={`cta-btn ${available ? "active" : "disabled"}`}
              onClick={proceedPayment}
              disabled={!available}
            >
              {available ? "Reserve Now →" : "Dates Unavailable"}
            </button>
            <p className="cta-note">No payment required right now</p>
          </div>
        </div>
      </div>
    </div>
  );
}