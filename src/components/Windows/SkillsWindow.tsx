import { useTranslation } from 'react-i18next';
import { Code, DeviceMobile, Wrench, Lightbulb } from "@phosphor-icons/react";

const SkillsWindow = () => {
  const { t } = useTranslation();

  const skillCategories = [
    {
      title: t('skills_content.web_title'),
      skills: t('skills_content.web_list', { returnObjects: true }) as string[],
      icon: <Code size={24} className="text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      title: t('skills_content.mobile_title'),
      skills: t('skills_content.mobile_list', { returnObjects: true }) as string[],
      icon: <DeviceMobile size={24} className="text-purple-500" />,
      color: "bg-purple-50"
    },
    {
      title: t('skills_content.tools_title'),
      skills: t('skills_content.tools_list', { returnObjects: true }) as string[],
      icon: <Wrench size={24} className="text-orange-500" />,
      color: "bg-orange-50"
    },
    {
      title: t('skills_content.work_title'),
      skills: t('skills_content.work_list', { returnObjects: true }) as string[],
      icon: <Lightbulb size={24} className="text-green-500" />,
      color: "bg-green-50"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-2 animate-in fade-in zoom-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => (
          <div 
            key={index} 
            className={`p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md ${category.color}`}
          >
            <div className="flex items-center gap-3 mb-4">
              {category.icon}
              <h3 className="font-black text-gray-800 tracking-tight">
                {category.title}
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, sIndex) => (
                <span 
                  key={sIndex} 
                  className="bg-white/80 backdrop-blur-sm border border-gray-200 px-3 py-1 rounded-full text-sm font-medium text-gray-700 hover:border-blue-400 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-4 border-t border-dashed border-gray-200 text-center">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">
          Currently exploring: Next.js 14 & AI Integration
        </p>
      </div>
    </div>
  );
};

export default SkillsWindow;