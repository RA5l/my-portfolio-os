import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Folder, Globe, Gear, X, Image as ImageIcon, Minus, CornersOut, Hash, MagnifyingGlassPlus, MagnifyingGlassMinus, Trash, ArrowsCounterClockwise } from "@phosphor-icons/react";
import { motion, AnimatePresence } from 'framer-motion';
import profileImg from '../../assets/profile.png'; 
import photo1 from '../../assets/photo1.jpeg';
import photo2 from '../../assets/photo2.jpeg';
import photo3 from '../../assets/photo3.jpeg';

const AboutWindow = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [openedFile, setOpenedFile] = useState(false);
  const [showPhotoViewer, setShowPhotoViewer] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const readmeContent = {
    title: isRTL ? 'معلومات_رسيل.txt' : 'raseel_info.txt',
    sections: [
      { h: t('about_content.who_is_title'), p: t('about_content.who_is_text') },
      { h: t('about_content.passion_title'), p: t('about_content.passion_text') },
      { h: t('about_content.academic_title'), p: t('about_content.academic_text') }
    ]
  };

  const stats = useMemo(() => {
    const allText = readmeContent.sections.map(s => s.p).join(' ');
    const lines = readmeContent.sections.length * 4; 
    const words = allText.split(/\s+/).filter(Boolean).length;
    return { lines, words };
  }, [readmeContent.sections]);

  const folderItems = [
    { id: 'readme', name: readmeContent.title, icon: <FileText size={42} weight="fill" className="text-blue-500" />, type: 'file' },
    { id: 'photos', name: isRTL ? 'الصور' : 'Photos', icon: <Folder size={42} weight="fill" className="text-gray-900" />, type: 'folder' },
    { id: 'web', name: 'GitHub.url', icon: <Globe size={42} weight="fill" className="text-emerald-500" />, type: 'link', url: 'https://github.com/RA5l' },
    { id: 'config', name: 'system.conf', icon: <Gear size={42} weight="fill" className="text-gray-400" />, type: 'system', tooltip: isRTL ? 'صلاحيات المالك فقط' : 'Owner access only' },
    { id: 'img1', name: 'profile.png', icon: <div className="w-[42px] h-[42px] rounded-sm overflow-hidden shadow-sm border border-gray-200"><img src={profileImg} className="w-full h-full object-cover" alt="Profile" /></div>, type: 'image' },
  ];

  const handleClick = (item: any) => {
    if (item.id === 'readme') setOpenedFile(true);
    if (item.id === 'photos') setShowGallery(true);
    if (item.type === 'image') setShowPhotoViewer(true);
    if (item.type === 'link') window.open(item.url, '_blank');
  };

  return (
    <div className={`h-full bg-white relative overflow-hidden flex flex-col select-none ${isRTL ? 'font-arabic-custom' : 'font-sans'}`}>
      
      <div className={`p-8 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-y-10 gap-x-4 ${isRTL ? 'rtl' : 'ltr'}`}>
        {folderItems.map((item) => (
          <div key={item.id} onClick={() => handleClick(item)} title={item.tooltip}
            className="flex flex-col items-center gap-1 group cursor-pointer w-24 p-2 rounded-sm hover:bg-blue-50/50 hover:ring-1 hover:ring-blue-100 transition-all">
            <div className="relative">
              {item.icon}
            </div>
            <span className="text-[11px] text-gray-700 text-center leading-tight break-all px-1 mt-1 group-hover:text-blue-700 font-sans">
              {item.name}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {openedFile && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
            className="absolute inset-4 md:inset-10 bg-white shadow-2xl border border-gray-300 rounded-md z-30 flex flex-col overflow-hidden"
          >
            <div className={`h-9 bg-white border-b flex items-center justify-between px-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <FileText size={16} className="text-blue-500" />
                <span className="text-[12px] text-gray-500 font-medium">{readmeContent.title} - Notepad</span>
              </div>
              <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                 <button className="p-2 hover:bg-gray-100 text-gray-400 rounded"><Minus size={14}/></button>
                 <button className="p-2 hover:bg-gray-100 text-gray-400 rounded"><CornersOut size={14}/></button>
                 <button onClick={() => setOpenedFile(false)} className="p-2 hover:bg-[#e81123] hover:text-white transition-colors text-gray-600 rounded"><X size={16} weight="bold"/></button>
              </div>
            </div>

            <div className={`flex-1 overflow-y-auto bg-white p-8 md:p-12`} dir={isRTL ? 'rtl' : 'ltr'}>
              <div className="max-w-2xl mx-auto">
                
                <div className="mb-10 w-full max-w-[200px] rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                  <img src={profileImg} className="w-full h-auto" alt="Profile Content" />
                </div>

                <div className="space-y-12">
                  {readmeContent.sections.map((sec, i) => (
                    <div key={i} className="group">
                      <h2 className="text-blue-600 font-bold text-[13px] mb-3 flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
                        <Hash size={14} weight="bold" />
                        {sec.h}
                      </h2>
                      <div className={`relative ${isRTL ? 'pr-5' : 'pl-5'}`}>
                        <div className={`absolute top-0 bottom-0 w-px bg-gray-100 ${isRTL ? 'right-0' : 'left-0'}`} />
                        <p className={`text-[15px] leading-relaxed text-gray-700 ${isRTL ? 'font-arabic-custom leading-[1.8]' : 'font-mono'}`}>
                          {sec.p}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-20 pt-8 border-t border-gray-50 text-center opacity-10 font-mono text-[10px] tracking-[0.5em]">EOF</div>
              </div>
            </div>

            <div className={`h-7 bg-[#fbfbfb] border-t border-gray-200 flex items-center px-4 text-[10px] text-gray-500 font-sans ${isRTL ? 'flex-row-reverse' : ''}`}>
               <div className={`flex-1 flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                 <span>{isRTL ? `الأسطر: ${stats.lines}، الأعمدة: ${stats.words}` : `Ln ${stats.lines}, Col ${stats.words}`}</span>
                 <span>100%</span>
                 <span>Windows (CRLF)</span>
                 <span>UTF-8</span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGallery && (
    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
      className="absolute inset-10 bg-white shadow-2xl border border-gray-300 rounded-md z-40 flex flex-col overflow-hidden">
      <div className={`h-9 bg-gray-50 border-b flex items-center justify-between px-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className="flex items-center gap-2">
           <Folder size={16} weight="fill" className="text-gray-900" />
           <span className="text-xs font-bold text-gray-600">{isRTL ? 'معرض الصور' : 'Gallery'}</span>
        </div>
        <button onClick={() => setShowGallery(false)} className="p-1.5 hover:bg-gray-200 rounded-sm transition-colors"><X size={14}/></button>
      </div>

      <div className="flex-1 p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-y-auto bg-white m-1 rounded-sm">
         {[
           { img: photo1, name: 'photo1.jpeg' },
           { img: photo2, name: 'photo2.jpeg' },
           { img: photo3, name: 'photo3.jpeg' }
         ].map((item, i) => (
           <div key={i} className="group aspect-square bg-gray-50 border border-gray-100 rounded-md hover:border-blue-400 hover:shadow-lg transition-all flex flex-col overflow-hidden cursor-zoom-in">
              <div className="flex-1 overflow-hidden bg-gray-200">
                <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} />
              </div>
              <div className="p-1 bg-white border-t border-gray-50 flex justify-center">
                <span className="text-[9px] font-mono text-gray-400 group-hover:text-blue-500 uppercase truncate">{item.name}</span>
              </div>
           </div>
         ))}
      </div>
    </motion.div>
    )}
      </AnimatePresence>

      <AnimatePresence>
        {showPhotoViewer && (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="absolute inset-16 md:inset-24 bg-white shadow-2xl border-4 border-white rounded-sm z-50 flex flex-col outline outline-1 outline-gray-200"
          >
            <div className={`h-8 bg-white border-b border-gray-100 flex items-center justify-between px-3 shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <ImageIcon size={14} className="text-purple-500" />
                <span className="text-[11px] text-gray-600 font-sans tracking-tight">
                  C:\Users\Raseel\Documents\{readmeContent.title.split('.')[0]}\profile.png - Windows Photo Viewer
                </span>
              </div>
              <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                 <button className="p-1 hover:bg-gray-100 rounded-sm text-gray-500"><Minus size={12}/></button>
                 <button className="p-1 hover:bg-gray-100 rounded-sm text-gray-500"><CornersOut size={12}/></button>
                 <button onClick={() => setShowPhotoViewer(false)} className="p-1 hover:bg-[#e81123] hover:text-white rounded-sm text-gray-500 transition-colors"><X size={14} weight="bold"/></button>
              </div>
            </div>

            <div className="flex-1 bg-[#f0f0f0] p-4 flex items-center justify-center overflow-hidden border-b border-gray-100">
              <img src={profileImg} alt="Windows View" className="max-h-full max-w-full shadow-lg" />
            </div>

            <div className="h-10 bg-white flex items-center justify-center gap-6 px-4 text-gray-400 shrink-0">
               <button className="p-2 hover:bg-gray-100 hover:text-blue-500 rounded"><MagnifyingGlassPlus size={18} /></button>
               <button className="p-2 hover:bg-gray-100 hover:text-blue-500 rounded"><MagnifyingGlassMinus size={18} /></button>
               <div className="w-px h-6 bg-gray-100" />
               <button className="p-2 hover:bg-gray-100 hover:text-blue-500 rounded"><ArrowsCounterClockwise size={18} /></button>
               <button className="p-2 hover:bg-gray-100 hover:text-red-500 rounded"><Trash size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default AboutWindow;