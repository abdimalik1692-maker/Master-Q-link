import React from 'react';

interface QLINKLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const QLINKLogo: React.FC<QLINKLogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizeMap = {
    sm: { icon: 'w-7 h-7 text-xs', q: 'text-sm font-black', text: 'text-sm font-bold tracking-wider' },
    md: { icon: 'w-10 h-10 text-sm', q: 'text-xl font-black', text: 'text-lg font-bold tracking-widest' },
    lg: { icon: 'w-16 h-16 text-lg', q: 'text-3xl font-black', text: 'text-2xl font-bold tracking-widest' },
    xl: { icon: 'w-24 h-24 text-2xl', q: 'text-5xl font-black', text: 'text-4xl font-bold tracking-widest' },
  };

  const conf = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Metallic Q Brandmark */}
      <div
        className={`relative ${conf.icon} rounded-xl bg-gradient-to-br from-[#1E1A11] via-[#121212] to-[#0A0A0A] p-[1.5px] shadow-[0_0_20px_rgba(212,175,55,0.22)] border border-[#D4AF37]/40 flex items-center justify-center`}
      >
        {/* Subtle Shimmer background */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#D4AF37]/10 via-transparent to-[#F5D76E]/20" />
        
        {/* Q Letterform with custom luxury serif tail */}
        <div className="relative flex items-center justify-center">
          <span className={`font-brand ${conf.q} gold-gradient-text tracking-normal drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]`}>
            Q
          </span>
          {/* Subtle gold pinpoint spark */}
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#F5D76E] shadow-[0_0_6px_#F5D76E]" />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center tracking-widest">
            <span className={`font-brand ${conf.text} gold-gradient-text font-black`}>
              QLINK
            </span>
            <span className="ml-1 text-[9px] px-1.5 py-0.5 rounded bg-[#D4AF37]/15 text-[#F5D76E] border border-[#D4AF37]/30 font-mono font-semibold tracking-normal uppercase">
              ECOSYSTEM
            </span>
          </div>
          {size !== 'sm' && (
            <span className="text-[10px] text-[#A0A0A0] tracking-wider uppercase font-medium -mt-0.5">
              One Platform. All Services.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
