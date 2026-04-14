import { useState } from 'react';
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
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const closeWindow = () => setActiveWindow(null);
  const openWindow = (id: string) => setActiveWindow(id);

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

        {activeWindow && (
          <Window titleKey={activeWindow} onClose={closeWindow}>
            {activeWindow === 'about' && <AboutWindow />}
            
            {activeWindow === 'projects' && <ProjectsWindow />}

            {activeWindow === 'skills' && <SkillsWindow />}
            {activeWindow === 'resume' && <ResumeWindow />}
          </Window>
        )}
      </main>
      
      <Taskbar />
    </div>
  );
}

export default App;