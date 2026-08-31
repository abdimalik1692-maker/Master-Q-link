import React, { useState } from 'react';
import { useQLINK } from '../../context/QLINKContext';
import {
  UserCheck,
  Search,
  Plus,
  CheckCircle2,
  Users,
  HeartPulse,
  Sparkles,
} from 'lucide-react';

export const ReceptionWorkspace: React.FC = () => {
  const { healthcareJourneys, startHealthcareJourney, healthcareFacilities } = useQLINK();

  const [patientName, setPatientName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [facilityId, setFacilityId] = useState(healthcareFacilities[0]?.id || 'hosp-1');
  const [checkInSuccess, setCheckInSuccess] = useState<string | null>(null);

  const handleRegisterPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (patientName) {
      const facility = healthcareFacilities.find((f) => f.id === facilityId) || healthcareFacilities[0];
      const newJourney = startHealthcareJourney(patientName, facility.id, facility.name);
      setCheckInSuccess(`Citizen ${patientName} checked in. Assigned Electronic Journey #${newJourney.id} and transferred to Nursing Triage.`);
      setPatientName('');
      setNationalId('');
      setPatientPhone('');
      setTimeout(() => setCheckInSuccess(null), 3500);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Reception Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-b from-[#1C1C1C] via-[#141414] to-[#0D0D0D] border border-[#2A2A2A] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest">
            HOSPITAL RECEPTION & PATIENT INTAKE
          </span>
          <h1 className="text-2xl font-extrabold text-white font-display mt-0.5">
            Patient Registration & Triage Routing
          </h1>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-[#0A0A0A] text-[#22C55E] border border-[#222222]">
          ● Intake Active
        </span>
      </div>

      {checkInSuccess && (
        <div className="p-3.5 rounded-2xl bg-[#102A14] border border-[#22C55E]/40 text-xs text-[#22C55E] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{checkInSuccess}</span>
        </div>
      )}

      {/* Check In Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form onSubmit={handleRegisterPatient} className="lg:col-span-2 p-6 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-5">
          <div className="border-b border-[#242424] pb-3">
            <h2 className="text-base font-bold text-white">Citizen Check-In & Electronic Registration</h2>
            <p className="text-xs text-[#888888]">Link National ID to Electronic Medical Record (EMR)</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#CCCCCC]">Citizen Full Legal Name</label>
              <input
                type="text"
                placeholder="e.g. Grace Njeri"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#CCCCCC]">National ID Number</label>
              <input
                type="text"
                placeholder="e.g. 29384710"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#CCCCCC]">Phone Number (M-Pesa / SMS)</label>
              <input
                type="tel"
                placeholder="+254 700 000 000"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#CCCCCC]">Hospital Facility</label>
              <select
                value={facilityId}
                onChange={(e) => setFacilityId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white"
              >
                {healthcareFacilities.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#F5D76E] via-[#D4AF37] to-[#B8860B] text-black font-extrabold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>Check In Citizen & Route to Triage</span>
            </button>
          </div>
        </form>

        {/* Live Intake Queue */}
        <div className="p-6 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-4">
          <h3 className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider">
            Today's Check-Ins ({healthcareJourneys.length})
          </h3>

          <div className="space-y-2">
            {healthcareJourneys.map((j) => (
              <div key={j.id} className="p-3 rounded-2xl bg-[#0A0A0A] border border-[#222222] text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{j.patientName}</span>
                  <span className="text-[10px] text-[#D4AF37] font-semibold">{j.stage.replace('_', ' ')}</span>
                </div>
                <span className="text-[10px] text-[#777777] block mt-0.5">Journey #{j.id} • {j.facilityName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
