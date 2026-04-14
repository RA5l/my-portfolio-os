import { useTranslation } from 'react-i18next';
import { GithubLogo, Globe } from "@phosphor-icons/react";

interface Project {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  tech: string[];
  image: string;
  link: string;
}

const ProjectsWindow = () => {
  const { t } = useTranslation();
  const projects = t('projects_content', { returnObjects: true }) as Project[];

  return (
    <div className="max-w-5xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="group relative bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
          >
            <div className="h-48 bg-gray-50 relative overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/600x400/f8f8f8/cbd5e1?text=Project+Preview";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10"></div>
            </div>

            <div className="p-8 relative z-20 -mt-12 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-1 leading-none">
                    {project.title}
                  </h3>
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">
                    {project.tagline}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 bg-gray-900 text-white rounded-full hover:bg-blue-600 transition-all shadow-lg flex items-center gap-2 group/btn"
                    title={project.id === 'glowlixir' ? 'View Source on GitHub' : 'View Live Demo'}
                  >
                    {project.id === 'glowlixir' ? (
                      <GithubLogo size={20} weight="fill" />
                    ) : (
                      <Globe size={20} weight="bold" />
                    )}
                  </a>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((item, idx) => (
                  <span 
                    key={idx} 
                    className="text-[9px] font-black px-3 py-1 bg-gray-50 text-gray-400 rounded-lg uppercase border border-gray-100 group-hover:border-blue-100 group-hover:text-blue-500 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsWindow;