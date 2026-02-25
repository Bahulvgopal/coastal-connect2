"use client";

import { useState, useEffect, useRef } from "react";
import {
  MessageCircle, X, Send,
  Languages, Utensils, MapPin,
  Compass, ChevronRight,
} from "lucide-react";

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Welcome to the coast. I can help with local translations, culinary secrets, or finding the perfect hidden beach. Where shall we start?",
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, isTyping]);

  const quickActions = [
    { label: "Local Phrases", icon: <Languages size={13} />, query: "How to say hello?" },
    { label: "Cuisine Guide", icon: <Utensils size={13} />, query: "What food should I try?" },
    { label: "Coastal Map", icon: <MapPin size={13} />, query: "Suggest some beaches" },
  ];

  function getBotResponse(userText: string) {
    const text = userText.toLowerCase();
    if (text.includes("hello") || text.includes("namaskaram"))
      return "Malayalam: നമസ്കാരം (Namaskaram). It literally means 'I bow to you'. 🙏";
    if (text.includes("food"))
      return "Kochi's soul is in its seafood. I recommend 'Karimeen Pollichathu' (Pearl Spot fish) wrapped in banana leaves.";
    if (text.includes("beach"))
      return "For cliffs and sunsets, Varkala. For absolute solitude, head to the northern shores of Kannur.";
    return "That's an interesting path. Would you like me to find specific locations or local experts for that?";
  }

  const handleSend = (textOverride?: string) => {
    const msgText = textOverride || input;
    if (!msgText.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: msgText }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: getBotResponse(msgText) },
      ]);
    }, 1200);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600;700;900&display=swap');

        /* ── FAB ── */
        .ai-fab {
          position: fixed;
          bottom: 2rem; right: 2rem;
          width: 60px; height: 60px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          z-index: 100;
          transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
          box-shadow: 0 8px 28px rgba(59,130,246,0.35);
          
        }
        .ai-fab-open {
          background: #1e293b;
          transform: rotate(90deg) scale(1.05);
          box-shadow: 0 8px 28px rgba(15,23,42,0.3);
        }
        .ai-fab-closed {
          background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%);
        }
        .ai-fab-closed:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 14px 36px rgba(59,130,246,0.45);
        }

        /* Ripple ring on FAB when closed */
        .ai-fab-ring {
          position: fixed;
          bottom: 2rem; right: 2rem;
          width: 60px; height: 60px;
          border-radius: 50%;
          border: 2px solid rgba(59,130,246,0.35);
          z-index: 99;
          animation: fabRing 2.5s ease-out infinite;
          pointer-events: none;
        }
        @keyframes fabRing {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.9); opacity: 0; }
        }

        /* ── Chat panel ── */
        .ai-panel {
          position: fixed;
          z-index: 90;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #ffffff;
          

          /* Mobile: full screen */
          inset: 0;
          border-radius: 0;
          animation: panelUpMobile 0.4s cubic-bezier(0.34,1.2,0.64,1) both;
        }
        @keyframes panelUpMobile {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Desktop: floating card bottom-right */
        @media (min-width: 768px) {
          .ai-panel {
            inset: auto;
            bottom: 5.5rem; right: 2rem;
            width: 400px; height: 500px;
            border-radius: 2rem;
            box-shadow:
              0 2px 8px rgba(15,23,42,0.06),
              0 20px 60px rgba(59,130,246,0.12),
              0 0 0 1.5px rgba(219,234,254,1);
            animation: panelUp 0.4s cubic-bezier(0.34,1.2,0.64,1) both;
          }
          @keyframes panelUp {
            from { opacity: 0; transform: translateY(24px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
        }

        /* ── Header ── */
        .ai-header {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 1.5rem 1.1rem;
          border-bottom: 1px solid #f1f5f9;
          background: white;
        }
        .ai-header-left { display: flex; align-items: center; gap: 0.85rem; }
        .ai-avatar {
          width: 44px; height: 44px;
          border-radius: 1rem;
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          border: 1.5px solid #bfdbfe;
          display: flex; align-items: center; justify-content: center;
          color: #2563eb;
          flex-shrink: 0;
        }
        .ai-compass { animation: spinSlow 8s linear infinite; }
        @keyframes spinSlow { to { transform: rotate(360deg); } }

        .ai-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1;
          margin-bottom: 0.3rem;
        }
        .ai-status {
          display: flex; align-items: center; gap: 0.35rem;
          font-size: 0.6rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #94a3b8;
        }
        .ai-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          animation: blink 2s infinite;
        }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.25; } }

        .ai-close {
          width: 34px; height: 34px;
          border-radius: 50%;
          background: #f1f5f9;
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #64748b;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .ai-close:hover { background: #fee2e2; color: #ef4444; }

        /* ── Messages ── */
        .ai-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1.25rem 1.25rem 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          scroll-behavior: smooth;
        }
        .ai-messages::-webkit-scrollbar { width: 3px; }
        .ai-messages::-webkit-scrollbar-track { background: transparent; }
        .ai-messages::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 99px; }

        .ai-msg {
          display: flex;
          animation: msgIn 0.3s ease both;
        }
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ai-msg-user { justify-content: flex-end; }
        .ai-msg-bot  { justify-content: flex-start; }

        .ai-bubble-user {
          max-width: 82%;
          background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%);
          color: white;
          padding: 0.75rem 1.1rem;
          border-radius: 1.25rem;
          border-top-right-radius: 0.25rem;
          font-size: 0.85rem;
          font-weight: 500;
          line-height: 1.55;
          box-shadow: 0 4px 16px rgba(59,130,246,0.25);
        }
        .ai-bubble-bot {
          max-width: 88%;
          background: #f8fafc;
          border: 1.5px solid #f1f5f9;
          color: #334155;
          padding: 0.75rem 1.1rem;
          border-radius: 1.25rem;
          border-top-left-radius: 0.25rem;
          font-size: 0.85rem;
          font-weight: 400;
          line-height: 1.65;
        }

        /* Typing dots */
        .ai-typing {
          display: flex;
          gap: 5px;
          padding: 0.75rem 1rem;
          background: #f8fafc;
          border: 1.5px solid #f1f5f9;
          border-radius: 1.25rem;
          border-top-left-radius: 0.25rem;
          width: fit-content;
        }
        .ai-typing span {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #93c5fd;
          animation: bounce 1.2s infinite;
        }
        .ai-typing span:nth-child(2) { animation-delay: 0.15s; }
        .ai-typing span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes bounce {
          0%,60%,100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }

        /* ── Bottom zone ── */
        .ai-bottom {
          flex-shrink: 0;
          padding: 0.9rem 1.25rem 1.25rem;
          background: white;
          border-top: 1px solid #f1f5f9;
        }

        /* Quick action chips */
        .ai-chips {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.75rem;
          scrollbar-width: none;
        }
        .ai-chips::-webkit-scrollbar { display: none; }
        .ai-chip {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 0.4rem;
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          padding: 0.4rem 0.85rem;
          border-radius: 2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
          white-space: nowrap;
        }
        .ai-chip:hover {
          background: #eff6ff;
          border-color: #93c5fd;
          color: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59,130,246,0.15);
        }

        /* Input row */
        .ai-input-row {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 1.25rem;
          padding: 0.45rem 0.45rem 0.45rem 1.1rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .ai-input-row:focus-within {
          border-color: #3b82f6;
          background: white;
          box-shadow: 0 0 0 4px rgba(59,130,246,0.09);
        }
        .ai-input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: #0f172a;
        }
        .ai-input::placeholder { color: #94a3b8; }
        .ai-send {
          width: 36px; height: 36px;
          border-radius: 0.85rem;
          background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%);
          border: none;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: white;
          flex-shrink: 0;
          transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
          box-shadow: 0 4px 12px rgba(59,130,246,0.3);
        }
        .ai-send:hover:not(:disabled) { transform: scale(1.1); box-shadow: 0 6px 18px rgba(59,130,246,0.4); }
        .ai-send:disabled { background: #e2e8f0; box-shadow: none; cursor: not-allowed; }

        .ai-footer {
          text-align: center;
          font-size: 0.58rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #cbd5e1;
          margin-top: 0.7rem;
        }
      `}</style>

      {/* Ripple ring (only when closed) */}
      {!open && <div className="ai-fab-ring" />}

      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        className={`ai-fab ${open ? "ai-fab-open" : "ai-fab-closed"}`}
        aria-label={open ? "Close chat" : "Open AI assistant"}
      >
        {open
          ? <X size={24} color="white" />
          : <MessageCircle size={24} color="white" fill="rgba(255,255,255,0.25)" />
        }
      </button>

      {/* Chat panel */}
      {open && (
        <div className="ai-panel">

          {/* Header */}
          <div className="ai-header ">
            <div className="ai-header-left">
              <div className="ai-avatar">
                <Compass size={22} className="ai-compass" />
              </div>
              <div>
                <div className="ai-name">Coastal AI</div>
                <div className="ai-status">
                  <span className="ai-dot" />
                  Knowledge Base Active
                </div>
              </div>
            </div>
           
          </div>

          {/* Messages */}
          <div className="ai-messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`ai-msg ${m.role === "user" ? "ai-msg-user" : "ai-msg-bot"}`}>
                <div className={m.role === "user" ? "ai-bubble-user" : "ai-bubble-bot"}>
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-msg ai-msg-bot">
                <div className="ai-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
          </div>

          {/* Bottom */}
          <div className="ai-bottom">
            {/* Chips */}
            <div className="ai-chips">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  className="ai-chip"
                  onClick={() => handleSend(action.query)}
                >
                  {action.icon} {action.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="ai-input-row">
              <input
                className="ai-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Message your guide..."
              />
              <button
                className="ai-send"
                onClick={() => handleSend()}
                disabled={!input.trim()}
                aria-label="Send"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <p className="ai-footer">Powered by Regional Intelligence</p>
          </div>

        </div>
      )}
    </>
  );
}
