import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Minus, CornersOut, CornersIn } from "@phosphor-icons/react";
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';

interface WindowProps {
  titleKey: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
}

const Window = ({ titleKey, children, onClose, onMinimize }: WindowProps) => {
  const { t, i18n } = useTranslation();
  const [isMaximized, setIsMaximized] = useState(false);
  const nodeRef = useRef(null);

  const toggleMaximize = () => setIsMaximized(!isMaximized);

  return (
    <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
      <Draggable
        nodeRef={nodeRef}
        handle=".window-header"
        disabled={isMaximized}
        bounds="parent"
      >
        <div
          ref={nodeRef}
          className={`pointer-events-auto shadow-2xl overflow-hidden ${
            isMaximized ? "!fixed !inset-0 !w-screen !h-screen !translate-x-0 !translate-y-0 !transform-none !m-0 !z-50" : "relative"
          }`}
          
          style={{
            width: isMaximized ? '100vw' : '85vw',
            maxWidth: isMaximized ? 'none' : '900px',
            height: isMaximized ? 'calc(100vh - 64px)' : '70vh',
            maxHeight: isMaximized ? 'none' : '600px',
            direction: i18n.language === 'ar' ? 'rtl' : 'ltr'
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full bg-white border border-gray-200 rounded-xl flex flex-col"
          >
            <div className="window-header h-11 bg-[#f8f8f8] border-b border-gray-100 flex items-center justify-between px-5 select-none cursor-move active:cursor-grabbing">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  {t(`sections.${titleKey}`)}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => { e.stopPropagation(); onMinimize(); }}
                  className="text-gray-300 hover:text-black transition-colors"
                >
                  <Minus size={18} />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}
                  className="text-gray-300 hover:text-black transition-colors"
                >
                  {isMaximized ? <CornersIn size={18} /> : <CornersOut size={18} />}
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); onClose(); }}
                  className="text-gray-300 hover:text-red-500 transition-colors"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      </Draggable>
    </div>
  );
};

export default Window;