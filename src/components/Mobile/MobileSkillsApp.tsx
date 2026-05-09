import React, { useState } from 'react';
import { ChevronLeft, Plus, Globe, Smartphone, Wrench, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  onClose: () => void;
}

const MobileSkillsApp: React.FC<Props> = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const skillCategories = [
    {
      id: 'web',
      title: t('skills_content.web_title'),
      list: t('skills_content.web_list', { returnObjects: true }) as string[],
      color: 'bg-[#0A2647]',
      icon: <Globe size={26} className="text-white/90" />
    },
    {
      id: 'mobile',
      title: t('skills_content.mobile_title'),
      list: t('skills_content.mobile_list', { returnObjects: true }) as string[],
      color: 'bg-[#310E31]', 
      icon: <Smartphone size={26} className="text-white/90" />
    },
    {
      id: 'tools',
      title: t('skills_content.tools_title'),
      list: t('skills_content.tools_list', { returnObjects: true }) as string[],
      color: 'bg-[#0F172A]',
      icon: <Wrench size={26} className="text-white/90" />
    },
    {
      id: 'work',
      title: t('skills_content.work_title'),
      list: t('skills_content.work_list', { returnObjects: true }) as string[],
      color: 'bg-[#062C30]', 
      icon: <Briefcase size={26} className="text-white/90" />
    }
  ];

  return (
    <div className={`flex flex-col h-full bg-[#F2F2F7] text-black font-sans ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      <div className="px-5 pt-8 pb-4 flex justify-between items-center bg-[#F2F2F7]/80 backdrop-blur-md sticky top-0 z-[60]">
        <button onClick={onClose} className="text-[#007AFF] flex items-center gap-1 active:opacity-50">
          <ChevronLeft size={28} strokeWidth={2.5} className={isRTL ? 'rotate-180' : ''} />
          <span className="text-[17px] font-medium">{isRTL ? 'خروج' : 'Exit'}</span>
        </button>
        <h1 className="text-xl font-bold tracking-tight">{isRTL ? 'المحفظة' : 'Wallet'}</h1>
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-[#007AFF]">
          <Plus size={20} strokeWidth={3} />
        </div>
      </div>

      <div className="flex-1 px-4 overflow-y-auto pt-2 pb-32">
        <div className="flex flex-col -space-y-36"> 
          {skillCategories.map((category) => {
            const isExpanded = expandedCard === category.id;
            
            return (
              <div 
                key={category.id}
                onClick={() => setExpandedCard(isExpanded ? null : category.id)}
                className={`
                  ${category.color} rounded-[22px] p-6 shadow-2xl transition-all duration-500 cursor-pointer relative
                  ${isExpanded ? 'z-50 translate-y-0 mb-6 scale-100' : 'z-10 hover:-translate-y-6'}
                  ${expandedCard && !isExpanded ? 'opacity-20 blur-[2px] scale-95' : 'opacity-100'}
                `}
                style={{ minHeight: isExpanded ? 'auto' : '200px' }}
              >
                <div className="flex justify-between items-start mb-10">
                  <div className="flex flex-col">
                    <h2 className="text-white text-2xl font-bold tracking-tight">{category.title}</h2>
                    <span className="text-white/50 text-[10px] font-bold uppercase mt-1">{isRTL ? 'الأصول الأساسية' : 'CORE ASSETS'}</span>
                  </div>
                  {category.icon}
                </div>

          <div className="relative w-12 h-9 bg-gradient-to-br from-[#FFE082] via-[#FFD700] to-[#FDD835] rounded-md mb-4 shadow-inner overflow-hidden border border-[#D4AF37]/50 z-10 group-active:scale-105 transition-transform">
            <div className="absolute inset-0 p-0.5 grid grid-cols-3 gap-[1px] opacity-60">
                {[1, 2, 3].map((col) => (
            <div key={col} className="flex flex-col gap-[1px]">
                {[1, 2, 3, 4].map((row) => (
            <div key={`${col}-${row}`} className="bg-[#B8860B]/30 rounded-sm flex-1" />
                ))}
            </div>
                ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent rotate-12 -translate-x-full group-active:translate-x-full transition-transform duration-1000" />
          </div>

                {isExpanded && (
                  <div className="grid grid-cols-2 gap-3 mt-4 pt-6 border-t border-white/10 animate-in fade-in duration-700">
                    {category.list.map((skill, i) => (
                      <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-white text-[13px] font-medium border border-white/5">
                        {skill}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-8 flex justify-between items-end">
                  <span className="text-white/30 font-mono text-[9px] tracking-[3px]">RASEEL MOHAMMED</span>
                  {!isExpanded && <span className="text-white/40 text-[10px] italic">{isRTL ? 'إظهار التفاصيل' : 'Show Details'}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileSkillsApp;