import React, { useState } from 'react';
import { useQLINK } from '../../context/QLINKContext';
import { EmergencyReport } from '../../types/qlink';
import {
  Ambulance,
  AlertTriangle,
  MapPin,
  Clock,
  PhoneCall,
  CheckCircle2,
  Navigation,
  Sparkles,
} from 'lucide-react';

export const EmergencyCommandWorkspace: React.FC = () => {
  const {
    emergencyReports,
    updateEmergencyStatus,
  } = useQLINK();

  const [selectedCaseId, setSelectedCaseId] = useState<string>(emergencyReports[0]?.id || 'QL-EM-48291');
  const [assignedAmbulance, setAssignedAmbulance] = useState('Ambulance Unit KDL 482B');
  const [updatedAlert, setUpdatedAlert] = useState<string | null>(null);

  const activeCase = emergencyReports.find((c) => c.id === selectedCaseId) || emergencyReports[0];

  const handleUpdateStatus = (status: EmergencyReport['status']) => {
    if (activeCase) {
      updateEmergencyStatus(activeCase.id, status, assignedAmbulance);
      setUpdatedAlert(`Case #${activeCase.id} updated to ${status}`);
      setTimeout(() => setUpdatedAlert(null), 3000);
    }
  };

  const emergencyStatuses: EmergencyReport['status'][] = [
    'Reported',
    'Dispatched',
    'En Route',
    'On Scene',
    'In Transit',
    'Arrived',
    'Admitted',
    'Closed',
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Emergency Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#3D0A0A] via-[#240808] to-[#140404] border-2 border-[#EF4444] shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3.5 rounded-2xl bg-[#EF4444] text-white shadow-xl animate-pulse">
            <Ambulance className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-[#FCA5A5] uppercase tracking-widest">
              COUNTY EMERGENCY & TRAUMA FLEET COMMAND
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-0.5">
              Live Ambulance & Trauma Dispatch
            </h1>
          </div>
        </div>

        <span className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-xl bg-[#0A0A0A] text-[#EF4444] border border-[#EF4444]/40 animate-pulse">
          {emergencyReports.filter((e) => e.status !== 'Closed').length} Active High-Priority Incidents
        </span>
      </div>

      {updatedAlert && (
        <div className="p-3.5 rounded-2xl bg-[#102A14] border border-[#22C55E]/40 text-xs text-[#22C55E] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{updatedAlert}</span>
        </div>
      )}

      {/* Main Command Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Active Incidents List (1 Col) */}
        <div className="p-5 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-3">
          <h3 className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider">
            Incoming Trauma Calls ({emergencyReports.length})
          </h3>

          <div className="space-y-2">
            {emergencyReports.map((em) => (
              <div
                key={em.id}
                onClick={() => setSelectedCaseId(em.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  selectedCaseId === em.id
                    ? 'bg-[#2A0A0A] border-[#EF4444] shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                    : 'bg-[#0E0E0E] border-[#222222] hover:border-[#333333]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#EF4444] font-bold">Case #{em.id}</span>
                  <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[#EF4444]/20 text-[#EF4444]">
                    ● {em.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white mt-1">{em.emergencyType} Incident</h4>
                <p className="text-[11px] text-[#888888] truncate">{em.locationName}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Dispatch Control (2 Cols) */}
        {activeCase && (
          <div className="lg:col-span-2 p-6 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#242424] pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#EF4444] uppercase font-bold">
                  {activeCase.severity} Severity • {activeCase.emergencyType}
                </span>
                <h2 className="text-xl font-bold text-white mt-0.5">Incident #{activeCase.id}</h2>
                <p className="text-xs text-[#888888] mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#EF4444]" /> {activeCase.locationName}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#888888] block">Assigned Fleet</span>
                <span className="text-sm font-extrabold text-[#22C55E]">{activeCase.assignedAmbulanceUnit}</span>
              </div>
            </div>

            {/* Victim Condition */}
            <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#222222] space-y-2">
              <span className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">Clinical Condition:</span>
              <p className="text-xs text-white leading-relaxed">{activeCase.patientCondition}</p>
              <div className="flex items-center justify-between pt-2 border-t border-[#181818] text-xs text-[#888888]">
                <span>Casualties: <strong className="text-[#EF4444]">{activeCase.casualtiesCount}</strong></span>
                <span>Caller: <strong className="text-white">{activeCase.callerName}</strong> ({activeCase.callerPhone})</span>
              </div>
            </div>

            {/* Status Pipeline Advancement */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
                Update Dispatch Pipeline:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {emergencyStatuses.map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(st)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeCase.status === st
                        ? 'bg-[#EF4444] text-white shadow-lg'
                        : 'bg-[#0E0E0E] text-[#888888] hover:text-white hover:bg-[#1A1A1A] border border-[#222222]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Fleet reassignment */}
            <div className="p-4 rounded-2xl bg-[#0E0E0E] border border-[#222222] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <label className="text-xs text-[#888888]">Reassign Ambulance:</label>
                <select
                  value={assignedAmbulance}
                  onChange={(e) => setAssignedAmbulance(e.target.value)}
                  className="px-3 py-1.5 bg-[#141414] border border-[#333333] rounded-lg text-xs text-white"
                >
                  <option value="Ambulance Unit KDL 482B">Ambulance Unit KDL 482B (Advanced Life Support)</option>
                  <option value="Ambulance Unit KCR 901M">Ambulance Unit KCR 901M (Trauma Fleet 2)</option>
                  <option value="Ambulance Unit KDH 312P">Ambulance Unit KDH 312P (Rapid Response SUV)</option>
                </select>
              </div>

              <a
                href={`tel:${activeCase.callerPhone}`}
                className="px-4 py-2 rounded-xl bg-[#2A1010] hover:bg-[#3D1414] text-[#EF4444] border border-[#EF4444]/40 font-bold text-xs flex items-center gap-1.5 self-end sm:self-auto"
              >
                <PhoneCall className="w-3.5 h-3.5" /> Call Reporter Direct
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
