import React, { useState } from 'react';
import { useQLINK } from '../../context/QLINKContext';
import {
  Scan,
  CheckCircle2,
  Image as ImageIcon,
  Send,
  Eye,
  Sparkles,
} from 'lucide-react';

export const RadiologyWorkspace: React.FC = () => {
  const { healthcareJourneys, radiologyCompleteScan } = useQLINK();

  const [findingsValue, setFindingsValue] = useState<Record<string, string>>({
    'rad-1': 'Bilateral lung fields clear. Cardiac shadow within normal limits. Mild retrosternal opacity suggestive of resolving acute tracheobronchitis.',
  });
  const [verifiedAlert, setVerifiedAlert] = useState<string | null>(null);

  const allRadOrders = healthcareJourneys.flatMap((j) =>
    j.radiologyOrders.map((r) => ({ ...r, journeyId: j.id, patientName: j.patientName }))
  );

  const handleVerifyScan = (journeyId: string, radId: string) => {
    const findingsText = findingsValue[radId] || 'Radiological investigation complete. Impressions recorded.';
    radiologyCompleteScan(
      journeyId,
      radId,
      findingsText,
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=60'
    );
    setVerifiedAlert('Radiology Findings Verified & Attached to Patient Journey EMR');
    setTimeout(() => setVerifiedAlert(null), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Radiology Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-b from-[#1C1C1C] via-[#141414] to-[#0D0D0D] border border-[#2A2A2A] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest">
            DIAGNOSTIC IMAGING & RADIOLOGY WORKSTATION
          </span>
          <h1 className="text-2xl font-extrabold text-white font-display mt-0.5">
            X-Ray, Ultrasound & CT Scan Verification
          </h1>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-[#0A0A0A] text-[#F5D76E] border border-[#222222]">
          {allRadOrders.length} Imaging Orders
        </span>
      </div>

      {verifiedAlert && (
        <div className="p-3.5 rounded-2xl bg-[#102A14] border border-[#22C55E]/40 text-xs text-[#22C55E] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{verifiedAlert}</span>
        </div>
      )}

      {/* Radiology Queue */}
      <div className="p-6 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white">Imaging Acquisition & Reporting Worklist</h2>

        <div className="space-y-4">
          {allRadOrders.map((rad) => (
            <div key={rad.id} className="p-5 rounded-2xl bg-[#0A0A0A] border border-[#222222] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Scan className="w-4 h-4 text-[#D4AF37]" />
                    <h3 className="text-base font-bold text-white">{rad.scanType} ({rad.bodyPart})</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                        rad.status === 'Completed' ? 'bg-[#22C55E]/15 text-[#22C55E]' : 'bg-[#EAB308]/15 text-[#F5D76E]'
                      }`}
                    >
                      ● {rad.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#888888]">Patient: {rad.patientName} • Study ID #{rad.id}</p>
                </div>

                <span className="text-xs font-mono font-bold text-[#D4AF37]">KES {rad.cost}</span>
              </div>

              {/* Findings textarea */}
              <div className="space-y-1.5 pt-2 border-t border-[#1C1C1C]">
                <label className="text-xs font-bold text-[#CCCCCC]">Radiologist Clinical Impressions & Findings:</label>
                <textarea
                  rows={2}
                  value={findingsValue[rad.id] || rad.findings || ''}
                  onChange={(e) => setFindingsValue({ ...findingsValue, [rad.id]: e.target.value })}
                  placeholder="Enter radiographic observations, bone alignment, tissue densities..."
                  className="w-full px-3.5 py-2 bg-[#121212] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white focus:outline-none"
                />
              </div>

              {rad.status !== 'Completed' && (
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => handleVerifyScan(rad.journeyId, rad.id)}
                    className="px-5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#F5D76E] text-black font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Attach DICOM Scan & Verify Report</span>
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
