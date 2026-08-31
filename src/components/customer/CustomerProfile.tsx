import React, { useState } from 'react';
import { useQLINK } from '../../context/QLINKContext';
import {
  User,
  ShieldCheck,
  Bell,
  Smartphone,
  MapPin,
  Lock,
  Globe,
  LogOut,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const CustomerProfile: React.FC = () => {
  const { currentUser, setSplashVisible } = useQLINK();

  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [biometricUnlock, setBiometricUnlock] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSavePreferences = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-2xl mx-auto">
      {/* Profile Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-b from-[#181818] to-[#121212] border border-[#2A2A2A] shadow-xl text-center space-y-3">
        <div className="relative w-20 h-20 mx-auto">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          />
          <div className="absolute bottom-0 right-0 p-1 bg-[#22C55E] rounded-full border-2 border-[#121212]">
            <CheckCircle2 className="w-3.5 h-3.5 text-black" />
          </div>
        </div>

        <div>
          <h1 className="text-xl font-bold text-white">{currentUser.name}</h1>
          <p className="text-xs text-[#D4AF37] font-semibold">{currentUser.email}</p>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#1C1C1C] text-[#AAAAAA] border border-[#2E2E2E] mt-1.5 inline-block">
            QLINK Citizen ID: QL-CITIZEN-9824
          </span>
        </div>
      </div>

      {/* Account Info Details */}
      <div className="p-6 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-4">
        <h3 className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider">Citizen Particulars</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#0E0E0E] border border-[#222222]">
            <span className="text-[#888888] block text-[10px]">Full Legal Name</span>
            <span className="text-white font-semibold">{currentUser.name}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0E0E0E] border border-[#222222]">
            <span className="text-[#888888] block text-[10px]">National ID Number</span>
            <span className="text-white font-semibold">38491024</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0E0E0E] border border-[#222222]">
            <span className="text-[#888888] block text-[10px]">Verified Phone (M-Pesa)</span>
            <span className="text-white font-semibold">{currentUser.phone}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0E0E0E] border border-[#222222]">
            <span className="text-[#888888] block text-[10px]">County Location</span>
            <span className="text-white font-semibold">{currentUser.city}, {currentUser.country}</span>
          </div>
        </div>
      </div>

      {/* Security & Notification Preferences */}
      <div className="p-6 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-4">
        <h3 className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider">Preferences & Security</h3>

        <div className="space-y-3 divide-y divide-[#1F1F1F]">
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-xs font-bold text-white block">Biometric / Passkey Authentication</span>
              <span className="text-[10px] text-[#888888]">Use Face ID or Fingerprint for queue & medical authorizations</span>
            </div>
            <input
              type="checkbox"
              checked={biometricUnlock}
              onChange={(e) => setBiometricUnlock(e.target.checked)}
              className="w-4 h-4 accent-[#D4AF37]"
            />
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <span className="text-xs font-bold text-white block">Instant SMS Queue Ticker Alerts</span>
              <span className="text-[10px] text-[#888888]">Receive notifications when your bank queue number is 2 tickets away</span>
            </div>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="w-4 h-4 accent-[#D4AF37]"
            />
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <span className="text-xs font-bold text-white block">Email Clinical & Civil Receipts</span>
              <span className="text-[10px] text-[#888888]">Downloadable PDF copies sent directly to your inbox</span>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 accent-[#D4AF37]"
            />
          </div>
        </div>

        <div className="pt-3 flex items-center justify-between">
          {savedSuccess && (
            <span className="text-xs text-[#22C55E] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Preferences saved!
            </span>
          )}
          <button
            onClick={handleSavePreferences}
            className="ml-auto px-5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#F5D76E] text-black font-extrabold text-xs shadow-md transition-all cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Sign Out Action */}
      <div className="text-center pt-2">
        <button
          onClick={() => setSplashVisible(true)}
          className="text-xs text-[#EF4444] hover:text-[#F87171] font-semibold flex items-center justify-center gap-1.5 mx-auto transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out / Return to Splash
        </button>
      </div>
    </div>
  );
};
