import React, { useState } from 'react';
import { useQLINK } from '../../context/QLINKContext';
import {
  ReceiptText,
  CheckCircle2,
  DollarSign,
  CreditCard,
  Printer,
  Smartphone,
  Sparkles,
} from 'lucide-react';

export const BillingCashierWorkspace: React.FC = () => {
  const { healthcareBills, payHealthcareBill } = useQLINK();

  const [selectedBillId, setSelectedBillId] = useState<string>(healthcareBills[0]?.id || 'bill-1');
  const [clearedAlert, setClearedAlert] = useState<string | null>(null);

  const activeBill = healthcareBills.find((b) => b.id === selectedBillId) || healthcareBills[0];

  const handleCashierClear = (method: string) => {
    if (activeBill) {
      payHealthcareBill(activeBill.id, method);
      setClearedAlert(`Invoice #${activeBill.id} marked as Paid via ${method}. Receipt generated.`);
      setTimeout(() => setClearedAlert(null), 3000);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Cashier Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-b from-[#1C1C1C] via-[#141414] to-[#0D0D0D] border border-[#2A2A2A] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest">
            HOSPITAL BILLING & CASHIER REVENUE CONSOLE
          </span>
          <h1 className="text-2xl font-extrabold text-white font-display mt-0.5">
            Patient Progressive Invoices & Co-Pay Clearing
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs text-[#888888]">Active Patient Invoice:</label>
          <select
            value={selectedBillId}
            onChange={(e) => setSelectedBillId(e.target.value)}
            className="px-3.5 py-2 bg-[#0A0A0A] border border-[#333333] rounded-xl text-xs font-bold text-white focus:outline-none"
          >
            {healthcareBills.map((b) => (
              <option key={b.id} value={b.id}>
                {b.patientName} (KES {b.copayAmount.toLocaleString()}) - {b.status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {clearedAlert && (
        <div className="p-3.5 rounded-2xl bg-[#102A14] border border-[#22C55E]/40 text-xs text-[#22C55E] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{clearedAlert}</span>
        </div>
      )}

      {/* Invoice Card */}
      {activeBill && (
        <div className="p-6 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-6 max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#242424] pb-4">
            <div>
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">
                {activeBill.facilityName}
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">{activeBill.patientName}</h2>
              <p className="text-xs text-[#888888]">Invoice ID: #{activeBill.id} • Journey #{activeBill.journeyId}</p>
            </div>

            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                activeBill.status === 'Paid' ? 'bg-[#22C55E]/20 text-[#22C55E]' : 'bg-[#EAB308]/20 text-[#F5D76E]'
              }`}
            >
              ● {activeBill.status}
            </span>
          </div>

          {/* Itemized charges table */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider">Itemized Medical Bill</span>
            <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#222222] divide-y divide-[#181818] space-y-2">
              {activeBill.items.map((item, idx) => (
                <div key={idx} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-white font-semibold block">{item.name}</span>
                    <span className="text-[10px] text-[#777777] uppercase">{item.category} × {item.quantity}</span>
                  </div>
                  <span className="text-white font-mono font-bold">KES {item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals Calculation */}
          <div className="p-4 rounded-2xl bg-[#0E0E0E] border border-[#2A2A2A] space-y-2 text-xs">
            <div className="flex justify-between text-[#888888]">
              <span>Gross Patient Bill:</span>
              <span>KES {activeBill.totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[#22C55E]">
              <span>Insurance Coverage (SHA / NHIF):</span>
              <span>- KES {activeBill.insuranceCovered.toLocaleString()}</span>
            </div>
            <div className="pt-2 border-t border-[#222222] flex justify-between text-base font-extrabold text-[#F5D76E]">
              <span>Remaining Co-Pay to Collect:</span>
              <span>KES {activeBill.copayAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Cashier Clearance Buttons */}
          {activeBill.status !== 'Paid' ? (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
                Receive & Clear Payment via:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleCashierClear('M-Pesa STK Express')}
                  className="py-3 px-4 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-black font-extrabold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Smartphone className="w-4 h-4" /> M-Pesa STK Push
                </button>

                <button
                  onClick={() => handleCashierClear('Cash Payment at Counter')}
                  className="py-3 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#F5D76E] text-black font-extrabold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <DollarSign className="w-4 h-4" /> Cash at Counter
                </button>

                <button
                  onClick={() => handleCashierClear('Credit / Debit Card POS')}
                  className="py-3 px-4 rounded-xl bg-[#1C1C1C] hover:bg-[#252525] border border-[#333333] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" /> Card POS Machine
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-2 flex items-center justify-between text-xs text-[#22C55E]">
              <span>✓ Cleared via {activeBill.paymentMethod || 'M-Pesa'}</span>
              <button className="px-4 py-2 rounded-xl bg-[#1C1C1C] text-white font-bold text-xs border border-[#2E2E2E] flex items-center gap-1.5">
                <Printer className="w-3.5 h-3.5 text-[#D4AF37]" /> Print Official Tax Receipt
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
