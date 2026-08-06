import React from 'react';
import { 
  Terminal as TerminalIcon, 
  Github, 
  Linkedin, 
  Folder,
  GraduationCap,
  DollarSign,
  Heart,
  Sun
} from 'lucide-react';
import { AppWindow } from '../../types';

interface DockProps {
  windows: AppWindow[];
  onOpenApp: (appId: string, extraProps?: Record<string, any>) => void;
  onOpenHelp: () => void;
}

export const Dock: React.FC<DockProps> = ({ windows, onOpenApp }) => {
  const isAppOpen = (itemId: string) => {
    return windows.some(w => w.id === itemId && w.isOpen);
  };

  const dockApps = [
    {
      id: 'terminal',
      name: 'Terminal',
      bg: 'bg-gradient-to-b from-stone-800 to-black border-stone-700',
      icon: <TerminalIcon className="w-5.5 h-5.5 text-terminal-green drop-shadow" />,
      action: () => onOpenApp('terminal'),
      isOpen: isAppOpen('terminal'),
    },
    {
      id: 'messages',
      name: 'Messages',
      bg: 'bg-[#34C759] border-emerald-400/50',
      icon: (
        <div className="w-full h-full bg-[#34C759] flex items-center justify-center rounded-xl overflow-hidden">
          <img
            src="/assets/message_icon.png"
            alt="Messages Icon"
            className="w-full h-full object-cover scale-125 select-none"
          />
        </div>
      ),
      action: () => onOpenApp('messages'),
      isOpen: isAppOpen('messages'),
    },
    {
      id: 'gallery',
      name: 'Gallery',
      bg: 'bg-white border-stone-300',
      icon: (
        <img
          src="/assets/gallery_app_icon.png"
          alt="Gallery Icon"
          className="w-full h-full object-cover scale-105 rounded-xl select-none"
        />
      ),
      action: () => onOpenApp('gallery'),
      isOpen: isAppOpen('gallery'),
    },
    {
      id: 'weather',
      name: 'Weather',
      bg: 'bg-gradient-to-b from-sky-400 via-blue-500 to-indigo-600 border-sky-300/50',
      icon: <Sun className="w-6 h-6 text-amber-300 fill-amber-300" />,
      action: () => onOpenApp('weather'),
      isOpen: isAppOpen('weather'),
    },
    {
      id: 'payflow',
      name: 'PayFlow',
      bg: 'bg-black border-stone-800',
      icon: (
        <div className="flex items-center justify-center">
          <DollarSign className="w-6.5 h-6.5 text-terminal-yellow stroke-[2.5]" />
        </div>
      ),
      action: () => onOpenApp('project', { projectId: 'payflow' }),
      isOpen: isAppOpen('project') && windows.find(w => w.id === 'project')?.contentProps?.projectId === 'payflow',
    },
    {
      id: 'resumepilot',
      name: 'ResumePilot',
      bg: 'bg-gradient-to-b from-pink-500 to-rose-600 border-pink-400/50',
      icon: (
        <div className="flex items-center justify-center">
          <GraduationCap className="w-6.5 h-6.5 text-white stroke-[2.2]" />
        </div>
      ),
      action: () => onOpenApp('project', { projectId: 'resumepilot' }),
      isOpen: isAppOpen('project') && windows.find(w => w.id === 'project')?.contentProps?.projectId === 'resumepilot',
    },
    {
      id: 'foodrush',
      name: 'FoodRush',
      bg: 'bg-white border-stone-300',
      icon: (
        <svg className="w-6.5 h-6.5 fill-amber-600 translate-y-0.5" viewBox="0 0 24 24">
          <path d="M12 3c-4.42 0-8 2.24-8 5v1h16V8c0-2.76-3.58-5-8-5zm-8 7v2h16v-2H4zm1 4v1c0 1.66 3.13 3 7 3s7-1.34 7-3v-1H5z"/>
        </svg>
      ),
      action: () => onOpenApp('project', { projectId: 'foodrush' }),
      isOpen: isAppOpen('project') && windows.find(w => w.id === 'project')?.contentProps?.projectId === 'foodrush',
    },
    {
      id: 'chessplus',
      name: 'Chess++',
      bg: 'bg-white border-stone-300',
      icon: (
        <img
          src="/assets/knight_logo.png"
          alt="Chess++ Knight Logo"
          className="w-full h-full object-cover scale-105 -translate-y-0.5 rounded-xl select-none"
        />
      ),
      action: () => onOpenApp('project', { projectId: 'chessplus' }),
      isOpen: isAppOpen('project') && windows.find(w => w.id === 'project')?.contentProps?.projectId === 'chessplus',
    },
    {
      id: 'github',
      name: 'GitHub',
      bg: 'bg-gradient-to-b from-stone-800 to-zinc-950 border-zinc-700',
      icon: <Github className="w-6 h-6 text-white" />,
      action: () => window.open('https://github.com/subhamdas29', '_blank'),
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      bg: 'bg-gradient-to-b from-sky-600 to-blue-700 border-sky-400/50',
      icon: <Linkedin className="w-6 h-6 text-white" />,
      action: () => window.open('https://www.linkedin.com/in/subhamdas29', '_blank'),
    },
    {
      id: 'finder',
      name: 'Finder (Files)',
      bg: 'bg-gradient-to-b from-sky-500 to-blue-600 border-sky-300/50',
      icon: <Folder className="w-6 h-6 text-white fill-white/30" />,
      action: () => onOpenApp('finder'),
      isOpen: isAppOpen('finder'),
    },
    {
      id: 'hearts',
      name: 'Hearts',
      bg: 'bg-gradient-to-b from-red-500 to-rose-600 border-red-400/50',
      icon: <Heart className="w-6 h-6 text-white fill-white" />,
      action: () => onOpenApp('hearts'),
      isOpen: isAppOpen('hearts'),
    },
  ];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 select-none max-w-[98vw]">
      {/* Translucent Glassmorphism Dock Bar */}
      <div className="flex items-center justify-center space-x-2.5 sm:space-x-3.5 px-4 py-3 rounded-2xl bg-black/40 backdrop-blur-2xl border border-white/20 shadow-2xl">
        {dockApps.map((item) => (
          <div key={item.id} className="relative group flex items-center justify-center">
            {/* Tooltip */}
            <div className="absolute -top-12 px-2.5 py-1 rounded-md bg-[#1E1E1E]/95 text-white text-[11px] font-sans font-medium backdrop-blur-md border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              {item.name}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1E1E1E]" />
            </div>

            {/* Icon Tile */}
            <button
              onClick={item.action}
              className={`w-12 h-12 sm:w-12.5 sm:h-12.5 rounded-xl ${item.bg} border flex items-center justify-center transition-all duration-200 ease-out hover:-translate-y-4 hover:scale-125 active:scale-95 relative overflow-hidden shrink-0 select-none cursor-pointer`}
              title={item.name}
            >
              {item.icon}
            </button>

            {/* Active Dot Indicator */}
            {item.isOpen && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.2 h-1.2 rounded-full bg-white pointer-events-none" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
