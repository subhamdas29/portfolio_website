import React, { useState } from 'react';
import { resumeData } from '../../data/resumeData';
import { projectsData } from '../../data/projectsData';
import { Maximize2, Minimize2, Github, Linkedin, Mail, ChevronLeft, ChevronRight, ExternalLink, CheckCircle2, X } from 'lucide-react';

interface WhoAmIAppProps {
  onOpenApp?: (appId: string, extraProps?: Record<string, any>) => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
}

export const WhoAmIApp: React.FC<WhoAmIAppProps> = ({ onOpenApp, onMaximize, isMaximized = false }) => {
  const [currentFeaturedIdx, setCurrentFeaturedIdx] = useState(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const nextFeatured = () => {
    setCurrentFeaturedIdx((prev) => (prev + 1) % projectsData.length);
  };

  const prevFeatured = () => {
    setCurrentFeaturedIdx((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    if (scrollTop > 15) {
      setIsScrolledDown(true);
    } else {
      setIsScrolledDown(false);
    }
  };

  const handleFullScreenClick = () => {
    setIsBannerDismissed(true);
    if (onMaximize) {
      onMaximize();
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.email || !contactForm.message) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ firstName: '', lastName: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const featuredProject = projectsData[currentFeaturedIdx];
  const showBanner = !isBannerDismissed && !isScrolledDown && !isMaximized;

  return (
    <div
      onScroll={handleScroll}
      className="h-full overflow-y-auto custom-scrollbar bg-[#E5D8F0] text-stone-950 font-serif select-text relative"
    >
      {/* Dynamic Full-Screen Tip Notification Banner */}
      {showBanner && (
        <div className="bg-[#18181B] text-white px-4 py-2.5 flex items-center justify-between text-xs font-sans border-b border-white/10 sticky top-0 z-30 shadow-md transition-all duration-300">
          <div className="flex items-center space-x-2">
            <span className="font-medium">
              <strong className="text-amber-300">Note:</strong> Click the green 🟢 button or Full Screen button for the full website experience!
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleFullScreenClick}
              className="flex items-center space-x-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono transition-all cursor-pointer border border-white/15"
              title="Toggle Full Screen"
            >
              {isMaximized ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
              <span>{isMaximized ? 'Restore' : 'Full Screen'}</span>
            </button>
            <button
              onClick={() => setIsBannerDismissed(true)}
              className="p-1 rounded text-stone-400 hover:text-white transition-all cursor-pointer"
              title="Dismiss note"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 1. HERO SECTION (Fills 100% Viewport Height) */}
      <div className="relative min-h-[calc(100vh-60px)] h-full w-full bg-stone-950 text-white flex flex-col items-center justify-center text-center p-8 sm:p-16 border-b-4 border-stone-950 shrink-0 overflow-hidden">
        <div className="relative z-20 max-w-4xl space-y-6">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif tracking-widest text-white uppercase font-normal leading-tight">
            SUBHAM DAS
          </h1>
          <p className="text-xl sm:text-3xl font-serif italic text-stone-300 tracking-wider">
            Full-Stack Engineer
          </p>

          <div className="pt-6 flex flex-wrap justify-center gap-4 text-xs sm:text-sm font-sans">
            <span className="px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md">
              Kolkata, India / Remote
            </span>
            <span className="px-5 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold backdrop-blur-md">
              ● Available for Roles
            </span>
          </div>
        </div>
      </div>

      {/* 2. ABOUT SUBHAM! SECTION */}
      <div className="py-20 px-6 sm:px-12 max-w-6xl mx-auto border-b border-stone-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Black & White Portrait Image */}
          <div className="flex justify-center">
            <div className="w-72 h-80 sm:w-80 sm:h-96 rounded-xl overflow-hidden shadow-2xl border-4 border-stone-900 bg-black">
              <img
                src="/assets/personalpic.jpeg"
                alt="Subham Das"
                className="w-full h-full object-cover object-center grayscale contrast-125 hover:grayscale-0 transition duration-700"
              />
            </div>
          </div>

          {/* Bio Text & Resume Button */}
          <div className="space-y-6 text-stone-900">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-wider uppercase">
              ABOUT SUBHAM!
            </h2>

            <p className="text-sm sm:text-base font-serif leading-relaxed text-stone-800">
              I am a Computer Science Engineer graduating from <strong>Techno Main Salt Lake</strong> with a B.Tech in CSE (<strong>8.87 CGPA</strong>).
              I specialize in building production-grade full-stack web applications, real-time banking architectures, and high-performance AI engines.
            </p>

            <p className="text-sm sm:text-base font-serif leading-relaxed text-stone-800">
              This combination of strong backend system design and modern frontend aesthetics enables me to architect software that scales reliably under heavy traffic while delivering clean, intuitive user experiences.
            </p>

            <div className="pt-2 flex items-center space-x-4 flex-wrap gap-3">
              <a
                href={resumeData.github}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-stone-950 hover:bg-stone-800 text-white text-xs font-sans font-bold uppercase tracking-widest transition-all shadow-md inline-block cursor-pointer"
              >
                See Resume
              </a>
              {onOpenApp && (
                <button
                  onClick={() => onOpenApp('terminal', { initialCommand: 'cat resume' })}
                  className="px-6 py-3 bg-white border-2 border-stone-950 hover:bg-stone-100 text-stone-950 text-xs font-sans font-bold uppercase tracking-widest transition-all shadow-md inline-block cursor-pointer"
                >
                  View Terminal Resume
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. FEATURED WORK CAROUSEL SECTION */}
      <div className="py-20 px-6 sm:px-12 max-w-6xl mx-auto space-y-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-widest uppercase text-stone-900">
          FEATURED WORK
        </h2>

        {/* Carousel Container */}
        <div className="relative rounded-2xl overflow-hidden bg-stone-900 text-white shadow-2xl border border-stone-800">
          <div className="relative aspect-video max-h-[460px] w-full overflow-hidden bg-black flex items-center justify-center">
            {/* Project Image & Details */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30 z-10" />
            <img
              src={
                featuredProject.id === 'payflow'
                  ? '/assets/Wallpapers/5957646.png'
                  : featuredProject.id === 'resumepilot'
                  ? '/assets/Wallpapers/tanjiro-kamado-6082x5416-23027.jpg'
                  : '/assets/Wallpapers/lunar.jpg'
              }
              alt={featuredProject.title}
              className="w-full h-full object-cover object-center transform transition duration-700 hover:scale-105 opacity-80"
            />

            {/* Navigation Left Arrow */}
            <button
              onClick={prevFeatured}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-lg"
              title="Previous Project"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Navigation Right Arrow */}
            <button
              onClick={nextFeatured}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-lg"
              title="Next Project"
            >
              <ChevronRight size={28} />
            </button>

            {/* Project Overlay Info */}
            <div className="absolute bottom-6 left-6 right-6 z-20 text-left space-y-2">
              <div className="inline-block px-3 py-1 rounded bg-amber-400 text-black text-xs font-sans font-bold uppercase tracking-wider">
                {featuredProject.type}
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {featuredProject.title}
              </h3>
              <p className="text-xs sm:text-sm font-sans text-stone-300 max-w-2xl line-clamp-2">
                {featuredProject.description}
              </p>
              {onOpenApp && (
                <button
                  onClick={() => onOpenApp('project', { projectId: featuredProject.id })}
                  className="mt-2 px-4 py-2 bg-white hover:bg-stone-200 text-black text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer inline-flex items-center space-x-1.5"
                >
                  <span>Inspect Project Specs</span>
                  <ExternalLink size={12} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. MORE WORK SECTION (4 Square Project Cards Grid) */}
      <div className="py-20 px-6 sm:px-12 max-w-6xl mx-auto space-y-10 text-center border-t border-stone-300">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-widest uppercase text-stone-900">
          MORE WORK
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectsData.map((proj) => (
            <div
              key={proj.id}
              onClick={() => onOpenApp && onOpenApp('project', { projectId: proj.id })}
              className="group relative aspect-square bg-stone-900 rounded-lg overflow-hidden shadow-xl border border-stone-800 cursor-pointer transition-transform duration-500 hover:-translate-y-1.5"
            >
              <img
                src={
                  proj.id === 'payflow'
                    ? '/assets/Wallpapers/5957646.png'
                    : proj.id === 'resumepilot'
                    ? '/assets/Wallpapers/tanjiro-kamado-6082x5416-23027.jpg'
                    : proj.id === 'codearena'
                    ? '/assets/Wallpapers/660523.jpg'
                    : '/assets/Wallpapers/dandelion.jpg'
                }
                alt={proj.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition duration-300 flex flex-col items-center justify-center p-6 text-center text-white space-y-2">
                <h3 className="text-lg font-serif font-bold tracking-widest uppercase">
                  {proj.title}
                </h3>
                <p className="text-[11px] font-sans text-stone-300 uppercase tracking-wider">
                  {proj.type}
                </p>
                <div className="pt-2 opacity-0 group-hover:opacity-100 transition duration-300 text-xs font-sans text-amber-300 underline flex items-center space-x-1">
                  <span>View Details</span>
                  <ExternalLink size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. GET IN TOUCH! SECTION (Ally Doederlein Style Contact Box) */}
      <div className="py-20 px-6 sm:px-12 max-w-5xl mx-auto border-t border-stone-300 space-y-12">
        {/* Giant Black Outlined Header Box */}
        <div className="border-4 border-stone-950 bg-[#E5D8F0] p-6 sm:p-8 text-center shadow-lg">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-widest uppercase text-stone-950">
            GET IN TOUCH!
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left Column: Contact Details & Social Icons */}
          <div className="space-y-4 text-stone-950">
            <h3 className="text-xl font-serif font-bold tracking-widest uppercase">
              CONTACT
            </h3>
            <p className="text-xs sm:text-sm font-sans text-stone-800 font-medium">
              {resumeData.email}
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={resumeData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-950 text-white flex items-center justify-center hover:bg-stone-800 transition-all shadow-md"
                title="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={resumeData.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-950 text-white flex items-center justify-center hover:bg-stone-800 transition-all shadow-md"
                title="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href={`mailto:${resumeData.email}`}
                className="w-9 h-9 rounded-full bg-stone-950 text-white flex items-center justify-center hover:bg-stone-800 transition-all shadow-md"
                title="Email Me"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Right 2 Columns: Contact Form */}
          <div className="md:col-span-2">
            {contactSubmitted ? (
              <div className="p-8 bg-emerald-100 border-2 border-emerald-600 rounded-xl text-center space-y-2 text-emerald-950 font-sans">
                <CheckCircle2 size={32} className="mx-auto text-emerald-600" />
                <h4 className="font-bold text-base">Message Sent Successfully!</h4>
                <p className="text-xs text-emerald-800">Thank you for reaching out. Subham will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-stone-900">First Name *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.firstName}
                      onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                      className="w-full bg-white border border-stone-950 p-2.5 text-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-950"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-stone-900">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.lastName}
                      onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                      className="w-full bg-white border border-stone-950 p-2.5 text-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-950"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-stone-900">Email *</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full bg-white border border-stone-950 p-2.5 text-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-950"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-stone-900">Subject</label>
                    <input
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full bg-white border border-stone-950 p-2.5 text-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-950"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-900">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-white border border-stone-950 p-2.5 text-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-950 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3 bg-stone-950 hover:bg-stone-800 text-white font-serif text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-md"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
