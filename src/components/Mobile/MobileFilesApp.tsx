import React, { useState, useEffect } from 'react';
import { ChevronLeft, Search, Mic, Ellipsis, Clock, Users, FolderOpen, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  onClose: () => void;
}

const MobileFilesApp: React.FC<Props> = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [fileDates, setFileDates] = useState<Record<string, string>>({});

  const resumeFiles = t('resume_content.files', { returnObjects: true }) as Array<{ label: string; url: string }>;

  useEffect(() => {
    const fetchFileDates = async () => {
      const dates: Record<string, string> = {};
      
      for (const file of resumeFiles) {
        try {
          const response = await fetch(file.url, { method: 'HEAD' });
          const lastModified = response.headers.get('Last-Modified');
          
          if (lastModified) {
            const dateObj = new Date(lastModified);
            dates[file.url] = new Intl.DateTimeFormat(isRTL ? 'ar-SA' : 'en-GB').format(dateObj);
          } else {
            dates[file.url] = "08/05/2026"; 
          }
        } catch (error) {
          dates[file.url] = "08/05/2026";
        }
      }
      setFileDates(dates);
    };

    if (resumeFiles.length > 0) fetchFileDates();
  }, [resumeFiles, isRTL]);

  return (
    <div className={`flex flex-col h-full bg-[#F2F2F7] text-black font-sans ${isRTL ? 'rtl text-right' : 'ltr text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      <div className="flex flex-col px-4 pt-2 pb-2 bg-white/80 backdrop-blur-xl sticky top-0 z-20 border-b border-gray-200">
        <div className="flex justify-between items-center h-12">
          <button onClick={onClose} className="flex items-center text-[#007AFF] active:opacity-50 transition-opacity">
            <ChevronLeft size={28} strokeWidth={2.5} className={isRTL ? 'rotate-180' : ''} />
            <span className="text-[17px] font-medium">{isRTL ? 'خروج' : 'Exit'}</span>
          </button>

          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
            <h1 className="text-[17px] font-semibold text-black">
              {isRTL ? 'السيرة الذاتية' : 'CV'}
            </h1>
            <ChevronLeft size={14} strokeWidth={3} className="-rotate-90 text-gray-400" />
          </div>

          <button className="text-[#007AFF] active:opacity-50"><Ellipsis size={24} /></button>
        </div>

        <div className="relative mt-2 mb-1 w-full">
          <div className={`absolute inset-y-0 ${isRTL ? 'right-3' : 'left-3'} flex items-center text-gray-400`}><Search size={18} /></div>
          <input type="search" placeholder={isRTL ? 'بحث' : 'Search'} className={`w-full h-9 bg-gray-200/50 rounded-xl ${isRTL ? 'pr-10 pl-10' : 'pl-10 pr-10'} text-[17px] outline-none`} />
          <div className={`absolute inset-y-0 ${isRTL ? 'left-3' : 'right-3'} flex items-center text-gray-400`}><Mic size={20} /></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        <p className="text-[13px] text-gray-500 mb-6 px-1 font-medium">{t('resume_content.text')}</p>

        <div className="grid grid-cols-3 gap-x-4 gap-y-8">
          {resumeFiles.map((file, i) => (
            <a key={i} href={file.url} download className="flex flex-col items-center group no-underline active:opacity-60 transition-all">
              <div className="w-full aspect-[1/1.3] bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center relative overflow-hidden">
                <div className="flex flex-col items-center">
                  <FileText size={48} strokeWidth={1.2} className="text-blue-500 mb-1" />
                  <span className="text-[9px] font-black text-red-600 border border-red-600 px-1 rounded uppercase">PDF</span>
                </div>
              </div>

              <div className="mt-3 text-center flex flex-col w-full px-0.5">
                <span className="text-[12px] font-semibold leading-tight text-gray-800 line-clamp-2">{file.label}</span>
                <span className="text-[10px] font-medium text-gray-400 mt-1">
                  {fileDates[file.url] || "08/05/2026"}
                </span>
                <span className="text-[10px] font-medium text-gray-400 uppercase">{i === 1 ? '450 KB' : '328 KB'}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 p-1.5 pb-6 bg-white/90 backdrop-blur-xl fixed bottom-0 w-full flex justify-around items-center z-30">
        <div className="flex flex-col items-center gap-1 text-gray-400"><Clock size={23} /><span className="text-[10px] font-bold uppercase">{isRTL ? 'الأخيرة' : 'Recents'}</span></div>
        <div className="flex flex-col items-center gap-1 text-gray-400"><Users size={23} /><span className="text-[10px] font-bold uppercase">{isRTL ? 'مشترك' : 'Shared'}</span></div>
        <div className="flex flex-col items-center gap-1 text-[#007AFF]"><FolderOpen size={23} /><span className="text-[10px] font-bold uppercase">{isRTL ? 'تصفح' : 'Browse'}</span></div>
      </div>
    </div>
  );
};

export default MobileFilesApp;