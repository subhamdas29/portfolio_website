import React, { useState, useEffect } from 'react';
import { TopBar } from './components/mac/TopBar';
import { Dock } from './components/mac/Dock';
import { Window } from './components/mac/Window';
import { DesktopBackground } from './components/mac/DesktopBackground';
import { DesktopFile } from './components/mac/DesktopFile';
import { HeartModal } from './components/mac/HeartModal';
import { HelpApp } from './components/apps/HelpApp';
import { TerminalApp } from './components/apps/TerminalApp';
import { WhoAmIApp } from './components/apps/WhoAmIApp';
import { ProjectApp } from './components/apps/ProjectApp';
import { FinderApp } from './components/apps/FinderApp';
import { HeartsApp } from './components/apps/HeartsApp';
import { WeatherApp } from './components/apps/WeatherApp';
import { GalleryApp } from './components/apps/GalleryApp';
import { MessagesApp } from './components/apps/MessagesApp';
import { ResumeViewerApp } from './components/apps/ResumeViewerApp';
import { AppWindow, Liker } from './types';
import { fetchLikes, signupLike, loginLike, toggleLike, getStoredUserLike, setStoredUserLike } from './api/client';

const INITIAL_WINDOWS: AppWindow[] = [
  {
    id: 'help',
    title: 'help~',
    icon: 'Terminal',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 20,
    position: { x: 30, y: 40 },
    size: { width: 440, height: 350 },
  },
  {
    id: 'messages',
    title: 'Messages & Public Comments',
    icon: 'MessageSquare',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 19,
    position: { x: 220, y: 75 },
    size: { width: 620, height: 480 },
  },
  {
    id: 'gallery',
    title: 'Gallery — Wallpapers',
    icon: 'Image',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 18,
    position: { x: 160, y: 65 },
    size: { width: 780, height: 500 },
  },
  {
    id: 'weather',
    title: 'Weather',
    icon: 'Sun',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 19,
    position: { x: 30, y: 410 },
    size: { width: 330, height: 185 },
  },
  {
    id: 'hearts',
    title: 'Hearts',
    icon: 'Heart',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 22,
    position: { x: Math.max(10, window.innerWidth - 210), y: 45 },
    size: { width: 190, height: 110 },
  },
  {
    id: 'finder',
    title: "Subham's Mac — Finder",
    icon: 'Folder',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 12,
    position: { x: 200, y: 70 },
    size: { width: 800, height: 500 },
  },
  {
    id: 'terminal',
    title: 'subhamdas:~$ terminal',
    icon: 'Terminal',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 280, y: 100 },
    size: { width: 680, height: 440 },
  },
  {
    id: 'whoami',
    title: 'About Subham Das — Full-Stack Engineer',
    icon: 'User',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 5,
    position: { x: 180, y: 80 },
    size: { width: 800, height: 560 },
  },
  {
    id: 'resume_viewer',
    title: 'Subham_Das_Resume.jpg',
    icon: 'Image',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 6,
    position: { x: 160, y: 50 },
    size: { width: 920, height: 680 },
  },
  {
    id: 'project',
    title: 'Projects Overview (projects.md)',
    icon: 'Layers',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 240, y: 90 },
    size: { width: 760, height: 520 },
    contentProps: { projectId: 'payflow' },
  },
];

