import React from 'react';
import { resumeData } from '../../data/resumeData';
import { 
  GraduationCap, 
  Code, 
  Briefcase, 
  Trophy, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Sparkles,
  ExternalLink,
  Bot,
  BrainCircuit,
  Award,
  Terminal as TerminalIcon
} from 'lucide-react';

interface WhoAmIAppProps {
  onOpenApp?: (appId: string, extraProps?: Record<string, any>) => void;
}

export const WhoAmIApp: React.FC<WhoAmIAppProps> = ({ onOpenApp }) => {
  return (
    <div className="min-h-full bg-[#1A1A1A] text-grey-white font-sans p-6 sm:p-8 space-y-8 select-text">
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#242424] via-[#2A2A2A] to-[#202020] border border-white/15 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-terminal-green/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Fixed Aspect Ratio Profile Picture Container */}
          <div className="relative shrink-0 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-terminal-green via-cyan-500 to-terminal-yellow rounded-2xl blur opacity-40 group-hover:opacity-75 transition duration-500" />
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 aspect-square rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black">
              <img
                src="/assets/personalpic.jpeg"
                alt="Subham Das"
                className="w-full h-full object-cover object-center block"
              />
            </div>
            <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md border border-terminal-green/50 text-terminal-green text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full shadow-md flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
              <span>Available</span>
            </div>
          </div>

          {/* Profile Bio details */}
          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-terminal-green">
              <Sparkles size={13} className="text-terminal-yellow" />
              <span>Full-Stack & Backend Systems Engineer</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Subham Das
            </h1>

            <p className="text-sm text-stone-300 leading-relaxed max-w-2xl font-normal">
              {resumeData.summary}
            </p>

            {/* Quick Links & Contacts */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <a
                href={resumeData.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono text-white transition-colors"
              >
                <Github size={14} />
                <span>GitHub</span>
                <ExternalLink size={10} className="opacity-60" />
              </a>

              <a
                href={resumeData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-sky-950/80 hover:bg-sky-900 border border-sky-600/40 text-xs font-mono text-sky-300 transition-colors"
              >
                <Linkedin size={14} />
                <span>LinkedIn</span>
                <ExternalLink size={10} className="opacity-60" />
              </a>

              <a
                href={`mailto:${resumeData.email}`}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/40 text-xs font-mono text-emerald-300 transition-colors"
              >
                <Mail size={14} />
                <span>{resumeData.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout: Education & Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Education Section */}
        <div className="p-6 rounded-2xl bg-[#242424] border border-white/10 space-y-4 hover:border-white/20 transition-all">
          <div className="flex items-center space-x-3 text-terminal-green border-b border-white/10 pb-3">
            <GraduationCap size={22} />
            <h2 className="font-bold text-lg text-white font-sans">Education</h2>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-white text-base">
              {resumeData.education.institution}
            </h3>
            <p className="text-sm text-stone-300">
              {resumeData.education.degree}
            </p>
            <div className="flex items-center justify-between text-xs font-mono pt-2 text-stone-400">
              <span className="bg-terminal-green/10 text-terminal-green px-2.5 py-1 rounded border border-terminal-green/30 font-semibold">
                CGPA: {resumeData.education.cgpa}
              </span>
              <span>{resumeData.education.period}</span>
            </div>
            <p className="text-xs text-stone-400 italic pt-1">
              Mentor: {resumeData.education.mentor}
            </p>
          </div>
        </div>

        {/* Honors & Achievements Section */}
        <div className="p-6 rounded-2xl bg-[#242424] border border-white/10 space-y-4 hover:border-white/20 transition-all">
          <div className="flex items-center space-x-3 text-terminal-yellow border-b border-white/10 pb-3">
            <Trophy size={22} />
            <h2 className="font-bold text-lg text-white font-sans">Honors & Achievements</h2>
          </div>

          <div className="space-y-4">
            {resumeData.achievements.map((ach, idx) => (
              <div key={idx} className="flex items-start space-x-3 text-xs">
                <Award size={18} className="text-terminal-yellow shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">{ach.title}</div>
                  <div className="text-stone-300 mt-0.5 leading-relaxed">{ach.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Skills Section */}
      <div className="p-6 rounded-2xl bg-[#242424] border border-white/10 space-y-6">
        <div className="flex items-center space-x-3 text-cyan-400 border-b border-white/10 pb-3">
          <Code size={22} />
          <h2 className="font-bold text-lg text-white font-sans">Technical Skills</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
            <div className="text-xs font-mono font-bold text-terminal-yellow">LANGUAGES</div>
            <div className="flex flex-wrap gap-1.5">
              {resumeData.skills.languages.map((skill) => (
                <span key={skill} className="px-2.5 py-1 rounded bg-white/10 text-xs font-mono text-grey-white border border-white/10">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
            <div className="text-xs font-mono font-bold text-cyan-400">FRONTEND</div>
            <div className="flex flex-wrap gap-1.5">
              {resumeData.skills.frontend.map((skill) => (
                <span key={skill} className="px-2.5 py-1 rounded bg-cyan-950/80 text-xs font-mono text-cyan-300 border border-cyan-700/40">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
            <div className="text-xs font-mono font-bold text-terminal-green">BACKEND & DEVOPS</div>
            <div className="flex flex-wrap gap-1.5">
              {resumeData.skills.backendDevOps.map((skill) => (
                <span key={skill} className="px-2.5 py-1 rounded bg-emerald-950/80 text-xs font-mono text-emerald-300 border border-emerald-700/40">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
            <div className="text-xs font-mono font-bold text-purple-400">AI / ML & NLP</div>
            <div className="flex flex-wrap gap-1.5">
              {resumeData.skills.aiMl.map((skill) => (
                <span key={skill} className="px-2.5 py-1 rounded bg-purple-950/80 text-xs font-mono text-purple-300 border border-purple-700/40">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 sm:col-span-2 lg:col-span-2">
            <div className="text-xs font-mono font-bold text-sky-400">DATABASES & ORM</div>
            <div className="flex flex-wrap gap-1.5">
              {resumeData.skills.databases.map((skill) => (
                <span key={skill} className="px-2.5 py-1 rounded bg-sky-950/80 text-xs font-mono text-sky-300 border border-sky-700/40">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Experience Section (FYP - ResumePilot) */}
      <div className="p-6 rounded-2xl bg-[#242424] border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
          <div className="flex items-center space-x-3 text-emerald-400">
            <Briefcase size={22} />
            <h2 className="font-bold text-lg text-white font-sans">Relevant Experience & FYP</h2>
          </div>
          <span className="text-xs font-mono text-terminal-green bg-terminal-green/10 px-3 py-1 rounded-full border border-terminal-green/30">
            Lead Backend Developer
          </span>
        </div>

        {resumeData.experience.map((exp, idx) => (
          <div key={idx} className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
              <h3 className="font-bold text-white text-base flex items-center space-x-2">
                <Bot size={18} className="text-emerald-400" />
                <span>{exp.role}</span>
              </h3>
              <span className="font-mono text-stone-400">{exp.period}</span>
            </div>

            <ul className="space-y-2 text-xs text-stone-300 font-sans list-disc list-inside leading-relaxed">
              {exp.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="pl-1">
                  <span className="text-grey-white">{bullet}</span>
                </li>
              ))}
            </ul>

            {onOpenApp && (
              <div className="pt-2">
                <button
                  onClick={() => onOpenApp('project', { projectId: 'resumepilot' })}
                  className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold font-mono transition-colors"
                >
                  <BrainCircuit size={14} />
                  <span>Inspect ResumePilot Project Architecture -&gt;</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
