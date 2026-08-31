import React, { useState } from 'react';
import { useQLINK } from '../../context/QLINKContext';
import {
  HeartPulse,
  Activity,
  Bed,
  Stethoscope,
  FlaskConical,
  Pill,
  Ambulance,
  DollarSign,
  Users,
  CheckCircle2,
} from 'lucide-react';

export const HealthCEODashboard: React.FC = () => {
  const {
    healthcareFacilities,
    healthcareDoctors,
    healthcareJourneys,
    emergencyReports,
    healthcareBills,
  } = useQLINK();

  const [selectedFacilityId, setSelectedFacilityId] = useState<string>(healthcareFacilities[0]?.id || 'hosp-1');

  const currentFacility = healthcareFacilities.find((f) => f.id === selectedFacilityId) || healthcareFacilities[0];
  const onDutyDoctors = healthcareDoctors.filter((d) => d.facilityId === currentFacility.id && d.onDuty);

  const activeJourneysCount = healthcareJourneys.length;
  const activeEmergencies = emergencyReports.filter((e) => e.status !== 'Closed').length;
  const totalRevenue = healthcareBills.reduce((acc, b) => acc + (b.status === 'Paid' ? b.totalAmount : 0), 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Executive Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-b from-[#1C1C1C] via-[#141414] to-[#0D0D0D] border border-[#2A2A2A] shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img src={currentFacility.logo} alt={currentFacility.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-[#D4AF37]" />
            <div>
              <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest">
                HEALTHCARE SYSTEM EXECUTIVE COMMAND
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-0.5">
                {currentFacility.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedFacilityId}
              onChange={(e) => setSelectedFacilityId(e.target.value)}
              className="px-4 py-2 bg-[#0A0A0A] border border-[#333333] rounded-xl text-xs font-bold text-white focus:outline-none"
            >
              {healthcareFacilities.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Top Health KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#242424]">
          <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#202020]">
            <span className="text-[10px] text-[#888888] uppercase block font-semibold">Active Inpatient Beds</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-white">42</span>
              <span className="text-xs text-[#22C55E]">/ 60 Beds (70%)</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#202020]">
            <span className="text-[10px] text-[#888888] uppercase block font-semibold">On-Duty Specialists</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-[#F5D76E]">{onDutyDoctors.length}</span>
              <span className="text-xs text-[#888888]">specialists</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#202020]">
            <span className="text-[10px] text-[#888888] uppercase block font-semibold">Trauma & ER Status</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-[#EF4444]">{activeEmergencies}</span>
              <span className="text-xs text-[#888888]">cases dispatched</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#202020]">
            <span className="text-[10px] text-[#888888] uppercase block font-semibold">Cleared Revenue</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-[#22C55E]">KES {(totalRevenue / 1000).toFixed(1)}k</span>
              <span className="text-xs text-[#D4AF37]">M-Pesa / SHA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Departments Health Table */}
      <div className="p-6 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white">Departmental Flow & Resource Capacity</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#222222] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Stethoscope className="w-4 h-4 text-[#D4AF37]" /> Outpatient Consultations
            </div>
            <p className="text-xs text-[#888888]">18 patients seen today • 14 min avg consult time</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#222222] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <FlaskConical className="w-4 h-4 text-[#D4AF37]" /> Laboratory Turnaround
            </div>
            <p className="text-xs text-[#888888]">26 diagnostic tests verified • 32 min avg turnaround</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#222222] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Pill className="w-4 h-4 text-[#D4AF37]" /> Pharmacy Dispensary
            </div>
            <p className="text-xs text-[#888888]">34 prescriptions filled • 99.4% stock availability</p>
          </div>
        </div>
      </div>
    </div>
  );
};
