import React, { useState } from 'react';
import { useQLINK } from '../../context/QLINKContext';
import { UserRole } from '../../types/qlink';
import {
  ShieldAlert,
  Building2,
  Landmark,
  HeartPulse,
  Crown,
  ChevronDown,
  UserCheck,
  Stethoscope,
  Activity,
  FlaskConical,
  Scan,
  Pill,
  ReceiptText,
  Ambulance,
  PhoneCall,
  Sparkles,
  Smartphone,
} from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { currentUser, switchRole, notifications, setNotificationDrawerOpen } = useQLINK();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const roleGroups: Array<{
    group: string;
    icon: React.ReactNode;
    roles: Array<{ role: UserRole; label: string; desc: string; icon: React.ReactNode }>;
  }> = [
    {
      group: '1. Customer Mobile & Web App',
      icon: <Smartphone className="w-4 h-4 text-[#F5D76E]" />,
      roles: [
        { role: 'customer', label: 'Citizen / Customer', desc: 'Discover services, apply for IDs, book queues & doctors, trigger emergency', icon: <UserCheck className="w-4 h-4 text-[#D4AF37]" /> },
      ],
    },
    {
      group: '2. Government Dashboards',
      icon: <Building2 className="w-4 h-4 text-[#F5D76E]" />,
      roles: [
        { role: 'gov_ceo', label: 'County Government CEO', desc: 'County-wide service KPIs, branches, activation & oversight', icon: <Building2 className="w-4 h-4 text-[#D4AF37]" /> },
        { role: 'gov_admin', label: 'Service Administrator', desc: 'Dynamic Questionnaire builder, applications review & queue management', icon: <Building2 className="w-4 h-4 text-[#D4AF37]" /> },
      ],
    },
    {
      group: '3. Banking Dashboards',
      icon: <Landmark className="w-4 h-4 text-[#F5D76E]" />,
      roles: [
        { role: 'bank_ceo', label: 'Bank Executive / CEO', desc: 'Bank-wide metrics, branch comparison & operations', icon: <Landmark className="w-4 h-4 text-[#D4AF37]" /> },
        { role: 'bank_manager', label: 'Branch Manager & Counters', desc: 'Live counter 1-5 dispatch, ticket call, staff workload', icon: <Landmark className="w-4 h-4 text-[#D4AF37]" /> },
      ],
    },
    {
      group: '4. Healthcare Dashboards',
      icon: <HeartPulse className="w-4 h-4 text-[#F5D76E]" />,
      roles: [
        { role: 'health_ceo', label: 'Healthcare Executive / CEO', desc: 'Hospital-wide KPIs, wards, departments & clinical flow', icon: <HeartPulse className="w-4 h-4 text-[#D4AF37]" /> },
        { role: 'doctor', label: 'Doctor Clinical Workspace', desc: 'Patient consultation, orders, dynamic prescriptions & admissions', icon: <Stethoscope className="w-4 h-4 text-[#D4AF37]" /> },
        { role: 'nurse', label: 'Nurse Care & Wards', desc: 'Vitals logging, nursing tasks, inpatient bed management', icon: <Activity className="w-4 h-4 text-[#D4AF37]" /> },
        { role: 'lab_tech', label: 'Diagnostic Laboratory', desc: 'Sample intake, processing, test results & verification', icon: <FlaskConical className="w-4 h-4 text-[#D4AF37]" /> },
        { role: 'radiologist', label: 'Radiology & Imaging', desc: 'Scan scheduling, findings, impressions & report verification', icon: <Scan className="w-4 h-4 text-[#D4AF37]" /> },
        { role: 'pharmacist', label: 'Pharmacy & Drug Inventory', desc: 'Prescription dispensing, batch & stock management', icon: <Pill className="w-4 h-4 text-[#D4AF37]" /> },
        { role: 'billing_cashier', label: 'Billing & Cashier', desc: 'Itemized bills, discounts, receipts & multi-method payments', icon: <ReceiptText className="w-4 h-4 text-[#D4AF37]" /> },
        { role: 'emergency_staff', label: 'Emergency Command Center', desc: 'Real-time trauma intake, ambulance dispatch & triage care', icon: <Ambulance className="w-4 h-4 text-[#D4AF37]" /> },
        { role: 'receptionist', label: 'Reception & Check-In', desc: 'Patient registration, appointment check-in & walk-ins', icon: <PhoneCall className="w-4 h-4 text-[#D4AF37]" /> },
      ],
    },
    {
      group: '5. QLINK CEO Command Center',
      icon: <Crown className="w-4 h-4 text-[#F5D76E]" />,
      roles: [
        { role: 'qlink_ceo', label: 'QLINK CEO Command Center', desc: 'Platform-level governance, orgs, data recovery, audit & health', icon: <Crown className="w-4 h-4 text-[#F5D76E]" /> },
      ],
    },
  ];

  const currentRoleLabel = roleGroups.flatMap((g) => g.roles).find((r) => r.role === currentUser.role)?.label || currentUser.role;

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#2A2A2A] px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Role Switcher Dropdown Trigger */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1C1C1C] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all text-left group shadow-[0_0_12px_rgba(212,175,55,0.08)]"
          >
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <div className="flex flex-col">
              <span className="text-[10px] text-[#A0A0A0] uppercase tracking-wider font-semibold">Active Perspective</span>
              <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#F5D76E] transition-colors flex items-center gap-1.5">
                {currentRoleLabel}
                <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37]" />
              </span>
            </div>
          </button>

          {/* Role Selection Menu */}
          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
              <div className="absolute left-0 mt-2 w-80 sm:w-96 max-h-[82vh] overflow-y-auto z-50 bg-[#121212] border border-[#D4AF37]/40 rounded-xl shadow-2xl p-2.5 divide-y divide-[#222222]">
                <div className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#F5D76E]" />
                    <h3 className="text-xs font-bold text-[#F5D76E] uppercase tracking-wider">Switch System Role</h3>
                  </div>
                  <p className="text-[11px] text-[#888888] mt-0.5">Explore the interconnected QLINK ecosystem as any persona</p>
                </div>

                {roleGroups.map((group, gIdx) => (
                  <div key={gIdx} className="py-2">
                    <div className="px-2.5 py-1 text-[11px] font-bold text-[#CCCCCC] flex items-center gap-1.5 tracking-wide">
                      {group.icon}
                      {group.group}
                    </div>
                    <div className="space-y-1 mt-1">
                      {group.roles.map((r) => {
                        const isSelected = currentUser.role === r.role;
                        return (
                          <button
                            key={r.role}
                            onClick={() => {
                              switchRole(r.role);
                              setDropdownOpen(false);
                            }}
                            className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-all flex items-start gap-2.5 ${
                              isSelected
                                ? 'bg-[#D4AF37]/15 border border-[#D4AF37] text-white shadow-[0_0_10px_rgba(212,175,55,0.15)]'
                                : 'hover:bg-[#1A1A1A] text-[#BBBBBB] hover:text-white border border-transparent'
                            }`}
                          >
                            <div className="mt-0.5">{r.icon}</div>
                            <div className="flex-1">
                              <div className="font-bold flex items-center justify-between">
                                <span>{r.label}</span>
                                {isSelected && (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#D4AF37] text-black font-extrabold uppercase">
                                    LIVE
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-[#777777] leading-snug mt-0.5">{r.desc}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Center: System Status Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#222222]">
          <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
          <span className="text-[11px] text-[#AAAAAA] font-mono">
            QLINK Unified Grid: <strong className="text-white">Active (3 Pillars Online)</strong>
          </span>
        </div>

        {/* Right: Notification Trigger & Active User Avatar */}
        <div className="flex items-center gap-3">
          {/* Notifications Bell */}
          <button
            onClick={() => setNotificationDrawerOpen(true)}
            className="relative p-2 rounded-lg bg-[#141414] hover:bg-[#1E1E1E] border border-[#2A2A2A] hover:border-[#D4AF37]/50 transition-colors text-[#CCCCCC] hover:text-[#F5D76E]"
            title="Unified Notifications"
          >
            <ShieldAlert className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-black text-[9px] font-black flex items-center justify-center shadow-md">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Current Persona Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#222222]">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-[#D4AF37]/50"
            />
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-white leading-tight">{currentUser.name}</span>
              <span className="text-[10px] text-[#D4AF37] font-medium leading-tight">
                {currentUser.organizationName || 'Citizen User'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
