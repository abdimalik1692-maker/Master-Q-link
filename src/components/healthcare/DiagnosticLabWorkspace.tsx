import React, { useState } from 'react';
import { useQLINK } from '../../context/QLINKContext';
import {
  FlaskConical,
  CheckCircle2,
  Clock,
  Send,
  AlertCircle,
  FileSpreadsheet,
  Search,
  Sparkles,
} from 'lucide-react';

export const DiagnosticLabWorkspace: React.FC = () => {
  const { healthcareJourneys, labCompleteTest } = useQLINK();

  const [selectedJourneyId, setSelectedJourneyId] = useState<string>(healthcareJourneys[0]?.id || 'journey-1');
  const [testResultValue, setTestResultValue] = useState<Record<string, string>>({
    'lab-1': 'Hb: 13.8 g/dL (Normal: 13.0-17.0), WBC: 11.2 x10^9/L (Mild leukocytosis), Platelets: 240 x10^9/L',
  });
  const [completedAlert, setCompletedAlert] = useState<string | null>(null);

  const activeJourney = healthcareJourneys.find((j) => j.id === selectedJourneyId) || healthcareJourneys[0];
  const allLabOrders = healthcareJourneys.flatMap((j) =>
    j.labOrders.map((o) => ({ ...o, journeyId: j.id, patientName: j.patientName }))
  );

  const handleCompleteLab = (journeyId: string, labId: string) => {
    const resultText = testResultValue[labId] || 'Specimen processed. Values within normal clinical parameters.';
    labCompleteTest(journeyId, labId, resultText);
    setCompletedAlert(`Lab Test Results Verified & Attached to Electronic Medical Record (EMR)`);
    setTimeout(() => setCompletedAlert(null), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Lab Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-b from-[#1C1C1C] via-[#141414] to-[#0D0D0D] border border-[#2A2A2A] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest">
            DIAGNOSTIC PATHOLOGY & LABORATORY
          </span>
          <h1 className="text-2xl font-extrabold text-white font-display mt-0.5">
            Diagnostic Lab Test Dispatch & Processing
          </h1>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-[#0A0A0A] text-[#F5D76E] border border-[#222222]">
          {allLabOrders.length} Total Laboratory Orders
        </span>
      </div>

      {completedAlert && (
        <div className="p-3.5 rounded-2xl bg-[#102A14] border border-[#22C55E]/40 text-xs text-[#22C55E] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{completedAlert}</span>
        </div>
      )}

      {/* Lab Orders Queue Table */}
      <div className="p-6 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white">Laboratory Specimen Worklist</h2>

        <div className="space-y-4">
          {allLabOrders.map((lab) => (
            <div
              key={lab.id}
              className="p-5 rounded-2xl bg-[#0A0A0A] border border-[#222222] space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-[#D4AF37]" />
                    <h3 className="text-base font-bold text-white">{lab.testName}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                        lab.status === 'Completed' ? 'bg-[#22C55E]/15 text-[#22C55E]' : 'bg-[#EAB308]/15 text-[#F5D76E]'
                      }`}
                    >
                      ● {lab.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#888888]">Patient: {lab.patientName} • Specimen Ref #{lab.id}</p>
                </div>

                <span className="text-xs font-mono font-bold text-[#D4AF37]">KES {lab.cost}</span>
              </div>

              {/* Lab Result Input */}
              <div className="space-y-1.5 pt-2 border-t border-[#1C1C1C]">
                <label className="text-xs font-bold text-[#CCCCCC]">Quantitative Findings & Pathology Values:</label>
                <textarea
                  rows={2}
                  value={testResultValue[lab.id] || lab.result || ''}
                  onChange={(e) => setTestResultValue({ ...testResultValue, [lab.id]: e.target.value })}
                  placeholder="Enter verified values, reference ranges, specimen observations..."
                  className="w-full px-3.5 py-2 bg-[#121212] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white focus:outline-none"
                />
              </div>

              {lab.status !== 'Completed' && (
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => handleCompleteLab(lab.journeyId, lab.id)}
                    className="px-5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#F5D76E] text-black font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verify & Release Results to Doctor</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
