import { useTranslation } from 'react-i18next';
import { GithubLogo, Globe, Folder, FileText } from "@phosphor-icons/react";
import { SiReact, SiTypescript, SiVite, SiFastapi, SiPython, SiTailwindcss, SiJavascript, SiCss, SiHtml5} from '@icons-pack/react-simple-icons';

interface Project {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  tech: string[];
  image: string;
  link: string;
}

interface ProjectsWindowProps {
  onProjectSelect: (project: Project | null) => void;
  selectedProject: Project | null;
}

const techMap: { [key: string]: { icon: React.ElementType, color: string } } = {
  React: { icon: SiReact, color: "#61DAFB" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  Vite: { icon: SiVite, color: "#646CFF" },
  FastAPI: { icon: SiFastapi, color: "#05998B" },
  Python: { icon: SiPython, color: "#3776AB" },
  Tailwind: { icon: SiTailwindcss, color: "#06B6D4" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  CSS: { icon: SiCss, color: "#1572B6" },
  HTML: { icon: SiHtml5, color: "#E34F26" },
};

const ProjectsWindow = ({ onProjectSelect, selectedProject }: ProjectsWindowProps) => {
  const { t } = useTranslation();
  const projects = t('projects_content', { returnObjects: true }) as Project[];

  if (!selectedProject) {
    return (
      <div className="p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-4">
        {projects.map((project) => (
          <div 
            key={project.id}
            onClick={() => onProjectSelect(project)}
            className="flex flex-col items-center gap-2 group cursor-pointer p-2 rounded-md border border-transparent hover:border-gray-300 hover:bg-gray-100/80 transition-all duration-150"
          >
            <Folder size={76} weight="fill" className="text-black opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="text-[12px] font-bold text-center text-gray-600 group-hover:text-black line-clamp-2 max-w-[80px]">
              {project.title}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col animate-in fade-in zoom-in-95 duration-300 bg-white">
      <div className="flex-1 overflow-y-auto p-6 md:p-12">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
          
          <div className="flex-1 space-y-10 w-full">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gray-100/50 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover:scale-[1.01]">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-auto object-cover" 
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {selectedProject.tech.map((item, idx) => {
                const tech = techMap[item];
                if (!tech) return null;
                const Icon = tech.icon;

                return (
                  <div 
                    key={idx} 
                    className="flex items-center gap-2.5 px-4 py-2 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition-all cursor-default group/tag"
                  >
                    <Icon size={16} color={tech.color} className="filter drop-shadow-sm group-hover/tag:scale-110 transition-transform" />
                    <span className="text-[12px] font-bold text-gray-700">{item}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full lg:w-[400px] space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-3 py-1 bg-black text-white rounded-full">
                <FileText size={14} weight="bold" />
                <span className="text-[9px] font-black tracking-[0.2em] uppercase">
                  {t('project_case_label', 'Project Case')}
                </span>
              </div>
              
              <h2 className="text-4xl font-[1000] text-black tracking-tighter leading-tight">
                {selectedProject.title}
              </h2>
              
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.4em]">
                {selectedProject.tagline}
              </p>
            </div>

            <div className="h-[1px] w-full bg-gradient-to-r from-gray-200 to-transparent"></div>

            <p className="text-[15px] text-gray-500 leading-relaxed font-medium italic border-l-4 border-black pl-6">
              {selectedProject.desc}
            </p>

            <a 
              href={selectedProject.link} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center justify-center gap-4 w-full py-5 bg-black text-white rounded-2xl font-black text-base shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-y-1 transition-all active:scale-95"
            >
              {selectedProject.id === 'glowlixir' ? (
                <>
                  <GithubLogo size={22} weight="fill" /> 
                  {t('view_source', 'VIEW SOURCE')}
                </>
              ) : (
                <>
                  <Globe size={22} weight="bold" /> 
                  {t('explore_live', 'EXPLORE LIVE')}
                </>
              )}
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectsWindow;