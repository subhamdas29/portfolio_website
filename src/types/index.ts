export interface Liker {
  id: string;
  name: string;
  occupation?: string;
  organization?: string;
  email?: string;
  password?: string;
  createdAt: string;
}

export interface LikesResponse {
  count: number;
  likers: Liker[];
  userHasLiked?: boolean;
}

export interface AppWindow {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  contentProps?: Record<string, any>;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  type: 'FYP' | 'Personal' | 'Open-Source';
  period: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
  description: string;
  icon: string;
  imageUrl?: string;
}

export interface TerminalHistory {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}
