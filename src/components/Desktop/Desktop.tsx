import DesktopIcon from './DesktopIcon';

interface DesktopProps {
  onIconClick: (id: string) => void;
}

const Desktop = ({ onIconClick }: DesktopProps) => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      
      
      <DesktopIcon 
        labelKey="projects" 
        onClick={() => onIconClick('projects')} 
        className="left-[8%] top-[15%] pointer-events-auto" 
      />

      <DesktopIcon 
        labelKey="resume" 
        onClick={() => onIconClick('resume')} 
        className="left-[5%] bottom-[25%] pointer-events-auto" 
      />

      <DesktopIcon 
        labelKey="skills" 
        onClick={() => onIconClick('skills')} 
        className="right-[10%] top-[10%] pointer-events-auto" 
      />

      <DesktopIcon 
        labelKey="about" 
        onClick={() => onIconClick('about')} 
        className="right-[7%] bottom-[30%] pointer-events-auto" 
      />

    </div>
  );
};

export default Desktop;