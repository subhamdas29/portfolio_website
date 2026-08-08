import React from 'react';

interface TopBarProps {
  activeAppTitle?: string;
  onOpenHelp: () => void;
  onOpenApp: (appId: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenHelp,
  onOpenApp,
}) => {
  // Format current live date: Sun, Aug 2 6:45 PM
  const now = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayName = days[now.getDay()];
  const monthName = months[now.getMonth()];
  const dateNum = now.getDate();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const timeStr = `${dayName}, ${monthName} ${dateNum} ${hours}:${minutes} ${ampm}`;

  const handleContactClick = () => {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=subhamdas290804@gmail.com', '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full h-7 bg-black border-b border-stone-800 flex items-center justify-between px-3 text-xs text-stone-200 select-none z-[9999] font-sans">
      {/* Left Menu Items */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        <button 
          onClick={() => onOpenApp('whoami')}
          className="flex items-center px-2 py-0.5 rounded hover:bg-white/10 transition-colors font-semibold text-white cursor-pointer"
        >
          <span>Subham's Mac</span>
        </button>

        <button 
          onClick={() => onOpenApp('finder')}
          className="px-2 py-0.5 rounded text-stone-300 hover:text-white hover:bg-white/10 transition-colors font-medium cursor-pointer"
        >
          File
        </button>

        <button 
          onClick={() => onOpenApp('gallery')}
          className="px-2 py-0.5 rounded text-stone-300 hover:text-white hover:bg-white/10 transition-colors font-medium cursor-pointer"
        >
          Edit
        </button>

        <button 
          onClick={() => onOpenApp('messages')}
          className="px-2 py-0.5 rounded text-stone-300 hover:text-white hover:bg-white/10 transition-colors font-medium cursor-pointer"
        >
          View
        </button>

        <button 
          onClick={onOpenHelp}
          className="px-2 py-0.5 rounded text-stone-300 hover:text-white hover:bg-white/10 transition-colors font-medium cursor-pointer"
        >
          Help
        </button>

        <button 
          onClick={() => onOpenApp('whoami')}
          className="px-2 py-0.5 rounded text-stone-300 hover:text-white hover:bg-white/10 transition-colors font-medium cursor-pointer"
        >
          About me
        </button>

        <button 
          onClick={handleContactClick}
          className="px-2 py-0.5 rounded text-stone-300 hover:text-white hover:bg-white/10 transition-colors font-medium cursor-pointer"
        >
          Contact
        </button>
      </div>

      {/* Right Live Date & Time */}
      <div className="flex items-center space-x-3 text-xs font-mono">
        <span className="text-stone-300 text-[11px] font-sans font-medium">{timeStr}</span>
      </div>
    </header>
  );
};
