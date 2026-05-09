import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileNotesApp from './MobileNotesApp';
import MobileFilesApp from './MobileFilesApp';
import MobilePhotosApp from './MobilePhotosApp';
import MobileProjectDetail from './MobileProjectDetail';
import MobileSkillsApp from './MobileSkillsApp';

interface MobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  activeApp: string | null;
  children?: React.ReactNode;
}

const MobileSheet: React.FC<MobileSheetProps> = ({ isOpen, onClose, activeApp, children }) => {
  const systemApps = ['about', 'resume', 'skills', 'projects', 'photos'];
  const isProject = activeApp && !systemApps.includes(activeApp);

  const renderContent = () => {
    if (children) return children;
    if (isProject) return <MobileProjectDetail projectId={activeApp!} onClose={onClose} />;

    switch (activeApp) {
      case 'about': return <MobileNotesApp onClose={onClose} />;
      case 'resume': return <MobileFilesApp onClose={onClose} />;
      case 'skills': return <MobileSkillsApp onClose={onClose} />;
      case 'photos': return <MobilePhotosApp onClose={onClose} />;
      case 'projects':
        return (
          <div className="flex items-center justify-center h-full text-gray-400 text-[13px] italic px-10 text-center">
            Select a project from the folder to see details
          </div>
        );
      default: return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          drag="y"
          dragConstraints={{ top: 0 }}
          dragElastic={0.1}
          onDragEnd={(_, info) => {
            if (info.offset.y > 150) onClose();
          }}
          className="fixed inset-0 z-[150] bg-white flex flex-col shadow-2xl overflow-hidden rounded-t-[40px]"
        >
          <div className="absolute top-0 left-0 right-0 h-8 flex justify-center items-center pointer-events-none bg-transparent z-[60]">
            <div className="w-10 h-1.5 bg-gray-300 rounded-full" />
          </div>

          <div className="flex-1 overflow-y-auto">
            {renderContent()}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSheet;