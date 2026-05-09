import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const MobileStatusBar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const { i18n } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[14px] font-semibold text-black select-none">
      <div>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] bg-black/10 px-1.5 py-0.5 rounded uppercase">{i18n.language}</span>
        <Signal size={16} strokeWidth={2.5} />
        <Wifi size={16} strokeWidth={2.5} />
        <div className="relative flex items-center">
          <Battery size={20} strokeWidth={2} />
          <div className="absolute left-[3px] top-[7px] w-2.5 h-1.5 bg-current rounded-sm" />
        </div>
      </div>
    </div>
  );
};

export default MobileStatusBar;