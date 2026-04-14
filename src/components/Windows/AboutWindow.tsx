import { useTranslation } from 'react-i18next';

const AboutWindow = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 rtl">
      
      <section className="space-y-6 text-center border-b border-gray-100 pb-12">
        <h2 className="text-4xl font-black text-gray-900 tracking-tight">
          {t('about_content.who_is_title')}
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed font-light italic bg-blue-50/30 p-6 rounded-3xl border border-blue-50/50">
          "{t('about_content.who_is_text')}"
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-[2px] bg-blue-500"></div>
            <h3 className="text-sm font-black uppercase tracking-widest text-blue-600">
              {t('about_content.passion_title')}
            </h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            {t('about_content.passion_text')}
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-[2px] bg-blue-500"></div>
            <h3 className="text-sm font-black uppercase tracking-widest text-blue-600">
              {t('about_content.academic_title')}
            </h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            {t('about_content.academic_text')}
          </p>
        </section>
      </div>

      <div className="flex justify-center pt-8">
        <div className="w-2 h-2 rounded-full bg-blue-200 mx-1"></div>
        <div className="w-2 h-2 rounded-full bg-blue-400 mx-1"></div>
        <div className="w-2 h-2 rounded-full bg-blue-200 mx-1"></div>
      </div>

    </div>
  );
};

export default AboutWindow;