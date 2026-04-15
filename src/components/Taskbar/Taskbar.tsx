import { useState, useEffect, useRef } from 'react';
import { GithubLogo, LinkedinLogo, TwitterLogo, EnvelopeSimple, CaretUp, Cloud } from "@phosphor-icons/react";
import { useTranslation } from 'react-i18next';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import folderIcon from '../../assets/folder26.png'; 

interface TaskbarProps {
  openWindows: string[];
  activeWindow: string | null;
  minimizedWindows: string[];
  onTabClick: (id: string) => void;
}

const Taskbar = ({ openWindows, activeWindow, minimizedWindows, onTabClick }: TaskbarProps) => {
  const [time, setTime] = useState("");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const { i18n, t } = useTranslation();

  const formatNumbers = (num: string | number) => {
    if (i18n.language === 'ar') {
      return num.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
    }
    return num;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeLocale = i18n.language === 'ar' ? 'ar-SA' : 'en-US';
      setTime(now.toLocaleTimeString(timeLocale, { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, [i18n.language]);

  useEffect(() => {
    document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  return (
    <footer className="h-16 w-full bg-[#f3f3f3]/90 backdrop-blur-md border-t border-gray-200 flex items-center px-10 justify-between z-[9999] relative font-sans">
      
      <div className="flex items-center gap-6 min-w-[200px]">
        <div className="relative" ref={calendarRef}>
          <button 
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className="flex flex-col items-start hover:bg-black/[0.04] p-1.5 rounded-lg transition-all active:scale-95"
          >
            <span className="text-lg font-bold tracking-tight text-gray-800 leading-tight">{formatNumbers(time)}</span>
            <span className="text-sm font-medium text-gray-400">{formatNumbers(2026)}</span>
          </button>

          {isCalendarOpen && (
            <div className={`absolute bottom-[calc(100%+15px)] p-4 bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 z-50 w-[300px] ${i18n.language === 'ar' ? 'right-0' : 'left-0'}`}>
              <Calendar locale={i18n.language === 'ar' ? 'ar-SA' : 'en-US'} value={new Date()} className="custom-calendar-ui" />
            </div>
          )}
        </div>

        <div className="h-8 w-[1px] bg-gray-300"></div>
        
        <div className="relative">
          <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-1.5 text-xs font-black text-gray-500 hover:text-black transition-colors uppercase tracking-widest">
            {i18n.language === "en" ? "AR" : "ENG"}
            <CaretUp size={14} weight="bold" className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>
          {isLangOpen && (
            <div className={`absolute bottom-[calc(100%+15px)] ${i18n.language === 'ar' ? 'right-0' : 'left-0'} w-32 bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-2xl overflow-hidden py-1`}>
              <button onClick={() => changeLanguage("en")} className={`w-full px-4 py-2.5 text-[10px] font-black text-left transition-colors border-b border-gray-50 uppercase ${i18n.language === "en" ? "text-black bg-gray-50" : "text-gray-400 hover:text-black"}`}>English</button>
              <button onClick={() => changeLanguage("ar")} className={`w-full px-4 py-2.5 text-[10px] font-black text-left transition-colors ${i18n.language === "ar" ? "text-black bg-gray-50" : "text-gray-400 hover:text-black"}`}>العربية</button>
            </div>
          )}
        </div>
      </div>

      <div className="absolute inset-x-0 flex items-center justify-center pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          {openWindows.map((id) => {
             const isMinimized = minimizedWindows?.includes(id);
             return (
               <button key={id} onClick={() => onTabClick(id)} className={`group relative flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-300 ${activeWindow === id && !isMinimized ? 'bg-black/[0.06] shadow-inner' : 'hover:bg-black/[0.03]'}`}>
                 <img src={folderIcon} alt={id} className={`w-9 h-9 object-contain transition-all duration-300 group-hover:scale-110 ${activeWindow === id && !isMinimized ? 'scale-110' : isMinimized ? 'opacity-40 grayscale' : 'grayscale-[0.5] opacity-80'}`} />
                 {!isMinimized && <div className={`absolute bottom-1.5 w-1 h-1 rounded-full bg-black transition-all duration-300 ${activeWindow === id ? 'opacity-100 scale-100' : 'opacity-40 scale-75'}`} />}
                 <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[9px] px-2 py-1 rounded font-black uppercase pointer-events-none whitespace-nowrap tracking-tighter">{t(`sections.${id}`)}</span>
               </button>
             );
          })}
          {openWindows.length > 0 && <div className="h-8 w-[1px] bg-gray-300 mx-2"></div>}
          <div className="flex items-center gap-1">
            <a href="https://github.com/RA5l" target="_blank" rel="noreferrer" className="group w-12 h-12 flex items-center justify-center rounded-md hover:bg-black/[0.04] transition-all"><GithubLogo size={28} weight="regular" className="text-black opacity-70 group-hover:opacity-100" /></a>
            <a href="https://www.linkedin.com/in/raseel-mohammed/" target="_blank" rel="noreferrer" className="group w-12 h-12 flex items-center justify-center rounded-md hover:bg-black/[0.04] transition-all"><LinkedinLogo size={28} weight="regular" className="text-black opacity-70 group-hover:opacity-100" /></a>
            <a href="https://x.com/rasetech0" target="_blank" rel="noreferrer" className="group w-12 h-12 flex items-center justify-center rounded-md hover:bg-black/[0.04] transition-all"><TwitterLogo size={28} weight="regular" className="text-black opacity-70 group-hover:opacity-100" /></a>
            <a href="mailto:raseelstudy@gmail.com" className="group w-12 h-12 flex items-center justify-center rounded-md hover:bg-black/[0.04] transition-all"><EnvelopeSimple size={28} weight="regular" className="text-black opacity-70 group-hover:opacity-100" /></a>
          </div>
        </div>
      </div>

      <div className="flex items-center min-w-[200px] justify-end">
        <div className="group relative w-10 h-10 flex items-center justify-center">
          <Cloud 
            size={20} 
            weight="fill" 
            className={`absolute text-gray-400/0 transition-all duration-500 group-hover:text-gray-400/80 ${i18n.language === 'ar' ? 'translate-x-3 -translate-y-2 group-hover:translate-x-4' : '-translate-x-3 -translate-y-2 group-hover:-translate-x-4'}`} 
          />
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 shadow-md border border-white/50 relative z-10 transition-transform duration-500 group-hover:scale-90" />
          <Cloud 
            size={18} 
            weight="fill" 
            className={`absolute text-gray-300/0 transition-all duration-500 group-hover:text-gray-300/90 ${i18n.language === 'ar' ? '-translate-x-3 translate-y-1 group-hover:-translate-x-4' : 'translate-x-3 translate-y-1 group-hover:translate-x-4'}`} 
          />
        </div>
      </div>

    </footer>
  );
};

export default Taskbar;