import React, { useState } from 'react';
import { useQLINK } from '../../context/QLINKContext';
import {
  Pill,
  CheckCircle2,
  Package,
  AlertTriangle,
  Send,
  Layers,
  Sparkles,
} from 'lucide-react';

export const PharmacyWorkspace: React.FC = () => {
  const { healthcareJourneys, pharmacyDispenseMedication } = useQLINK();

  const [batchNumbers, setBatchNumbers] = useState<Record<string, string>>({
    'rx-1': 'BATCH-AZM-2026-08',
  });
  const [dispensedAlert, setDispensedAlert] = useState<string | null>(null);

  const allPrescriptions = healthcareJourneys.flatMap((j) =>
    j.prescriptions.map((p) => ({ ...p, journeyId: j.id, patientName: j.patientName }))
  );

  const handleDispense = (journeyId: string, rxId: string) => {
    const batch = batchNumbers[rxId] || `BATCH-${Date.now().toString().slice(-6)}`;
    pharmacyDispenseMedication(journeyId, rxId, batch);
    setDispensedAlert(`Medication Dispensed with Batch Code ${batch} & Added to Patient Itemized Bill`);
    setTimeout(() => setDispensedAlert(null), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Pharmacy Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-b from-[#1C1C1C] via-[#141414] to-[#0D0D0D] border border-[#2A2A2A] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest">
            HOSPITAL PHARMACY & DRUG DISPENSARY
          </span>
          <h1 className="text-2xl font-extrabold text-white font-display mt-0.5">
            Electronic Prescription Queue & Stock Fulfillment
          </h1>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-[#0A0A0A] text-[#F5D76E] border border-[#222222]">
          {allPrescriptions.length} Active Prescriptions
        </span>
      </div>

      {dispensedAlert && (
        <div className="p-3.5 rounded-2xl bg-[#102A14] border border-[#22C55E]/40 text-xs text-[#22C55E] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{dispensedAlert}</span>
        </div>
      )}

      {/* Prescriptions List */}
      <div className="p-6 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white">Prescription Fulfillment Worklist</h2>

        <div className="space-y-4">
          {allPrescriptions.map((rx) => (
            <div key={rx.id} className="p-5 rounded-2xl bg-[#0A0A0A] border border-[#222222] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Pill className="w-4 h-4 text-[#D4AF37]" />
                    <h3 className="text-base font-bold text-white">{rx.medicationName} ({rx.dosage})</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                        rx.status === 'Dispensed' ? 'bg-[#22C55E]/15 text-[#22C55E]' : 'bg-[#EAB308]/15 text-[#F5D76E]'
                      }`}
                    >
                      ● {rx.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#888888]">
                    Patient: {rx.patientName} • Frequency: <strong className="text-white">{rx.frequency}</strong> • Duration: <strong className="text-white">{rx.duration}</strong>
                  </p>
                </div>

                <span className="text-xs font-mono font-bold text-[#D4AF37]">KES {rx.price}</span>
              </div>

              {rx.status !== 'Dispensed' ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#1C1C1C]">
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-[#888888]">Batch Number:</label>
                    <input
                      type="text"
                      placeholder="e.g. BATCH-00194"
                      value={batchNumbers[rx.id] || ''}
                      onChange={(e) => setBatchNumbers({ ...batchNumbers, [rx.id]: e.target.value })}
                      className="px-3 py-1.5 bg-[#141414] border border-[#333333] rounded-lg text-xs text-white"
                    />
                  </div>

                  <button
                    onClick={() => handleDispense(rx.journeyId, rx.id)}
                    className="px-5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#F5D76E] text-black font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer self-end sm:self-auto"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Dispense Medication & Charge Bill</span>
                  </button>
                </div>
              ) : (
                <div className="pt-2 border-t border-[#1C1C1C] flex items-center justify-between text-xs text-[#22C55E]">
                  <span>✓ Dispensed under Batch #{rx.batchNumber || 'BATCH-2026-08'}</span>
                  <span className="text-[#888888]">Charged to patient EMR invoice</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
