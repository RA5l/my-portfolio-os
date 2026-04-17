import { useTranslation } from 'react-i18next';
import { FilePdf } from "@phosphor-icons/react";

interface ResumeProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

// eslint-disable-next-line no-empty-pattern
const ResumeWindow = ({}: ResumeProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation();

  const cvFiles = [
    { 
      id: 'ar', 
      title: "CV_Arabic.pdf", 
      lang: "العربية",
      link: "/path-to-your-ar-cv.pdf" 
    },
    { 
      id: 'en', 
      title: "CV_English.pdf", 
      lang: "English",
      link: "/path-to-your-en-cv.pdf" 
    },
    { 
      id: 'dual', 
      title: "CV_Bilingual.pdf", 
      lang: "العربية / English",
      link: "/path-to-your-dual-cv.pdf" 
    },
  ];

  const handleDownload = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className="h-full w-full bg-white flex items-start justify-start p-8 overflow-y-auto custom-scrollbar">
      <div className="flex flex-wrap gap-8 justify-center sm:justify-start w-full">
        {cvFiles.map((file) => (
          <div 
            key={file.id}
            onClick={() => handleDownload(file.link)}
            className="flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer transition-all duration-200 group hover:bg-red-50 border border-transparent hover:border-red-100 w-32"
          >
            <div className="relative transform group-hover:-translate-y-1 transition-transform duration-200">
              <FilePdf size={64} weight="fill" className="text-red-600" />
              <div className="absolute -bottom-1 -right-1 bg-white border border-gray-200 rounded px-1 shadow-sm">
                 <span className="text-[9px] font-bold text-gray-500 uppercase">{file.id}</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-[12px] font-semibold text-gray-800 text-center line-clamp-1">
                {file.title}
              </span>
              <span className="text-[10px] text-gray-400 font-medium">
                {file.lang}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeWindow;