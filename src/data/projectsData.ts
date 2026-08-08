import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'resumepilot',
    title: 'ResumePilot',
    subtitle: 'AI-Powered ATS Score & Resume Optimization Platform (FYP 2026)',
    type: 'FYP',
    period: 'Dec. 2025 - Jul. 2026',
    techStack: ['FastAPI', 'Python', 'spaCy NLP', 'Groq LLaMA 3.3 70B', 'HuggingFace', 'PostgreSQL', 'Supabase', 'GitHub API', 'Adzuna API', 'React.js'],
    githubUrl: 'https://github.com/subhamdas29/ATS_resume_matcher',
    liveUrl: 'https://resumepilot-ai.vercel.app',
    icon: 'Bot',
    imageUrl: '/assets/resumepilot_thumbnail.png',
    highlights: [
      'Weighted 6-Signal ATS Formula: Blends Section Quality (28%), Hard Skill Match (35%), Semantic Similarity (15%), Soft Skills (7%), Job Title Match (5%), and active GitHub contribution score (10%).',
      'Deterministic Local NLP Pipeline: Two-layer extraction featuring spaCy Entity Ruler with 379 patterns and a custom-trained NER model for skill, title, education, and certification parsing.',
      'Groq LLaMA 3.3 70B & HuggingFace Embeddings: Computes section improvement suggestions via Groq API while evaluating document semantic similarity with all-MiniLM-L6-v2.',
      'Live Adzuna Job Search & Supabase History: Surfaces matching live open roles post-analysis with salary and apply links, while storing user analysis history in Supabase PostgreSQL.'
    ],
    description: `ResumePilot is a smart ATS (Applicant Tracking System) platform that scans resumes against job descriptions. It calculates a weighted ATS score using local spaCy NLP entity extraction, HuggingFace semantic embeddings, Groq LLaMA 3.3 LLM analysis, GitHub profile commit scanning, and surfaces matching live job openings via the Adzuna API.`
  },
  {
    id: 'payflow',
    title: 'PayFlow',
    subtitle: 'Full-Stack Financial Management & Real-Time Banking Platform',
    type: 'Personal',
    period: 'Apr. 2026 - May 2026',
    techStack: ['React 18', 'Node.js 20', 'Express.js', 'TypeScript 5', 'PostgreSQL 16', 'Prisma ORM 5', 'Socket.IO', 'Zustand', 'Zod', 'Tailwind CSS v3'],
    githubUrl: 'https://github.com/subhamdas29/Financial_management_app',
    liveUrl: 'https://payflow-app.vercel.app',
    icon: 'CreditCard',
    imageUrl: '/assets/payflow_thumbnail.png',
    highlights: [
      'Atomic Account Transfers (Prisma $transaction): Prevents partial financial updates by executing user-to-user transfers in atomic database transactions with automatic rollback on failure.',
      'Folder-Based Expense & Budget System: Create income/expense category folders with monthly budget limits, visual progress bars, over-budget alerts, and per-folder analytics.',
      'Socket.IO Real-Time Notifications: Authenticated WebSocket connections delivering instant transaction alerts and account updates into per-user private rooms.',
      'Zero-Trust JWT Auth & Multi-Account Management: Double-token JWT rotation (access + refresh), bcrypt password hashing (12 rounds), Zod input validation, and multi-account balance tracking.'
    ],
    description: `PayFlow is a full-stack personal finance application enabling multi-account management, folder-based expense allocations, real-time peer-to-peer transfers, and live transaction notifications. Engineered with zero-trust JWT security, Prisma database transaction guarantees, and Socket.IO private events.`
  },
  {
    id: 'foodrush',
    title: 'FoodRush',
    subtitle: 'Event-Driven Distributed Microservices & Order Saga Platform',
    type: 'Personal',
    period: 'Sep. 2025 - Nov. 2025',
    techStack: ['React 18', 'Node.js 20', 'TypeScript 5.4', 'Apache Kafka', 'PostgreSQL 16', 'Prisma ORM', 'Turborepo', 'Docker Compose', 'Zustand'],
    githubUrl: 'https://github.com/subhamdas29/Financial_management_app',
    liveUrl: 'https://foodrush.vercel.app',
    icon: 'ShoppingBag',
    imageUrl: '/assets/foodrush_thumbnail.png',
    highlights: [
      'Distributed Saga Orchestration: Centralized state machine managing multi-step orders across services with automated backward compensation (refunds & cancellations) on step failure.',
      'Kafka-Driven Microservices Architecture: Decoupled messaging across API Gateway, Order Orchestrator, Payment Service, Restaurant Service, and Delivery Service using Apache Kafka.',
      'Database-per-Service Isolation: Each domain microservice manages its own isolated PostgreSQL database schema with Prisma ORM migrations.',
      'Containerized Monorepo Infrastructure: Monorepo managed by Turborepo & PNPM Workspaces, containerized with Docker Compose for Kafka brokers, Zookeeper, and PostgreSQL.'
    ],
    description: `FoodRush is an event-driven microservices food delivery platform built with Node.js, TypeScript, Apache Kafka, PostgreSQL, and React. It implements the Saga Pattern (Orchestration) across Order Orchestrator, Payment, Restaurant, and Delivery microservices with automated failure rollback and compensation.`
  },
  {
    id: 'chessplus',
    title: 'Chess++',
    subtitle: 'Strategic Chess Engine Variant & Teleportation Arena',
    type: 'Open-Source',
    period: 'Jan. 2026 - Mar. 2026',
    techStack: ['TypeScript', 'React.js', 'Node.js', 'WebSocket', 'Chess.js', 'Stockfish 16 WASM', 'Tailwind CSS'],
    githubUrl: 'https://github.com/subhamdas29/ATS_resume_matcher',
    liveUrl: 'https://chess-plus.vercel.app',
    icon: 'Trophy',
    imageUrl: '/assets/chessplus_thumbnail.png',
    highlights: [
      'Innovative Catapult Teleportation Mechanics: Introduces Catapult pieces on b1/f1 (White) and b8/f8 (Black) that enable non-pawn pieces to teleport across the board in a single turn.',
      'Real-Time WebSocket Matchmaking: Built a low-latency WebSocket multiplayer arena with dedicated game rooms, move broadcasting, and fault-tolerant reconnect handling.',
      'Local Stockfish WASM Analysis: Integrated Stockfish 16 WebAssembly engine in Web Workers to compute live centipawn graphs, blunder detection, and move recommendations.',
      'Draw-Reduction Strategy Design: Eliminates stale opening theory and fortress draws by introducing sudden teleportation attacks and king evacuation tactics.'
    ],
    description: `Chess++ is an innovative chess variant designed to reduce high draw rates and break rigid engine prep by introducing a strategic new piece — the Catapult. Supports real-time WebSocket multiplayer, Stockfish WASM move evaluations, and teleportation-based tactics.`
  }
];
