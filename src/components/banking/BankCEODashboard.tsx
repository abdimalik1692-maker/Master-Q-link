import React, { useState } from 'react';
import { useQLINK } from '../../context/QLINKContext';
import {
  Landmark,
  Users,
  Clock,
  Activity,
  TrendingUp,
  CheckCircle2,
  MapPin,
  Star,
  Sparkles,
} from 'lucide-react';

export const BankCEODashboard: React.FC = () => {
  const { banks, bankBranches, bankTickets } = useQLINK();

  const [selectedBankId, setSelectedBankId] = useState<string>(banks[0]?.id || 'bank-1');

  const currentBank = banks.find((b) => b.id === selectedBankId) || banks[0];
  const branchesForBank = bankBranches.filter((b) => b.bankId === currentBank.id);

  // Aggregated metrics
  const totalWaiting = branchesForBank.reduce((acc, b) => acc + b.currentQueueCount, 0);
  const avgWaitTime = branchesForBank.length > 0 ? Math.round(branchesForBank.reduce((acc, b) => acc + b.avgWaitMinutes, 0) / branchesForBank.length) : 8;

  return (
    <div className="space-y-6 pb-12">
      {/* Executive Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-b from-[#1C1C1C] via-[#141414] to-[#0D0D0D] border border-[#2A2A2A] shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img src={currentBank.logo} alt={currentBank.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-[#D4AF37]" />
            <div>
              <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest">
                BANKING GROUP EXECUTIVE OVERVIEW
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-0.5">
                {currentBank.name} Command Center
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedBankId}
              onChange={(e) => setSelectedBankId(e.target.value)}
              className="px-4 py-2 bg-[#0A0A0A] border border-[#333333] rounded-xl text-xs font-bold text-white focus:outline-none"
            >
              {banks.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Executive KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#242424]">
          <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#202020]">
            <span className="text-[10px] text-[#888888] uppercase block font-semibold">Active Branches</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-white">{branchesForBank.length}</span>
              <span className="text-xs text-[#22C55E]">100% Online</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#202020]">
            <span className="text-[10px] text-[#888888] uppercase block font-semibold">Live Queue Volume</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-[#F5D76E]">{totalWaiting}</span>
              <span className="text-xs text-[#888888]">customers</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#202020]">
            <span className="text-[10px] text-[#888888] uppercase block font-semibold">Avg Counter Service Time</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-white">{avgWaitTime}</span>
              <span className="text-xs text-[#888888]">minutes</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#202020]">
            <span className="text-[10px] text-[#888888] uppercase block font-semibold">Customer CSAT</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-[#22C55E]">4.92</span>
              <span className="text-xs text-[#D4AF37]">★ / 5.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Branch Performance Comparison */}
      <div className="p-6 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Branch Traffic & Counter Optimization</h2>
            <p className="text-xs text-[#888888]">Live queue counters, teller throughput, and operational status</p>
          </div>
          <span className="text-xs text-[#D4AF37] font-semibold">Real-time Counter Sync</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {branchesForBank.map((branch) => (
            <div key={branch.id} className="p-5 rounded-2xl bg-[#0A0A0A] border border-[#222222] space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-white">{branch.name}</h4>
                  <p className="text-xs text-[#777777] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#D4AF37]" /> {branch.address}
                  </p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#22C55E]/15 text-[#22C55E]">
                  ● Open
                </span>
              </div>

              {/* Service Counters breakdown */}
              <div className="space-y-1.5 pt-2 border-t border-[#1C1C1C]">
                {branch.services.map((srv) => (
                  <div key={srv.id} className="flex items-center justify-between text-xs py-1">
                    <span className="text-[#CCCCCC]">{srv.name}</span>
                    <span className="font-mono text-[#F5D76E] font-bold">{srv.waitingCount} waiting</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#1C1C1C] flex items-center justify-between text-xs">
                <span className="text-[#888888]">Avg Wait: <strong className="text-white">{branch.avgWaitMinutes}m</strong></span>
                <span className="text-[#22C55E] font-semibold">{branch.currentQueueCount} Active Tickets</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
