"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Sparkles, Settings2, Edit3, CheckCircle,
  ChevronLeft, Utensils, Compass, Save, Calendar, Wallet,
} from "lucide-react";

export default function Planner() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [plan, setPlan] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    days: 2,
    district: "Alappuzha",
    budget: "Medium",
    interests: "Nature",
    food: "Seafood",
  });

  async function generatePlan() {
    try {
      setLoading(true);
      const res = await fetch("/api/planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setPlan(data.plan);
      setShowForm(false);
    } catch {
      alert("Error generating plan");
    } finally {
      setLoading(false);
    }
  }

  async function saveToFirebase() {
    if (!user) {
      alert("Please login to save your trip!");
      return router.push("/login");
    }
    try {
      setSaveLoading(true);
      await addDoc(collection(db, "trips"), {
        userId: user.uid,
        title: `${form.days} Days in ${form.district}`,
        content: plan,
        date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
        createdAt: new Date().toISOString(),
        district: form.district,
      });
      router.push("/dashboard");
    } catch {
      alert("Failed to save trip");
    } finally {
      setSaveLoading(false);
    }
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .planner-root {
          min-height: 100vh;
          background: #f0f7ff;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #0c2340;
        }

        .planner-main {
          max-width: 760px;
          margin: 0 auto;
          padding: 2.5rem 1.25rem 4rem;
        }

        /* Header */
        .planner-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .planner-eyebrow {
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

        .planner-title {
          font-size: clamp(1.6rem, 4vw, 2.25rem);
          font-weight: 300;
          letter-spacing: -0.04em;
          color: #0c2340;
        }

        .planner-title em { font-style: normal; color: #0ea5e9; }

        .planner-sub {
          font-size: 0.8125rem;
          color: #94a3b8;
          margin-top: 3px;
        }

        .back-btn {
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
          transition: all 0.18s ease;
          text-decoration: none;
          white-space: nowrap;
          align-self: flex-start;
          margin-top: 6px;
        }

        .back-btn:hover { background: #bae6fd; border-color: #7dd3fc; }

        /* Form card */
        .form-card {
          background: #fff;
          border: 1px solid #daeeff;
          border-radius: 20px;
          overflow: hidden;
        }

        .form-body {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        @media (min-width: 560px) {
          .form-grid { grid-template-columns: repeat(2, 1fr); }
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #475569;
        }

        .field-label-icon {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          background: #e0f2fe;
          color: #0369a1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .field-input,
        .field-select,
        .field-textarea {
          width: 100%;
          border: 1px solid #daeeff;
          background: #f8fbff;
          padding: 10px 14px;
          border-radius: 11px;
          font-size: 0.875rem;
          color: #0c2340;
          font-family: inherit;
          outline: none;
          transition: all 0.18s ease;
          appearance: none;
          -webkit-appearance: none;
        }

        .field-input:focus,
        .field-select:focus,
        .field-textarea:focus {
          border-color: #7dd3fc;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(14,165,233,0.1);
        }

        .field-textarea {
          height: 96px;
          resize: vertical;
          line-height: 1.6;
        }

        .generate-btn {
          width: 100%;
          padding: 14px;
          border-radius: 13px;
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
          box-shadow: 0 4px 16px rgba(14,165,233,0.25);
        }

        .generate-btn:hover:not(:disabled) {
          background: #0284c7;
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(14,165,233,0.35);
        }

        .generate-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* Result card */
        .result-card {
          background: #fff;
          border: 1px solid #daeeff;
          border-radius: 20px;
          overflow: hidden;
          animation: fadeUp 0.3s ease forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .result-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.875rem 1.25rem;
          background: #f0f9ff;
          border-bottom: 1px solid #daeeff;
          gap: 12px;
        }

        .result-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #0369a1;
        }

        .result-trip-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: #0c2340;
          background: #e0f2fe;
          border: 1px solid #bae6fd;
          padding: 3px 10px;
          border-radius: 999px;
        }

        .edit-toggle {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #0369a1;
          background: #e0f2fe;
          border: 1px solid #bae6fd;
          padding: 5px 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .edit-toggle:hover { background: #bae6fd; }

        .result-body {
          padding: 1.75rem;
        }

        .plan-text {
          font-size: 0.9rem;
          line-height: 1.8;
          color: #475569;
          white-space: pre-wrap;
        }

        .plan-edit-area {
          width: 100%;
          height: 360px;
          padding: 1rem;
          border: 1px solid #daeeff;
          border-radius: 12px;
          background: #f8fbff;
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 0.8125rem;
          color: #0c2340;
          line-height: 1.7;
          resize: vertical;
          outline: none;
          transition: all 0.18s ease;
        }

        .plan-edit-area:focus {
          border-color: #7dd3fc;
          box-shadow: 0 0 0 3px rgba(14,165,233,0.1);
        }

        /* Action buttons */
        .action-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 1rem;
        }

        @media (min-width: 480px) { .action-row { flex-direction: row; } }

        .action-btn {
          flex: 1;
          padding: 13px;
          border-radius: 13px;
          font-family: inherit;
          font-size: 0.875rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          transition: all 0.18s ease;
          border: none;
        }

        .btn-ghost {
          background: #fff;
          border: 1px solid #daeeff;
          color: #475569;
        }

        .btn-ghost:hover {
          background: #f0f9ff;
          border-color: #bae6fd;
          color: #0369a1;
        }

        .btn-primary {
          background: #0ea5e9;
          color: #fff;
          box-shadow: 0 4px 14px rgba(14,165,233,0.25);
        }

        .btn-primary:hover:not(:disabled) {
          background: #0284c7;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(14,165,233,0.35);
        }

        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Divider in form */
        .form-divider {
          height: 1px;
          background: #eef6ff;
        }
      `}</style>

      <div className="planner-root">
        <Navbar />

        <div className="planner-main">

          {/* Header */}
          <div className="planner-header">
            <div>
              <div className="planner-eyebrow">
                <Sparkles size={11} /> AI-Powered
              </div>
              <h1 className="planner-title">Trip Planner<em>.</em></h1>
              <p className="planner-sub">Personalised coastal itineraries, generated for you.</p>
            </div>
            {!showForm && (
              <button className="back-btn" onClick={() => setShowForm(true)}>
                <ChevronLeft size={14} /> Preferences
              </button>
            )}
          </div>

          {/* Form view */}
          {showForm ? (
            <div className="form-card">
              <div className="form-body">

                <div className="form-grid">
                  <div className="field">
                    <label className="field-label">
                      <span className="field-label-icon"><Compass size={12} /></span>
                      Destination
                    </label>
                    <select
                      className="field-select"
                      value={form.district}
                      onChange={(e) => setForm({ ...form, district: e.target.value })}
                    >
                      <option>Alappuzha</option>
                      <option>Ernakulam</option>
                      <option>Thiruvananthapuram</option>
                      <option>Kozhikode</option>
                      <option>Wayanad</option>
                    </select>
                  </div>

                  <div className="field">
                    <label className="field-label">
                      <span className="field-label-icon"><Calendar size={12} /></span>
                      Duration (days)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      className="field-input"
                      value={form.days}
                      onChange={(e) => setForm({ ...form, days: Number(e.target.value) })}
                    />
                  </div>

                  <div className="field">
                    <label className="field-label">
                      <span className="field-label-icon"><Wallet size={12} /></span>
                      Budget
                    </label>
                    <select
                      className="field-select"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>Luxury</option>
                    </select>
                  </div>

                  <div className="field">
                    <label className="field-label">
                      <span className="field-label-icon"><Utensils size={12} /></span>
                      Food preference
                    </label>
                    <input
                      type="text"
                      className="field-input"
                      value={form.food}
                      placeholder="e.g. Seafood, Veg, Traditional"
                      onChange={(e) => setForm({ ...form, food: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-divider" />

                <div className="field">
                  <label className="field-label">
                    <span className="field-label-icon"><Sparkles size={12} /></span>
                    Interests & hobbies
                  </label>
                  <textarea
                    className="field-textarea"
                    value={form.interests}
                    placeholder="e.g. Surfing, photography, quiet temples, trekking..."
                    onChange={(e) => setForm({ ...form, interests: e.target.value })}
                  />
                </div>

                <button
                  className="generate-btn"
                  onClick={generatePlan}
                  disabled={loading}
                >
                  {loading ? (
                    <><div className="spinner" /> Crafting your itinerary…</>
                  ) : (
                    <><Sparkles size={17} /> Generate My Itinerary</>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Result view */
            <div>
              <div className="result-card">
                <div className="result-topbar">
                  <div className="result-status">
                    <CheckCircle size={14} color="#0ea5e9" />
                    Plan ready
                  </div>
                  <span className="result-trip-label">
                    {form.days} days · {form.district}
                  </span>
                  <button className="edit-toggle" onClick={() => setEditing(!editing)}>
                    <Edit3 size={13} />
                    {editing ? "Done" : "Edit"}
                  </button>
                </div>

                <div className="result-body">
                  {editing ? (
                    <textarea
                      className="plan-edit-area"
                      value={plan}
                      onChange={(e) => setPlan(e.target.value)}
                    />
                  ) : (
                    <div className="plan-text">{plan}</div>
                  )}
                </div>
              </div>

              <div className="action-row">
                <button className="action-btn btn-ghost" onClick={() => setShowForm(true)}>
                  <Settings2 size={16} /> Change Preferences
                </button>
                <button
                  className="action-btn btn-primary"
                  onClick={saveToFirebase}
                  disabled={saveLoading}
                >
                  {saveLoading
                    ? <><div className="spinner" style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "#fff" }} /> Saving…</>
                    : <><Save size={16} /> Save to Dashboard</>
                  }
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}