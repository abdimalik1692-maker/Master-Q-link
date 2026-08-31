import React, { useState } from 'react';
import { useQLINK } from '../../context/QLINKContext';
import { HealthcareFacility, HealthcareDoctor } from '../../types/qlink';
import {
  HeartPulse,
  CheckCircle2,
  MapPin,
  Clock,
  Stethoscope,
  Activity,
  FlaskConical,
  Scan,
  Pill,
  ReceiptText,
  Calendar,
  Phone,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Sparkles,
  CreditCard,
  Building2,
} from 'lucide-react';

export const CustomerHealthcare: React.FC = () => {
  const {
    healthcareFacilities,
    healthcareDoctors,
    healthcareJourneys,
    healthcareBills,
    selectedHealthFacility,
    setSelectedHealthFacility,
    selectedDoctor,
    setSelectedDoctor,
    bookHealthAppointment,
    setCustomerTab,
  } = useQLINK();

  const [activeTab, setActiveTab] = useState<'facilities' | 'doctors' | 'book_doctor' | 'journey_tracker' | 'live_bill'>('facilities');
  const [aptDate, setAptDate] = useState('2026-09-02');
  const [aptSlot, setAptSlot] = useState('11:00 AM');
  const [chiefComplaint, setChiefComplaint] = useState('Chest tightness and chronic cough');

  const currentFacility: HealthcareFacility = selectedHealthFacility || healthcareFacilities[0];
  const currentDoctor: HealthcareDoctor = selectedDoctor || healthcareDoctors[0];

  const doctorsForFacility = healthcareDoctors.filter((d) => d.facilityId === currentFacility.id);

  // Active Journey for the current citizen (e.g. John Doe)
  const activeJourney = healthcareJourneys[0];
  const activeBill = healthcareBills.find((b) => b.journeyId === activeJourney?.id) || healthcareBills[0];

  const handleBookDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    bookHealthAppointment(currentFacility.id, currentDoctor.id, aptDate, aptSlot, chiefComplaint);
    setCustomerTab('my_qlink');
  };

  const journeySteps = [
    { key: 'reception', label: '1. Registration', icon: <Building2 className="w-3.5 h-3.5" />, done: true },
    { key: 'triage', label: '2. Triage & Vitals', icon: <Activity className="w-3.5 h-3.5" />, done: true },
    { key: 'doctor', label: '3. Consultation', icon: <Stethoscope className="w-3.5 h-3.5" />, done: true },
    { key: 'lab', label: '4. Lab Diagnostics', icon: <FlaskConical className="w-3.5 h-3.5" />, done: activeJourney?.labOrders.some((l) => l.status === 'Completed') },
    { key: 'radiology', label: '5. Radiology Scan', icon: <Scan className="w-3.5 h-3.5" />, done: activeJourney?.radiologyOrders.some((r) => r.status === 'Completed') },
    { key: 'pharmacy', label: '6. Pharmacy', icon: <Pill className="w-3.5 h-3.5" />, done: activeJourney?.prescriptions.some((p) => p.status === 'Dispensed') },
    { key: 'billing', label: '7. Cashier Billing', icon: <ReceiptText className="w-3.5 h-3.5" />, done: activeBill?.status === 'Paid' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. FACILITIES LIST */}
      {activeTab === 'facilities' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#181818] to-[#121212] border border-[#2A2A2A] shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37]">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-white font-display">
                    Healthcare Services Network
                  </h1>
                  <p className="text-xs text-[#888888]">
                    Accredited hospitals, clinical specialists, diagnostic laboratories & pharmacies
                  </p>
                </div>
              </div>

              {activeJourney && (
                <button
                  onClick={() => setActiveTab('journey_tracker')}
                  className="px-3.5 py-2 rounded-xl bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37] text-xs font-bold text-[#F5D76E] flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(212,175,55,0.15)]"
                >
                  <Activity className="w-4 h-4 animate-pulse text-[#22C55E]" />
                  <span>Track Active Care Journey</span>
                </button>
              )}
            </div>
          </div>

          {/* Facilities Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {healthcareFacilities.map((facility) => (
              <div
                key={facility.id}
                className="p-5 rounded-2xl bg-[#141414] hover:bg-[#1A1A1A] border border-[#262626] hover:border-[#D4AF37]/50 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5">
                    <img src={facility.logo} alt={facility.name} className="w-14 h-14 rounded-xl object-cover border border-[#333333]" />
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-bold text-white">{facility.name}</h3>
                        {facility.verified && <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />}
                      </div>
                      <p className="text-xs text-[#888888] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {facility.location}
                      </p>
                      <span className="text-[10px] font-bold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.2 rounded-full mt-1 inline-block">
                        {facility.openingHours}
                      </span>
                    </div>
                  </div>

                  {/* Departments */}
                  <div className="mt-4 space-y-1">
                    <span className="text-[10px] font-bold text-[#888888] uppercase">Clinical Departments:</span>
                    <div className="flex flex-wrap gap-1">
                      {facility.departments.map((dept, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#1C1C1C] text-[#CCCCCC] border border-[#282828]">
                          {dept}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#222222] flex items-center justify-between">
                  <span className="text-xs text-[#D4AF37] font-semibold flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> {facility.phone}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedHealthFacility(facility);
                      setActiveTab('doctors');
                    }}
                    className="px-4 py-2 bg-[#D4AF37] hover:bg-[#F5D76E] text-black font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Doctors</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. DOCTORS DIRECTORY FOR FACILITY */}
      {activeTab === 'doctors' && (
        <div className="space-y-6">
          <button
            onClick={() => setActiveTab('facilities')}
            className="flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#F5D76E] font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Facilities
          </button>

          {/* Facility Header */}
          <div className="p-5 rounded-2xl bg-[#141414] border border-[#2A2A2A] shadow-lg flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">Facility Doctors</span>
              <h2 className="text-xl font-bold text-white mt-0.5">{currentFacility.name}</h2>
              <p className="text-xs text-[#888888]">{currentFacility.location}</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#F5D76E] px-3 py-1 rounded-xl bg-[#0E0E0E] border border-[#252525]">
              {doctorsForFacility.length} Specialists On Duty
            </span>
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(doctorsForFacility.length > 0 ? doctorsForFacility : healthcareDoctors).map((doc) => (
              <div
                key={doc.id}
                className="p-5 rounded-2xl bg-[#141414] hover:bg-[#1A1A1A] border border-[#262626] hover:border-[#D4AF37]/50 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-3.5">
                    <img src={doc.avatar} alt={doc.name} className="w-14 h-14 rounded-full object-cover border border-[#D4AF37]/50" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold text-white">{doc.name}</h4>
                        <span className="text-xs font-bold text-[#F5D76E] bg-[#1C1C1C] px-2 py-0.5 rounded border border-[#2A2A2A]">
                          ★ {doc.rating} ({doc.reviewsCount})
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[#D4AF37]">{doc.specialty}</span>
                      <p className="text-[11px] text-[#888888] mt-0.5">{doc.qualifications} • {doc.experienceYears} yrs exp</p>
                    </div>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-[#202020] flex items-center justify-between text-xs">
                    <span className="text-[#CCCCCC]">
                      Consultation Fee: <strong className="text-white">KES {doc.consultationFee.toLocaleString()}</strong>
                    </span>
                    <span className="text-[11px] text-[#22C55E] font-medium">
                      ● {doc.onDuty ? 'Available Today' : 'Off-Duty'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#222222] flex items-center justify-between">
                  <span className="text-[11px] text-[#888888]">Next: {doc.availableSlots[0]}</span>
                  <button
                    onClick={() => {
                      setSelectedDoctor(doc);
                      setActiveTab('book_doctor');
                    }}
                    className="px-4 py-2 bg-[#D4AF37] hover:bg-[#F5D76E] text-black font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Appointment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. BOOK DOCTOR APPOINTMENT MODAL */}
      {activeTab === 'book_doctor' && (
        <form onSubmit={handleBookDoctor} className="space-y-6 max-w-lg mx-auto">
          <button
            type="button"
            onClick={() => setActiveTab('doctors')}
            className="flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#F5D76E] font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Doctors
          </button>

          <div className="p-6 rounded-2xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-4">
            <div className="border-b border-[#242424] pb-3">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">
                {currentDoctor.facilityName}
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">Book Specialist Consultation</h2>
              <p className="text-xs text-[#888888]">With {currentDoctor.name} ({currentDoctor.specialty})</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#CCCCCC]">Appointment Date</label>
                <input
                  type="date"
                  value={aptDate}
                  onChange={(e) => setAptDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#CCCCCC]">Preferred Time Slot</label>
                <select
                  value={aptSlot}
                  onChange={(e) => setAptSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white"
                >
                  {currentDoctor.availableSlots.map((slot, idx) => (
                    <option key={idx} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#CCCCCC]">Chief Complaint / Symptoms</label>
              <textarea
                rows={3}
                placeholder="Describe your health symptoms, duration, and relevant medical history..."
                value={chiefComplaint}
                onChange={(e) => setChiefComplaint(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white focus:outline-none"
                required
              />
            </div>

            <div className="p-3 rounded-xl bg-[#0E0E0E] border border-[#222222] flex items-center justify-between text-xs">
              <span className="text-[#888888]">Standard Consultation:</span>
              <span className="text-white font-bold">KES {currentDoctor.consultationFee.toLocaleString()}</span>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('doctors')}
                className="px-4 py-2 rounded-xl bg-[#1C1C1C] text-xs font-semibold text-white border border-[#2E2E2E]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F5D76E] via-[#D4AF37] to-[#B8860B] text-black font-extrabold text-xs shadow-lg transition-all cursor-pointer"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </form>
      )}

      {/* 4. ACTIVE CLINICAL CARE JOURNEY TRACKER */}
      {activeTab === 'journey_tracker' && activeJourney && (
        <div className="space-y-6">
          <button
            onClick={() => setActiveTab('facilities')}
            className="flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#F5D76E] font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Facilities
          </button>

          {/* Journey Header */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#181818] to-[#121212] border border-[#2A2A2A] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">
                Clinical Journey • {activeJourney.facilityName}
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-0.5">{activeJourney.patientName}</h2>
              <p className="text-xs text-[#888888] mt-0.5">
                Doctor in Charge: <strong className="text-white">{activeJourney.doctorName}</strong> ({activeJourney.department})
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('live_bill')}
                className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#F5D76E] text-black font-bold text-xs shadow-lg flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ReceiptText className="w-4 h-4" />
                <span>View Live Progressive Bill</span>
              </button>
            </div>
          </div>

          {/* 7-Step Progress Pipeline */}
          <div className="p-5 rounded-2xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider">
              Care Pathway Status: <span className="text-[#22C55E] uppercase">{activeJourney.stage.replace('_', ' ')}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {journeySteps.map((s, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-center flex flex-col items-center justify-between gap-2 ${
                    s.done
                      ? 'bg-[#18281A] border-[#22C55E]/40 text-[#22C55E]'
                      : 'bg-[#121212] border-[#222222] text-[#666666]'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5">{s.icon}</div>
                  <span className="text-[11px] font-bold leading-tight">{s.label}</span>
                  <span className="text-[9px] font-semibold uppercase">{s.done ? '✓ Done' : 'Pending'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Journey Clinical Summary Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Vitals */}
            {activeJourney.vitals && (
              <div className="p-5 rounded-2xl bg-[#141414] border border-[#2A2A2A] space-y-3">
                <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4" /> Triage Recorded Vitals
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#0E0E0E] border border-[#222222]">
                    <span className="text-[#888888] block text-[10px]">Blood Pressure</span>
                    <span className="text-white font-bold">{activeJourney.vitals.bloodPressure}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0E0E0E] border border-[#222222]">
                    <span className="text-[#888888] block text-[10px]">Heart Rate</span>
                    <span className="text-white font-bold">{activeJourney.vitals.heartRate} bpm</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0E0E0E] border border-[#222222]">
                    <span className="text-[#888888] block text-[10px]">SpO2 Level</span>
                    <span className="text-[#22C55E] font-bold">{activeJourney.vitals.spO2}%</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0E0E0E] border border-[#222222]">
                    <span className="text-[#888888] block text-[10px]">Temperature</span>
                    <span className="text-white font-bold">{activeJourney.vitals.temperature}°C</span>
                  </div>
                </div>
              </div>
            )}

            {/* Diagnostic Orders & Pharmacy */}
            <div className="p-5 rounded-2xl bg-[#141414] border border-[#2A2A2A] space-y-3">
              <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                <FlaskConical className="w-4 h-4" /> Active Diagnostic Orders
              </h4>
              <div className="space-y-2 text-xs">
                {activeJourney.labOrders.map((lab) => (
                  <div key={lab.id} className="p-2.5 rounded-xl bg-[#0E0E0E] border border-[#222222] flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">{lab.testName}</span>
                      <span className="text-[10px] text-[#888888]">Status: {lab.status}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#D4AF37]">KES {lab.cost}</span>
                  </div>
                ))}
                {activeJourney.prescriptions.map((rx) => (
                  <div key={rx.id} className="p-2.5 rounded-xl bg-[#0E0E0E] border border-[#222222] flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">{rx.medicationName} ({rx.dosage})</span>
                      <span className="text-[10px] text-[#888888]">{rx.frequency} • {rx.duration}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#D4AF37]">KES {rx.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. LIVE PROGRESSIVE BILLING */}
      {activeTab === 'live_bill' && activeBill && (
        <div className="space-y-6 max-w-xl mx-auto">
          <button
            onClick={() => setActiveTab('journey_tracker')}
            className="flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#F5D76E] font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Care Journey
          </button>

          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#1C1C1C] via-[#141414] to-[#0A0A0A] border-2 border-[#D4AF37]/50 shadow-2xl space-y-5">
            <div className="border-b border-[#242424] pb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">
                  Progressive Hospital Invoice
                </span>
                <h2 className="text-xl font-bold text-white mt-0.5">Invoice #{activeBill.id}</h2>
                <p className="text-xs text-[#888888]">{activeBill.patientName} • {activeBill.facilityName}</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EAB308]/20 text-[#F5D76E] border border-[#EAB308]/40">
                ● {activeBill.status}
              </span>
            </div>

            {/* Itemized charges */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider">Itemized Breakdown</span>
              <div className="p-3.5 rounded-2xl bg-[#080808] border border-[#222222] divide-y divide-[#181818] space-y-2">
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

            {/* Financial Summary */}
            <div className="p-4 rounded-2xl bg-[#0E0E0E] border border-[#2A2A2A] space-y-2 text-xs">
              <div className="flex justify-between text-[#888888]">
                <span>Gross Total</span>
                <span>KES {activeBill.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#22C55E]">
                <span>Insurance Coverage (SHA / NHIF)</span>
                <span>- KES {activeBill.insuranceCovered.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-[#222222] flex justify-between text-base font-extrabold text-[#F5D76E]">
                <span>Net Co-Pay Due</span>
                <span>KES {activeBill.copayAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2">
              <button
                onClick={() => setCustomerTab('my_qlink')}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F5D76E] via-[#D4AF37] to-[#B8860B] text-black font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pay Co-Pay via M-Pesa / Card (KES {activeBill.copayAmount.toLocaleString()})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
