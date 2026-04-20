import DesktopIcon from './DesktopIcon';

interface DesktopProps {
  onIconClick: (id: string) => void;
}

const Desktop = ({ onIconClick }: DesktopProps) => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      
      <DesktopIcon 
        labelKey="projects" 
        onClick={() => onIconClick('projects')} 
        className="left-[5vw] top-[12vh] md:left-[8%] md:top-[15%] pointer-events-auto" 
      />

      <DesktopIcon 
        labelKey="resume" 
        onClick={() => onIconClick('resume')} 
        className="left-[2vw] bottom-[15vh] md:left-[5%] md:bottom-[20%] pointer-events-auto" 
      />

      <DesktopIcon 
        labelKey="skills" 
        onClick={() => onIconClick('skills')} 
        className="right-[5vw] top-[8vh] md:right-[10%] md:top-[10%] pointer-events-auto" 
      />

      <DesktopIcon 
        labelKey="about" 
        onClick={() => onIconClick('about')} 
        className="right-[2vw] bottom-[12vh] md:right-[7%] md:bottom-[25%] pointer-events-auto" 
      />

    </div>
  );
};

export default Desktop;