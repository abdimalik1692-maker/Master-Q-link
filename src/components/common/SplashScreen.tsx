import React from 'react';
import { useQLINK } from '../../context/QLINKContext';
import { QLINKLogo } from './QLINKLogo';
import { ShieldCheck, Sparkles } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { loginWithGoogle, setSplashVisible } = useQLINK();

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none -top-20 -left-20" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none -bottom-20 -right-20" />

      {/* Main Container */}
      <div className="max-w-md w-full relative z-10 flex flex-col items-center space-y-8 animate-in fade-in zoom-in duration-500">
        {/* Large Iconic Metallic Q Logo */}
        <div className="relative">
          <QLINKLogo size="xl" showText={false} />
          {/* Subtle pulse ring */}
          <div className="absolute inset-0 rounded-2xl border-2 border-[#D4AF37]/40 animate-ping opacity-30 pointer-events-none" />
        </div>

        {/* Brand Tagline */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
            <span className="gold-gradient-text">QLINK</span>{' '}
            <span className="text-white">ECOSYSTEM</span>
          </h1>
          <p className="text-sm sm:text-base text-[#D4AF37] font-medium tracking-wide">
            One Platform. All Services.
          </p>
          <p className="text-xs text-[#888888] max-w-xs mx-auto leading-relaxed">
            Unified digital ecosystem bridging Citizens, County Government, Banking Networks, and Healthcare Systems in real-time.
          </p>
        </div>

        {/* Feature Highlights Pills */}
        <div className="grid grid-cols-3 gap-2 w-full pt-2">
          <div className="p-2.5 rounded-xl bg-[#141414] border border-[#242424] text-center">
            <span className="text-[10px] text-[#888888] uppercase block font-semibold">Government</span>
            <span className="text-xs font-bold text-white">Civil & IDs</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#141414] border border-[#242424] text-center">
            <span className="text-[10px] text-[#888888] uppercase block font-semibold">Banking</span>
            <span className="text-xs font-bold text-white">Live Queues</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#141414] border border-[#242424] text-center">
            <span className="text-[10px] text-[#888888] uppercase block font-semibold">Healthcare</span>
            <span className="text-xs font-bold text-white">24/7 ER Care</span>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full space-y-3 pt-4">
          {/* Google Auth Button */}
          <button
            onClick={loginWithGoogle}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#F5D76E] via-[#D4AF37] to-[#B8860B] text-black font-extrabold text-sm sm:text-base shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] transition-all flex items-center justify-center gap-3 active:scale-[0.99] cursor-pointer"
          >
            {/* Google G SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#000000"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#000000"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#000000"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#000000"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Quick Enter as Guest/Direct */}
          <button
            onClick={() => setSplashVisible(false)}
            className="w-full py-2.5 px-4 rounded-xl bg-[#161616] hover:bg-[#202020] border border-[#2A2A2A] text-xs font-semibold text-[#AAAAAA] hover:text-white transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Enter QLINK Ecosystem Directly</span>
          </button>
        </div>

        {/* Security badge */}
        <div className="flex items-center gap-1.5 text-[11px] text-[#666666]">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>OAuth 2.0 Biometric Clearance & AES-256 Vault Protection</span>
        </div>
      </div>
    </div>
  );
};
