import { useState, useEffect } from 'react';
import { GithubLogo, LinkedinLogo, TwitterLogo, EnvelopeSimple, CaretUp } from "@phosphor-icons/react";

const Taskbar = () => {
  const [time, setTime] = useState("");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="h-16 w-full bg-[#f3f3f3] border-t border-gray-200 flex items-center px-10 justify-between z-50 relative font-sans">
      
      <div className="flex items-center gap-6 min-w-[150px]">
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-tight text-gray-800 leading-tight">{time}</span>
          <span className="text-sm font-medium text-gray-400">2026</span>
        </div>

        <div className="h-8 w-[1px] bg-gray-300"></div>

        <div className="relative">
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-1.5 text-xs font-black text-gray-500 hover:text-black transition-colors uppercase tracking-widest"
          >
            {currentLang === "EN" ? "AR" : "ENG"}
            <CaretUp size={14} weight="bold" className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>

          {isLangOpen && (
            <div className="absolute bottom-[calc(100%+15px)] left-0 w-32 bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-2xl overflow-hidden py-1">
              <button 
                onClick={() => { setCurrentLang("EN"); setIsLangOpen(false); }}
                className={`w-full px-4 py-2.5 text-[10px] font-black text-left transition-colors border-b border-gray-50 uppercase ${currentLang === "EN" ? "text-black bg-gray-50" : "text-gray-400 hover:text-black"}`}
              >
                English
              </button>
              <button 
                onClick={() => { setCurrentLang("AR"); setIsLangOpen(false); }}
                className={`w-full px-4 py-2.5 text-[10px] font-black text-left transition-colors ${currentLang === "AR" ? "text-black bg-gray-50" : "text-gray-400 hover:text-black"}`}
              >
                العربية
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="absolute inset-x-0 flex items-center justify-center pointer-events-none">
        <div className="flex items-center gap-10 pointer-events-auto">
          <a href="https://github.com/RA5l" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-all duration-300 transform hover:scale-110">
            <GithubLogo size={24} weight="regular" />
          </a>
          <a href="https://www.linkedin.com/in/raseel-mohammed/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-all duration-300 transform hover:scale-110">
            <LinkedinLogo size={24} weight="regular" />
          </a>
          <a href="https://x.com/rasetech0" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-all duration-300 transform hover:scale-110">
            <TwitterLogo size={24} weight="regular" />
          </a>
          <a href="mailto:raseelstudy@gmail.com" className="text-gray-400 hover:text-black transition-all duration-300 transform hover:scale-110">
            <EnvelopeSimple size={24} weight="regular" />
          </a>
        </div>
      </div>

      <div className="flex items-center min-w-[150px] justify-end">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 shadow-sm border border-white/50"></div>
      </div>

    </footer>
  );
};

export default Taskbar;