import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Files, MagnifyingGlass, Sparkle } from "@phosphor-icons/react";
import { useTranslation } from 'react-i18next';

import photo1 from '../../assets/photo1.jpeg'; 
import photo2 from '../../assets/photo2.jpeg'; 
import photo3 from '../../assets/photo3.jpeg'; 

const MobilePhotosApp: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const photosBlue = "#007aff";

  const localPhotos = [
    { id: 1, url: photo1 },
    { id: 2, url: photo2 },
    { id: 3, url: photo3 },
  ];

  return (
    <div className={`flex flex-col h-full bg-white text-black ${isRTL ? 'rtl text-right' : 'ltr text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex justify-between items-center px-4 py-3 bg-white/80 backdrop-blur-xl sticky top-0 z-10 border-b border-gray-100">
        <button onClick={onClose} className="flex items-center" style={{ color: photosBlue }}>
          <ChevronLeft size={30} className={isRTL ? 'rotate-180' : ''} />
          <span className="text-[17px]">{isRTL ? 'خروج' : 'Exit'}</span>
        </button>
        <div className="flex gap-4 text-[17px] font-semibold" style={{ color: photosBlue }}>
          <span>{isRTL ? 'تحديد' : 'Select'}</span>
        </div>
      </div>

      <div className="flex-1 px-1 pt-2 pb-20 overflow-y-auto">
        <div className="px-3 pt-1 mb-4">
          <h1 className="text-3xl font-bold">{isRTL ? 'كافة الصور' : 'All Photos'}</h1>
          <p className="text-gray-400 text-sm">7 May 2026</p>
        </div>

        <div className="grid grid-cols-3 gap-0.5">
          {localPhotos.map((photo) => (
            <div key={photo.id} className="aspect-square bg-gray-100 overflow-hidden">
              <img 
                src={photo.url} 
                alt="" 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 p-2 bg-white/80 backdrop-blur-xl fixed bottom-0 w-full flex justify-around items-center z-50">
        <div className="flex flex-col items-center gap-1" style={{ color: photosBlue }}>
          <Files size={22} weight="fill" />
          <span className="text-[10px] font-medium">{isRTL ? 'المكتبة' : 'Library'}</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <Sparkle size={22} />
          <span className="text-[10px] font-medium">{isRTL ? 'لك' : 'For You'}</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <MagnifyingGlass size={22} />
          <span className="text-[10px] font-medium">{isRTL ? 'بحث' : 'Search'}</span>
        </div>
      </div>
    </div>
  );
};

export default MobilePhotosApp;