import React from 'react';
import { projectsData } from '../../data/projectsData';
import { Project } from '../../types';
import { Github, ExternalLink, Code2, CheckCircle2, ShieldCheck, Zap, CreditCard, Bot, Trophy, ShoppingBag } from 'lucide-react';

interface ProjectAppProps {
  projectId?: string;
  onOpenApp?: (appId: string, extraProps?: Record<string, any>) => void;
}

export const ProjectApp: React.FC<ProjectAppProps> = ({ projectId = 'payflow', onOpenApp }) => {
  const project: Project = projectsData.find(p => p.id === projectId) || projectsData[0];

  const renderProjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'CreditCard': return <CreditCard size={28} className="text-blue-400" />;
      case 'Bot': return <Bot size={28} className="text-emerald-400" />;
      case 'Trophy': return <Trophy size={28} className="text-purple-400" />;
      case 'ShoppingBag': return <ShoppingBag size={28} className="text-amber-400" />;
      default: return <Code2 size={28} className="text-terminal-green" />;
    }
  };

  return (
    <div className="min-h-full bg-[#1A1A1A] text-grey-white font-sans p-6 sm:p-8 space-y-6 select-text">
      {/* Project Switcher Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-white/10 scrollbar-none">
        {projectsData.map((p) => (
          <button
            key={p.id}
            onClick={() => onOpenApp && onOpenApp('project', { projectId: p.id })}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all whitespace-nowrap ${
              p.id === project.id
                ? 'bg-terminal-green/20 text-terminal-green border border-terminal-green/40 font-bold shadow-md'
                : 'bg-white/5 text-stone-400 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            <span>{renderProjectIcon(p.icon)}</span>
            <span>{p.title}</span>
            <span className="text-[10px] opacity-75 bg-black/40 px-1.5 py-0.2 rounded">{p.type}</span>
          </button>
        ))}
      </div>

      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-[#242424] border border-white/15 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="p-3 bg-black/40 rounded-2xl border border-white/10 shadow-inner flex items-center justify-center">
              {renderProjectIcon(project.icon)}
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-white tracking-tight">{project.title}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-terminal-yellow/20 text-terminal-yellow border border-terminal-yellow/30">
                  {project.type}
                </span>
              </div>
              <p className="text-sm text-stone-300 font-mono mt-0.5">{project.subtitle}</p>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center space-x-3 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono text-white transition-colors"
              >
                <Github size={14} />
                <span>Source</span>
                <ExternalLink size={10} className="opacity-60" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-terminal-green/20 hover:bg-terminal-green/30 border border-terminal-green/40 text-xs font-mono text-terminal-green font-bold transition-colors"
              >
                <Zap size={14} />
                <span>Live App</span>
                <ExternalLink size={10} className="opacity-60" />
              </a>
            )}
          </div>
        </div>

        {/* Project Description */}
        <p className="text-sm text-stone-300 leading-relaxed pt-2 border-t border-white/10">
          {project.description}
        </p>
      </div>

      {/* Tech Stack Matrix */}
      <div className="p-6 rounded-2xl bg-[#242424] border border-white/10 space-y-3">
        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-terminal-green uppercase tracking-wider">
          <Code2 size={16} />
          <span>Technologies & Frameworks</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-lg bg-black/50 border border-white/15 text-xs font-mono text-grey-white shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Engineering Highlights */}
      <div className="p-6 rounded-2xl bg-[#242424] border border-white/10 space-y-4">
        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-terminal-yellow uppercase tracking-wider">
          <ShieldCheck size={16} />
          <span>Key Engineering Accomplishments</span>
        </div>

        <div className="space-y-3">
          {project.highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-black/40 border border-white/5 text-xs">
              <CheckCircle2 size={16} className="text-terminal-green shrink-0 mt-0.5" />
              <p className="text-stone-200 leading-relaxed font-sans">{highlight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
