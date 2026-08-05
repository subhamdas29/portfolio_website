import React, { useState } from 'react';
import { resumeData } from '../../data/resumeData';
import { projectsData } from '../../data/projectsData';
import { 
  GraduationCap, 
  Code, 
  Briefcase, 
  Trophy, 
  Mail, 
  Github, 
  Linkedin, 
  Sparkles,
  ExternalLink,
  Bot,
  BrainCircuit,
  Award,
  ArrowRight,
  Layers,
  CheckCircle2,
  FileText,
  User,
  Zap
} from 'lucide-react';

interface WhoAmIAppProps {
  onOpenApp?: (appId: string, extraProps?: Record<string, any>) => void;
}

export const WhoAmIApp: React.FC<WhoAmIAppProps> = ({ onOpenApp }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'work' | 'skills' | 'timeline'>('overview');

  return (
    <div className="min-h-full bg-[#141414] text-stone-100 font-sans p-6 sm:p-10 space-y-8 select-text">
      {/* Modern Minimal Hero Header (Ally Doederlein Showcase Theme) */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#1E1E1E] via-[#1A1A1A] to-[#121212] border border-stone-800 p-6 sm:p-10 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Picture */}
          <div className="relative shrink-0 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-amber-400 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500" />
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-2 border-stone-700 shadow-2xl bg-black">
              <img
                src="/assets/personalpic.jpeg"
                alt="Subham Das"
                className="w-full h-full object-cover object-center block transform transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-3 right-3 bg-black/90 backdrop-blur-md border border-emerald-500/60 text-emerald-400 text-[10px] font-bold font-mono px-3 py-1 rounded-full shadow-lg flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Hire</span>
            </div>
          </div>

          {/* Bio & Intro Details */}
          <div className="space-y-4 text-center md:text-left flex-1">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
              <Sparkles size={14} className="text-amber-400" />
              <span>Full-Stack Engineer & Creative Developer</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Subham Das
            </h1>

            <p className="text-sm text-stone-300 leading-relaxed max-w-2xl font-normal">
              {resumeData.summary}
            </p>

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
              <a
                href={resumeData.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-xs font-semibold text-white transition-all shadow-sm"
              >
                <Github size={15} />
                <span>GitHub</span>
                <ExternalLink size={11} className="opacity-60" />
              </a>

              <a
                href={resumeData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-sky-950/80 hover:bg-sky-900 border border-sky-600/40 text-xs font-semibold text-sky-300 transition-all shadow-sm"
              >
                <Linkedin size={15} />
                <span>LinkedIn</span>
                <ExternalLink size={11} className="opacity-60" />
              </a>

              <a
                href={`mailto:${resumeData.email}`}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/40 text-xs font-semibold text-emerald-300 transition-all shadow-sm"
              >
                <Mail size={15} />
                <span>{resumeData.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex items-center space-x-2 border-b border-stone-800 pb-3 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-emerald-500 text-black shadow-md'
              : 'bg-stone-900/60 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800'
          }`}
        >
          <User size={14} />
          <span>Biography & Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('work')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
            activeTab === 'work'
              ? 'bg-emerald-500 text-black shadow-md'
              : 'bg-stone-900/60 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800'
          }`}
        >
          <Layers size={14} />
          <span>Selected Projects ({projectsData.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('skills')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
            activeTab === 'skills'
              ? 'bg-emerald-500 text-black shadow-md'
              : 'bg-stone-900/60 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800'
          }`}
        >
          <Code size={14} />
          <span>Technical Skills</span>
        </button>

        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
            activeTab === 'timeline'
              ? 'bg-emerald-500 text-black shadow-md'
              : 'bg-stone-900/60 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800'
          }`}
        >
          <GraduationCap size={14} />
          <span>Education & Experience</span>
        </button>
      </div>

      {/* TAB CONTENT: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Key Metrics / Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-1">
              <div className="text-xs font-mono text-emerald-400 font-bold">DEGREE & EDUCATION</div>
              <div className="text-lg font-bold text-white">B.Tech in CSE</div>
              <div className="text-xs text-stone-400 font-mono">Techno Main Salt Lake (8.87 CGPA)</div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-1">
              <div className="text-xs font-mono text-cyan-400 font-bold">PRODUCTION PROJECTS</div>
              <div className="text-lg font-bold text-white">4+ Full-Stack Apps</div>
              <div className="text-xs text-stone-400 font-mono">PayFlow, ResumePilot, CodeArena</div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-1">
              <div className="text-xs font-mono text-amber-400 font-bold">ACHIEVEMENTS</div>
              <div className="text-lg font-bold text-white">Top 10 Hackathon</div>
              <div className="text-xs text-stone-400 font-mono">Internal Smart India Hackathon</div>
            </div>
          </div>

          {/* Featured FYP Experience Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4 flex-wrap gap-2">
              <div className="flex items-center space-x-3 text-emerald-400">
                <Briefcase size={22} />
                <h2 className="font-bold text-xl text-white">Lead Backend Developer — ResumePilot (FYP)</h2>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                2024 - Present
              </span>
            </div>

            <div className="space-y-3">
              {resumeData.experience[0].bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-xs text-stone-300 leading-relaxed">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            {onOpenApp && (
              <div className="pt-2">
                <button
                  onClick={() => onOpenApp('project', { projectId: 'resumepilot' })}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono transition-all shadow-md cursor-pointer"
                >
                  <BrainCircuit size={15} />
                  <span>Inspect ResumePilot Deep Tech Specs -&gt;</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Selected Projects */}
      {activeTab === 'work' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="group rounded-3xl bg-stone-900/90 border border-stone-800 p-6 flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-all shadow-lg hover:shadow-2xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {project.type}
                  </span>
                  <div className="flex items-center space-x-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-all"
                        title="Source Code"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-500/10 transition-all"
                        title="Live Demo"
                      >
                        <Zap size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-stone-300 font-mono">{project.subtitle}</p>
                <p className="text-xs text-stone-400 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded bg-black/40 text-[10px] font-mono text-stone-300 border border-stone-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {onOpenApp && (
                <button
                  onClick={() => onOpenApp('project', { projectId: project.id })}
                  className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-emerald-600 hover:text-white text-stone-300 text-xs font-mono font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>View Full Details</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: Technical Skills */}
      {activeTab === 'skills' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-6 animate-fadeIn">
          <div className="flex items-center space-x-3 text-cyan-400 border-b border-stone-800 pb-4">
            <Code size={22} />
            <h2 className="font-bold text-xl text-white">Technical Skills & Frameworks</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-black/40 border border-stone-800 space-y-3">
              <div className="text-xs font-mono font-bold text-amber-400">LANGUAGES</div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.languages.map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-lg bg-stone-800 text-xs font-mono text-stone-200 border border-stone-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-stone-800 space-y-3">
              <div className="text-xs font-mono font-bold text-cyan-400">FRONTEND DEVELOPMENT</div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.frontend.map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-lg bg-cyan-950/80 text-xs font-mono text-cyan-300 border border-cyan-800/60">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-stone-800 space-y-3">
              <div className="text-xs font-mono font-bold text-emerald-400">BACKEND & DEVOPS</div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.backendDevOps.map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-lg bg-emerald-950/80 text-xs font-mono text-emerald-300 border border-emerald-800/60">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-stone-800 space-y-3">
              <div className="text-xs font-mono font-bold text-purple-400">AI / ML & NLP</div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.aiMl.map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-lg bg-purple-950/80 text-xs font-mono text-purple-300 border border-purple-800/60">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-stone-800 space-y-3 sm:col-span-2">
              <div className="text-xs font-mono font-bold text-sky-400">DATABASES & STORAGE</div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.databases.map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-lg bg-sky-950/80 text-xs font-mono text-sky-300 border border-sky-800/60">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Education & Experience Timeline */}
      {activeTab === 'timeline' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          {/* Education Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-4">
            <div className="flex items-center space-x-3 text-emerald-400 border-b border-stone-800 pb-4">
              <GraduationCap size={22} />
              <h2 className="font-bold text-xl text-white">Education</h2>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-white text-lg">
                {resumeData.education.institution}
              </h3>
              <p className="text-sm text-stone-300">
                {resumeData.education.degree}
              </p>
              <div className="flex items-center justify-between text-xs font-mono pt-2 text-stone-400">
                <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 font-bold">
                  CGPA: {resumeData.education.cgpa}
                </span>
                <span>{resumeData.education.period}</span>
              </div>
              <p className="text-xs text-stone-400 italic pt-1">
                Mentor: {resumeData.education.mentor}
              </p>
            </div>
          </div>

          {/* Achievements Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-4">
            <div className="flex items-center space-x-3 text-amber-400 border-b border-stone-800 pb-4">
              <Trophy size={22} />
              <h2 className="font-bold text-xl text-white">Honors & Hackathons</h2>
            </div>

            <div className="space-y-4">
              {resumeData.achievements.map((ach, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-xs">
                  <Award size={20} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-sm">{ach.title}</div>
                    <div className="text-stone-300 mt-1 leading-relaxed">{ach.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
