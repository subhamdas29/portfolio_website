import React from 'react';

interface HelpBoxProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal?: () => void;
}

export const HelpBox: React.FC<HelpBoxProps> = ({ isOpen, onClose, onOpenTerminal }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-10 left-6 z-40 max-w-xl w-full select-text animate-fadeIn">
      <div className="bg-[#282828]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl text-xs sm:text-sm font-mono space-y-3 relative">
        {/* Header */}
        <div className="flex items-center justify-between text-stone-300 font-bold border-b border-white/10 pb-2">
          <span className="text-terminal-yellow">help~</span>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white text-xs px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
          >
            Close
          </button>
        </div>

        {/* Command entries matching screenshot design */}
        <div className="space-y-2 py-1">
          <div>
            <span className="text-terminal-green font-bold">whoami</span>
            <span className="text-terminal-yellow"> - Get to know about me</span>
          </div>

          <div>
            <span className="text-terminal-green font-bold">cat &lt;file&gt;</span>
            <span className="text-terminal-yellow"> - View file content (e.g. cat resume)</span>
          </div>

          <div>
            <span className="text-terminal-green font-bold">open &lt;app&gt;</span>
            <span className="text-terminal-yellow"> - Launch GUI app (payflow, resumepilot, etc.)</span>
          </div>

          <div>
            <span className="text-terminal-green font-bold">theme</span>
            <span className="text-terminal-yellow"> - Display color tokens and styling hex</span>
          </div>

          <div>
            <span className="text-terminal-green font-bold">who</span>
            <span className="text-terminal-yellow"> - List all people who liked the portfolio</span>
          </div>

          <div>
            <span className="text-terminal-green font-bold">ls</span>
            <span className="text-terminal-yellow"> - List files in workspace directory</span>
          </div>

          <div>
            <span className="text-terminal-green font-bold">date</span>
            <span className="text-terminal-yellow"> - Show current date and timestamp</span>
          </div>

          <div>
            <span className="text-terminal-green font-bold">clear</span>
            <span className="text-terminal-yellow"> - Clear terminal buffer</span>
          </div>
        </div>

        {/* Bottom prompt matching screenshot */}
        <div
          onClick={onOpenTerminal}
          className="pt-2 border-t border-white/10 flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="text-terminal-green font-bold">subhamdas:~$</span>
          <span className="text-grey-white">Open the terminal and type here</span>
        </div>
      </div>
    </div>
  );
};
