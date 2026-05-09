import React from 'react';
import { ChevronLeft, Share, MoreHorizontal, Edit3, CheckCircle, Camera, PencilLine } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  onClose?: () => void;
}

const MobileNotesApp: React.FC<Props> = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const notesYellow = "#ebb62d";
  const currentDate = new Date().toLocaleDateString(i18n.language === 'ar' ? 'ar-SA' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={`flex flex-col h-full bg-white text-black font-sans ${isRTL ? 'rtl text-right' : 'ltr text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      <div className="flex justify-between items-center px-2 py-3 bg-white/80 backdrop-blur-xl sticky top-0 z-10">
        <button 
          onClick={onClose} 
          className="flex items-center active:opacity-50 transition-opacity" 
          style={{ color: notesYellow }}
        >
          <ChevronLeft size={30} strokeWidth={2} className={isRTL ? 'rotate-180' : ''} />
          <span className="text-[17px] font-normal">
            {isRTL ? 'خروج' : 'Exit'}
          </span>
        </button>

        <div className="flex gap-4 items-center" style={{ color: notesYellow }}>
          <Share size={22} strokeWidth={2} />
          <div className="border border-current rounded-full p-0.5 flex items-center justify-center">
            <MoreHorizontal size={16} strokeWidth={2} />
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 pt-2 pb-20 overflow-y-auto">
        <div className="text-center mb-4">
          <span className="text-[12px] text-gray-400 font-medium">
            {currentDate}
          </span>
        </div>

        <h1 className="text-[26px] font-bold mb-4 leading-tight text-black">
          {t('about_content.who_is_title')}
        </h1>

        <div className="space-y-6 text-[17px] leading-snug text-gray-800">
          <p>{t('about_content.who_is_text')}</p>
          
          <div className="pt-2">
            <div className="flex gap-2 mb-1">
              <span className="font-bold text-black">-</span>
              <h2 className="font-bold text-black">{t('about_content.passion_title')}</h2>
            </div>
            <p className="ps-4">{t('about_content.passion_text')}</p>
          </div>

          <div className="pt-2">
            <div className="flex gap-2 mb-1">
              <span className="font-bold text-black">-</span>
              <h2 className="font-bold text-black">{t('about_content.academic_title')}</h2>
            </div>
            <p className="ps-4">{t('about_content.academic_text')}</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-gray-200 px-6 py-4 flex justify-between items-center z-50">
        <div style={{ color: notesYellow }}><CheckCircle size={24} strokeWidth={1.5} /></div>
        <div style={{ color: notesYellow }}><Camera size={24} strokeWidth={1.5} /></div>
        <div style={{ color: notesYellow }}><PencilLine size={24} strokeWidth={1.5} /></div>
        <div style={{ color: notesYellow }}><Edit3 size={24} strokeWidth={1.5} /></div>
      </div>
    </div>
  );
};

export default MobileNotesApp;