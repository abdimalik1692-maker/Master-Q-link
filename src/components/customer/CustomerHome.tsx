import React from 'react';
import { useQLINK } from '../../context/QLINKContext';
import { QLINKLogo } from '../common/QLINKLogo';
import {
  Search,
  Building2,
  Landmark,
  HeartPulse,
  AlertTriangle,
  FileText,
  Calendar,
  Layers,
  Bell,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';

export const CustomerHome: React.FC = () => {
  const {
    currentUser,
    govServices,
    banks,
    healthcareFacilities,
    govApplications,
    bankAppointments,
    healthAppointments,
    bankTickets,
    notifications,
    setCustomerTab,
    setSelectedGovService,
    setSelectedBank,
    setSelectedHealthFacility,
    setGlobalSearchQuery,
    setNotificationDrawerOpen,
  } = useQLINK();

  // Dynamic Greeting based on time of day
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  // Live Counts
  const openGovCount = govServices.filter((s) => s.status === 'Open').length;
  const activeBankCount = banks.length;
  const activeHealthCount = healthcareFacilities.length;

  const myActiveQueues = bankTickets.filter((t) => t.status === 'Waiting');
  const myApplicationsCount = govApplications.length;
  const myAppointmentsCount = bankAppointments.length + healthAppointments.length;
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Card */}
      <div className="p-5 sm:p-7 rounded-2xl bg-gradient-to-b from-[#161616] to-[#101010] border border-[#2A2A2A] shadow-xl relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <QLINKLogo size="md" showText={true} />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A1A1A] border border-[#2E2E2E] text-xs text-[#CCCCCC]">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{currentUser.city}, {currentUser.country}</span>
            </div>
            <button
              onClick={() => setNotificationDrawerOpen(true)}
              className="relative p-2 rounded-full bg-[#1A1A1A] hover:bg-[#252525] border border-[#2E2E2E] text-[#D4AF37] transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-black text-[9px] font-black flex items-center justify-center">
                  {unreadNotifs}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Personal Greeting */}
        <div className="mt-6">
          <span className="text-xs font-semibold text-[#D4AF37] tracking-wider uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {greeting}, {currentUser.name.split(' ')[0]}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
            What service do you need today?
          </h1>
        </div>

        {/* Universal Search Bar */}
        <div className="mt-5 relative">
          <Search className="w-5 h-5 text-[#888888] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search for banks, hospitals, ID cards, birth certificates, doctors..."
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setCustomerTab('discover');
            }}
            className="w-full pl-12 pr-28 py-3.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-sm text-white placeholder-[#666666] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all shadow-inner"
          />
          <button
            onClick={() => setCustomerTab('discover')}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#D4AF37] hover:bg-[#F5D76E] text-black font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>

      {/* Primary Pillar Service Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider">
            Primary Service Pillars
          </h2>
          <span className="text-[11px] text-[#D4AF37] font-semibold">Real-time counts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Government Services Card */}
          <div
            onClick={() => {
              setSelectedGovService(null);
              setCustomerTab('gov_services');
            }}
            className="p-5 rounded-2xl bg-[#141414] hover:bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#D4AF37]/60 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] group-hover:scale-105 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#1F1F1F] text-[#F5D76E] border border-[#D4AF37]/30">
                  {openGovCount} Active Services
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-4 group-hover:text-[#F5D76E] transition-colors">
                Government
              </h3>
              <p className="text-xs text-[#888888] mt-1 line-clamp-2 leading-relaxed">
                National IDs, civil registries, birth certificates, business permits, and land titles.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#222222] flex items-center justify-between text-xs text-[#D4AF37] font-bold">
              <span>Explore services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Banking Services Card */}
          <div
            onClick={() => {
              setSelectedBank(null);
              setCustomerTab('bank_services');
            }}
            className="p-5 rounded-2xl bg-[#141414] hover:bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#D4AF37]/60 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] group-hover:scale-105 transition-transform">
                  <Landmark className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#1F1F1F] text-[#F5D76E] border border-[#D4AF37]/30">
                  {activeBankCount} Partner Banks
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-4 group-hover:text-[#F5D76E] transition-colors">
                Banking
              </h3>
              <p className="text-xs text-[#888888] mt-1 line-clamp-2 leading-relaxed">
                KCB, Equity, Co-op branches, instant queue ticket issuing, counter bookings, and forex.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#222222] flex items-center justify-between text-xs text-[#D4AF37] font-bold">
              <span>View branches & queues</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Healthcare Services Card */}
          <div
            onClick={() => {
              setSelectedHealthFacility(null);
              setCustomerTab('health_services');
            }}
            className="p-5 rounded-2xl bg-[#141414] hover:bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#D4AF37]/60 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] group-hover:scale-105 transition-transform">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#1F1F1F] text-[#F5D76E] border border-[#D4AF37]/30">
                  {activeHealthCount} Facilities 24/7
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-4 group-hover:text-[#F5D76E] transition-colors">
                Healthcare
              </h3>
              <p className="text-xs text-[#888888] mt-1 line-clamp-2 leading-relaxed">
                Aga Khan Hospital & County Referral, on-duty doctors, clinical appointments, labs & pharmacy.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#222222] flex items-center justify-between text-xs text-[#D4AF37] font-bold">
              <span>Book doctor & care</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* CRITICAL EMERGENCY BUTTON - Visually Distinct Red/Amber */}
      <div
        onClick={() => setCustomerTab('emergency_report')}
        className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#2A0808] via-[#1F0E0E] to-[#150A0A] border-2 border-[#EF4444]/60 hover:border-[#EF4444] shadow-[0_0_30px_rgba(239,68,68,0.2)] hover:shadow-[0_0_40px_rgba(239,68,68,0.35)] transition-all cursor-pointer group flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-[#EF4444] text-white shadow-lg animate-pulse">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#EF4444] text-[10px] font-extrabold uppercase tracking-wider">
                CRITICAL DISPATCH
              </span>
              <span className="text-xs text-[#AAAAAA]">GPS Auto-Alert</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white mt-0.5 group-hover:text-[#FCA5A5] transition-colors">
              REPORT MEDICAL OR ACCIDENT EMERGENCY
            </h3>
            <p className="text-xs text-[#CCCCCC] leading-snug">
              Instant priority dispatch to nearest trauma center and ambulance fleet with live GPS coordinates.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white font-black text-xs uppercase tracking-wider shrink-0 transition-colors">
          <span>TRIGGER ER</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Quick Access Grid: My Applications, My Appointments, My Queues, My Notifications */}
      <div>
        <h2 className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider mb-3 px-1">
          My Quick Access Hub
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Applications */}
          <div
            onClick={() => setCustomerTab('my_qlink')}
            className="p-3.5 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] border border-[#242424] hover:border-[#D4AF37]/50 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <FileText className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-xs font-mono font-bold text-white px-1.5 py-0.5 rounded bg-[#222222]">
                {myApplicationsCount}
              </span>
            </div>
            <h4 className="text-xs font-bold text-white mt-2.5">My Applications</h4>
            <p className="text-[11px] text-[#888888] mt-0.5">Civil IDs & Licenses</p>
          </div>

          {/* Appointments */}
          <div
            onClick={() => setCustomerTab('my_qlink')}
            className="p-3.5 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] border border-[#242424] hover:border-[#D4AF37]/50 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <Calendar className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-xs font-mono font-bold text-white px-1.5 py-0.5 rounded bg-[#222222]">
                {myAppointmentsCount}
              </span>
            </div>
            <h4 className="text-xs font-bold text-white mt-2.5">My Appointments</h4>
            <p className="text-[11px] text-[#888888] mt-0.5">Doctor & Bank slots</p>
          </div>

          {/* Queues */}
          <div
            onClick={() => setCustomerTab('my_qlink')}
            className="p-3.5 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] border border-[#242424] hover:border-[#D4AF37]/50 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <Layers className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-xs font-mono font-bold text-white px-1.5 py-0.5 rounded bg-[#222222]">
                {myActiveQueues.length}
              </span>
            </div>
            <h4 className="text-xs font-bold text-white mt-2.5">Active Queues</h4>
            <p className="text-[11px] text-[#888888] mt-0.5">Live tickets & times</p>
          </div>

          {/* Notifications */}
          <div
            onClick={() => setNotificationDrawerOpen(true)}
            className="p-3.5 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] border border-[#242424] hover:border-[#D4AF37]/50 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <Bell className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-xs font-mono font-bold text-[#F5D76E] px-1.5 py-0.5 rounded bg-[#222222]">
                {unreadNotifs}
              </span>
            </div>
            <h4 className="text-xs font-bold text-white mt-2.5">Notifications</h4>
            <p className="text-[11px] text-[#888888] mt-0.5">Real-time alerts</p>
          </div>
        </div>
      </div>

      {/* Citizen Trust & Security Badge */}
      <div className="p-4 rounded-xl bg-[#111111] border border-[#222222] flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
        <div className="text-xs text-[#888888] leading-relaxed">
          <strong className="text-white">Official QLINK Digital Grid:</strong> All submissions are verified against the National Registration Bureau, Central Bank of Kenya compliance standards, and Kenya Medical Practitioners Board.
        </div>
      </div>
    </div>
  );
};