export const App: React.FC = () => {
  const [windows, setWindows] = useState<AppWindow[]>(INITIAL_WINDOWS);
  const [activeAppId, setActiveAppId] = useState<string>('help');
  const [heartCount, setHeartCount] = useState<number>(0);
  const [userHasLiked, setUserHasLiked] = useState<boolean>(false);
  const [userLiker, setUserLiker] = useState<Liker | null>(null);
  const [isHeartModalOpen, setIsHeartModalOpen] = useState<boolean>(false);
  const [highestZIndex, setHighestZIndex] = useState<number>(25);

  const [wallpaper, setWallpaper] = useState<string>(() => {
    const saved = localStorage.getItem('portfolio_desktop_wallpaper');
    if (saved && (saved.includes('spiderman') || saved.includes('f1_wallpaper') || saved.includes('interstellar') || saved.includes('lunar') || saved.includes('dandelion') || saved.includes('pexels') || saved.includes('36307') || saved.includes('4545909'))) {
      localStorage.removeItem('portfolio_desktop_wallpaper');
      return 'default';
    }
    return saved || 'default';
  });

  const handleSetWallpaper = (wallpaperPath: string) => {
    setWallpaper(wallpaperPath);
    localStorage.setItem('portfolio_desktop_wallpaper', wallpaperPath);
  };

  useEffect(() => {
    const loadLikes = async () => {
      const data = await fetchLikes();
      setHeartCount(data.count || 0);
      const storedUser = getStoredUserLike();
      setUserLiker(storedUser);

      if (storedUser && storedUser.email) {
        const isUserInLikers = data.likers.some(
          l => l.email?.toLowerCase() === storedUser.email?.toLowerCase()
        );
        setUserHasLiked(isUserInLikers);
      } else {
        setUserHasLiked(false);
      }
    };
    loadLikes();
  }, []);

  const focusWindow = (id: string) => {
    setActiveAppId(id);
    setWindows(prev =>
      prev.map(w => {
        if (w.id === id) {
          const nextZ = highestZIndex + 1;
          setHighestZIndex(nextZ);
          return { ...w, zIndex: nextZ, isMinimized: false };
        }
        return w;
      })
    );
  };

  const openApp = (appId: string, extraProps?: Record<string, any>) => {
    setActiveAppId(appId);
    setWindows(prev => {
      const existingIndex = prev.findIndex(w => w.id === appId);
      const nextZ = highestZIndex + 1;
      setHighestZIndex(nextZ);

      if (existingIndex !== -1) {
        return prev.map((w, idx) =>
          idx === existingIndex
            ? {
                ...w,
                isOpen: true,
                isMinimized: false,
                zIndex: nextZ,
                contentProps: extraProps ? { ...w.contentProps, ...extraProps } : w.contentProps,
              }
            : w
        );
      } else {
        const newWindow: AppWindow = {
          id: appId,
          title: extraProps?.title || appId.toUpperCase(),
          icon: extraProps?.icon || 'Folder',
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: nextZ,
          position: { x: 120 + (prev.length * 20), y: 80 + (prev.length * 20) },
          size: { width: 920, height: 680 },
          contentProps: extraProps,
        };
        return [...prev, newWindow];
      }
    });
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, isOpen: false } : w)));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, isMinimized: true } : w)));
  };

  const toggleMaximizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)));
  };

  const handleHeartClick = async () => {
    const storedUser = userLiker || getStoredUserLike();

    if (storedUser && storedUser.email) {
      try {
        const res = await toggleLike(storedUser.email);
        if (res.success && res.count !== undefined) {
          setHeartCount(res.count);
          setUserHasLiked(res.userHasLiked);
        }
      } catch (err) {
        console.error('Toggle heart error:', err);
        setIsHeartModalOpen(true);
      }
    } else {
      setIsHeartModalOpen(true);
    }
  };

  const handleSignupSubmit = async (data: { name: string; occupation?: string; email: string; password: string }) => {
    const res = await signupLike(data);
    if (res.success && res.data) {
      setHeartCount(res.data.count);
      setUserHasLiked(true);
      if (res.user) {
        setUserLiker(res.user);
        setStoredUserLike(res.user);
      }
    } else {
      throw new Error(res.message || 'Signup failed.');
    }
  };

  const handleLoginSubmit = async (data: { email: string; password: string }) => {
    const res = await loginLike(data);
    if (res.success && res.data) {
      setHeartCount(res.data.count);
      setUserHasLiked(true);
      if (res.user) {
        setUserLiker(res.user);
        setStoredUserLike(res.user);
      }
    } else {
      throw new Error(res.message || 'Login failed.');
    }
  };

  const getAppTitle = () => {
    const activeWin = windows.find(w => w.id === activeAppId && w.isOpen && !w.isMinimized);
    if (activeWin) return activeWin.title;
    return 'Subham\'s Mac';
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#1A1A1A] font-sans antialiased select-none">
      {/* Top macOS Header */}
      <TopBar
        activeAppTitle={getAppTitle()}
        onOpenHelp={() => openApp('help')}
        onOpenApp={openApp}
      />

      {/* Dynamic Desktop Background */}
      <DesktopBackground
        wallpaper={wallpaper}
        onDesktopClick={() => setActiveAppId('desktop')}
      />

      {/* Draggable Desktop Files */}
      <DesktopFile
        id="resume"
        name="resume"
        initialPosition={{ 
          x: Math.round(window.innerWidth * 0.87), 
          y: Math.round(window.innerHeight * 0.28) 
        }}
        onDoubleClick={() => openApp('resume_viewer')}
      />

      <DesktopFile
        id="projects.md"
        name="projects.md"
        initialPosition={{ 
          x: Math.round(window.innerWidth * 0.77), 
          y: Math.round(window.innerHeight * 0.62) 
        }}
        onDoubleClick={() => openApp('project')}
      />

      {/* macOS Windows Stack */}
      {windows.map(win => (
        <Window
          key={win.id}
          window={win}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={toggleMaximizeWindow}
          onFocus={focusWindow}
        >
          {win.id === 'help' && <HelpApp onOpenTerminal={() => openApp('terminal')} />}
          {win.id === 'messages' && (
            <MessagesApp
              userLiker={userLiker}
              onOpenAuthModal={() => setIsHeartModalOpen(true)}
            />
          )}
          {win.id === 'gallery' && (
            <GalleryApp
              currentWallpaper={wallpaper}
              onSetWallpaper={handleSetWallpaper}
            />
          )}
          {win.id === 'weather' && <WeatherApp />}
          {win.id === 'hearts' && (
            <HeartsApp
              heartCount={heartCount}
              userHasLiked={userHasLiked}
              onHeartClick={handleHeartClick}
            />
          )}
          {win.id === 'finder' && <FinderApp onOpenApp={openApp} />}
          {win.id === 'terminal' && (
            <TerminalApp
              onOpenApp={openApp}
              onOpenHelp={() => openApp('help')}
              initialCommand={win.contentProps?.initialCommand}
            />
          )}
          {win.id === 'whoami' && (
            <WhoAmIApp
              onOpenApp={openApp}
              onMaximize={() => toggleMaximizeWindow('whoami')}
              isMaximized={win.isMaximized}
            />
          )}
          {win.id === 'resume_viewer' && <ResumeViewerApp />}
          {win.id === 'project' && (
            <ProjectApp
              projectId={win.contentProps?.projectId}
              onOpenApp={openApp}
            />
          )}
        </Window>
      ))}

      {/* Authentic macOS Dock Taskbar at Bottom */}
      <Dock
        windows={windows}
        onOpenApp={openApp}
        onOpenHelp={() => openApp('help')}
      />

      {/* Terminal-Styled Login / Signup Heart Modal */}
      <HeartModal
        isOpen={isHeartModalOpen}
        onClose={() => setIsHeartModalOpen(false)}
        onSignupSubmit={handleSignupSubmit}
        onLoginSubmit={handleLoginSubmit}
      />
    </div>
  );
};

export default App;
