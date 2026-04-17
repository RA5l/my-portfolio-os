import { useTranslation } from 'react-i18next';
import { 
  Folder, AndroidLogo, AppleLogo, Target, 
  ChatCircleText, ArrowsClockwise, Gear 
} from "@phosphor-icons/react";
import { 
  SiReact, SiTypescript, SiVite, SiJavascript, SiCss, SiHtml5, 
  SiVuedotjs, SiPhp, SiGithub, SiFigma, SiSqlite 
} from '@icons-pack/react-simple-icons';
import type { ComponentType, SVGAttributes } from 'react';

interface SkillsWindowProps {
  activeTab?: string;
}

const techIconMap: { 
  [key: string]: { 
    icon: ComponentType<SVGAttributes<SVGElement>> | any, 
    color: string, 
    isPhosphor?: boolean 
  } 
} = {
  "React": { icon: SiReact, color: "#61DAFB" },
  "TypeScript": { icon: SiTypescript, color: "#3178C6" },
  "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
  "HTML": { icon: SiHtml5, color: "#E34F26" },
  "CSS": { icon: SiCss, color: "#1572B6" },
  "PHP": { icon: SiPhp, color: "#777BB4" },
  "Vue.js": { icon: SiVuedotjs, color: "#4FC08D" },
  "Vite": { icon: SiVite, color: "#646CFF" },

  "iOS (Swift)": { icon: AppleLogo, color: "#000000", isPhosphor: true },
  "Android (Java, XML)": { icon: AndroidLogo, color: "#3DDC84", isPhosphor: true },

  "Git & GitHub": { icon: SiGithub, color: "#181717" },
  "SQL": { icon: SiSqlite, color: "#003B57" },
  "Google Apps Script Automation": { icon: Gear, color: "#4285F4", isPhosphor: true },
  "أتمتة Google Apps Script": { icon: Gear, color: "#4285F4", isPhosphor: true },
  "UI/UX Design": { icon: SiFigma, color: "#F24E1E" },
  "تصميم UI/UX": { icon: SiFigma, color: "#F24E1E" },

  "Technical Problem Solving": { icon: Target, color: "#E91E63", isPhosphor: true },
  "حل المشكلات التقنية": { icon: Target, color: "#E91E63", isPhosphor: true },
  "Effective Communication": { icon: ChatCircleText, color: "#03A9F4", isPhosphor: true },
  "التواصل الفعال": { icon: ChatCircleText, color: "#03A9F4", isPhosphor: true },
  "Adaptability": { icon: ArrowsClockwise, color: "#4CAF50", isPhosphor: true },
  "المرونة والتكيف": { icon: ArrowsClockwise, color: "#4CAF50", isPhosphor: true }
};

const SkillsWindow = ({ activeTab = 'web' }: SkillsWindowProps) => {
  const { t } = useTranslation();
  const skillList = t(`skills_content.${activeTab}_list`, { returnObjects: true }) as string[];

  return (
    <div className="flex-1 flex flex-col bg-white min-w-0 h-full">
      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 max-w-7xl mx-auto">
          {skillList && skillList.map((skillName, index) => {
            const tech = techIconMap[skillName];
            const Icon = tech?.icon;
            
            return (
              <div key={index} className="flex flex-col items-center gap-2 group p-4 rounded-lg hover:bg-gray-50 transition-all">
                <div className="w-16 h-16 flex items-center justify-center transition-transform group-hover:scale-110">
                  {tech ? (
                    tech.isPhosphor ? (
                      <Icon size={40} weight="fill" color={tech.color} />
                    ) : (
                      <Icon width={40} height={40} fill={tech.color} />
                    )
                  ) : (
                    <Folder size={40} weight="fill" className="text-gray-200" />
                  )}
                </div>
                <span className="text-[11px] font-bold text-center text-gray-700">{skillName}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillsWindow;