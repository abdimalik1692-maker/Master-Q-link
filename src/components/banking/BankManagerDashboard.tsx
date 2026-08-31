import React, { useState } from 'react';
import { useQLINK } from '../../context/QLINKContext';
import {
  Landmark,
  Users,
  Clock,
  PhoneForwarded,
  CheckCircle2,
  Volume2,
  Layers,
  ArrowRight,
  Sparkles,
  Ticket,
} from 'lucide-react';

export const BankManagerDashboard: React.FC = () => {
  const {
    bankBranches,
    bankTickets,
    callNextBankTicket,
    completeBankTicket,
  } = useQLINK();

  const [selectedBranchId, setSelectedBranchId] = useState<string>(bankBranches[0]?.id || 'branch-kcb-1');
  const [activeCounterNumber, setActiveCounterNumber] = useState<number>(1);
  const [calledAlert, setCalledAlert] = useState<string | null>(null);

  const currentBranch = bankBranches.find((b) => b.id === selectedBranchId) || bankBranches[0];

  const waitingTickets = bankTickets.filter((t) => t.status === 'Waiting');
  const servingTickets = bankTickets.filter((t) => t.status === 'Serving');

  const handleCallNext = () => {
    const called = callNextBankTicket(currentBranch.id, activeCounterNumber);
    if (called) {
      setCalledAlert(`Ticket ${called.ticketNumber} called to Counter ${activeCounterNumber}`);
      setTimeout(() => setCalledAlert(null), 3000);
    }
  };

  const handleComplete = (ticketId: string) => {
    completeBankTicket(ticketId);
  };

  const counters = [
    { num: 1, name: 'Counter 1 (General Cash & Deposit)', staff: 'Amina Noor', status: 'Active' },
    { num: 2, name: 'Counter 2 (Customer Service)', staff: 'Kevin Otieno', status: 'Active' },
    { num: 3, name: 'Counter 3 (Forex & High Value)', staff: 'Fatuma Hassan', status: 'Active' },
    { num: 4, name: 'Counter 4 (Credit & Loan Desk)', staff: 'John Wachira', status: 'Active' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Branch Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-b from-[#1C1C1C] via-[#141414] to-[#0D0D0D] border border-[#2A2A2A] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest">
            BRANCH OPERATIONS & COUNTER DISPATCH
          </span>
          <h1 className="text-2xl font-extrabold text-white font-display mt-0.5">
            {currentBranch.name}
          </h1>
          <p className="text-xs text-[#888888]">{currentBranch.address}</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedBranchId}
            onChange={(e) => setSelectedBranchId(e.target.value)}
            className="px-4 py-2 bg-[#0A0A0A] border border-[#333333] rounded-xl text-xs font-bold text-white focus:outline-none"
          >
            {bankBranches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {calledAlert && (
        <div className="p-4 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37] text-white flex items-center gap-3 shadow-[0_0_20px_rgba(212,175,55,0.3)] animate-bounce">
          <Volume2 className="w-6 h-6 text-[#F5D76E]" />
          <span className="text-sm font-bold text-[#F5D76E]">{calledAlert}</span>
        </div>
      )}

      {/* Main Counter Dispatch Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Active Counter Station (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Calling Pad */}
          <div className="p-6 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">Counter Station Control</h2>
              <span className="text-xs text-[#D4AF37] font-semibold">Active Counter: #{activeCounterNumber}</span>
            </div>

            {/* Counter Station Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {counters.map((c) => (
                <button
                  key={c.num}
                  onClick={() => setActiveCounterNumber(c.num)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    activeCounterNumber === c.num
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                      : 'bg-[#0A0A0A] text-[#CCCCCC] border-[#222222] hover:border-[#333333]'
                  }`}
                >
                  <span className={`text-xs font-black block ${activeCounterNumber === c.num ? 'text-black' : 'text-white'}`}>
                    Counter {c.num}
                  </span>
                  <span className={`text-[10px] block truncate ${activeCounterNumber === c.num ? 'text-black/80' : 'text-[#777777]'}`}>
                    {c.staff}
                  </span>
                </button>
              ))}
            </div>

            {/* Giant Call Button */}
            <div className="pt-2">
              <button
                onClick={handleCallNext}
                disabled={waitingTickets.length === 0}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#F5D76E] via-[#D4AF37] to-[#B8860B] text-black font-black text-base uppercase tracking-widest shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
              >
                <Volume2 className="w-6 h-6" />
                <span>CALL NEXT CITIZEN TICKET (COUNTER {activeCounterNumber})</span>
              </button>
            </div>
          </div>

          {/* Currently Serving Tickets Table */}
          <div className="p-6 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider">
              Currently Serving at Counters ({servingTickets.length})
            </h3>

            {servingTickets.length === 0 ? (
              <p className="text-xs text-[#666666] py-4 text-center">No customers currently at counter.</p>
            ) : (
              <div className="space-y-2">
                {servingTickets.map((tkt) => (
                  <div key={tkt.id} className="p-3.5 rounded-2xl bg-[#0A0A0A] border border-[#222222] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-white">{tkt.ticketNumber}</span>
                        <span className="text-xs text-[#D4AF37] font-bold">Counter {tkt.counterNumber || 1}</span>
                      </div>
                      <span className="text-xs text-[#888888]">{tkt.serviceName} • {tkt.userName}</span>
                    </div>

                    <button
                      onClick={() => handleComplete(tkt.id)}
                      className="px-4 py-2 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-black font-extrabold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Complete & Clear</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Live Waiting Queue List (1 Col) */}
        <div className="p-6 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider">
              Waiting Queue ({waitingTickets.length})
            </h3>
            <span className="text-xs font-mono font-bold text-[#F5D76E]">~{currentBranch.avgWaitMinutes}m avg</span>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {waitingTickets.length === 0 ? (
              <p className="text-xs text-[#666666] py-6 text-center">Queue is empty. Ready for next walk-in.</p>
            ) : (
              waitingTickets.map((tkt, idx) => (
                <div key={tkt.id} className="p-3 rounded-2xl bg-[#0A0A0A] border border-[#202020] flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white text-sm">{tkt.ticketNumber}</span>
                      <span className="text-[10px] text-[#777777]">#{idx + 1} in line</span>
                    </div>
                    <span className="text-[11px] text-[#888888] block mt-0.5">{tkt.serviceName}</span>
                  </div>
                  <span className="text-[10px] text-[#F5D76E] font-semibold">{tkt.timeIssued}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
