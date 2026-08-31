import React, { useState } from 'react';
import { useQLINK } from '../../context/QLINKContext';
import {
  FileText,
  Calendar,
  Layers,
  AlertTriangle,
  ReceiptText,
  FolderLock,
  History,
  CheckCircle2,
  Clock,
  MapPin,
  Ticket,
  Upload,
  CreditCard,
  Download,
  XCircle,
  Sparkles,
  Phone,
} from 'lucide-react';

export const CustomerMyQLINK: React.FC = () => {
  const {
    currentUser,
    govApplications,
    bankAppointments,
    healthAppointments,
    bankTickets,
    emergencyReports,
    healthcareBills,
    payHealthcareBill,
    resubmitGovApplication,
    leaveBankQueue,
  } = useQLINK();

  const [activeSubTab, setActiveSubTab] = useState<'applications' | 'appointments' | 'queues' | 'emergencies' | 'bills' | 'documents' | 'history'>('applications');
  const [selectedBillForPay, setSelectedBillForPay] = useState<any | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | 'insurance'>('mpesa');
  const [mpesaPhone, setMpesaPhone] = useState(currentUser.phone);
  const [isProcessingPay, setIsProcessingPay] = useState(false);

  // Resubmit state
  const [resubmitAppId, setResubmitAppId] = useState<string | null>(null);
  const [resubmitFiles, setResubmitFiles] = useState<Array<{ name: string; url: string; type: string; size: string }>>([]);

  const subTabs = [
    { key: 'applications', label: 'My Applications', count: govApplications.length, icon: <FileText className="w-4 h-4" /> },
    { key: 'appointments', label: 'My Appointments', count: bankAppointments.length + healthAppointments.length, icon: <Calendar className="w-4 h-4" /> },
    { key: 'queues', label: 'My Queues', count: bankTickets.length, icon: <Layers className="w-4 h-4" /> },
    { key: 'emergencies', label: 'My Emergencies', count: emergencyReports.length, icon: <AlertTriangle className="w-4 h-4" /> },
    { key: 'bills', label: 'My Bills', count: healthcareBills.length, icon: <ReceiptText className="w-4 h-4" /> },
    { key: 'documents', label: 'My Documents Vault', count: 4, icon: <FolderLock className="w-4 h-4" /> },
    { key: 'history', label: 'Activity History', count: 12, icon: <History className="w-4 h-4" /> },
  ];

  const handlePayBill = (billId: string) => {
    setIsProcessingPay(true);
    setTimeout(() => {
      payHealthcareBill(billId, paymentMethod === 'mpesa' ? 'M-Pesa Express' : paymentMethod === 'card' ? 'Visa / Mastercard' : 'SHA Insurance');
      setIsProcessingPay(false);
      setSelectedBillForPay(null);
    }, 1000);
  };

  const handleResubmit = (appId: string) => {
    if (resubmitFiles.length > 0) {
      resubmitGovApplication(appId, resubmitFiles);
      setResubmitAppId(null);
      setResubmitFiles([]);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Profile Bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-[#181818] to-[#121212] border border-[#2A2A2A] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={currentUser.avatar} alt={currentUser.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-[#D4AF37]" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">{currentUser.name}</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#F5D76E] border border-[#D4AF37]/40">
                QLINK CITIZEN ID
              </span>
            </div>
            <p className="text-xs text-[#888888] flex items-center gap-2 mt-0.5">
              <span>{currentUser.email}</span> • <span>{currentUser.phone}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#CCCCCC]">
          <span className="px-3 py-1.5 rounded-xl bg-[#0E0E0E] border border-[#262626]">
            National ID: <strong className="text-white">38491024</strong>
          </span>
        </div>
      </div>

      {/* Sub-Tabs Selector */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {subTabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveSubTab(t.key as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === t.key
                ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                : 'bg-[#141414] text-[#888888] hover:text-white hover:bg-[#1C1C1C] border border-[#242424]'
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded text-[10px] ${
                activeSubTab === t.key ? 'bg-black text-[#F5D76E]' : 'bg-[#222222] text-[#AAAAAA]'
              }`}
            >
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* 1. APPLICATIONS SUB-TAB */}
      {activeSubTab === 'applications' && (
        <div className="space-y-4">
          {govApplications.map((app) => (
            <div key={app.id} className="p-5 rounded-2xl bg-[#141414] border border-[#2A2A2A] shadow-lg space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">
                    {app.organizationName} • {app.branchName}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">{app.serviceName}</h3>
                  <span className="text-xs text-[#888888] font-mono">Application ID: {app.id}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      app.status === 'Accepted' || app.status === 'Completed'
                        ? 'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40'
                        : app.status === 'Pending'
                        ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40'
                        : 'bg-[#EAB308]/20 text-[#F5D76E] border border-[#EAB308]/40'
                    }`}
                  >
                    ● {app.status}
                  </span>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="p-3.5 rounded-xl bg-[#0E0E0E] border border-[#222222] space-y-2">
                <span className="text-[10px] font-bold text-[#888888] uppercase tracking-wider block">Application Timeline</span>
                <div className="space-y-1.5">
                  {app.timeline.map((step, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span className="text-white font-medium">{step.status}</span>
                        {step.note && <span className="text-[11px] text-[#AAAAAA]">({step.note})</span>}
                      </div>
                      <span className="text-[10px] text-[#666666]">{step.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action for Pending status (Resubmission modal) */}
              {app.status === 'Pending' && (
                <div className="p-3 rounded-xl bg-[#2A1010] border border-[#EF4444]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-[#FCA5A5]">
                    <strong>Action Required:</strong> Administrator requested missing documents.
                  </div>
                  <button
                    onClick={() => setResubmitAppId(app.id)}
                    className="px-4 py-1.5 bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Upload Missing Documents
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Resubmission Modal */}
          {resubmitAppId && (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
              <div className="max-w-md w-full p-6 rounded-2xl bg-[#141414] border border-[#D4AF37] shadow-2xl space-y-4">
                <h3 className="text-base font-bold text-white">Resubmit Required Documents</h3>
                <p className="text-xs text-[#888888]">Attach scanned documents requested by the government reviewer.</p>

                <div className="p-4 rounded-xl bg-[#0A0A0A] border border-dashed border-[#444444] text-center relative">
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const f = e.target.files[0];
                        setResubmitFiles([{ name: f.name, url: '', type: f.type, size: '2.4 MB' }]);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <Upload className="w-6 h-6 text-[#D4AF37] mx-auto mb-1" />
                  <span className="text-xs text-white">
                    {resubmitFiles.length > 0 ? resubmitFiles[0].name : 'Click to select revised files'}
                  </span>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setResubmitAppId(null)}
                    className="px-4 py-2 rounded-xl bg-[#222222] text-xs font-semibold text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleResubmit(resubmitAppId)}
                    className="px-5 py-2 rounded-xl bg-[#D4AF37] text-black font-bold text-xs"
                  >
                    Confirm Resubmission
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. APPOINTMENTS SUB-TAB */}
      {activeSubTab === 'appointments' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Health Appointments */}
            {healthAppointments.map((apt) => (
              <div key={apt.id} className="p-5 rounded-2xl bg-[#141414] border border-[#2A2A2A] shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">Healthcare Specialist</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#22C55E]/15 text-[#22C55E]">
                    {apt.status}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">{apt.doctorName}</h4>
                <p className="text-xs text-[#888888]">{apt.facilityName}</p>

                <div className="p-3 rounded-xl bg-[#0E0E0E] border border-[#222222] flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-white">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> {apt.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-[#F5D76E] font-bold">
                    <Clock className="w-3.5 h-3.5" /> {apt.timeSlot}
                  </span>
                </div>

                <div className="text-[11px] text-[#777777]">Complaint: {apt.chiefComplaint}</div>
              </div>
            ))}

            {/* Bank Appointments */}
            {bankAppointments.map((apt) => (
              <div key={apt.id} className="p-5 rounded-2xl bg-[#141414] border border-[#2A2A2A] shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">Banking Specialist</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#22C55E]/15 text-[#22C55E]">
                    {apt.status}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">{apt.serviceName}</h4>
                <p className="text-xs text-[#888888]">{apt.bankName} • {apt.branchName}</p>

                <div className="p-3 rounded-xl bg-[#0E0E0E] border border-[#222222] flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-white">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> {apt.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-[#F5D76E] font-bold">
                    <Clock className="w-3.5 h-3.5" /> {apt.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. QUEUES SUB-TAB */}
      {activeSubTab === 'queues' && (
        <div className="space-y-4 max-w-xl">
          {bankTickets.map((tkt) => (
            <div key={tkt.id} className="p-6 rounded-2xl bg-[#141414] border border-[#D4AF37]/50 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-xs font-mono font-bold text-[#F5D76E]">{tkt.bankName}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#22C55E]/20 text-[#22C55E] font-bold">
                  ● {tkt.status}
                </span>
              </div>

              <div className="py-2 text-center">
                <span className="text-4xl font-black text-white">{tkt.ticketNumber}</span>
                <p className="text-xs text-[#888888] mt-1">{tkt.serviceName} • {tkt.branchName}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#0E0E0E] text-center text-xs">
                <div>
                  <span className="text-[#888888] block text-[10px]">People Ahead</span>
                  <span className="text-lg font-bold text-[#F5D76E]">{tkt.peopleAhead}</span>
                </div>
                <div>
                  <span className="text-[#888888] block text-[10px]">Est. Wait</span>
                  <span className="text-lg font-bold text-white">~{tkt.estimatedWaitMinutes}m</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => leaveBankQueue(tkt.id)}
                  className="text-xs text-[#EF4444] hover:underline"
                >
                  Leave Queue
                </button>
                <span className="text-xs text-[#888888]">Now Serving: <strong className="text-white">{tkt.currentServingTicket}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. EMERGENCIES SUB-TAB */}
      {activeSubTab === 'emergencies' && (
        <div className="space-y-4">
          {emergencyReports.map((em) => (
            <div key={em.id} className="p-5 rounded-2xl bg-[#180A0A] border border-[#EF4444]/40 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#EF4444] uppercase flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> {em.emergencyType} Emergency
                </span>
                <span className="text-xs font-mono font-bold text-white">Case #{em.id}</span>
              </div>

              <p className="text-xs text-[#CCCCCC]">{em.patientCondition}</p>
              <div className="text-[11px] text-[#888888] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#EF4444]" /> {em.locationName}
              </div>

              <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2A1010] flex items-center justify-between text-xs">
                <span className="text-white font-bold">{em.assignedAmbulanceUnit}</span>
                <span className="text-[#22C55E] font-bold">ETA: {em.etaMinutes} mins</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. BILLS & INVOICES SUB-TAB */}
      {activeSubTab === 'bills' && (
        <div className="space-y-4">
          {healthcareBills.map((bill) => (
            <div key={bill.id} className="p-5 rounded-2xl bg-[#141414] border border-[#2A2A2A] shadow-lg space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">
                    {bill.facilityName}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">Invoice #{bill.id}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] text-[#888888] uppercase block">Co-Pay Due</span>
                    <span className="text-base font-extrabold text-[#F5D76E]">KES {bill.copayAmount.toLocaleString()}</span>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      bill.status === 'Paid' ? 'bg-[#22C55E]/20 text-[#22C55E]' : 'bg-[#EAB308]/20 text-[#F5D76E]'
                    }`}
                  >
                    {bill.status}
                  </span>
                </div>
              </div>

              {bill.status === 'Pending' && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setSelectedBillForPay(bill)}
                    className="px-5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#F5D76E] text-black font-extrabold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Pay Co-Pay via M-Pesa / Card →
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Payment Modal */}
          {selectedBillForPay && (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
              <div className="max-w-md w-full p-6 rounded-3xl bg-[#141414] border-2 border-[#D4AF37] shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">Pay Hospital Co-Pay</h3>
                  <span className="text-xs font-mono text-[#D4AF37]">Invoice #{selectedBillForPay.id}</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#222222] text-center">
                  <span className="text-[10px] text-[#888888] uppercase block">Amount Payable</span>
                  <span className="text-2xl font-black text-white">KES {selectedBillForPay.copayAmount.toLocaleString()}</span>
                </div>

                {/* Method selector */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'mpesa', label: 'M-Pesa STK' },
                    { id: 'card', label: 'Visa / Card' },
                    { id: 'insurance', label: 'SHA Portal' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                        paymentMethod === m.id
                          ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                          : 'bg-[#0E0E0E] text-[#888888] border-[#242424]'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {paymentMethod === 'mpesa' && (
                  <div className="space-y-1">
                    <label className="text-xs text-[#888888]">M-Pesa Registered Number</label>
                    <input
                      type="text"
                      value={mpesaPhone}
                      onChange={(e) => setMpesaPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#333333] rounded-xl text-xs text-white"
                    />
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setSelectedBillForPay(null)}
                    className="px-4 py-2 rounded-xl bg-[#222222] text-xs font-semibold text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handlePayBill(selectedBillForPay.id)}
                    disabled={isProcessingPay}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F5D76E] via-[#D4AF37] to-[#B8860B] text-black font-extrabold text-xs shadow-lg flex items-center gap-2"
                  >
                    {isProcessingPay ? 'Initiating STK Prompt...' : `Pay KES ${selectedBillForPay.copayAmount.toLocaleString()}`}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. DOCUMENTS VAULT */}
      {activeSubTab === 'documents' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: 'National Identity Card (Smart ID)', type: 'Government Verified', date: 'Issued 2024', size: '1.2 MB' },
            { title: 'Certified Birth Certificate', type: 'Civil Registry', date: 'Verified 2025', size: '890 KB' },
            { title: 'KRA Tax Compliance Certificate', type: 'Tax PIN Verified', date: 'Valid 2026', size: '450 KB' },
            { title: 'Complete Blood Count (CBC) Lab Report', type: 'Diagnostic Lab', date: 'Aug 2026', size: '2.1 MB' },
          ].map((doc, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#141414] border border-[#242424] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                  <FolderLock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{doc.title}</h4>
                  <span className="text-[10px] text-[#888888]">{doc.type} • {doc.date}</span>
                </div>
              </div>
              <button className="p-2 rounded-lg bg-[#1F1F1F] hover:bg-[#2A2A2A] text-[#D4AF37] transition-colors" title="Download Vault Copy">
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 7. ACTIVITY HISTORY */}
      {activeSubTab === 'history' && (
        <div className="p-5 rounded-2xl bg-[#141414] border border-[#242424] space-y-3">
          <h3 className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider">Audit Trail</h3>
          <div className="space-y-2 text-xs divide-y divide-[#1F1F1F]">
            {[
              { text: 'Logged Emergency Dispatch #QL-EM-48291', time: 'Today, 10:15 AM', type: 'Emergency' },
              { text: 'Joined Queue Ticket #A-024 at KCB Bank', time: 'Today, 09:30 AM', type: 'Banking' },
              { text: 'Submitted Application for National ID Renewal #QL-ID-2026-00184', time: 'Yesterday, 02:40 PM', type: 'Government' },
              { text: 'Paid Hospital Invoice #INV-88219 (KES 2,400) via M-Pesa', time: 'Aug 28, 2026', type: 'Healthcare' },
            ].map((hist, idx) => (
              <div key={idx} className="pt-2 first:pt-0 flex items-center justify-between">
                <span className="text-white">{hist.text}</span>
                <span className="text-[10px] text-[#777777]">{hist.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
