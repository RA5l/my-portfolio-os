import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import folderClose from '../../assets/folder26.png';
import folderOpen from '../../assets/open-folder26.png';

interface DesktopIconProps {
  labelKey: string;
}

const DesktopIcon = ({ labelKey }: DesktopIconProps) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex flex-col items-center gap-2 cursor-pointer w-24 select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-16 h-16 relative">
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

      <span className="text-[11px] font-bold tracking-wider text-gray-800 uppercase bg-white/50 px-2 py-0.5 rounded backdrop-blur-sm group-hover:bg-black group-hover:text-white transition-all">
        {t(`sections.${labelKey}`)}
      </span>
    </div>
  );
};

export default DesktopIcon;