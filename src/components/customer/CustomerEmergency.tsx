import React, { useState } from 'react';
import { useQLINK } from '../../context/QLINKContext';
import { EmergencyReport } from '../../types/qlink';
import {
  AlertTriangle,
  Ambulance,
  MapPin,
  Flame,
  Car,
  HeartCrack,
  Activity,
  PhoneCall,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  Navigation,
} from 'lucide-react';

export const CustomerEmergency: React.FC = () => {
  const {
    emergencyReports,
    currentUser,
    triggerEmergencyReport,
    setCustomerTab,
  } = useQLINK();

  const [step, setStep] = useState<'form' | 'tracking'>('form');
  const [emergencyType, setEmergencyType] = useState<EmergencyReport['emergencyType']>('Medical');
  const [severity, setSeverity] = useState<EmergencyReport['severity']>('Critical');
  const [casualtiesCount, setCasualtiesCount] = useState<number>(1);
  const [patientCondition, setPatientCondition] = useState<string>('Unconscious, severe chest trauma');
  const [locationName, setLocationName] = useState<string>('Mandera Town Center, Near Main Market Roundabout');
  const [activeReport, setActiveReport] = useState<EmergencyReport | null>(null);

  const emergencyTypes: Array<{ type: EmergencyReport['emergencyType']; label: string; icon: React.ReactNode }> = [
    { type: 'Medical', label: 'Severe Medical / Cardiac', icon: <HeartCrack className="w-5 h-5" /> },
    { type: 'Road Accident', label: 'Road Traffic Accident', icon: <Car className="w-5 h-5" /> },
    { type: 'Fire', label: 'Fire Outbreak', icon: <Flame className="w-5 h-5" /> },
    { type: 'Crime/Assault', label: 'Violence / Crime', icon: <ShieldAlert className="w-5 h-5" /> },
    { type: 'Maternity/OBGYN', label: 'Maternity Labor / Delivery', icon: <Activity className="w-5 h-5" /> },
    { type: 'Other', label: 'Other Major Emergency', icon: <AlertTriangle className="w-5 h-5" /> },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport = triggerEmergencyReport(
      emergencyType,
      severity,
      casualtiesCount,
      patientCondition,
      locationName,
      { lat: 3.9373, lng: 41.8569 }
    );
    setActiveReport(newReport);
    setStep('tracking');
  };

  const currentReport = activeReport || emergencyReports[0];

  return (
    <div className="space-y-6 pb-12 max-w-2xl mx-auto">
      {/* 1. REPORTING FORM STEP */}
      {step === 'form' && (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-300">
          {/* Emergency Alert Header */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#3D0A0A] via-[#240808] to-[#140404] border-2 border-[#EF4444] shadow-[0_0_40px_rgba(239,68,68,0.3)] space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#EF4444] text-white shadow-xl animate-pulse">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#EF4444]/30 text-[#FCA5A5] uppercase tracking-widest border border-[#EF4444]/50">
                  CRITICAL REAL-TIME DISPATCH
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-white font-display mt-0.5">
                  Report Emergency
                </h1>
              </div>
            </div>
            <p className="text-xs text-[#E5E5E5] leading-relaxed">
              Triggers instant high-priority alerts to Mandera County Emergency Dispatch, Aga Khan Trauma Center, and on-call ambulance crews.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-5">
            {/* Type selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white uppercase tracking-wider">
                1. Select Emergency Category <span className="text-[#EF4444]">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {emergencyTypes.map((t) => (
                  <button
                    key={t.type}
                    type="button"
                    onClick={() => setEmergencyType(t.type)}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      emergencyType === t.type
                        ? 'bg-[#2A0E0E] border-[#EF4444] text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                        : 'bg-[#0E0E0E] border-[#222222] text-[#888888] hover:text-white hover:border-[#333333]'
                    }`}
                  >
                    <div className={emergencyType === t.type ? 'text-[#EF4444]' : 'text-[#888888]'}>
                      {t.icon}
                    </div>
                    <span className="text-xs font-bold mt-2 leading-tight">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Severity and Casualties */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#CCCCCC]">Severity Level</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#EF4444] rounded-xl text-xs text-white"
                >
                  <option value="Critical">Critical (Life Threatening)</option>
                  <option value="Severe">Severe (Urgent Care Needed)</option>
                  <option value="Moderate">Moderate</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#CCCCCC]">Number of Casualties</label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={casualtiesCount}
                  onChange={(e) => setCasualtiesCount(parseInt(e.target.value) || 1)}
                  className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#EF4444] rounded-xl text-xs text-white"
                  required
                />
              </div>
            </div>

            {/* GPS Location */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#CCCCCC] flex items-center justify-between">
                <span>Incident Location / GPS Coordinates</span>
                <span className="text-[10px] text-[#22C55E] flex items-center gap-1">
                  <Navigation className="w-3 h-3 animate-spin" /> GPS Lock: 3.9373° N, 41.8569° E
                </span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#EF4444] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#EF4444] rounded-xl text-xs text-white"
                  required
                />
              </div>
            </div>

            {/* Patient Condition */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#CCCCCC]">Victim Condition & Observations</label>
              <textarea
                rows={3}
                placeholder="State symptoms: conscious/unconscious, bleeding, fractures, trapped..."
                value={patientCondition}
                onChange={(e) => setPatientCondition(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#EF4444] rounded-xl text-xs text-white focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Large Trigger Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-[#B91C1C] text-white font-black text-sm sm:text-base uppercase tracking-widest shadow-[0_0_35px_rgba(239,68,68,0.5)] hover:shadow-[0_0_50px_rgba(239,68,68,0.7)] transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <Ambulance className="w-6 h-6 animate-bounce" />
            <span>DISPATCH IMMEDIATE AMBULANCE & ER TEAM</span>
          </button>
        </form>
      )}

      {/* 2. REAL-TIME DISPATCH TRACKING */}
      {step === 'tracking' && currentReport && (
        <div className="space-y-6 animate-in zoom-in-95 duration-300">
          {/* Dispatch Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#1C1C1C] to-[#121212] border-2 border-[#EF4444] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2A]">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#EF4444] uppercase tracking-widest">
                  LIVE EMERGENCY DISPATCH CASE
                </span>
                <h2 className="text-2xl font-black text-white font-display mt-0.5">
                  Case #{currentReport.id}
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#EF4444] text-xs font-extrabold uppercase animate-pulse">
                ● {currentReport.status}
              </span>
            </div>

            {/* Assigned Unit Details */}
            <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#222222] flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444]">
                  <Ambulance className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">{currentReport.assignedAmbulanceUnit || 'Ambulance Unit KDL 482B'}</span>
                  <span className="text-[11px] text-[#888888]">{currentReport.assignedHospital || 'Aga Khan University Hospital Trauma'}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#888888] uppercase block">Estimated ETA</span>
                <span className="text-lg font-black text-[#22C55E]">{currentReport.etaMinutes || 5} MINS</span>
              </div>
            </div>

            {/* Live GPS Tracker Visualizer */}
            <div className="p-4 rounded-2xl bg-[#080808] border border-[#202020] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#888888]">Scene Location:</span>
                <span className="text-white font-semibold">{currentReport.locationName}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#888888]">Reporter:</span>
                <span className="text-white">{currentReport.callerName} ({currentReport.callerPhone})</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#888888]">Casualties:</span>
                <span className="text-[#EF4444] font-bold">{currentReport.casualtiesCount} Person(s) - {currentReport.severity}</span>
              </div>
            </div>

            {/* Emergency Hotline */}
            <div className="p-3 rounded-xl bg-[#200A0A] border border-[#EF4444]/30 flex items-center justify-between text-xs">
              <span className="text-[#E5E5E5] flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-[#EF4444]" /> Need immediate tele-triage guidance?
              </span>
              <a
                href="tel:999"
                className="px-3 py-1 bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold rounded-lg transition-colors"
              >
                Call 999 Hotline
              </a>
            </div>

            {/* Return / My QLINK */}
            <div className="pt-2 flex justify-between">
              <button
                onClick={() => setStep('form')}
                className="text-xs text-[#888888] hover:text-white"
              >
                Log another report
              </button>
              <button
                onClick={() => setCustomerTab('my_qlink')}
                className="px-4 py-2 bg-[#D4AF37] hover:bg-[#F5D76E] text-black font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                View in &ldquo;My QLINK Hub&rdquo; →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
