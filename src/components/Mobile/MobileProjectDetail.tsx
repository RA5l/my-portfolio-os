import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, GithubLogo, Code, ArrowUpRight, CaretLeft } from "@phosphor-icons/react";

interface Props {
  projectId: string;
  onClose: () => void;
}

const MobileProjectDetail: React.FC<Props> = ({ projectId, onClose }) => {
  const { t, i18n } = useTranslation();
  const projectsData = t('projects_content', { returnObjects: true });
  const projects = Array.isArray(projectsData) ? projectsData : [];
  const project = projects.find((p: any) => p.id === projectId);

  const isRtl = i18n.language === 'ar';

  if (!project) return <div className="p-10 text-center text-gray-400">Loading...</div>;

  return (
    <div className="flex flex-col h-full bg-[#f2f2f7] animate-in fade-in slide-in-from-bottom-5 duration-500 overflow-hidden relative">
      <div className="w-full bg-white border-b border-gray-200 z-[160] flex-shrink-0">
        <div className="h-4 bg-white" />
        <div className={`h-14 px-4 flex items-center z-[160] ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
      <button 
          onClick={onClose} 
          className={`flex items-center text-[#007AFF] active:opacity-50 transition-opacity ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
          <CaretLeft 
          size={24} 
          weight="bold" 
          className={`${isRtl ? 'rotate-180 ml-0 mr-[-4px]' : 'mr-0 ml-[-4px]'}`} />
        <span className="text-[17px] font-medium leading-none">
          {isRtl ? 'خروج' : 'Exit'}
        </span>
      </button>

  <h1 className="absolute left-1/2 -translate-x-1/2 text-black font-semibold text-[17px]">
    {isRtl ? 'تفاصيل المشروع' : 'Project Details'}
  </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        
        <div className="relative h-64 w-full overflow-hidden bg-gray-100 flex-shrink-0">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em] mb-1 block">
              {t('project_case_label') || "Project Case"}
            </span>
            <h1 className="text-3xl font-black text-black tracking-tight italic">
              {project.title}
            </h1>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 py-10 space-y-10 min-h-[50vh]">
          
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-[9px] font-black uppercase tracking-wider">
              {project.tagline}
            </div>
            <p className="text-gray-800 text-[18px] leading-relaxed font-semibold px-2">
              {project.desc}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-black/20">
              <Code size={16} weight="bold" />
              <h3 className="text-[11px] font-black uppercase tracking-widest">Tech Stack</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {project.tech?.map((item: string) => (
                <span key={item} className="px-5 py-2.5 bg-[#f2f2f7] text-gray-800 text-[12px] font-bold rounded-2xl border border-black/5 shadow-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 pb-8">
            <a 
              href={project.link || project.github} 
              target="_blank" 
              rel="noreferrer" 
              className="w-full h-16 bg-black text-white rounded-[24px] flex items-center justify-center gap-3 font-bold text-lg active:scale-[0.97] transition-all shadow-2xl py-4"
            >
              {projectId === 'glowlixir' ? (
                <>
                  <GithubLogo size={24} weight="bold" />
                  <span>{t('view_source') || "المصدر البرمجي"}</span>
                </>
              ) : (
                <>
                  <Globe size={24} weight="fill" />
                  <span>{t('explore_live') || "عرض المشروع"}</span>
                </>
              )}
              <ArrowUpRight size={18} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileProjectDetail;