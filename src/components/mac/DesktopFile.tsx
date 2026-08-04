import React, { useState, useRef } from 'react';
import { FileText } from 'lucide-react';

interface DesktopFileProps {
  id: string;
  name: string;
  initialPosition: { x: number; y: number };
  onDoubleClick: () => void;
}

export const DesktopFile: React.FC<DesktopFileProps> = ({
  id,
  name,
  initialPosition,
  onDoubleClick,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: initialPosition.x,
    posY: initialPosition.y,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
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
      setPosition({
        x: Math.max(10, Math.min(window.innerWidth - 80, dragRef.current.posX + dx)),
        y: Math.max(40, Math.min(window.innerHeight - 120, dragRef.current.posY + dy)),
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

  return (
    <div
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
      onMouseDown={handleMouseDown}
      onDoubleClick={onDoubleClick}
      className={`absolute z-20 flex flex-col items-center justify-center p-2 rounded-lg cursor-grab active:cursor-grabbing hover:bg-white/10 border border-transparent hover:border-white/15 transition-colors select-none group w-20 ${
        isDragging ? 'opacity-75 scale-105' : 'opacity-100'
      }`}
      title="Double click to open file"
    >
      {/* File Document Icon */}
      <div className="w-12 h-14 bg-white/95 rounded-md border border-stone-300 flex flex-col items-center justify-center relative p-1 group-hover:scale-105 transition-transform">
        <FileText size={28} className="text-stone-700" />
        <div className="w-8 h-1 bg-stone-300 rounded mt-1" />
        <div className="w-6 h-1 bg-stone-200 rounded mt-0.5" />
      </div>

      {/* File Name Label */}
      <span className="mt-1.5 text-xs font-mono font-medium text-grey-white bg-black/60 px-1.5 py-0.5 rounded text-center truncate max-w-full">
        {name}
      </span>
    </div>
  );
};
