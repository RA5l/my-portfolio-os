import { useState, useCallback , useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Taskbar from './components/Taskbar/Taskbar';
import bgImage from './assets/bg.png';
import Desktop from './components/Desktop/Desktop';
import Window from './components/Windows/Window';
import AboutWindow from './components/Windows/AboutWindow';
import ProjectsWindow from './components/Windows/ProjectsWindow';
import SkillsWindow from './components/Windows/SkillsWindow';
import ResumeWindow from './components/Windows/ResumeWindow';
import LoadingScreen from "./components/Loading/LoadingScreen";
import { useTranslation } from 'react-i18next';
import './App.css';

interface Project {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  tech: string[];
  image: string;
  link: string;
}

function App() {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [windowOrder, setWindowOrder] = useState<string[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSkillTab, setActiveSkillTab] = useState('web');

  const openWindow = (id: string) => {
    if (!openWindows.includes(id)) {
      setOpenWindows((prev) => [...prev, id]);
    }
    if (minimizedWindows.includes(id)) {
      setMinimizedWindows((prev) => prev.filter((winId) => winId !== id));
    }
    focusWindow(id);
  };

  const closeWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((windowId) => windowId !== id));
    setWindowOrder((prev) => prev.filter((windowId) => windowId !== id));
    setMinimizedWindows((prev) => prev.filter((winId) => winId !== id));
    if (id === 'projects') setSelectedProject(null);
  };

  const toggleMinimize = (id: string) => {
    if (minimizedWindows.includes(id)) {
      setMinimizedWindows((prev) => prev.filter((winId) => winId !== id));
      focusWindow(id);
    } else {
      setMinimizedWindows((prev) => [...prev, id]);
    }
  };

  const focusWindow = (id: string) => {
    setWindowOrder((prev) => {
      const remaining = prev.filter((windowId) => windowId !== id);
      return [...remaining, id];
    });
  };

  const handleTaskbarClick = (id: string) => {
    if (minimizedWindows.includes(id)) {
      toggleMinimize(id);
    } else if (windowOrder[windowOrder.length - 1] === id) {
      toggleMinimize(id);
    } else {
      focusWindow(id);
    }
  };

  const handleProjectSelect = useCallback((project: Project | null) => {
    setSelectedProject(project);
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen 
            key="loader"
            message={isRTL ? "جاري تهيئة النظام..." : "Initializing System..."}
            color="#000000"
          />
        )}
      </AnimatePresence>

     <div className={`${isRTL ? 'font-arabic-custom' : 'font-mono'} h-screen w-full bg-white relative overflow-hidden flex flex-col text-gray-900`}>
        <main 
        className="flex-1 relative w-full"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain'
        }}
      >
        <div className="absolute inset-0 bg-gray-100/10 backdrop-blur-[2px] -z-10"></div>
        
        <Desktop onIconClick={openWindow} />
        
        <AnimatePresence>
          {openWindows.map((id) => (
            !minimizedWindows.includes(id) && (
              <div 
                key={id} 
                style={{ zIndex: windowOrder.indexOf(id) + 10 }} 
                onMouseDown={() => focusWindow(id)}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="pointer-events-auto contents">
                  <Window 
                    titleKey={id} 
                    onClose={() => closeWindow(id)} 
                    onMinimize={() => toggleMinimize(id)}
                    onNavigate={(newKey) => {
                      if (id === newKey) return;
                      setOpenWindows((prev) => prev.map(winId => winId === id ? newKey : winId));
                      setWindowOrder((prev) => {
                        const remaining = prev.filter(winId => winId !== id);
                        return [...remaining, newKey];
                      });
                      if (id === 'projects') setSelectedProject(null);
                    }}
                    activeSubCategory={id === 'skills' ? activeSkillTab : undefined}
                    onSubCategoryChange={(sub) => {
                      if (id === 'skills') setActiveSkillTab(sub);
                    }}
                    canBack={id === 'projects' && !!selectedProject}
                    onBack={() => setSelectedProject(null)}
                    extraPath={id === 'projects' ? selectedProject?.title : null}
                  >
                    {id === 'about' && <AboutWindow />}
                    {id === 'projects' && (
                      <ProjectsWindow 
                        onProjectSelect={handleProjectSelect} 
                        selectedProject={selectedProject}
                      />
                    )}
                    {id === 'skills' && <SkillsWindow activeTab={activeSkillTab} />}
                    {id === 'resume' && <ResumeWindow />}
                  </Window>
                </div>
              </div>
            )
          ))}
        </AnimatePresence>
      </main>
      
      <Taskbar 
        openWindows={openWindows}
        activeWindow={windowOrder[windowOrder.length - 1] || null}
        onTabClick={handleTaskbarClick} 
        minimizedWindows={minimizedWindows} 
      />
    </div>
    </>
  );
}

export default App;