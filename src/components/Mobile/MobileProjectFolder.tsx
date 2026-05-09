import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Sparkle, FlowerLotus, ChartBar, BookOpen, Code, Kanban, CheckSquare, 
  AppWindow, Cpu, Globe, Nut, Palette, Terminal, BracketsCurly 
} from '@phosphor-icons/react';

const FALLBACK_ICONS = [
  <Terminal size={26} weight="bold" />,
  <Cpu size={26} weight="bold" />,
  <BracketsCurly size={26} weight="bold" />,
  <Globe size={26} weight="bold" />,
  <AppWindow size={26} weight="bold" />,
  <Nut size={26} weight="bold" />,
  <Palette size={26} weight="bold" />,
];

const PROJECT_META: Record<string, { icon: React.ReactNode }> = {
  alzabda: { icon: <Sparkle size={26} weight="bold" /> },
  glowlixir: { icon: <FlowerLotus size={26} weight="bold" /> },
  dashviz: { icon: <ChartBar size={26} weight="bold" /> },
  studypal: { icon: <BookOpen size={26} weight="bold" /> },
  codesnippet: { icon: <Code size={26} weight="bold" /> },
  kanban: { icon: <Kanban size={26} weight="bold" /> },
  'task-manager': { icon: <CheckSquare size={26} weight="bold" /> },
};

const ITEMS_PER_PAGE = 9;

interface Props {
  isOpen: boolean;
  originRect: DOMRect | null;
  onClose: () => void;
  onOpenProject: (id: string) => void;
}

const MobileProjectFolder: React.FC<Props> = ({ isOpen, originRect, onClose, onOpenProject }) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const projectsData = t('projects_content', { returnObjects: true }) as any[];
  const allProjects = Array.isArray(projectsData) ? projectsData.map((p, index) => ({
    ...p,
    icon: PROJECT_META[p.id]?.icon || FALLBACK_ICONS[index % FALLBACK_ICONS.length]
  })) : [];

  const totalPages = Math.ceil(allProjects.length / ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(0);

  const dragX = useMotionValue(0);
  const springX = useSpring(dragX, { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (!isOpen) {
      dragX.set(0);
      setCurrentPage(0);
    }
  }, [isOpen, dragX]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="fixed inset-0 z-[140] bg-black/60 backdrop-blur-xl" 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            onClick={onClose} 
          />
          <motion.div 
            className="fixed z-[150] bg-white/10 backdrop-blur-3xl border border-white/10 rounded-[35px] shadow-2xl overflow-hidden flex flex-col"
            style={{ width: '85vw', maxWidth: 320, height: 410, left: '50%', top: '45%', x: '-50%', y: '-50%' }}
            initial={{ scale: 0.12, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.12, opacity: 0 }}
          >
            <p className="text-white text-[11px] font-black tracking-[0.3em] uppercase text-center pt-6 pb-2 opacity-80 select-none">
              {t('sections.projects')}
            </p>
            
            <div className="relative flex-1 overflow-hidden" ref={containerRef}>
              <motion.div 
                className="flex h-full cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ right: 0, left: -(totalPages - 1) * 320 }}
                dragElastic={0.1}
                style={{ x: springX }}
                onDragEnd={(_, info) => {
                  const offset = info.offset.x;
                  const velocity = info.velocity.x;

                  if (offset < -50 || velocity < -500) {
                    if (currentPage < totalPages - 1) {
                      const next = currentPage + 1;
                      setCurrentPage(next);
                      dragX.set(-next * 320);
                    }
                  } else if (offset > 50 || velocity > 500) {
                    if (currentPage > 0) {
                      const prev = currentPage - 1;
                      setCurrentPage(prev);
                      dragX.set(-prev * 320);
                    }
                  } else {
                    dragX.set(-currentPage * 320);
                  }
                }}
              >
                {Array.from({ length: totalPages }).map((_, pageIdx) => (
                  <div key={pageIdx} className="w-[320px] h-full flex-shrink-0 grid grid-cols-3 gap-y-6 gap-x-4 px-6 pt-4 pb-12">
                    {allProjects.slice(pageIdx * ITEMS_PER_PAGE, (pageIdx + 1) * ITEMS_PER_PAGE).map((p) => (
                      <div key={p.id} className="flex flex-col items-center gap-2">
                        <button 
                          onClick={() => onOpenProject(p.id)} 
                          className="w-16 h-16 bg-white rounded-[18px] flex items-center justify-center text-black shadow-lg active:scale-95 transition-transform"
                        >
                          {p.icon}
                        </button>
                        <span className="text-white text-[10px] font-bold text-center truncate w-full opacity-90">{p.title}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 pb-4 pt-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentPage ? 'w-4 bg-white' : 'w-1.5 bg-white/30'
                    }`} 
                  />
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileProjectFolder;