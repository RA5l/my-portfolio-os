import React from 'react';
import { useTranslation } from 'react-i18next';

const STATIC_DOTS = [...Array(15)].map(() => ({
  size: 1.5 + Math.random() * 2,
  top: 10 + Math.random() * 80,
  left: 10 + Math.random() * 80,
  cssVars: {
    '--dot-duration': `${3 + Math.random() * 5}s`,
    '--dot-delay': `${Math.random() * -5}s`
  } as React.CSSProperties
}));

export const CalendarWidget: React.FC = () => {
  const { i18n } = useTranslation();
  const now = new Date();
  const isAr = i18n.language === 'ar';

  const formatNumbers = (num: string | number) => {
    if (isAr) return num.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
    return num;
  };

  const dayName = new Intl.DateTimeFormat(isAr ? 'ar-SA' : 'en-US', { weekday: 'long' }).format(now);
  const dateText = new Intl.DateTimeFormat(isAr ? 'ar-SA' : 'en-US', { day: 'numeric', month: 'long' }).format(now);
  
  const timeText = formatNumbers(now.toLocaleTimeString(isAr ? 'ar-SA' : 'en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false 
  }));

  return (
    <div className="w-full h-16 bg-white/50 backdrop-blur-md rounded-[24px] flex items-center justify-between px-6 border border-white/40 shadow-sm text-black font-sans">
      <div className="flex flex-col items-start leading-tight">
        <span className="text-red-500 text-[9px] font-black uppercase tracking-[0.2em]">
          {dayName}
        </span>
        <span className="text-lg font-bold opacity-80 tracking-tighter">
          {dateText}
        </span>
      </div>
      
      <div className="flex flex-col items-end leading-none">
        <span className="text-[7px] font-black uppercase mb-1 tracking-widest opacity-40">
           {isAr ? 'النظام نشط' : 'SYSTEM ACTIVE'}
        </span>
        <span className="text-[11px] font-bold opacity-70 tracking-tighter">
          {timeText}
        </span>
      </div>
    </div>
  );
};

const MobileWidgets: React.FC = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <div className="flex flex-col items-center w-full gap-2 font-sans">
      <div className="flex justify-between items-start w-full gap-3">
        
        <div className="flex flex-col items-center gap-1 flex-[1.5]">
          <div className="w-full h-32 bg-black rounded-[32px] flex flex-col items-center justify-center shadow-xl relative overflow-hidden group border border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08)_0%,transparent_70%)] animate-pulse" />

            <div className="absolute inset-0">
              {STATIC_DOTS.map((dot, i) => (
                <div
                  key={i}
                  style={{
                    width: `${dot.size}px`,
                    height: `${dot.size}px`,
                    top: `${dot.top}%`,
                    left: `${dot.left}%`,
                    ...dot.cssVars
                  }}
                  className="absolute bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.7)] animate-fluid-network"
                />
              ))}
            </div>

            <div className="text-center flex flex-col gap-1.5 relative z-10 select-none px-2">
              <h3 className="text-white text-[10px] font-black font-bold tracking-tighter leading-tight drop-shadow-lg flex justify-center items-center gap-1.5 w-full select-none" dir={isAr ? 'rtl' : 'ltr'}>
  
            <span className="whitespace-nowrap">
            {isAr ? 'الشغف:' : 'Passion:'} <span dir="ltr">100%</span>
            </span>

            <span className="opacity-30">|</span>

            <span className="whitespace-nowrap">
            {isAr ? 'الاستجابة:' : 'Latency:'} <span dir="ltr">0ms</span>
            </span>

              </h3>
              <p className="text-white/40 text-[7px] font-bold leading-tight px-4 transition-colors group-hover:text-white/60">
                {isAr 
                  ? 'متحمسة للتعاون في مشروعك القادم' 
                  : 'Excited to collaborate on your next big project.'}
              </p>
            </div>
          </div>
          <span className="text-[8px] font-black text-black/30 uppercase tracking-widest text-center w-full">Core Metrics</span>
        </div>

        <div className="flex flex-col items-center gap-1 flex-1">
          <button
            onClick={() => i18n.changeLanguage(isAr ? 'en' : 'ar')}
            className="w-full h-32 bg-white/80 backdrop-blur-md rounded-[32px] flex flex-col items-center justify-center shadow-sm border border-black/5 active:scale-95 transition-transform group"
          >
            <span className="text-[7px] text-black/30 font-black uppercase mb-1 px-2 text-center leading-tight">
                {isAr ? 'اضغط لتحويل اللغة' : 'Tap to change language'}
            </span>
            <span className="text-2xl font-black text-black">{isAr ? 'AR' : 'EN'}</span>
          </button>
          <span className="text-[8px] font-black text-black/30 uppercase tracking-widest text-center w-full">Language</span>
        </div>
      </div>

      <style>{`
        @keyframes fluid-network {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          33% { transform: translate(12px, -8px) scale(1.4); opacity: 0.8; }
          66% { transform: translate(-6px, 10px) scale(0.9); opacity: 0.4; }
        }
        .animate-fluid-network {
          animation-name: fluid-network;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-duration: var(--dot-duration, 5s);
          animation-delay: var(--dot-delay, 0s);
        }
      `}</style>
    </div>
  );
};

export default MobileWidgets;