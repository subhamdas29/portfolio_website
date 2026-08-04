import React, { useState, useEffect } from 'react';

interface DesktopBackgroundProps {
  wallpaper?: string;
  onDesktopClick: () => void;
}

export const DesktopBackground: React.FC<DesktopBackgroundProps> = ({
  wallpaper = 'default',
  onDesktopClick,
}) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [wallpaper]);

  const isCustomWallpaper = wallpaper && wallpaper !== 'default' && !imgError;

  return (
    <div
      className="absolute inset-0 bg-[#1A1A1A] overflow-hidden flex items-center justify-center p-6 select-none cursor-default transition-all duration-500 bg-cover bg-center bg-no-repeat"
      style={
        isCustomWallpaper
          ? { backgroundImage: `url('${encodeURI(wallpaper)}')` }
          : undefined
      }
      onClick={onDesktopClick}
    >
      {/* Hidden img tag to detect broken image URLs and trigger fallback */}
      {wallpaper && wallpaper !== 'default' && (
        <img
          src={wallpaper}
          alt="Wallpaper preload"
          className="hidden"
          onError={() => setImgError(true)}
          onLoad={() => setImgError(false)}
        />
      )}

      {/* Dark overlay for custom wallpaper to keep icons & text clear */}
      {isCustomWallpaper && (
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px] pointer-events-none" />
      )}

      {/* Skill Icons Banner in Middle (Visible on Default Wallpaper or on load error) */}
      {!isCustomWallpaper && (
        <div className="relative z-10 flex items-center justify-center max-w-4xl mx-auto my-auto pointer-events-none opacity-80">
          <img
            src="/assets/skillicons.svg"
            alt="Skills: py, js, ts, nodejs, express, fastapi, postgres, react, docker, kafka, aws, git"
            className="w-full max-w-3xl h-auto object-contain"
          />
        </div>
      )}
    </div>
  );
};
