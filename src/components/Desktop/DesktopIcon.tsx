import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import folderClose from '../../assets/folder26.png';
import folderOpen from '../../assets/open-folder26.png';

interface DesktopIconProps {
  labelKey: string;
  onClick: () => void;
  className?: string; 
}

const DesktopIcon = ({ labelKey, onClick, className }: DesktopIconProps) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
    className={`absolute flex flex-col items-center gap-2 cursor-pointer w-32 select-none group transition-transform duration-300 hover:scale-105 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick} 
    >
      <div className="w-16 h-16 md:w-20 md:h-20 lg:w-32 lg:h-32 xl:w-40 xl:h-40 relative" >
        <img 
          src={folderClose} 
          alt="" 
          className={`w-full h-full object-contain absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        />
        <img 
          src={folderOpen} 
          alt="" 
          className={`w-full h-full object-contain absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      <span className="text-sm font-black tracking-widest text-gray-800 uppercase px-2 py-1 text-center">
        {t(`sections.${labelKey}`)}
      </span>
    </div>
  );
};

export default DesktopIcon;