import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Minus, CornersOut, CornersIn } from "@phosphor-icons/react";
import Draggable from 'react-draggable';

interface WindowProps {
  titleKey: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Window = ({ titleKey, children, onClose }: WindowProps) => {
  const { t } = useTranslation();
  const [isMaximized, setIsMaximized] = useState(false);
  const nodeRef = useRef(null);

  const toggleMaximize = () => setIsMaximized(!isMaximized);

  return (
    <Draggable 
  nodeRef={nodeRef} 
  handle=".window-header" 
  disabled={isMaximized}
>
  <div 
    ref={nodeRef}
    className={`fixed z-40 bg-white border border-gray-200 shadow-2xl rounded-xl flex flex-col pointer-events-auto overflow-hidden transition-all duration-300 ${
      isMaximized 
        ? 'top-0 left-0 w-full h-full rounded-none' 
        : 'w-[80vw] max-w-[900px] h-[70vh] max-h-[600px]'
    }`}
    style={{
      top: isMaximized ? '0' : '10vh',
      left: isMaximized ? '0' : 'calc(50% - 450px)', 
    }}
  >
        
        <div className="window-header h-11 bg-[#f8f8f8] border-b border-gray-100 flex items-center justify-between px-5 select-none cursor-move active:cursor-grabbing">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-200"></div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              {t(`sections.${titleKey}`)}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="text-gray-300 hover:text-black transition-colors">
              <Minus size={18} />
            </button>
            <button onClick={toggleMaximize} className="text-gray-300 hover:text-black transition-colors">
              {isMaximized ? <CornersIn size={18} /> : <CornersOut size={18} />}
            </button>
            <button onClick={onClose} className="text-gray-300 hover:text-red-500 transition-colors">
              <X size={18} weight="bold" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10 bg-white custom-scrollbar">
          {children}
        </div>
        
      </div>
    </Draggable>
  );
};

export default Window;