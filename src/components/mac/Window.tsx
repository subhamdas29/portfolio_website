import React, { useState, useRef, useEffect } from 'react';
import { Minus, X, Maximize2, Minimize2, Terminal as TerminalIcon, User, Layers, Heart, Folder, Sun, Image as ImageIcon, MessageSquare } from 'lucide-react';
import { AppWindow } from '../../types';

interface WindowProps {
  window: AppWindow;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({
  window: appWindow,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children,
}) => {
  const [position, setPosition] = useState(appWindow.position);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: position.x,
    posY: position.y,
  });

  useEffect(() => {
    setPosition(appWindow.position);
  }, [appWindow.position]);

  if (!appWindow.isOpen || appWindow.isMinimized) {
    return null;
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus(appWindow.id);
    if (appWindow.isMaximized) return;

    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: position.x,
      posY: position.y,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - dragRef.current.startX;
      const dy = moveEvent.clientY - dragRef.current.startY;
      const currentWinWidth = appWindow.size.width || 200;
      
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - currentWinWidth - 10, dragRef.current.posX + dx)),
        y: Math.max(30, Math.min(window.innerHeight - 60, dragRef.current.posY + dy)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Terminal': return <TerminalIcon size={14} className="text-terminal-green" />;
      case 'User': return <User size={14} className="text-cyan-400" />;
      case 'Layers': return <Layers size={14} className="text-terminal-yellow" />;
      case 'Heart': return <Heart size={13} className="text-red-500 fill-red-500" />;
      case 'Folder': return <Folder size={14} className="text-sky-400" />;
      case 'Sun': return <Sun size={14} className="text-amber-400 fill-amber-400" />;
      case 'Image': return <ImageIcon size={14} className="text-purple-400" />;
      case 'MessageSquare': return <MessageSquare size={14} className="text-blue-400" />;
      default: return null;
    }
  };

  const style: React.CSSProperties = appWindow.isMaximized
    ? {
        top: '28px',
        left: '0px',
        width: '100vw',
        height: 'calc(100vh - 28px - 70px)',
        zIndex: appWindow.zIndex,
      }
    : {
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${appWindow.size.width}px`,
        height: `${appWindow.size.height}px`,
        maxHeight: 'calc(100vh - 60px)',
        maxWidth: 'calc(100vw - 10px)',
        zIndex: appWindow.zIndex,
      };

  return (
    <div
      style={style}
      className={`fixed rounded-2xl flex flex-col overflow-hidden select-none shadow-xl transition-shadow bg-[#1A1A1A]/80 backdrop-blur-2xl border border-white/20 ${
        isDragging ? 'opacity-95 scale-[1.002]' : 'opacity-100'
      }`}
      onClick={() => onFocus(appWindow.id)}
    >
      {/* Standard macOS Window Header Bar */}
      <div
        onMouseDown={handleMouseDown}
        className="h-8 flex items-center justify-between px-2.5 cursor-grab active:cursor-grabbing select-none shrink-0 bg-[#242424]/90 border-b border-white/10"
      >
        {/* Traffic Light Buttons */}
        <div className="flex items-center space-x-1.5 group shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose(appWindow.id);
            }}
            className="w-3 h-3 rounded-full bg-mac-red flex items-center justify-center text-black/60 hover:text-black transition-colors"
            title="Close"
          >
            <X size={8} className="opacity-0 group-hover:opacity-100 font-bold" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(appWindow.id);
            }}
            className="w-3 h-3 rounded-full bg-mac-yellow flex items-center justify-center text-black/60 hover:text-black transition-colors"
            title="Minimize"
          >
            <Minus size={8} className="opacity-0 group-hover:opacity-100 font-bold" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize(appWindow.id);
            }}
            className="w-3 h-3 rounded-full bg-mac-green flex items-center justify-center text-black/60 hover:text-black transition-colors"
            title={appWindow.isMaximized ? "Restore Size" : "Enlarge"}
          >
            {appWindow.isMaximized ? (
              <Minimize2 size={8} className="opacity-0 group-hover:opacity-100 font-bold" />
            ) : (
              <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 font-bold" />
            )}
          </button>
        </div>

        {/* Window Title (No extra heart icon in titlebar for Hearts app) */}
        <div className="flex items-center space-x-1.5 text-xs font-semibold text-grey-white font-sans truncate max-w-[60%]">
          {appWindow.id !== 'hearts' && renderIcon(appWindow.icon)}
          <span className="truncate">{appWindow.title}</span>
        </div>

        {/* Right Spacer */}
        <div className="w-10" />
      </div>

      {/* Window Body Content (Transparent for Hearts app to allow glass backdrop blur to show through) */}
      <div className={`flex-1 overflow-hidden p-0 ${appWindow.id === 'hearts' ? 'bg-transparent' : 'bg-[#1A1A1A]/90'}`}>
        {children}
      </div>
    </div>
  );
};
