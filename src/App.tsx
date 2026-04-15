import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Taskbar from './components/Taskbar/Taskbar';
import bgImage from './assets/bg.png';
import Desktop from './components/Desktop/Desktop';
import Window from './components/Windows/Window';
import AboutWindow from './components/Windows/AboutWindow';
import ProjectsWindow from './components/Windows/ProjectsWindow';
import SkillsWindow from './components/Windows/SkillsWindow';
import ResumeWindow from './components/Windows/ResumeWindow';
import './App.css';

function App() {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [windowOrder, setWindowOrder] = useState<string[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);

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

  return (
    <div className="h-screen w-full bg-white relative overflow-hidden flex flex-col font-mono">
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
                  >
                    {id === 'about' && <AboutWindow />}
                    {id === 'projects' && <ProjectsWindow />}
                    {id === 'skills' && <SkillsWindow />}
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
        minimizedWindows={[]}      />
    </div>
  );
}

export default App;