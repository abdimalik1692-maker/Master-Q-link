import React, { useState } from 'react';
import { useQLINK } from '../../context/QLINKContext';
import {
  Activity,
  Heart,
  Thermometer,
  Wind,
  Bed,
  CheckCircle2,
  Plus,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';

export const NurseCareWorkspace: React.FC = () => {
  const {
    healthcareJourneys,
    nurseRecordVitals,
    advanceHealthcareJourneyStage,
  } = useQLINK();

  const [selectedJourneyId, setSelectedJourneyId] = useState<string>(healthcareJourneys[0]?.id || 'journey-1');
  const [bp, setBp] = useState('120/80');
  const [hr, setHr] = useState('74');
  const [spO2, setSpO2] = useState('98');
  const [temp, setTemp] = useState('36.8');
  const [weight, setWeight] = useState('72');
  const [glucose, setGlucose] = useState('5.4');
  const [nurseNotes, setNurseNotes] = useState('Patient alert and oriented. No acute respiratory distress.');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const activeJourney = healthcareJourneys.find((j) => j.id === selectedJourneyId) || healthcareJourneys[0];

  const handleSaveVitals = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeJourney) {
      nurseRecordVitals(activeJourney.id, {
        bloodPressure: bp,
        heartRate: parseInt(hr) || 72,
        spO2: parseInt(spO2) || 98,
        temperature: parseFloat(temp) || 36.8,
        weightKg: parseFloat(weight) || 70,
        bloodGlucose: glucose,
        recordedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Nurse Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-b from-[#1C1C1C] via-[#141414] to-[#0D0D0D] border border-[#2A2A2A] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest">
            NURSING TRIAGE & INPATIENT CARE
          </span>
          <h1 className="text-2xl font-extrabold text-white font-display mt-0.5">
            Nurse Station & Vitals Logging
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs text-[#888888]">Select Patient:</label>
          <select
            value={selectedJourneyId}
            onChange={(e) => setSelectedJourneyId(e.target.value)}
            className="px-3.5 py-2 bg-[#0A0A0A] border border-[#333333] rounded-xl text-xs font-bold text-white focus:outline-none"
          >
            {healthcareJourneys.map((j) => (
              <option key={j.id} value={j.id}>
                {j.patientName} ({j.stage.replace('_', ' ')})
              </option>
            ))}
          </select>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-[#102A14] border border-[#22C55E]/40 text-xs text-[#22C55E] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Vitals recorded and synced to Doctor clinical workspace!</span>
        </div>
      )}

      {/* Main Vitals Form & Inpatient Beds */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vitals Capture Form (2 Cols) */}
        <form onSubmit={handleSaveVitals} className="lg:col-span-2 p-6 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-5">
          <div className="border-b border-[#242424] pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Triage Vitals Measurement</h2>
              <p className="text-xs text-[#888888]">Patient: {activeJourney?.patientName} • National ID: 38491024</p>
            </div>
            <span className="text-xs font-bold text-[#F5D76E] bg-[#0E0E0E] px-3 py-1 rounded-xl border border-[#252525]">
              Stage: {activeJourney?.stage}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#CCCCCC] flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-[#EF4444]" /> Blood Pressure (mmHg)
              </label>
              <input
                type="text"
                value={bp}
                onChange={(e) => setBp(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#CCCCCC] flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-[#22C55E]" /> Heart Rate (bpm)
              </label>
              <input
                type="number"
                value={hr}
                onChange={(e) => setHr(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#CCCCCC] flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-[#38BDF8]" /> SpO2 Oxygen (%)
              </label>
              <input
                type="number"
                value={spO2}
                onChange={(e) => setSpO2(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#CCCCCC] flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-[#F59E0B]" /> Temperature (°C)
              </label>
              <input
                type="text"
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#CCCCCC]">Body Weight (kg)</label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#CCCCCC]">Blood Glucose (mmol/L)</label>
              <input
                type="text"
                value={glucose}
                onChange={(e) => setGlucose(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#CCCCCC]">Nurse Clinical Observations</label>
            <textarea
              rows={3}
              value={nurseNotes}
              onChange={(e) => setNurseNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F5D76E] text-black font-extrabold text-xs shadow-md transition-all cursor-pointer"
            >
              Save & Log Vitals
            </button>

            <button
              type="button"
              onClick={() => {
                if (activeJourney) advanceHealthcareJourneyStage(activeJourney.id, 'doctor_consultation');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#1C1C1C] hover:bg-[#252525] border border-[#2E2E2E] text-xs font-bold text-white transition-colors flex items-center gap-1.5"
            >
              <span>Transfer to Doctor Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Inpatient Ward Bed Roster (1 Col) */}
        <div className="p-6 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-[#D4AF37]" /> Inpatient Ward Beds
            </h3>
            <span className="text-xs font-mono text-[#22C55E]">18/24 Occupied</span>
          </div>

          <div className="space-y-2">
            {[
              { bed: 'Bed 01', ward: 'Male Surgical', patient: 'John Doe', status: 'Occupied' },
              { bed: 'Bed 02', ward: 'Male Surgical', patient: 'Hassan Adan', status: 'Occupied' },
              { bed: 'Bed 03', ward: 'Female Medical', patient: 'Mary Wanjiru', status: 'Occupied' },
              { bed: 'Bed 04', ward: 'Female Medical', patient: '—', status: 'Available' },
              { bed: 'Bed 05', ward: 'Pediatric Ward', patient: 'Baby Zainab', status: 'Occupied' },
            ].map((b, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-[#0A0A0A] border border-[#202020] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">{b.bed} • {b.ward}</span>
                  <span className="text-[10px] text-[#888888]">{b.patient}</span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    b.status === 'Occupied' ? 'bg-[#EF4444]/15 text-[#EF4444]' : 'bg-[#22C55E]/15 text-[#22C55E]'
                  }`}
                >
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
