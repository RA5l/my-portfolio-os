/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  X, Minus, CornersOut, CornersIn, HouseLine,
  User, Layout, Code, FileText, CaretDown, Monitor, 
  CaretLeft, CaretRight
} from "@phosphor-icons/react";
import Draggable from 'react-draggable';
import { motion, AnimatePresence } from 'framer-motion';
import folderIcon from '../../assets/folder26.png';

interface WindowProps {
  titleKey: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onNavigate?: (key: string) => void;
  onBack?: () => void;
  canBack?: boolean;
  extraPath?: string | null;
  activeSubCategory?: string;
  onSubCategoryChange?: (sub: string) => void;
}

const WindowBody = ({ 
  titleKey, children, onClose, onMinimize, onNavigate, onBack, canBack, isMaximized, toggleMaximize,
  activeSubCategory, onSubCategoryChange 
}: WindowProps & { isMaximized: boolean; toggleMaximize: () => void }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const smartT = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };

  const skillSubCategories = [
    { key: 'web', label: smartT('skills_content.web_title', isRTL ? 'تطوير الويب' : 'Web Development') },
    { key: 'mobile', label: smartT('skills_content.mobile_title', isRTL ? 'تطبيقات الجوال' : 'Mobile Apps') },
    { key: 'tools', label: smartT('skills_content.tools_title', isRTL ? 'الأدوات والأتمتة' : 'Tools & Automation') },
    { key: 'work', label: smartT('skills_content.work_title', isRTL ? 'العمل والإنتاجية' : 'Work & Productivity') },
  ];

  const quickAccess = [
    { key: 'about', icon: <User size={16} />, label: smartT('sections.about', isRTL ? 'عني' : 'About') },
    { key: 'projects', icon: <Layout size={16} />, label: smartT('sections.projects', isRTL ? 'مشاريعي' : 'Projects') },
    { key: 'resume', icon: <FileText size={16} />, label: smartT('sections.resume', isRTL ? 'السيرة الذاتية' : 'Resume') },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden shadow-2xl">
      <div className="window-header h-10 bg-[#f3f3f3] flex items-center justify-between px-3 select-none shrink-0 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <img src={folderIcon} className="w-4 h-4 object-contain" alt="" />
          <span className="text-[11px] font-bold text-gray-500 uppercase">
            {t(`sections.${titleKey}`)}
          </span>
        </div>
        <div className="flex items-center">
          <button onClick={onMinimize} className="p-2 hover:bg-gray-200 rounded text-gray-500"><Minus size={14} /></button>
          <button onClick={toggleMaximize} className="p-2 hover:bg-gray-200 rounded text-gray-500">{isMaximized ? <CornersIn size={14} /> : <CornersOut size={14} />}</button>
          <button onClick={onClose} className="p-2 hover:bg-[#e81123] hover:text-white rounded text-gray-500 transition-colors"><X size={14} weight="bold" /></button>
        </div>
      </div>

      <div className={`h-11 bg-white border-b border-gray-200 flex items-center px-4 gap-4 shrink-0 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="flex items-center gap-1" style={{ direction: 'ltr' }}> 
          <button 
            onClick={() => canBack && onBack?.()} 
            className={`p-1 rounded transition-all ${canBack ? "text-gray-800 hover:bg-gray-100" : "text-gray-300"}`}
          >
            <CaretLeft size={18} weight="bold" />
          </button>
          <button className="p-1 text-gray-300">
            <CaretRight size={18} />
          </button>
        </div>

        <div className={`flex-1 h-7 border border-gray-200 rounded bg-gray-50/50 flex items-center px-3 gap-1 text-[11px] text-gray-600 overflow-hidden ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <HouseLine size={14} className="text-gray-400 shrink-0" />
          <CaretRight size={8} className={`shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
          <span className="shrink-0">{smartT('sidebar.this_pc', isRTL ? 'هذا الكمبيوتر' : 'This PC')}</span>
          <CaretRight size={8} className={`shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
          <span className="shrink-0">{smartT('sidebar.desktop', isRTL ? 'سطح المكتب' : 'Desktop')}</span>
          <CaretRight size={8} className={`shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
          
          <div className="flex items-center gap-1 font-bold text-gray-900 truncate px-1">
            <span>{t(`sections.${titleKey}`)}</span>
            {activeSubCategory && (
              <>
                <CaretRight size={8} className={`shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
                <span className="text-blue-600">{skillSubCategories.find(s => s.key === activeSubCategory)?.label}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-56 bg-[#f9f9f9] border-r border-gray-200 flex flex-col py-4 shrink-0 select-none overflow-y-auto">
          <div className="px-3 mb-4 space-y-1">
             <div className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-gray-600 transition-colors cursor-default">
               <HouseLine size={18} /><span className="text-[13px]">{smartT('sidebar.home', isRTL ? 'الرئيسية' : 'Home')}</span>
             </div>
             <div className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-gray-600 transition-colors cursor-default">
               <Monitor size={18} /><span className="text-[13px]">{smartT('sidebar.this_pc', isRTL ? 'هذا الكمبيوتر' : 'This PC')}</span>
             </div>
          </div>

          <div className="px-3">
            <p className="px-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3 italic">
              {smartT('sidebar.quick_access', isRTL ? 'الوصول السريع' : 'Quick Access')}
            </p>
            {quickAccess.map((item) => (
              <div 
                key={item.key}
                onClick={() => onNavigate?.(item.key)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer mb-1 transition-all ${
                  titleKey === item.key ? "bg-white shadow-sm ring-1 ring-black/5 text-blue-600 font-bold" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {item.icon} <span className="text-[13px]">{item.label}</span>
              </div>
            ))}

            <div 
              onClick={() => onNavigate?.('skills')}
              className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer mt-2 ${
                titleKey === 'skills' ? "bg-white shadow-sm ring-1 ring-black/5 text-blue-600 font-bold" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-3"><Code size={18} /> <span className="text-[13px]">{t('sections.skills')}</span></div>
              {titleKey === 'skills' && <CaretDown size={14} />}
            </div>
            
            <AnimatePresence>
              {titleKey === 'skills' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className={`mt-1 overflow-hidden border-gray-200 ${isRTL ? 'mr-6 border-r-2' : 'ml-6 border-l-2'}`}>
                  {skillSubCategories.map((sub) => (
                    <div 
                      key={sub.key} 
                      onClick={() => onSubCategoryChange?.(sub.key)}
                      className={`pl-4 py-1.5 text-[12px] cursor-pointer transition-colors ${activeSubCategory === sub.key ? "text-blue-600 font-bold" : "text-gray-400 hover:text-gray-700"}`}
                    >
                      {sub.label}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-white">{children}</main>
      </div>
    </div>
  );
};

const Window = (props: WindowProps) => {
  const { i18n } = useTranslation();
  const [isMaximized, setIsMaximized] = useState(false);
  const nodeRef = useRef(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}>
      <Draggable nodeRef={nodeRef} handle=".window-header" disabled={isMaximized}>
        <motion.div 
          ref={nodeRef}
          className="pointer-events-auto bg-white rounded-xl overflow-hidden border border-gray-300 shadow-2xl flex flex-col"
          style={isMaximized 
            ? { width: '100vw', height: '100vh', borderRadius: 0 } 
            : { width: '85vw', maxWidth: '1200px', height: '80vh', maxHeight: '850px' }
          }
        >
          <WindowBody {...props} isMaximized={isMaximized} toggleMaximize={() => setIsMaximized(!isMaximized)} />
        </motion.div>
      </Draggable>
    </div>
  );
};

export default Window;