import React from 'react';
import { Terminal, Command, Copy, Check, ExternalLink } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunCommand?: (cmd: string) => void;
}

interface CommandDoc {
  name: string;
  args?: string;
  description: string;
  example: string;
  category: 'Core' | 'Portfolio' | 'Utilities';
}

export const commandsList: CommandDoc[] = [
  {
    name: 'whoami',
    description: 'Opens a comprehensive portfolio document with bio, education, skills, and picture (personalpic.jpeg).',
    example: 'whoami',
    category: 'Portfolio',
  },
  {
    name: 'who',
    description: 'Displays the names, occupations, and organizations of all supporters who liked the portfolio.',
    example: 'who',
    category: 'Portfolio',
  },
  {
    name: 'cat',
    args: '<filename>',
    description: 'Reads and displays contents of a file (e.g. resume.txt, payflow.md, resumepilot.md, chess.md, foodrush.md, skills.txt, contact.txt).',
    example: 'cat resume.txt',
    category: 'Core',
  },
  {
    name: 'ls',
    description: 'Lists all available files and project directories in the virtual filesystem.',
    example: 'ls',
    category: 'Core',
  },
  {
    name: 'open',
    args: '<app_name>',
    description: 'Launches a macOS application or project window (terminal, whoami, payflow, resumepilot, chessplus, foodrush, github, linkedin).',
    example: 'open payflow',
    category: 'Core',
  },
  {
    name: 'help',
    description: 'Displays this command reference guide inside the terminal.',
    example: 'help',
    category: 'Utilities',
  },
  {
    name: 'clear',
    description: 'Clears all output history from the terminal buffer.',
    example: 'clear',
    category: 'Utilities',
  },
  {
    name: 'date',
    description: 'Displays the current system date, timestamp, and timezone.',
    example: 'date',
    category: 'Utilities',
  },
  {
    name: 'theme',
    description: 'Shows the exact portfolio theme color palette and hex codes (#1A1A1A, #EDEDED, #00CB00, #FFD000).',
    example: 'theme',
    category: 'Utilities',
  },
  {
    name: 'echo',
    args: '<text>',
    description: 'Prints the given text or message back to the console.',
    example: 'echo Hello Subham!',
    category: 'Utilities',
  },
  {
    name: 'sudo',
    description: 'Superuser access check (Easter egg response).',
    example: 'sudo make coffee',
    category: 'Utilities',
  },
];

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, onRunCommand }) => {
  const [copiedCmd, setCopiedCmd] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* macOS Help Window Box */}
      <div className="relative z-10 w-full max-w-2xl bg-[#1A1A1A] border border-white/20 rounded-2xl shadow-mac-window p-6 text-grey-white font-sans overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-yellow-500/20 flex items-center justify-center border border-yellow-500/40">
              <Command size={20} className="text-terminal-yellow" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center space-x-2">
                <span>Terminal Help & Commands</span>
                <span className="text-xs font-mono text-terminal-green font-normal bg-terminal-green/10 px-2 py-0.5 rounded border border-terminal-green/30">
                  subhamdas:~$
                </span>
              </h3>
              <p className="text-xs text-stone-400">Reference manual of all supported terminal shell commands</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>

        {/* Color Key Theme Banner */}
        <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between text-xs font-mono shrink-0 gap-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-terminal-green" />
              <span className="text-terminal-green font-bold">LHS Prompt (#00CB00)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-terminal-yellow" />
              <span className="text-terminal-yellow font-bold">RHS Text (#FFD000)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-grey-white" />
              <span className="text-grey-white">Body (#EDEDED)</span>
            </div>
          </div>
          <div className="text-stone-400 text-[11px]">
            Dark-grey: <span className="text-white">#1A1A1A</span>
          </div>
        </div>

        {/* Commands List Scrollable */}
        <div className="mt-4 flex-1 overflow-y-auto space-y-3 pr-1">
          {commandsList.map((cmd) => (
            <div
              key={cmd.name}
              className="p-3.5 rounded-xl bg-[#242424] border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              <div className="space-y-1">
                {/* Command syntax */}
                <div className="flex items-center space-x-2 font-mono text-sm">
                  <span className="text-terminal-green font-bold">subhamdas:~$</span>
                  <span className="text-terminal-yellow font-semibold">{cmd.name}</span>
                  {cmd.args && <span className="text-amber-300 font-mono text-xs">{cmd.args}</span>}
                </div>
                {/* Description */}
                <p className="text-xs text-grey-white leading-relaxed">
                  {cmd.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => handleCopy(cmd.example)}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded bg-black/40 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-stone-300 hover:text-white transition-colors"
                  title="Copy command"
                >
                  {copiedCmd === cmd.example ? (
                    <>
                      <Check size={12} className="text-terminal-green" />
                      <span className="text-terminal-green">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                {onRunCommand && (
                  <button
                    onClick={() => {
                      onRunCommand(cmd.example);
                      onClose();
                    }}
                    className="flex items-center space-x-1 px-2.5 py-1 rounded bg-terminal-green/20 hover:bg-terminal-green/30 border border-terminal-green/40 text-[11px] font-mono text-terminal-green font-semibold transition-colors"
                    title="Run command in Terminal"
                  >
                    <Terminal size={12} />
                    <span>Run</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
