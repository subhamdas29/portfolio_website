import React from 'react';

interface HelpAppProps {
  onOpenTerminal?: () => void;
}

export const HelpApp: React.FC<HelpAppProps> = ({ onOpenTerminal }) => {
  return (
    <div className="h-full bg-[#242424] p-4 text-xs font-mono select-text overflow-y-auto space-y-2 text-stone-200 flex flex-col justify-between">
      <div className="space-y-2">
        <div className="text-terminal-yellow font-bold border-b border-white/10 pb-1 text-xs">
          help~
        </div>

        {/* Command list matching reference screenshot */}
        <div className="space-y-1.5 py-1 text-[11px] leading-relaxed">
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
      </div>

      {/* Terminal trigger prompt matching screenshot */}
      <div
        onClick={onOpenTerminal}
        className="pt-2 border-t border-white/10 flex items-center space-x-1.5 cursor-pointer hover:opacity-80 transition-opacity text-[11px] font-mono shrink-0"
      >
        <span className="text-terminal-green font-bold">subhamdas:~$</span>
        <span className="text-grey-white">Open the terminal and type here</span>
      </div>
    </div>
  );
};
