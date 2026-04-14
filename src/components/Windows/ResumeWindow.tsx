import { useTranslation } from 'react-i18next';
import { FilePdf, DownloadSimple, IdentificationCard } from "@phosphor-icons/react";

const ResumeWindow = () => {
  const { t } = useTranslation();

  const resumeData = t('resume_content.files', { returnObjects: true }) as { label: string, url: string }[];

  return (
    <div className="max-w-2xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
      
      <div className="mb-8 flex justify-center">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
          <IdentificationCard size={40} weight="duotone" />
        </div>
      </div>

      <h2 className="text-2xl font-black text-gray-800 mb-4">
        {t('sections.resume')}
      </h2>
      
      <p className="text-gray-600 mb-10 leading-relaxed max-w-md mx-auto">
        {t('resume_content.text')}
      </p>

      <div className="grid grid-cols-1 gap-4">
        {resumeData.map((file, index) => (
          <a
            key={index}
            href={file.url}
            download
            className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-50 text-red-500 rounded-xl group-hover:bg-red-500 group-hover:text-white transition-colors">
                <FilePdf size={28} weight="fill" />
              </div>
              <div className="text-right">
                <h3 className="font-bold text-gray-800">{file.label}</h3>
                <span className="text-xs text-gray-400 uppercase">PDF Document</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
              <span className="hidden group-hover:block transition-all">تحميل الآن</span>
              <DownloadSimple size={22} weight="bold" />
            </div>
          </a>
        ))}
      </div>

      <p className="mt-12 text-[10px] text-gray-400 uppercase tracking-widest">
        آخر تحديث: أبريل 2026
      </p>
    </div>
  );
};

export default ResumeWindow;