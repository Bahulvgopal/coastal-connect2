"use client";

import Navbar from "../components/Navbar";
import { providers } from "../data/providers";
import { ArrowUpRight, Wallet, Percent, ShieldCheck } from "lucide-react";

export default function ProvidersPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        {/* Header Section */}
        <header className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-blue-600" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-600">
              Accountability Dashboard
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6">
            Provider Earnings Transparency<span className="text-blue-600">.</span>
          </h1>
          <p className="text-slate-500 max-w-2xl leading-relaxed">
            We believe in fair trade. This dashboard provides a live breakdown of how payments are distributed between our local partners and the platform.
          </p>
        </header>

        {/* Section: Homestays */}
        <div className="space-y-12">
          <section>
            <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-medium tracking-tight">Homestays</h2>
              <span className="text-xs font-mono text-slate-400">{providers.homestays.length} Partners</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {providers.homestays.map((p) => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>
          </section>

          {/* Section: Activities */}
          <section>
            <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-medium tracking-tight">Activities</h2>
              <span className="text-xs font-mono text-slate-400">{providers.activities.length} Partners</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {providers.activities.map((p) => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function ProviderCard({ provider }: { provider: any }) {
  const platformFee = provider.price - provider.earnings;
  const providerPercent = Math.round((provider.earnings / provider.price) * 100);

  return (
    <div className="bg-white border border-slate-100 p-8 rounded-3xl hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-xl font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
            {provider.name}
          </h3>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Verified Partner
          </span>
        </div>
        <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
          <Wallet size={20} className="text-slate-400 group-hover:text-blue-600" />
        </div>
      </div>

      {/* Financial Breakdown Table */}
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-end">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-tighter">Total Booking</span>
          <span className="text-xl font-light">₹{provider.price.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-end">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-tighter text-blue-600">Provider Share</span>
          </div>
          <span className="text-xl font-semibold text-blue-600">₹{provider.earnings.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-end">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-tighter">Platform Fee</span>
          <span className="text-sm font-medium text-slate-500">₹{platformFee.toLocaleString()}</span>
        </div>
      </div>

      {/* Visual Bar Split */}
      <div className="relative pt-6 border-t border-slate-50">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
          <span className="text-blue-600">{providerPercent}% To Partner</span>
          <span className="text-slate-300">{100 - providerPercent}% Fee</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-1000" 
            style={{ width: `${providerPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}