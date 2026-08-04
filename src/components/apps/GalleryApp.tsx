import React, { useState } from 'react';
import { Folder, Check, ChevronRight, ArrowLeft, Grid, Monitor, Sparkles } from 'lucide-react';

interface GalleryAppProps {
  currentWallpaper: string;
  onSetWallpaper: (wallpaperPath: string) => void;
}

interface WallpaperItem {
  id: string;
  title: string;
  path: string;
  category: string;
}

const WALLPAPERS: WallpaperItem[] = [
  {
    id: 'default',
    title: 'Default macOS Dark',
    path: 'default',
    category: 'System',
  },
  {
    id: 'tanjiro',
    title: 'Tanjiro Kamado',
    path: '/assets/Wallpapers/tanjiro-kamado-6082x5416-23027.jpg',
    category: 'Anime',
  },
  {
    id: 'cyberpunk-city',
    title: 'Neon Cyberpunk City',
    path: '/assets/Wallpapers/5957646.png',
    category: 'Cyberpunk',
  },
  {
    id: 'mountain-dusk',
    title: 'Minimalist Mountain Dusk',
    path: '/assets/Wallpapers/660523.jpg',
    category: 'Nature',
  },
];

export const GalleryApp: React.FC<GalleryAppProps> = ({
  currentWallpaper,
  onSetWallpaper,
}) => {
  const [currentFolder, setCurrentFolder] = useState<'root' | 'wallpapers'>('wallpapers');

  return (
    <div className="w-full h-full bg-white text-stone-900 flex font-sans select-none overflow-hidden">
      {/* Authentic Light macOS Finder Sidebar */}
      <div className="w-52 bg-[#ECEAE5] border-r border-stone-300 p-3 flex flex-col justify-between shrink-0">
        <div className="space-y-4">
          <div className="px-2 text-[10px] font-bold text-stone-500 tracking-wider uppercase">
            LIBRARY
          </div>
          <nav className="space-y-1 text-xs">
            <button
              onClick={() => setCurrentFolder('wallpapers')}
              className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg transition-colors font-medium ${
                currentFolder === 'wallpapers'
                  ? 'bg-[#007AFF] text-white shadow-sm font-semibold'
                  : 'text-[#4D4D4D] hover:bg-black/5'
              }`}
            >
              <Monitor className="w-4 h-4 shrink-0" />
              <span className="truncate">Wallpapers</span>
            </button>
            <button
              onClick={() => setCurrentFolder('root')}
              className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg transition-colors font-medium ${
                currentFolder === 'root'
                  ? 'bg-[#007AFF] text-white shadow-sm font-semibold'
                  : 'text-[#4D4D4D] hover:bg-black/5'
              }`}
            >
              <Folder className="w-4 h-4 shrink-0 text-amber-500" />
              <span className="truncate">All Folders</span>
            </button>
          </nav>
        </div>

        <div className="px-2 py-2 border-t border-stone-300/60 text-[11px] text-stone-500 flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Click to set wallpaper</span>
        </div>
      </div>

      {/* Main Finder Body Area */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {/* Top Light Finder Navigation Bar */}
        <div className="h-11 border-b border-stone-200 bg-[#F6F6F6] px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            {currentFolder !== 'root' && (
              <button
                onClick={() => setCurrentFolder('root')}
                className="p-1 rounded hover:bg-stone-200 text-stone-600 transition-colors"
                title="Back to Folders"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div className="flex items-center space-x-1 text-xs font-bold text-[#2C2C2C]">
              <span>Gallery</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="capitalize">{currentFolder}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-stone-500 text-xs">
            <Grid className="w-4 h-4 text-stone-400" />
            <span>{WALLPAPERS.length} items</span>
          </div>
        </div>

        {/* Gallery View Area */}
        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar bg-white">
          {currentFolder === 'root' ? (
            /* Root Folder Grid */
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div
                onClick={() => setCurrentFolder('wallpapers')}
                className="group p-4 bg-[#F8F9FA] border border-stone-200 hover:border-blue-400 hover:shadow-md rounded-xl cursor-pointer transition-all flex flex-col items-center text-center space-y-2"
              >
                <Folder className="w-14 h-14 text-[#007AFF] group-hover:scale-105 transition-transform" />
                <span className="text-xs font-bold text-stone-800">Wallpapers</span>
                <span className="text-[10px] text-stone-500">{WALLPAPERS.length} Wallpapers</span>
              </div>
            </div>
          ) : (
            /* Wallpapers Cards Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WALLPAPERS.map((item) => {
                const isActive = currentWallpaper === item.path;
                return (
                  <div
                    key={item.id}
                    className={`group bg-[#F8F9FA] border rounded-xl overflow-hidden shadow-sm transition-all duration-200 flex flex-col justify-between ${
                      isActive
                        ? 'border-[#007AFF] ring-2 ring-[#007AFF]/20 bg-blue-50/20'
                        : 'border-stone-200 hover:border-stone-300 hover:shadow-md'
                    }`}
                  >
                    {/* Thumbnail Container */}
                    <div className="relative aspect-video w-full bg-stone-100 overflow-hidden">
                      {item.path === 'default' ? (
                        <div className="w-full h-full bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/10">
                            <Monitor className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      ) : (
                        <img
                          src={item.path}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}

                      {/* Active Badge */}
                      {isActive && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#007AFF] text-white text-[10px] font-bold flex items-center space-x-1 shadow-md">
                          <Check className="w-3 h-3" />
                          <span>Active</span>
                        </div>
                      )}
                    </div>

                    {/* Footer Info & Action Button */}
                    <div className="p-3 flex items-center justify-between gap-2 border-t border-stone-100 bg-white">
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-stone-800 truncate" title={item.title}>
                          {item.title}
                        </div>
                        <div className="text-[10px] text-stone-500 font-medium">{item.category}</div>
                      </div>

                      <button
                        onClick={() => onSetWallpaper(item.path)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default'
                            : 'bg-[#007AFF] hover:bg-blue-600 text-white shadow-sm active:scale-95'
                        }`}
                      >
                        {isActive ? 'Current' : 'Set Wallpaper'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
