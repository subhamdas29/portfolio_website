import React, { useState, useRef, useEffect } from 'react';
import { fetchWhoFormatted } from '../../api/client';
import { resumeData } from '../../data/resumeData';
import { projectsMdText } from '../../data/projectsMd';

interface TerminalAppProps {
  onOpenApp: (appId: string, extraProps?: Record<string, any>) => void;
  onOpenHelp: () => void;
  initialCommand?: string;
}

interface OutputEntry {
  id: string;
  command: string;
  type?: 'text' | 'error' | 'success' | 'custom';
  content: React.ReactNode;
  timestamp: string;
}

export const TerminalApp: React.FC<TerminalAppProps> = ({ onOpenApp, onOpenHelp, initialCommand }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<OutputEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    const welcomeEntry: OutputEntry = {
      id: 'welcome',
      command: '',
      content: (
        <div className="space-y-2 mb-4 pb-3 border-b border-white/10 text-xs">
          <div className="text-terminal-green font-bold flex items-center space-x-2">
            <span>macOS Subham Das Terminal [Version 1.0.0-release]</span>
          </div>
          <div className="text-stone-300">
            Type <span className="text-terminal-yellow font-semibold">help</span> to view all available commands or <span className="text-terminal-yellow font-semibold">whoami</span> to inspect developer profile.
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] text-stone-400 font-mono mt-1">
            <span>Files available:</span>
            <span className="text-amber-300">resume</span>
            <span className="text-amber-300">projects</span>
            <span className="text-amber-300">skills</span>
            <span className="text-amber-300">contact</span>
          </div>
        </div>
      ),
      timestamp: new Date().toLocaleTimeString(),
    };

    setHistory([welcomeEntry]);

    if (initialCommand) {
      executeCommand(initialCommand);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = async (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let outputContent: React.ReactNode = null;
    let entryType: 'text' | 'error' | 'success' | 'custom' = 'text';

    switch (mainCmd) {
      case 'clear':
        setHistory([]);
        return;

      case 'help':
        outputContent = (
          <div className="space-y-2 text-xs py-1">
            <div className="text-terminal-yellow font-bold">AVAILABLE COMMANDS:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <span className="text-terminal-green font-bold">whoami</span>
                <span className="text-stone-300"> - Get to know about me</span>
              </div>
              <div>
                <span className="text-terminal-green font-bold">cat &lt;file&gt;</span>
                <span className="text-stone-300"> - View file content (e.g. cat resume or cat projects)</span>
              </div>
              <div>
                <span className="text-terminal-green font-bold">open &lt;app&gt;</span>
                <span className="text-stone-300"> - Launch GUI app (payflow, resumepilot, etc.)</span>
              </div>
              <div>
                <span className="text-terminal-green font-bold">theme</span>
                <span className="text-stone-300"> - Display color tokens and styling hex</span>
              </div>
              <div>
                <span className="text-terminal-green font-bold">who</span>
                <span className="text-stone-300"> - List all people who liked the portfolio</span>
              </div>
              <div>
                <span className="text-terminal-green font-bold">ls</span>
                <span className="text-stone-300"> - List files in workspace directory</span>
              </div>
              <div>
                <span className="text-terminal-green font-bold">date</span>
                <span className="text-stone-300"> - Show current date and timestamp</span>
              </div>
              <div>
                <span className="text-terminal-green font-bold">clear</span>
                <span className="text-stone-300"> - Clear terminal buffer</span>
              </div>
            </div>
          </div>
        );
        break;

      case 'whoami':
        onOpenApp('whoami');
        outputContent = (
          <div className="space-y-3 p-3 rounded-lg bg-black/40 border border-white/10 my-2 text-xs font-mono">
            <div className="flex items-center space-x-3">
              <img
                src="/assets/personalpic.jpeg"
                alt="Subham Das"
                className="w-14 h-14 rounded-full object-cover border-2 border-terminal-green"
              />
              <div>
                <div className="text-sm font-bold text-white">{resumeData.name}</div>
                <div className="text-terminal-green">{resumeData.title}</div>
                <div className="text-stone-400 text-[11px]">{resumeData.education.institution} ({resumeData.education.degree})</div>
              </div>
            </div>
            <div className="text-grey-white leading-relaxed pt-2 border-t border-white/10">
              {resumeData.summary}
            </div>
            <div className="text-terminal-yellow text-[11px]">
              -&gt; Opened full interactive "WhoAmI" GUI window on your desktop.
            </div>
          </div>
        );
        break;

      case 'who':
        try {
          const whoFormatted = await fetchWhoFormatted();
          outputContent = (
            <div className="space-y-1.5 p-3 rounded-lg bg-black/40 border border-white/10 my-1 font-mono text-xs">
              <div className="text-terminal-yellow font-bold flex items-center justify-between border-b border-white/10 pb-1">
                <span>PORTFOLIO SUPPORTERS (HEARTS):</span>
                <span className="text-[11px] text-stone-400">Live API Endpoint /api/who</span>
              </div>
              <div className="text-terminal-green whitespace-pre-wrap leading-relaxed py-1">
                {whoFormatted}
              </div>
            </div>
          );
        } catch {
          outputContent = <div className="text-red-400">Failed to fetch supporters list from server.</div>;
        }
        break;

      case 'ls':
        outputContent = (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono my-1">
            <span className="text-amber-300">resume</span>
            <span className="text-amber-300">projects</span>
            <span className="text-amber-300">skills</span>
            <span className="text-amber-300">contact</span>
            <span className="text-cyan-400 font-bold">personalpic</span>
          </div>
        );
        break;

      case 'cat':
        const filename = args[0]?.toLowerCase();
        if (!filename) {
          entryType = 'error';
          outputContent = <div className="text-red-400">cat: missing filename argument. Usage: cat resume or cat projects</div>;
        } else if (['resume', 'resume.txt', 'resume.jpg'].includes(filename)) {
          onOpenApp('resume_viewer');
          outputContent = (
            <div className="p-3 rounded bg-black/50 border border-white/10 text-xs font-mono text-stone-200 whitespace-pre-wrap leading-relaxed">
              {`=============================================================
SUBHAM DAS - FULL-STACK DEVELOPER
Phone: +91 8582953151 | Email: subhamdas5477@gmail.com
GitHub: https://github.com/subhamdas29 | LinkedIn: https://www.linkedin.com/in/subhamdas29
=============================================================

SUMMARY:
${resumeData.summary}

EDUCATION:
Techno Institute of Engineering & Management
B.Tech. in Computer Science & Engineering | CGPA: 7.5/10 | Oct. 2022 - Jul. 2026

TECHNICAL SKILLS:
- Languages: TypeScript, JavaScript, Python, SQL
- Frontend: React.js, Tailwind CSS, HTML, CSS
- Backend & DevOps: Node.js, Express.js, FastAPI, Docker, CI/CD, Git
- AI/ML: spaCy, HuggingFace Embeddings, Groq API, Semantic Similarity
- Database: PostgreSQL, Supabase, Prisma ORM

KEY EXPERIENCE & FYP:
ResumePilot (FYP - 2026): ATS Score & Suggestions Tool
- Lead Backend Developer
- Asynchronous FastAPI backend reducing latency by 60% with asyncio.gather.
- Two-layer NLP extraction pipeline using spaCy, NER model, and Groq API.
- Supabase PostgreSQL schema with weighted ATS score formula.

HONORS & ACHIEVEMENTS:
- SIH '25 TIEM: Top 2 Position nationwide
- Winner of 64squares '25 Chess Tournament`}
            </div>
          );
        } else if (['projects', 'projects.md', 'project', 'project.md'].includes(filename)) {
          onOpenApp('project', { projectId: 'payflow' });
          outputContent = (
            <div className="p-3 rounded bg-black/50 border border-white/10 text-xs font-mono text-stone-200 whitespace-pre-wrap leading-relaxed">
              {projectsMdText}
            </div>
          );
        } else if (['skills', 'skills.txt'].includes(filename)) {
          outputContent = (
            <div className="p-3 rounded bg-black/50 border border-white/10 text-xs font-mono text-terminal-green space-y-1">
              <div>Languages: TypeScript, JavaScript, Python, SQL</div>
              <div>Frontend: React.js, Tailwind CSS, HTML5, CSS3, Vite</div>
              <div>Backend & DevOps: Node.js, Express.js, FastAPI, Docker, CI/CD, Git</div>
              <div>AI/ML: spaCy, HuggingFace Embeddings, Groq API, Semantic Similarity</div>
              <div>Database: PostgreSQL, Supabase, Prisma ORM</div>
            </div>
          );
        } else if (['contact', 'contact.txt'].includes(filename)) {
          outputContent = (
            <div className="p-3 rounded bg-black/50 border border-white/10 text-xs font-mono text-amber-300 space-y-1">
              <div>Email: subhamdas5477@gmail.com</div>
              <div>Phone: +91 8582953151</div>
              <div>GitHub: https://github.com/subhamdas29</div>
              <div>LinkedIn: https://www.linkedin.com/in/subhamdas29</div>
            </div>
          );
        } else {
          entryType = 'error';
          outputContent = <div className="text-red-400">cat: {filename}: No such file or directory. Try: cat resume or cat projects</div>;
        }
        break;

      case 'open':
        const targetApp = args[0]?.toLowerCase();
        if (!targetApp) {
          entryType = 'error';
          outputContent = <div className="text-red-400">open: missing app name. Try: open payflow or open whoami</div>;
        } else if (['payflow', 'resumepilot', 'chessplus', 'foodrush'].includes(targetApp)) {
          onOpenApp('project', { projectId: targetApp });
          outputContent = <div className="text-terminal-green">Launching {targetApp} project GUI...</div>;
        } else if (targetApp === 'whoami' || targetApp === 'bio') {
          onOpenApp('whoami');
          outputContent = <div className="text-terminal-green">Launching WhoAmI bio window...</div>;
        } else if (targetApp === 'resume') {
          onOpenApp('resume_viewer');
          outputContent = <div className="text-terminal-green">Launching Resume Viewer window...</div>;
        } else if (targetApp === 'github') {
          window.open(resumeData.github, '_blank');
          outputContent = <div className="text-terminal-green">Opening GitHub in new browser tab...</div>;
        } else if (targetApp === 'linkedin') {
          window.open(resumeData.linkedin, '_blank');
          outputContent = <div className="text-terminal-green">Opening LinkedIn in new browser tab...</div>;
        } else {
          entryType = 'error';
          outputContent = <div className="text-red-400">open: App '{targetApp}' not recognized.</div>;
        }
        break;

      case 'date':
        outputContent = (
          <div className="text-xs font-mono text-terminal-yellow">
            {new Date().toString()}
          </div>
        );
        break;

      case 'theme':
        outputContent = (
          <div className="p-3 rounded bg-black/40 border border-white/10 font-mono text-xs space-y-1">
            <div className="text-white font-bold mb-1">PORTFOLIO THEME PALETTE:</div>
            <div><span className="inline-block w-4 h-4 rounded bg-[#1A1A1A] border border-white/20 align-middle mr-2" /> Dark-grey: #1A1A1A</div>
            <div><span className="inline-block w-4 h-4 rounded bg-[#EDEDED] border border-black align-middle mr-2" /> Grey-white: #EDEDED</div>
            <div><span className="inline-block w-4 h-4 rounded bg-[#00CB00] align-middle mr-2" /> Terminal-green: #00CB00 (LHS Prompt)</div>
            <div><span className="inline-block w-4 h-4 rounded bg-[#FFD000] align-middle mr-2" /> Terminal-yellow: #FFD000 (RHS Input)</div>
          </div>
        );
        break;

      case 'echo':
        outputContent = <div className="text-xs font-mono text-stone-200">{args.join(' ')}</div>;
        break;

      case 'sudo':
        outputContent = (
          <div className="text-xs font-mono text-red-400">
            Permission denied: Subham Das is the superuser of this macOS system.
          </div>
        );
        break;

      default:
        entryType = 'error';
        outputContent = (
          <div className="text-xs font-mono text-red-400">
            zsh: command not found: {mainCmd}. Type <span className="text-terminal-yellow underline cursor-pointer" onClick={() => executeCommand('help')}>help</span> for list of valid commands.
          </div>
        );
        break;
    }

    const newEntry: OutputEntry = {
      id: `entry-${Date.now()}`,
      command: trimmed,
      type: entryType,
      content: outputContent,
      timestamp: new Date().toLocaleTimeString(),
    };

    setHistory(prev => [...prev, newEntry]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div
      onClick={handleTerminalClick}
      className="h-full bg-[#1A1A1A] p-4 text-grey-white font-mono text-xs overflow-y-auto flex flex-col justify-between"
    >
      <div className="space-y-3 flex-1">
        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            {item.command && (
              <div className="flex items-center space-x-2 font-mono">
                <span className="text-terminal-green font-bold select-none">subhamdas:~$</span>
                <span className="text-terminal-yellow font-medium">{item.command}</span>
              </div>
            )}
            <div className="pl-0">{item.content}</div>
          </div>
        ))}

        <div className="flex items-center space-x-2 pt-1 font-mono">
          <span className="text-terminal-green font-bold select-none">subhamdas:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            className="flex-1 bg-transparent border-none text-terminal-yellow font-semibold focus:outline-none focus:ring-0 p-0 text-xs"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
