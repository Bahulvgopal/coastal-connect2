"use client";

import { useState, useEffect, useRef } from "react";
import { 
  MessageCircle, X, Send, Sparkles, 
  Languages, Utensils, MapPin, 
  Compass, ChevronRight 
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
    { label: "Local Phrases", icon: <Languages size={14} />, query: "How to say hello?" },
    { label: "Cuisine Guide", icon: <Utensils size={14} />, query: "What food should I try?" },
    { label: "Coastal Map", icon: <MapPin size={14} />, query: "Suggest some beaches" },
  ];

  function getBotResponse(userText: string) {
    const text = userText.toLowerCase();
    if (text.includes("hello") || text.includes("namaskaram")) return "Malayalam: നമസ്കാരം (Namaskaram). It literally means 'I bow to you'. 🙏";
    if (text.includes("food")) return "Kochi's soul is in its seafood. I recommend 'Karimeen Pollichathu' (Pearl Spot fish) wrapped in banana leaves.";
    if (text.includes("beach")) return "For cliffs and sunsets, Varkala. For absolute solitude, head to the northern shores of Kannur.";
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
      setMessages((prev) => [...prev, { role: "bot", text: getBotResponse(msgText) }]);
    }, 1200);
  };

  return (
    <>
      {/* Floating Toggle: Minimalist Edition */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-2xl transition-all duration-500 z-[100] flex items-center justify-center border border-white/20 ${
          open 
            ? "bg-slate-900 rotate-90 text-white" 
            : "bg-blue-600 hover:bg-blue-700 text-white hover:-translate-y-1"
        }`}
      >
        {open ? <X size={28} /> : <MessageCircle size={28} fill="currentColor" fillOpacity={0.2} />}
      </button>

      {/* Chat Interface */}
      {open && (
        <div className="fixed inset-0 md:inset-auto md:bottom-28 md:right-8 md:w-[420px] md:h-[620px] bg-white md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden z-[90] animate-in slide-in-from-bottom-8 duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
          
          {/* Header: Editorial Style */}
          <div className="p-8 pb-6 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <Compass size={24} className="animate-spin-slow" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900 leading-none">Coastal AI</h3>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Knowledge Base Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Canvas */}
          <div 
            ref={scrollRef}
            className="flex-1 p-8 overflow-y-auto bg-white space-y-8 custom-scrollbar"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`max-w-[90%] ${
                    m.role === "user"
                      ? "bg-slate-900 text-white p-4 px-6 rounded-[2rem] rounded-tr-none shadow-lg shadow-slate-200"
                      : "text-slate-700 text-lg font-light leading-relaxed"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" />
                </div>
              </div>
            )}
          </div>

          {/* Interaction Zone */}
          <div className="p-6 pt-2 bg-white">
            {/* Quick Suggestions */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(action.query)}
                  className="flex-shrink-0 flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                >
                  {action.icon} {action.label}
                </button>
              ))}
            </div>

            {/* Main Input */}
            <div className="relative group">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Message your guide..."
                className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all pr-14 text-slate-900"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="absolute right-2 top-2 bottom-2 aspect-square bg-slate-900 text-white rounded-xl flex items-center justify-center disabled:opacity-20 transition-all hover:bg-blue-600"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-4 uppercase tracking-[0.2em]">
              Powered by Regional Intelligence
            </p>
          </div>
        </div>
      )}

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}