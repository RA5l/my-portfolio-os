import React, { useState } from 'react';
import MobileStatusBar from './MobileStatusBar';
import MobileAppGrid from './MobileAppGrid';
import MobileTaskbar from './MobileTaskbar';
import MobileProjectFolder from './MobileProjectFolder';
import MobileSheet from './MobileSheet'; 
import bgImage from '../../assets/bg.png';

interface MobileLayoutProps {
  onOpenWindow?: (id: string) => void;
}

const MobileLayout: React.FC<MobileLayoutProps> = () => {
  const [folderOrigin, setFolderOrigin] = useState<DOMRect | null>(null);
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleOpenFolder = (rect: DOMRect) => setFolderOrigin(rect);
  const handleCloseFolder = () => setFolderOrigin(null);

  const handleOpenApp = (id: string) => {
    setActiveApp(id);
    setIsSheetOpen(true);
  };

  const handleCloseApp = () => {
    setIsSheetOpen(false);
    setActiveApp(null);
  };

  return (
    <div className="relative h-[100dvh] w-full bg-white flex flex-col font-sans select-none overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: '90%',
          backgroundPosition: 'center 85%',
        }}
      />

      <div className="relative z-20 flex-none">
        <MobileStatusBar />
      </div>

      <main className="relative z-10 flex-1 overflow-y-auto no-scrollbar p-4 pt-2">
        <MobileAppGrid
          onOpenWindow={handleOpenApp}
          onOpenFolder={handleOpenFolder}
        />
      </main>

      <div className="relative z-20 pb-8 px-4 flex-none mt-auto">
        <MobileTaskbar />
      </div>

      <MobileProjectFolder
        isOpen={folderOrigin !== null}
        originRect={folderOrigin}
        onClose={handleCloseFolder}
        onOpenProject={handleOpenApp}
      />

      <MobileSheet
        isOpen={isSheetOpen}
        onClose={handleCloseApp}
        activeApp={activeApp}
      />
    </div>
  );
};

export default MobileLayout;