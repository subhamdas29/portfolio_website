import React, { useState } from 'react';
import { projectsData } from '../../data/projectsData';
import { Project } from '../../types';
import { Github, ExternalLink, Code2, CheckCircle2, ShieldCheck, Zap, GitFork, Server, Database, Sparkles } from 'lucide-react';

interface ProjectAppProps {
  projectId?: string;
  onOpenApp?: (appId: string, extraProps?: Record<string, any>) => void;
}

export const ProjectApp: React.FC<ProjectAppProps> = ({ projectId = 'payflow' }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projectId);

  const project: Project = projectsData.find(p => p.id === selectedProjectId) || projectsData[0];

  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-[#E5D8F0] text-stone-950 font-serif p-6 sm:p-12 space-y-10 select-text">
      {/* Editorial Header Box (Classic Ally Doederlein Style) */}
      <div className="border-4 border-stone-950 bg-stone-950 text-white p-6 sm:p-8 text-center shadow-xl">
        <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-widest uppercase">
          PROJECT ARCHITECTURES
        </h1>
        <p className="text-xs sm:text-sm font-sans tracking-wider text-stone-300 uppercase mt-2">
          Comprehensive Technical Specifications, System Workflows & API References
        </p>
      </div>

      {/* Project Selector Tabs (Classic Black & White Serif Buttons) */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {projectsData.map((p) => {
          const isSelected = p.id === project.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedProjectId(p.id)}
              className={`px-6 py-3 text-xs font-serif font-bold uppercase tracking-widest transition-all cursor-pointer shadow-md ${
                isSelected
                  ? 'bg-stone-950 text-white border-2 border-stone-950'
                  : 'bg-white text-stone-950 border-2 border-stone-950 hover:bg-stone-100'
              }`}
            >
              {p.title}
            </button>
          );
        })}
      </div>

      {/* Main Selected Project Editorial Card */}
      <div className="border-4 border-stone-950 bg-white p-6 sm:p-10 space-y-10 shadow-2xl">
        {/* Project Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-stone-950 pb-6">
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 bg-stone-950 text-white text-[11px] font-sans font-bold uppercase tracking-widest">
              {project.type}
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950 tracking-wider uppercase">
              {project.title}
            </h2>
            <p className="text-sm font-serif italic text-stone-700">
              {project.subtitle} ({project.period})
            </p>
          </div>

          {/* Action Link Buttons */}
          <div className="flex items-center space-x-3 flex-wrap gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-stone-950 hover:bg-stone-800 text-white text-xs font-sans font-bold uppercase tracking-widest transition-all shadow-md inline-flex items-center space-x-2 cursor-pointer"
              >
                <Github size={15} />
                <span>GitHub Source</span>
                <ExternalLink size={12} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-white border-2 border-stone-950 hover:bg-stone-100 text-stone-950 text-xs font-sans font-bold uppercase tracking-widest transition-all shadow-md inline-flex items-center space-x-2 cursor-pointer"
              >
                <Zap size={15} />
                <span>Live Application</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>

        {/* Project Thumbnail Image Banner */}
        {project.imageUrl && (
          <div className="w-full rounded-lg overflow-hidden border-4 border-stone-950 bg-stone-950 shadow-xl max-h-[440px]">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
          </div>
        )}

        {/* 1. Project Overview */}
        <div className="space-y-3">
          <h3 className="text-xl font-serif font-bold uppercase tracking-wider text-stone-950">
            PROJECT OVERVIEW
          </h3>
          <p className="text-sm sm:text-base font-serif leading-relaxed text-stone-800">
            {project.description}
          </p>
        </div>

        {/* 2. Technologies & Architecture Matrix */}
        <div className="space-y-4 pt-4 border-t-2 border-stone-950">
          <h3 className="text-xl font-serif font-bold uppercase tracking-wider text-stone-950 flex items-center space-x-2">
            <Code2 size={20} />
            <span>TECHNOLOGIES & ARCHITECTURE STACK</span>
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-1.5 bg-stone-950 text-white text-xs font-mono font-bold tracking-wide shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 3. Key Engineering Highlights */}
        <div className="space-y-4 pt-4 border-t-2 border-stone-950">
          <h3 className="text-xl font-serif font-bold uppercase tracking-wider text-stone-950 flex items-center space-x-2">
            <ShieldCheck size={20} />
            <span>KEY ENGINEERING HIGHLIGHTS</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="p-5 border-2 border-stone-950 bg-[#E5D8F0]/40 text-stone-950 space-y-2 shadow-sm"
              >
                <div className="flex items-center space-x-2 text-stone-950 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 size={16} className="text-stone-950" />
                  <span>Highlight #{idx + 1}</span>
                </div>
                <p className="text-xs sm:text-sm font-serif leading-relaxed text-stone-900">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. System Architecture & Workflow Pipeline */}
        {project.architectureFlow && (
          <div className="space-y-4 pt-4 border-t-2 border-stone-950">
            <h3 className="text-xl font-serif font-bold uppercase tracking-wider text-stone-950 flex items-center space-x-2">
              <GitFork size={20} />
              <span>SYSTEM ARCHITECTURE & EVENT WORKFLOW</span>
            </h3>

            <div className="p-6 border-2 border-stone-950 bg-stone-950 text-white space-y-3 shadow-lg">
              {project.architectureFlow.map((step, idx) => (
                <div key={idx} className="text-xs sm:text-sm font-mono leading-relaxed text-stone-200 flex items-start space-x-3">
                  <span className="text-emerald-400 font-bold shrink-0">➜</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. API Reference & Service Endpoints Table */}
        {project.apiEndpoints && (
          <div className="space-y-4 pt-4 border-t-2 border-stone-950">
            <h3 className="text-xl font-serif font-bold uppercase tracking-wider text-stone-950 flex items-center space-x-2">
              <Server size={20} />
              <span>API REFERENCE & SERVICE ENDPOINTS</span>
            </h3>

            <div className="overflow-x-auto border-2 border-stone-950 shadow-md">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-stone-950 text-white uppercase text-[11px] font-bold border-b-2 border-stone-950">
                  <tr>
                    <th className="p-3.5 border-r border-stone-800">Method</th>
                    <th className="p-3.5 border-r border-stone-800">Endpoint</th>
                    <th className="p-3.5">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-300 bg-white">
                  {project.apiEndpoints.map((ep, idx) => (
                    <tr key={idx} className="hover:bg-stone-100 transition">
                      <td className="p-3.5 font-bold border-r border-stone-300">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase ${
                          ep.method === 'POST' ? 'bg-stone-950 text-white' : ep.method === 'GET' ? 'bg-stone-200 text-stone-950 border border-stone-400' : 'bg-black text-amber-300'
                        }`}>
                          {ep.method}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-stone-950 border-r border-stone-300 whitespace-nowrap">
                        {ep.endpoint}
                      </td>
                      <td className="p-3.5 font-sans text-xs text-stone-800 leading-relaxed">
                        {ep.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 6. Database Schema & Data Models */}
        {project.dbSchema && (
          <div className="space-y-4 pt-4 border-t-2 border-stone-950">
            <h3 className="text-xl font-serif font-bold uppercase tracking-wider text-stone-950 flex items-center space-x-2">
              <Database size={20} />
              <span>DATABASE SCHEMA & DOMAIN ISOLATION</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.dbSchema.map((schemaItem, idx) => (
                <div key={idx} className="p-4 border-2 border-stone-950 bg-white text-stone-950 font-mono text-xs shadow-sm">
                  <span className="font-bold text-stone-950 block mb-1">● Schema Entity #{idx + 1}</span>
                  <p className="text-stone-800 text-[11px] leading-relaxed">{schemaItem}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. Extra Features / Game Mechanics */}
        {project.extraFeatures && (
          <div className="space-y-4 pt-4 border-t-2 border-stone-950">
            <h3 className="text-xl font-serif font-bold uppercase tracking-wider text-stone-950 flex items-center space-x-2">
              <Sparkles size={20} />
              <span>ADDITIONAL TECHNICAL SPECIFICATIONS</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.extraFeatures.map((feat, idx) => (
                <div key={idx} className="p-4 border-2 border-stone-950 bg-stone-950 text-white space-y-1 shadow-sm">
                  <span className="font-sans font-bold text-xs uppercase text-amber-300 block">Feature Spec #{idx + 1}</span>
                  <p className="font-serif text-xs leading-relaxed text-stone-200">{feat}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
