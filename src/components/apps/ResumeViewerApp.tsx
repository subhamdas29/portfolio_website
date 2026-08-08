import React, { useState } from 'react';
import { Download, ExternalLink, ZoomIn, ZoomOut, RotateCcw, ArrowLeft } from 'lucide-react';

interface ResumeViewerAppProps {
  onBack?: () => void;
}

export const ResumeViewerApp: React.FC<ResumeViewerAppProps> = ({ onBack }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 20, 250));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 20, 50));
  const handleResetZoom = () => setZoomLevel(100);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      if (e.deltaY < 0) {
        setZoomLevel(prev => Math.min(prev + 10, 250));
      } else {
        setZoomLevel(prev => Math.max(prev - 10, 50));
      }
    }
  };

  return (
    <div className="h-full w-full overflow-hidden bg-[#121214] text-stone-100 font-sans flex flex-col select-text">
      {/* Sticky Header Controls Bar */}
      <div className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-stone-900 border-b border-stone-800 shadow-xl shrink-0 z-20 flex-wrap gap-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-stone-300">
          {onBack && (
            <button
              onClick={onBack}
              className="mr-1 px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-white text-xs font-sans font-bold uppercase tracking-wider inline-flex items-center space-x-1 border border-stone-700 cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Back</span>
            </button>
          )}
          <span className="font-bold tracking-wide text-stone-200 truncate max-w-[150px] sm:max-w-none">Subham_Das_Resume.jpg</span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 bg-stone-800 p-1 rounded-xl border border-stone-700">
            <button
              onClick={handleZoomOut}
              className="p-1 sm:p-1.5 rounded-lg hover:bg-stone-700 text-stone-300 hover:text-white transition-all cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <span className="text-[11px] sm:text-xs font-mono w-10 sm:w-12 text-center font-bold text-emerald-400">{zoomLevel}%</span>
            <button
              onClick={handleZoomIn}
              className="p-1 sm:p-1.5 rounded-lg hover:bg-stone-700 text-stone-300 hover:text-white transition-all cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
            {zoomLevel !== 100 && (
              <button
                onClick={handleResetZoom}
                className="p-1 sm:p-1.5 rounded-lg hover:bg-stone-700 text-stone-400 hover:text-white transition-all cursor-pointer"
                title="Reset Zoom to 100%"
              >
                <RotateCcw size={13} />
              </button>
            )}
          </div>

          <a
            href="/assets/resume_subham.jpg"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-mono text-white border border-stone-700 transition-all cursor-pointer"
            title="Open image in new tab"
          >
            <ExternalLink size={13} />
            <span>Open</span>
          </a>
          <a
            href="/assets/resume_subham.jpg"
            download="Subham_Das_Resume.jpg"
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-mono text-white font-bold transition-all shadow-md cursor-pointer"
            title="Download resume image"
          >
            <Download size={13} />
            <span>Download</span>
          </a>
        </div>
      </div>

      {/* Main Scrollable Canvas for Document */}
      <div
        onWheel={handleWheel}
        className="flex-1 w-full overflow-auto custom-scrollbar p-3 sm:p-6 flex justify-center items-start bg-stone-950"
      >
        <div
          className="relative shadow-2xl rounded-lg overflow-hidden border border-stone-800 bg-white transition-all duration-200 my-auto"
          style={{
            width: zoomLevel === 100 ? '100%' : `${zoomLevel}%`,
            maxWidth: zoomLevel === 100 ? '840px' : 'none'
          }}
        >
          <img
            src="/assets/resume_subham.jpg"
            alt="Subham Das Resume"
            className="w-full h-auto block select-none"
          />
        </div>
      </div>
    </div>
  );
};
