import React, { useState } from 'react';
import { projectsData } from '../../data/projectsData';
import { Project } from '../../types';
import { Github, ExternalLink, Code2, CheckCircle2, ShieldCheck, Zap, CreditCard, Bot, Trophy, ShoppingBag, ArrowLeft, Layers, Sparkles, Terminal } from 'lucide-react';

interface ProjectAppProps {
  projectId?: string;
  onOpenApp?: (appId: string, extraProps?: Record<string, any>) => void;
}

export const ProjectApp: React.FC<ProjectAppProps> = ({ projectId = 'payflow', onOpenApp }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projectId);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const project: Project = projectsData.find(p => p.id === selectedProjectId) || projectsData[0];

  const renderProjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'CreditCard': return <CreditCard size={26} className="text-cyan-400" />;
      case 'Bot': return <Bot size={26} className="text-emerald-400" />;
      case 'Trophy': return <Trophy size={26} className="text-purple-400" />;
      case 'ShoppingBag': return <ShoppingBag size={26} className="text-amber-400" />;
      default: return <Code2 size={26} className="text-emerald-400" />;
    }
  };

  const categories = ['All', 'Full-Stack', 'AI & ML', 'FinTech & Web3'];

  const filteredProjects = filterCategory === 'All'
    ? projectsData
    : projectsData.filter(p => {
        if (filterCategory === 'Full-Stack') return p.type.includes('Full-Stack');
        if (filterCategory === 'AI & ML') return p.type.includes('AI') || p.techStack.includes('Python');
        if (filterCategory === 'FinTech & Web3') return p.type.includes('FinTech') || p.type.includes('Web3') || p.type.includes('E-Commerce');
        return true;
      });

  return (
    <div className="min-h-full bg-[#141414] text-stone-100 font-sans p-6 sm:p-10 space-y-8 select-text">
      {/* Category & Project Filter Pills Bar */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-4 flex-wrap gap-4">
        <div className="flex items-center space-x-2.5">
          <Layers size={20} className="text-emerald-400" />
          <h1 className="text-xl font-black text-white uppercase tracking-tight">Project Portfolio Showcase</h1>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-emerald-500 text-black shadow-md'
                  : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Project Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {filteredProjects.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedProjectId(p.id)}
            className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 cursor-pointer ${
              p.id === project.id
                ? 'bg-gradient-to-b from-stone-800 to-stone-900 border-emerald-500 shadow-xl ring-1 ring-emerald-500'
                : 'bg-stone-900/60 hover:bg-stone-900 border-stone-800/80 text-stone-400 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between">
              {renderProjectIcon(p.icon)}
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/40 text-emerald-400 border border-emerald-500/20">
                {p.type}
              </span>
            </div>
            <div>
              <div className="font-bold text-xs text-white truncate">{p.title}</div>
              <div className="text-[10px] text-stone-400 truncate mt-0.5 font-mono">{p.subtitle}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Main Selected Project Showcase Card (Ally Doederlein Style) */}
      <div className="rounded-3xl bg-gradient-to-br from-[#1E1E1E] via-[#1A1A1A] to-[#121212] border border-stone-800 p-6 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Title & Links Row */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-stone-800 pb-6">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-black/60 rounded-2xl border border-stone-700 shadow-inner flex items-center justify-center shrink-0">
              {renderProjectIcon(project.icon)}
            </div>
            <div>
              <div className="flex items-center space-x-2.5 flex-wrap gap-1">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{project.title}</h2>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {project.type}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 font-mono mt-1">{project.subtitle}</p>
            </div>
          </div>

          {/* Action Link Buttons */}
          <div className="flex items-center space-x-3 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-xs font-mono text-white transition-all shadow-sm"
              >
                <Github size={15} />
                <span>GitHub Source</span>
                <ExternalLink size={11} className="opacity-60" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition-all shadow-md"
              >
                <Zap size={15} />
                <span>Live Application</span>
                <ExternalLink size={11} className="opacity-60" />
              </a>
            )}
          </div>
        </div>

        {/* Project Description */}
        <div className="relative z-10 space-y-2">
          <h3 className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider">Project Overview</h3>
          <p className="text-sm text-stone-200 leading-relaxed font-normal">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Pills Matrix */}
        <div className="relative z-10 space-y-3 pt-2">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <Code2 size={16} />
            <span>Technologies & Architecture</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-xl bg-black/60 border border-stone-800 text-xs font-mono text-stone-200 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Engineering Accomplishments Grid */}
        <div className="relative z-10 space-y-4 pt-4 border-t border-stone-800">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <ShieldCheck size={16} />
            <span>Key Engineering Highlights</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {project.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-4 rounded-2xl bg-black/40 border border-stone-800/80 text-xs">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-stone-300 leading-relaxed font-sans">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
