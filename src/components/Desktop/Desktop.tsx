import DesktopIcon from './DesktopIcon';

const Desktop = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      
      <div className="absolute left-10 top-20 flex flex-col gap-10 pointer-events-auto">
        <DesktopIcon labelKey="projects" />
        <div className="ml-6 mt-6">
          <DesktopIcon labelKey="resume" />
        </div>
      </div>

      <div className="absolute right-12 top-24 flex flex-col gap-10 pointer-events-auto">
        <div className="mb-8">
          <DesktopIcon labelKey="skills" />
        </div>
        <div className="mr-6">
          <DesktopIcon labelKey="about" />
        </div>
      </div>

    </div>
  );
};

export default Desktop;