import React from 'react';
import { Download, ExternalLink, ZoomIn } from 'lucide-react';

export const ResumeViewerApp: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-[#18181B] text-stone-100 font-sans flex flex-col items-center select-text p-4 space-y-4">
      {/* Header Controls Bar */}
      <div className="w-full max-w-3xl flex items-center justify-between p-3 bg-stone-900 border border-stone-800 rounded-2xl shadow-md shrink-0">
        <div className="flex items-center space-x-2 text-xs font-mono text-stone-300">
          <ZoomIn className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">Subham_Das_Resume.png</span>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href="/assets/resume_subham.png"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-mono text-white border border-stone-700 transition-all"
            title="Open full resolution in new tab"
          >
            <ExternalLink size={13} />
            <span>Open High-Res</span>
          </a>
          <a
            href="/assets/resume_subham.png"
            download="Subham_Das_Resume.png"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-mono text-white font-bold transition-all shadow-sm"
            title="Download resume image"
          >
            <Download size={13} />
            <span>Download</span>
          </a>
        </div>
      </div>

      {/* High Quality Resume Image Container */}
      <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-stone-800 bg-white">
        <img
          src="/assets/resume_subham.png"
          alt="Subham Das Resume"
          className="w-full h-auto object-contain block"
        />
      </div>
    </div>
  );
};
