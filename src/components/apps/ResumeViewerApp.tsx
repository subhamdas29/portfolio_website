import React, { useState } from 'react';
import { Download, ExternalLink, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export const ResumeViewerApp: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 25, 225));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 25, 50));
  const handleResetZoom = () => setZoomLevel(100);

  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-[#121214] text-stone-100 font-sans flex flex-col items-center select-text p-4 space-y-4">
      {/* Sticky Header Controls Bar */}
      <div className="sticky top-0 z-20 w-full max-w-3xl flex items-center justify-between p-3 bg-stone-900/90 backdrop-blur-md border border-stone-800 rounded-2xl shadow-xl shrink-0">
        <div className="flex items-center space-x-2 text-xs font-mono text-stone-300">
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold">JPG</span>
          <span className="font-bold">Subham_Das_Resume.jpg</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-stone-800 p-1 rounded-xl border border-stone-700">
            <button
              onClick={handleZoomOut}
              className="p-1 rounded-lg hover:bg-stone-700 text-stone-300 hover:text-white transition-all cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <span className="text-[11px] font-mono w-10 text-center font-bold text-emerald-400">{zoomLevel}%</span>
            <button
              onClick={handleZoomIn}
              className="p-1 rounded-lg hover:bg-stone-700 text-stone-300 hover:text-white transition-all cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
            {zoomLevel !== 100 && (
              <button
                onClick={handleResetZoom}
                className="p-1 rounded-lg hover:bg-stone-700 text-stone-400 hover:text-white transition-all cursor-pointer"
                title="Reset Zoom"
              >
                <RotateCcw size={13} />
              </button>
            )}
          </div>

          <a
            href="/assets/resume_subham.jpg"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-mono text-white border border-stone-700 transition-all cursor-pointer"
            title="Open image in new tab"
          >
            <ExternalLink size={13} />
            <span>Open High-Res</span>
          </a>
          <a
            href="/assets/resume_subham.jpg"
            download="Subham_Das_Resume.jpg"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-mono text-white font-bold transition-all shadow-sm cursor-pointer"
            title="Download resume image"
          >
            <Download size={13} />
            <span>Download</span>
          </a>
        </div>
      </div>

      {/* High Quality Scrollable Resume Image Container */}
      <div className="w-full max-w-3xl rounded-2xl overflow-x-auto overflow-y-visible shadow-2xl border border-stone-800 bg-stone-950 p-2 flex justify-center">
        <img
          src="/assets/resume_subham.jpg"
          alt="Subham Das Resume"
          style={{ width: `${zoomLevel}%`, maxWidth: zoomLevel === 100 ? '100%' : 'none' }}
          className="h-auto object-contain block transition-all duration-200 rounded-lg shadow-inner"
        />
      </div>
    </div>
  );
};
