import React from 'react';
import { EnvelopeSimple, GithubLogo, LinkedinLogo, TwitterLogo } from '@phosphor-icons/react';

const LINKS = {
  mail: 'mailto:raseelstudy@gmail.com',
  linkedin: 'https://www.linkedin.com/in/raseel-mohammed/',
  github: 'https://github.com/RA5l',
  x: 'https://x.com/rasetech0',
};

const MobileTaskbar: React.FC = () => {
  const dockApps = [
    { id: 'github',   icon: <GithubLogo   size={30} weight="regular" />, href: LINKS.github },
    { id: 'linkedin', icon: <LinkedinLogo size={30} weight="regular" />, href: LINKS.linkedin },
    { id: 'x',        icon: <TwitterLogo  size={30} weight="regular" />, href: LINKS.x },
    { id: 'mail',     icon: <EnvelopeSimple size={30} weight="regular" />, href: LINKS.mail },
  ];

  return (
    <div className="flex justify-center w-full px-2 mb-4">
      <div className="bg-black/10 backdrop-blur-[50px] rounded-[38px] p-3 flex gap-4 border border-white/20 shadow-2xl">
        {dockApps.map((app) => (
          <a
            key={app.id}
            href={app.href}
            target={app.id === 'mail' ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className="transition-all active:scale-75 duration-200"
          >
            <div className="w-14 h-14 bg-black text-white rounded-[20px] flex items-center justify-center shadow-lg border border-white/10 hover:bg-white/5">
              {app.icon}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MobileTaskbar;