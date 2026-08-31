import React, { useState } from 'react';
import { useQLINK } from '../../context/QLINKContext';
import { BankOrganization, BankBranch, BankQueueTicket } from '../../types/qlink';
import {
  Landmark,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  Layers,
  Calendar,
  ArrowRight,
  ArrowLeft,
  XCircle,
  Phone,
  Sparkles,
  Ticket,
} from 'lucide-react';

export const CustomerBanking: React.FC = () => {
  const {
    banks,
    bankBranches,
    bankTickets,
    selectedBank,
    setSelectedBank,
    selectedBankBranch,
    setSelectedBankBranch,
    joinBankQueue,
    leaveBankQueue,
    bookBankAppointment,
    setCustomerTab,
  } = useQLINK();

  const [activeBankTab, setActiveBankTab] = useState<'banks' | 'branches' | 'service_action' | 'ticket_view' | 'book_apt'>('banks');
  const [activeServiceSelected, setActiveServiceSelected] = useState<string>('Customer Service & Account Opening');
  const [aptDate, setAptDate] = useState<string>('2026-09-02');
  const [aptTime, setAptTime] = useState<string>('10:30 AM');
  const [aptNotes, setAptNotes] = useState<string>('');
  const [activeTicket, setActiveTicket] = useState<BankQueueTicket | null>(null);

  const currentBank: BankOrganization = selectedBank || banks[0];
  const currentBranch: BankBranch = selectedBankBranch || bankBranches.find((b) => b.bankId === currentBank.id) || bankBranches[0];

  const branchesForBank = bankBranches.filter((b) => b.bankId === currentBank.id);

  const handleJoinQueue = (serviceName: string) => {
    const tkt = joinBankQueue(currentBank.id, currentBranch.id, serviceName);
    setActiveTicket(tkt);
    setActiveBankTab('ticket_view');
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    bookBankAppointment(currentBank.id, currentBranch.id, activeServiceSelected, aptDate, aptTime, aptNotes);
    setCustomerTab('my_qlink');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. BANKS DIRECTORY */}
      {activeBankTab === 'banks' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#181818] to-[#121212] border border-[#2A2A2A] shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37]">
                <Landmark className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white font-display">
                  Banking & Financial Hub
                </h1>
                <p className="text-xs text-[#888888]">
                  Direct queue dispatch, teller tickets, appointments, and commercial services
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 text-xs text-[#CCCCCC]">
              <span className="font-bold text-[#F5D76E]">{banks.length} Partner Financial Institutions</span>
              <span>•</span>
              <span>Real-time Counter Sync</span>
            </div>
          </div>

          {/* Banks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {banks.map((bank) => (
              <div
                key={bank.id}
                className="p-5 rounded-2xl bg-[#141414] hover:bg-[#1A1A1A] border border-[#262626] hover:border-[#D4AF37]/50 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <img src={bank.logo} alt={bank.name} className="w-12 h-12 rounded-xl object-cover border border-[#333333]" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-bold text-white">{bank.name}</h3>
                        {bank.verified && <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />}
                      </div>
                      <span className="text-xs text-[#888888]">{bank.branchesCount} Regional Branches</span>
                    </div>
                  </div>

                  {/* Announcements */}
                  {bank.announcements.length > 0 && (
                    <div className="mt-3.5 p-2.5 rounded-xl bg-[#0E0E0E] border border-[#222222] text-[11px] text-[#F5D76E] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#D4AF37]" />
                      <span className="line-clamp-2">{bank.announcements[0]}</span>
                    </div>
                  )}

                  {/* Services List */}
                  <div className="mt-3.5 space-y-1">
                    <span className="text-[10px] font-bold text-[#888888] uppercase">Offered Services:</span>
                    <div className="flex flex-wrap gap-1">
                      {bank.services.slice(0, 3).map((srv, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#1C1C1C] text-[#CCCCCC] border border-[#282828]">
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#222222] flex items-center justify-between">
                  <div className="text-[11px] text-[#888888] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {bank.averageWait} min avg wait
                  </div>
                  <button
                    onClick={() => {
                      setSelectedBank(bank);
                      setActiveBankTab('branches');
                    }}
                    className="px-4 py-2 bg-[#D4AF37] hover:bg-[#F5D76E] text-black font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Branches</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. BRANCH DISCOVERY STEP */}
      {activeBankTab === 'branches' && (
        <div className="space-y-6">
          <button
            onClick={() => setActiveBankTab('banks')}
            className="flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#F5D76E] font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Banks List
          </button>

          {/* Bank Profile Banner */}
          <div className="p-5 rounded-2xl bg-[#141414] border border-[#2A2A2A] shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={currentBank.logo} alt={currentBank.name} className="w-14 h-14 rounded-xl object-cover border border-[#333333]" />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white">{currentBank.name}</h2>
                  {currentBank.verified && <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />}
                </div>
                <p className="text-xs text-[#888888] mt-0.5 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> {currentBank.contact}
                </p>
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#0E0E0E] border border-[#252525] text-xs text-[#CCCCCC] self-start sm:self-auto">
              <strong className="text-[#F5D76E]">{currentBank.activeQueues}</strong> Active Customer Queues Today
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white mb-3">Select Branch for Queue or Appointment</h3>
            <div className="space-y-4">
              {branchesForBank.map((branch) => (
                <div
                  key={branch.id}
                  className="p-5 rounded-2xl bg-[#141414] hover:bg-[#1A1A1A] border border-[#262626] hover:border-[#D4AF37]/50 transition-all shadow-lg space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-white">{branch.name}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#22C55E]/15 text-[#22C55E]">
                          {branch.isOpen ? 'Open Now' : 'Closed'}
                        </span>
                      </div>
                      <p className="text-xs text-[#888888] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {branch.address}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="px-2.5 py-1 rounded-lg bg-[#0A0A0A] text-[#F5D76E] border border-[#282828]">
                        {branch.currentQueueCount} in Queue
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-[#0A0A0A] text-white border border-[#282828]">
                        ~{branch.avgWaitMinutes} min wait
                      </span>
                    </div>
                  </div>

                  {/* Branch Services Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-[#202020]">
                    {branch.services.map((srv) => (
                      <div key={srv.id} className="p-3 rounded-xl bg-[#0E0E0E] border border-[#222222] flex flex-col justify-between">
                        <div>
                          <span className="text-xs font-bold text-white block">{srv.name}</span>
                          <span className="text-[11px] text-[#888888] mt-0.5 block">
                            {srv.waitingCount} waiting • {srv.avgMinutes} min avg
                          </span>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedBankBranch(branch);
                              handleJoinQueue(srv.name);
                            }}
                            className="flex-1 py-1.5 bg-[#D4AF37] hover:bg-[#F5D76E] text-black font-bold text-[11px] rounded-lg transition-colors cursor-pointer text-center"
                          >
                            Join Queue
                          </button>
                          <button
                            onClick={() => {
                              setSelectedBankBranch(branch);
                              setActiveServiceSelected(srv.name);
                              setActiveBankTab('book_apt');
                            }}
                            className="py-1.5 px-2.5 bg-[#1C1C1C] hover:bg-[#252525] text-white font-semibold text-[11px] rounded-lg transition-colors border border-[#2E2E2E]"
                            title="Book Appointment"
                          >
                            Book
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. LIVE QUEUE TICKET VIEW */}
      {activeBankTab === 'ticket_view' && activeTicket && (
        <div className="space-y-6 max-w-lg mx-auto animate-in zoom-in-95 duration-300">
          <button
            onClick={() => setActiveBankTab('branches')}
            className="flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#F5D76E] font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Branch
          </button>

          {/* Luxury Metallic Gold Ticket Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1E1E1E] via-[#141414] to-[#0D0D0D] border-2 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.25)] relative overflow-hidden">
            {/* Holographic Header Band */}
            <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/30">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-xs font-mono font-bold text-[#F5D76E] tracking-widest uppercase">
                  QLINK QUEUE TICKET
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#22C55E]/20 text-[#22C55E] font-extrabold border border-[#22C55E]/40 animate-pulse">
                ● ACTIVE
              </span>
            </div>

            {/* Giant Number */}
            <div className="py-6 text-center space-y-1">
              <span className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider">Your Ticket Number</span>
              <h1 className="text-5xl sm:text-6xl font-black font-display text-white tracking-tight drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                {activeTicket.ticketNumber}
              </h1>
              <p className="text-xs text-[#D4AF37] font-semibold">{activeTicket.serviceName}</p>
            </div>

            {/* Live Queue Dynamics */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#080808] border border-[#242424] text-center">
              <div>
                <span className="text-[10px] text-[#888888] uppercase block">People Ahead</span>
                <span className="text-2xl font-extrabold text-[#F5D76E]">{activeTicket.peopleAhead}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#888888] uppercase block">Est. Waiting Time</span>
                <span className="text-2xl font-extrabold text-white">~{activeTicket.estimatedWaitMinutes} <span className="text-xs text-[#888888]">min</span></span>
              </div>
            </div>

            <div className="mt-4 space-y-1 text-xs text-[#888888] text-center">
              <p>Now Serving: <strong className="text-white">{activeTicket.currentServingTicket}</strong> at Counter {activeTicket.counterNumber || 2}</p>
              <p className="text-[11px] text-[#666666]">Location: {currentBranch.name} • {currentBank.name}</p>
            </div>

            {/* Leave Queue Button */}
            <div className="mt-6 pt-4 border-t border-[#222222] flex items-center justify-between">
              <button
                onClick={() => {
                  leaveBankQueue(activeTicket.id);
                  setActiveBankTab('branches');
                }}
                className="text-xs text-[#EF4444] hover:text-[#F87171] font-semibold flex items-center gap-1 transition-colors"
              >
                <XCircle className="w-4 h-4" /> Leave Queue
              </button>
              <button
                onClick={() => setCustomerTab('my_qlink')}
                className="px-4 py-2 bg-[#D4AF37] hover:bg-[#F5D76E] text-black font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                View in &ldquo;My Queues&rdquo; →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. BOOK APPOINTMENT MODAL / FORM */}
      {activeBankTab === 'book_apt' && (
        <form onSubmit={handleBookAppointment} className="space-y-6 max-w-lg mx-auto">
          <button
            type="button"
            onClick={() => setActiveBankTab('branches')}
            className="flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#F5D76E] font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Branches
          </button>

          <div className="p-6 rounded-2xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-4">
            <div className="border-b border-[#242424] pb-3">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">
                {currentBank.name} • {currentBranch.name}
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">Book Desk Appointment</h2>
              <p className="text-xs text-[#888888]">Reserve dedicated one-on-one counter time with a banking specialist.</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#CCCCCC]">Banking Service</label>
              <input
                type="text"
                value={activeServiceSelected}
                readOnly
                className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#333333] rounded-xl text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#CCCCCC]">Select Date</label>
                <input
                  type="date"
                  value={aptDate}
                  onChange={(e) => setAptDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#CCCCCC]">Select Time Slot</label>
                <select
                  value={aptTime}
                  onChange={(e) => setAptTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white"
                >
                  {['09:00 AM', '10:00 AM', '10:30 AM', '11:30 AM', '02:00 PM', '03:00 PM'].map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#CCCCCC]">Notes / Transaction Purpose (Optional)</label>
              <textarea
                rows={3}
                placeholder="e.g. Account opening, asset financing consultation, high-value forex..."
                value={aptNotes}
                onChange={(e) => setAptNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveBankTab('branches')}
                className="px-4 py-2 rounded-xl bg-[#1C1C1C] text-xs font-semibold text-white border border-[#2E2E2E]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F5D76E] via-[#D4AF37] to-[#B8860B] text-black font-extrabold text-xs shadow-lg transition-all cursor-pointer"
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
