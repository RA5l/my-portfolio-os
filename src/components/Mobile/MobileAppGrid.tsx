import React, { useRef } from 'react';
import { Notebook, Flower, Files, Wallet, Code, ChartBar, Sparkle } from "@phosphor-icons/react";
import MobileWidgets, { CalendarWidget } from './MobileWidgets'; // استيراد التقويم المصحح
import { useTranslation } from 'react-i18next';

interface Props {
  onOpenWindow: (id: string) => void;
  onOpenFolder: (rect: DOMRect) => void;
}

const MobileAppGrid: React.FC<Props> = ({ onOpenWindow, onOpenFolder }) => {
  const { t } = useTranslation();
  const folderRef = useRef<HTMLButtonElement>(null);

  const apps = [
    { id: 'about',  icon: <Notebook size={30} weight="fill" />, label: t('app_names.notes') },
    { id: 'skills', icon: <Wallet  size={30} weight="fill" />, label: t('app_names.Wallet') },
    { id: 'photos', icon: <Flower  size={30} weight="fill" />, label: t('app_names.photos') },
    { id: 'resume', icon: <Files   size={30} weight="fill" />, label: t('app_names.files') },
  ];

  return (
    <div className="flex flex-col gap-8 w-full px-4 pt-4">
      <MobileWidgets />

      <div className="grid grid-cols-4 gap-4 w-full">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => onOpenWindow(app.id)}
            className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform"
          >
            <div className="w-16 h-16 bg-black text-white rounded-[22px] flex items-center justify-center shadow-lg">
              {app.icon}
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-black/70">
              {app.label}
            </span>
          </button>
        ))}
      </div>

      <div className="flex items-start gap-4 w-full">
        <div className="flex flex-col items-center gap-1 flex-1">
          <CalendarWidget />
          <span className="text-[8px] font-black text-black/30 uppercase tracking-widest mt-1">
            Calendar Widget
          </span>
        </div>

        <button
          ref={folderRef}
          onClick={() => onOpenFolder(folderRef.current!.getBoundingClientRect())}
          className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
        >
          <div className="w-16 h-16 bg-black/10 backdrop-blur-xl rounded-[22px] p-2.5 grid grid-cols-2 gap-1 border border-black/5">
            {[<Code size={10} />, <ChartBar size={10} />, <Sparkle size={10} />, <Code size={10} />].map((icon, i) => (
              <div key={i} className="bg-black text-white rounded-[4px] flex items-center justify-center">
                {icon}
              </div>
            ))}
          </div>
          <span className="text-[9px] font-bold uppercase tracking-widest text-black/70">
            {t('app_names.projects')}
          </span>
        </button>
      </div>
    </div>
  );
};

export default MobileAppGrid;