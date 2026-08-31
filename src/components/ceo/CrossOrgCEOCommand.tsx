import React, { useState } from 'react';
import { useQLINK } from '../../context/QLINKContext';
import {
  Globe,
  Building2,
  Landmark,
  HeartPulse,
  Ambulance,
  TrendingUp,
  Activity,
  ShieldCheck,
  Users,
  Clock,
  Sparkles,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';

export const CrossOrgCEOCommand: React.FC = () => {
  const {
    govServices,
    govBranches,
    govApplications,
    banks,
    bankBranches,
    bankTickets,
    healthcareFacilities,
    healthcareJourneys,
    healthcareBills,
    emergencyReports,
    notifications,
  } = useQLINK();

  const [activeSectorFilter, setActiveSectorFilter] = useState<'All' | 'Government' | 'Banking' | 'Healthcare' | 'Emergency'>('All');

  // Aggregated Cross-Ecosystem Metrics
  const totalGovWaiting = govBranches.reduce((acc, b) => acc + b.currentQueue, 0);
  const totalBankWaiting = bankBranches.reduce((acc, b) => acc + b.currentQueueCount, 0);
  const totalHealthPatients = healthcareJourneys.length;
  const activeEmergencies = emergencyReports.filter((e) => e.status !== 'Closed').length;
  const totalClearedHealthcareRev = healthcareBills.reduce((acc, b) => acc + (b.status === 'Paid' ? b.totalAmount : 0), 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Top CEO Command Header */}
      <div className="p-7 rounded-3xl bg-gradient-to-b from-[#221C0E] via-[#16120A] to-[#0D0B06] border-2 border-[#D4AF37]/50 shadow-[0_0_50px_rgba(212,175,55,0.15)] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#F5D76E] text-black shadow-[0_0_30px_rgba(212,175,55,0.4)]">
              <Globe className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-black text-[#D4AF37] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#352B16] border border-[#D4AF37]/40">
                  EXECUTIVE COMMAND MATRIX • LEVEL 01 SECURITY CLEARANCE
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
                QLINK Unified Cross-Ecosystem Command Center
              </h1>
              <p className="text-xs text-[#A89870] mt-0.5">
                Real-time telemetric aggregation across County Government, Banking Institutions, Healthcare Hospitals & Emergency Fleet
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3.5 py-2 rounded-2xl bg-[#0A0A0A] text-[#22C55E] border border-[#222222] flex items-center gap-2 shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
              100% Platform Resilience (4 Sectors Live)
            </span>
          </div>
        </div>

        {/* 4 Multi-Sector Live KPI Pillars */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-6 pt-6 border-t border-[#2F2718]">
          {/* 1. Civil Gov */}
          <div className="p-4 rounded-2xl bg-[#0E0C08]/90 border border-[#2F2718] space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#888888] font-bold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Civil Public Services
              </span>
              <span className="text-[10px] text-[#22C55E] font-mono">6 Sub-Counties</span>
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-2xl font-black text-white">{totalGovWaiting}</span>
              <span className="text-xs text-[#888888]">citizens in queue</span>
            </div>
            <span className="text-[11px] text-[#A89870] block font-mono">
              {govApplications.length} total applications • 98.2% SLA
            </span>
          </div>

          {/* 2. Banking */}
          <div className="p-4 rounded-2xl bg-[#0E0C08]/90 border border-[#2F2718] space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#888888] font-bold flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-[#D4AF37]" /> Financial Banking
              </span>
              <span className="text-[10px] text-[#22C55E] font-mono">3 Major Banks</span>
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-2xl font-black text-[#F5D76E]">{totalBankWaiting}</span>
              <span className="text-xs text-[#888888]">waiting at counters</span>
            </div>
            <span className="text-[11px] text-[#A89870] block font-mono">
              7 min average service turnaround
            </span>
          </div>

          {/* 3. Healthcare */}
          <div className="p-4 rounded-2xl bg-[#0E0C08]/90 border border-[#2F2718] space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#888888] font-bold flex items-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5 text-[#D4AF37]" /> Healthcare System
              </span>
              <span className="text-[10px] text-[#22C55E] font-mono">2 Hospitals</span>
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-2xl font-black text-white">{totalHealthPatients}</span>
              <span className="text-xs text-[#888888]">active patient flows</span>
            </div>
            <span className="text-[11px] text-[#22C55E] block font-mono font-bold">
              KES {(totalClearedHealthcareRev / 1000).toFixed(1)}k revenue settled
            </span>
          </div>

          {/* 4. Emergency */}
          <div className="p-4 rounded-2xl bg-[#0E0C08]/90 border border-[#2F2718] space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#888888] font-bold flex items-center gap-1.5">
                <Ambulance className="w-3.5 h-3.5 text-[#EF4444]" /> 999 Trauma Response
              </span>
              <span className="text-[10px] text-[#EF4444] font-mono animate-pulse">Live</span>
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-2xl font-black text-[#EF4444]">{activeEmergencies}</span>
              <span className="text-xs text-[#888888]">active dispatches</span>
            </div>
            <span className="text-[11px] text-[#EF4444] block font-mono">
              8.4 min average ambulance ETA
            </span>
          </div>
        </div>
      </div>

      {/* Cross-Sector Real-Time Telemetry Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Sector Operations Breakdown */}
        <div className="p-6 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Cross-Ecosystem Operational Status</h2>
            <span className="text-xs text-[#D4AF37] font-semibold">Real-time Stream</span>
          </div>

          <div className="space-y-3">
            {/* Gov summary card */}
            <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#202020] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#D4AF37]" />
                  <span className="font-bold text-white">Public Service Huduma & County Centers</span>
                </div>
                <span className="text-[#22C55E] font-mono font-bold">100% Operational</span>
              </div>
              <p className="text-xs text-[#888888]">
                All 6 sub-county processing hubs operating within standard 15-minute wait threshold. Business permits, national ID registrations, and land rate clearances progressing normally.
              </p>
            </div>

            {/* Banking summary card */}
            <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#202020] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-[#D4AF37]" />
                  <span className="font-bold text-white">Commercial Bank Liquidity & Counter Dispatch</span>
                </div>
                <span className="text-[#22C55E] font-mono font-bold">KCB • Equity • Absa</span>
              </div>
              <p className="text-xs text-[#888888]">
                Real-time counter sync active across 4 major flagship branches. Average transaction speed 6.4 minutes. Zero counter bottlenecks detected.
              </p>
            </div>

            {/* Healthcare summary card */}
            <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#202020] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-[#D4AF37]" />
                  <span className="font-bold text-white">Hospital Clinical Throughput & Bed Occupancy</span>
                </div>
                <span className="text-[#F5D76E] font-mono font-bold">70% Bed Capacity</span>
              </div>
              <p className="text-xs text-[#888888]">
                Triage vitals, Doctor clinical EMR notes, Diagnostic lab tests, Radiology DICOM imaging, and Pharmacy electronic prescriptions linked synchronously to cashier billing.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Unified Platform Event Stream & Audit Trail */}
        <div className="p-6 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Live Cross-Platform Telemetric Audit Trail</h2>
            <span className="text-xs text-[#22C55E] font-mono flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" /> Live Telemetry
            </span>
          </div>

          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {notifications.map((n) => (
              <div key={n.id} className="p-3.5 rounded-2xl bg-[#0A0A0A] border border-[#222222] space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {n.title}
                  </span>
                  <span className="text-[10px] font-mono text-[#888888]">{n.time}</span>
                </div>
                <p className="text-[11px] text-[#AAAAAA]">{n.message}</p>
              </div>
            ))}

            {/* Additional simulated cross-telemetry logs */}
            <div className="p-3.5 rounded-2xl bg-[#0A0A0A] border border-[#222222] space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                  System Security Check: Integrity Verified
                </span>
                <span className="text-[10px] font-mono text-[#888888]">Just now</span>
              </div>
              <p className="text-[11px] text-[#AAAAAA]">
                Cross-service role isolation and cryptographic EMR session tokens verified across all 12 operational endpoints.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
