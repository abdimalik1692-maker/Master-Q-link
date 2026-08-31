import React, { useState } from 'react';
import { useQLINK } from '../../context/QLINKContext';
import {
  Stethoscope,
  Activity,
  FlaskConical,
  Scan,
  Pill,
  Bed,
  CheckCircle2,
  Plus,
  ArrowRight,
  AlertCircle,
  FileText,
  Sparkles,
} from 'lucide-react';

export const DoctorWorkspace: React.FC = () => {
  const {
    healthcareJourneys,
    doctorAddClinicalNote,
    doctorOrderLab,
    doctorOrderRadiology,
    doctorPrescribeMedication,
    doctorAdmitPatient,
    advanceHealthcareJourneyStage,
  } = useQLINK();

  const [selectedJourneyId, setSelectedJourneyId] = useState<string>(healthcareJourneys[0]?.id || 'journey-1');
  const [diagnosis, setDiagnosis] = useState('');
  const [clinicalNotes, setClinicalNotes] = useState('');

  // Lab order form state
  const [newLabTest, setNewLabTest] = useState('Lipid Profile');
  const [newLabCost, setNewLabCost] = useState('1400');

  // Radiology order form state
  const [newScanType, setNewScanType] = useState('Chest X-Ray');
  const [newScanBodyPart, setNewScanBodyPart] = useState('Thorax');
  const [newScanCost, setNewScanCost] = useState('2200');

  // Prescription form state
  const [rxName, setRxName] = useState('Amoxicillin 500mg');
  const [rxDosage, setRxDosage] = useState('500mg');
  const [rxFreq, setRxFreq] = useState('TDS (3x Daily)');
  const [rxDuration, setRxDuration] = useState('7 Days');
  const [rxPrice, setRxPrice] = useState('650');

  // Ward Admission state
  const [admitWard, setAdmitWard] = useState('Male Medical Ward');
  const [admitBed, setAdmitBed] = useState('Bed 08');
  const [admitReason, setAdmitReason] = useState('Severe lower respiratory tract infection requiring IV antibiotics');

  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);

  const activeJourney = healthcareJourneys.find((j) => j.id === selectedJourneyId) || healthcareJourneys[0];

  const handleSaveDiagnosis = () => {
    if (activeJourney && (diagnosis || clinicalNotes)) {
      doctorAddClinicalNote(activeJourney.id, diagnosis || 'Atypical Pneumonia (J18.9)', clinicalNotes || 'Patient presenting with 4-day history of fever, non-productive cough, and pleuritic chest discomfort.');
      setAlertSuccess('Diagnosis & Clinical Notes Saved to Electronic Medical Record (EMR)');
      setTimeout(() => setAlertSuccess(null), 3000);
    }
  };

  const handleOrderLab = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeJourney) {
      doctorOrderLab(activeJourney.id, newLabTest, parseInt(newLabCost) || 1200);
      setAlertSuccess(`Ordered Diagnostic Lab: ${newLabTest}`);
      setTimeout(() => setAlertSuccess(null), 3000);
    }
  };

  const handleOrderRadiology = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeJourney) {
      doctorOrderRadiology(activeJourney.id, newScanType, newScanBodyPart, parseInt(newScanCost) || 2000);
      setAlertSuccess(`Ordered Radiology: ${newScanType}`);
      setTimeout(() => setAlertSuccess(null), 3000);
    }
  };

  const handlePrescribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeJourney) {
      doctorPrescribeMedication(activeJourney.id, rxName, rxDosage, rxFreq, rxDuration, parseInt(rxPrice) || 500);
      setAlertSuccess(`Prescription for ${rxName} submitted to Pharmacy`);
      setTimeout(() => setAlertSuccess(null), 3000);
    }
  };

  const handleAdmit = () => {
    if (activeJourney) {
      doctorAdmitPatient(activeJourney.id, admitWard, admitBed, admitReason);
      setAlertSuccess(`Patient Admitted to ${admitWard} (${admitBed})`);
      setTimeout(() => setAlertSuccess(null), 3000);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Doctor Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-b from-[#1C1C1C] via-[#141414] to-[#0D0D0D] border border-[#2A2A2A] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest">
            CLINICAL SPECIALIST WORKSPACE
          </span>
          <h1 className="text-2xl font-extrabold text-white font-display mt-0.5">
            Doctor Consultation & Orders
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs text-[#888888]">Active Patient:</label>
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

      {alertSuccess && (
        <div className="p-3.5 rounded-2xl bg-[#102A14] border border-[#22C55E]/40 text-xs text-[#22C55E] flex items-center gap-2 shadow-lg">
          <CheckCircle2 className="w-4 h-4" />
          <span>{alertSuccess}</span>
        </div>
      )}

      {/* Patient Vitals & Clinical Context */}
      {activeJourney && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Vitals & Diagnosis (1 Col) */}
          <div className="space-y-6">
            <div className="p-5 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#242424] pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">{activeJourney.patientName}</h3>
                  <span className="text-xs text-[#D4AF37]">National ID: 38491024 • Age: 36</span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#1C1C1C] text-[#22C55E] font-bold border border-[#2E2E2E]">
                  {activeJourney.stage}
                </span>
              </div>

              {/* Vitals Recorded at Triage */}
              {activeJourney.vitals && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#D4AF37]" /> Triage Vitals
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#0A0A0A] border border-[#222222]">
                      <span className="text-[#888888] block text-[10px]">BP</span>
                      <span className="text-white font-bold">{activeJourney.vitals.bloodPressure}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0A0A0A] border border-[#222222]">
                      <span className="text-[#888888] block text-[10px]">Heart Rate</span>
                      <span className="text-white font-bold">{activeJourney.vitals.heartRate} bpm</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0A0A0A] border border-[#222222]">
                      <span className="text-[#888888] block text-[10px]">SpO2</span>
                      <span className="text-[#22C55E] font-bold">{activeJourney.vitals.spO2}%</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0A0A0A] border border-[#222222]">
                      <span className="text-[#888888] block text-[10px]">Temperature</span>
                      <span className="text-white font-bold">{activeJourney.vitals.temperature}°C</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Diagnosis Formulation */}
              <div className="space-y-3 pt-2 border-t border-[#222222]">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#CCCCCC]">ICD-10 Diagnosis</label>
                  <input
                    type="text"
                    placeholder="e.g. Acute Bronchitis (J20.9)"
                    value={diagnosis || activeJourney.diagnosis || ''}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#CCCCCC]">Doctor Clinical Assessment Notes</label>
                  <textarea
                    rows={4}
                    placeholder="Examination findings, respiratory sounds, plan of care..."
                    value={clinicalNotes || activeJourney.clinicalNotes || ''}
                    onChange={(e) => setClinicalNotes(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleSaveDiagnosis}
                  className="w-full py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F5D76E] text-black font-extrabold text-xs transition-colors cursor-pointer"
                >
                  Save Diagnosis & Clinical Notes
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Diagnostic & Rx Order Actions (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. Order Laboratory Test */}
            <form onSubmit={handleOrderLab} className="p-5 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                  <FlaskConical className="w-4 h-4" /> 1. Order Diagnostic Laboratory Investigation
                </h4>
                <span className="text-[10px] text-[#888888]">Routes directly to Lab Tech</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    placeholder="Test name e.g. Full Blood Count, Liver Function..."
                    value={newLabTest}
                    onChange={(e) => setNewLabTest(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white"
                    required
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Cost (KES)"
                    value={newLabCost}
                    onChange={(e) => setNewLabCost(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#252525] border border-[#D4AF37]/40 text-xs font-bold text-[#F5D76E] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Submit Lab Order
                </button>
              </div>
            </form>

            {/* 2. Order Radiology / Imaging Scan */}
            <form onSubmit={handleOrderRadiology} className="p-5 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                  <Scan className="w-4 h-4" /> 2. Order Radiology / Imaging Scan
                </h4>
                <span className="text-[10px] text-[#888888]">Routes directly to Radiologist</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <input
                    type="text"
                    placeholder="Scan e.g. Chest X-Ray, CT Brain..."
                    value={newScanType}
                    onChange={(e) => setNewScanType(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Body region e.g. Thorax..."
                    value={newScanBodyPart}
                    onChange={(e) => setNewScanBodyPart(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white"
                    required
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Cost (KES)"
                    value={newScanCost}
                    onChange={(e) => setNewScanCost(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#252525] border border-[#D4AF37]/40 text-xs font-bold text-[#F5D76E] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Submit Radiology Order
                </button>
              </div>
            </form>

            {/* 3. Prescribe Medication */}
            <form onSubmit={handlePrescribe} className="p-5 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                  <Pill className="w-4 h-4" /> 3. Prescribe Electronic Medication
                </h4>
                <span className="text-[10px] text-[#888888]">Routes directly to Pharmacist</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <input
                  type="text"
                  placeholder="Drug Name"
                  value={rxName}
                  onChange={(e) => setRxName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0A0A0A] border border-[#333333] rounded-xl text-xs text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Dosage e.g. 500mg"
                  value={rxDosage}
                  onChange={(e) => setRxDosage(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0A0A0A] border border-[#333333] rounded-xl text-xs text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Frequency"
                  value={rxFreq}
                  onChange={(e) => setRxFreq(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0A0A0A] border border-[#333333] rounded-xl text-xs text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={rxDuration}
                  onChange={(e) => setRxDuration(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0A0A0A] border border-[#333333] rounded-xl text-xs text-white"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#252525] border border-[#D4AF37]/40 text-xs font-bold text-[#F5D76E] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Issue Prescription
                </button>
              </div>
            </form>

            {/* Inpatient Admission & Stage Advancement */}
            <div className="p-5 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider flex items-center gap-1.5">
                  <Bed className="w-4 h-4 text-[#D4AF37]" /> Inpatient Ward Admission or Discharge
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Ward Name"
                  value={admitWard}
                  onChange={(e) => setAdmitWard(e.target.value)}
                  className="px-3.5 py-2 bg-[#0A0A0A] border border-[#333333] rounded-xl text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Bed Number"
                  value={admitBed}
                  onChange={(e) => setAdmitBed(e.target.value)}
                  className="px-3.5 py-2 bg-[#0A0A0A] border border-[#333333] rounded-xl text-xs text-white"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#222222]">
                <button
                  type="button"
                  onClick={handleAdmit}
                  className="px-4 py-2 rounded-xl bg-[#2A1E0E] hover:bg-[#3D2C14] text-[#F5D76E] border border-[#D4AF37]/40 text-xs font-bold transition-colors cursor-pointer"
                >
                  Admit to Inpatient Bed
                </button>

                <button
                  type="button"
                  onClick={() => advanceHealthcareJourneyStage(activeJourney.id, 'pharmacy')}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#F5D76E] via-[#D4AF37] to-[#B8860B] text-black font-extrabold text-xs shadow-lg transition-all cursor-pointer"
                >
                  Advance Patient to Pharmacy / Next Step →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
