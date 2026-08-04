import React from 'react';
import { Heart } from 'lucide-react';

interface HeartsAppProps {
  heartCount: number;
  userHasLiked: boolean;
  onHeartClick: () => void;
}

export const HeartsApp: React.FC<HeartsAppProps> = ({
  heartCount,
  userHasLiked,
  onHeartClick,
}) => {
  return (
    <div className="w-full h-full bg-transparent flex items-center justify-center space-x-2.5 px-3 py-2 select-none overflow-hidden font-sans">
      {/* Red Heart Button */}
      <button
        onClick={onHeartClick}
        className="group focus:outline-none transition-transform active:scale-90 shrink-0 cursor-pointer"
        title={userHasLiked ? "Click to unlike" : "Click to like portfolio"}
      >
        <Heart
          className={`w-9 h-9 transition-all duration-200 ${
            userHasLiked
              ? 'fill-red-600 text-red-600 scale-105'
              : 'text-red-500 hover:text-red-400 hover:scale-110'
          }`}
        />
      </button>

      {/* Heart Count Number */}
      <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
        {heartCount}
      </span>
    </div>
  );
};
