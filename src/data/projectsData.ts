import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'payflow',
    title: 'PayFlow',
    subtitle: 'Full-Stack Financial Management App',
    type: 'Personal',
    period: 'Apr. 2026 - May 2026',
    techStack: ['React.js', 'Node.js', 'Express.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma ORM', 'Socket.io'],
    githubUrl: 'https://github.com/subhamdas29/Financial_management_app',
    liveUrl: 'https://payflow-app.vercel.app',
    icon: 'CreditCard',
    highlights: [
      'Implemented JWT authentication with access/refresh token rotation, bcrypt password hashing, Zod input validation, and role-based route protection across 29 API endpoints.',
      'Designed a folder-based expense tracking system with monthly budget limits, real-time over-budget alerts, and per-category spending analytics using Prisma ORM and PostgreSQL.',
      'Built atomic account-to-account transfers using Prisma $transaction ensuring data consistency, and integrated Socket.IO for real-time transaction notifications with authenticated per-user private rooms.'
    ],
    description: `PayFlow is a production-grade full-stack financial application built for modern expense tracking, category budget allocations, and secure peer-to-peer money transfers. Designed with zero-trust security using JWT token rotation and Prisma transaction safety.`
  },
  {
    id: 'resumepilot',
    title: 'ResumePilot',
    subtitle: 'ATS Score & Suggestions Tool (FYP 2026)',
    type: 'FYP',
    period: 'Dec. 2025 - Jul. 2026',
    techStack: ['FastAPI', 'Python', 'spaCy', 'HuggingFace', 'Groq API', 'PostgreSQL', 'Supabase', 'asyncio'],
    githubUrl: 'https://github.com/subhamdas29/ATS_resume_matcher',
    liveUrl: 'https://resumepilot-ai.vercel.app',
    icon: 'Bot',
    highlights: [
      'Transitioned synchronous operations into an asynchronous workflow with httpx and asyncio.gather, reducing API response latency by 60%.',
      'Engineered a two-layer NLP extraction pipeline using spaCy, a custom Entity Ruler, and a trained NER model alongside structured Groq API prompts.',
      'Weighted ATS scoring formula combining keyword match, semantic similarity with HuggingFace embeddings, section completeness, and GitHub REST API presence.'
    ],
    description: `ResumePilot is an AI-driven Resume Analysis & ATS Optimization tool designed as a final year project under Dr. Syamal Patra. It extracts structured entities from uploaded resumes, computes semantic alignment with targeted job descriptions, and fetches live open roles via the Adzuna API.`
  },
  {
    id: 'chessplus',
    title: 'Chess++',
    subtitle: 'Open-Source Real-Time Chess Engine & Multiplayer',
    type: 'Open-Source',
    period: 'Jan. 2026 - Mar. 2026',
    techStack: ['TypeScript', 'React.js', 'Node.js', 'WebSocket', 'Chess.js', 'Stockfish WASM', 'Tailwind CSS'],
    githubUrl: 'https://github.com/subhamdas29/ATS_resume_matcher',
    liveUrl: 'https://chess-plus.vercel.app',
    icon: 'Trophy',
    highlights: [
      'Engineered a lightweight real-time multiplayer chess arena with WebSocket room matchmaking and low-latency move broadcasting.',
      'Integrated Stockfish 16 WebAssembly engine in a dedicated Web Worker to evaluate move recommendations, centipawn score graphs, and blunder detection locally.',
      'Built interactive PGN notation viewer, move timeline playback, and customized board themes with full accessibility keyboard control.'
    ],
    description: `Chess++ is an open-source web-based chess workspace combining live multiplayer games with local Stockfish WASM analysis. Features real-time move validation, accuracy score graphs, and interactive puzzle trainers.`
  },
  {
    id: 'foodrush',
    title: 'FoodRush',
    subtitle: 'On-Demand Food Ordering & Live Delivery Platform',
    type: 'Personal',
    period: 'Sep. 2025 - Nov. 2025',
    techStack: ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Mapbox GL', 'Stripe API'],
    githubUrl: 'https://github.com/subhamdas29/Financial_management_app',
    liveUrl: 'https://foodrush.vercel.app',
    icon: 'ShoppingBag',
    highlights: [
      'Developed a responsive food ordering interface featuring restaurant menu customization, cart persistence, and instant search filtering.',
      'Integrated Mapbox GL SDK for interactive real-time courier movement simulation and estimated time of arrival (ETA) calculations.',
      'Configured Stripe payment gateway integration with Webhook handlers for order status updates and automated email invoice receipts.'
    ],
    description: `FoodRush is a full-featured online food ordering platform offering dynamic restaurant catalog browsing, cart checkout with Stripe, live delivery tracking maps, and order history analytics.`
  }
];
