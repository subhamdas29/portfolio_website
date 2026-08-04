export const projectsMdText = `# Subham Das — Projects Overview & Technical Architecture

## 1. PayFlow — Full-Stack Financial Management App
- **Type**: Personal Project (Apr 2026 - May 2026)
- **Tech Stack**: React.js, Node.js, Express.js, TypeScript, Tailwind CSS, PostgreSQL, Prisma ORM, Socket.io
- **Key Features**:
  • JWT authentication with access/refresh token rotation, bcrypt hashing, and Zod input validation across 29 API endpoints.
  • Folder-based expense tracking system with monthly budget limits and real-time over-budget alerts.
  • Atomic account-to-account transfers using Prisma $transaction ensuring data consistency.
  • Socket.IO real-time transaction notifications in authenticated private rooms.

---

## 2. ResumePilot — ATS Score & Suggestions Tool (FYP 2026)
- **Type**: Final Year Project | Mentor: Dr. Syamal Patra (Dec 2025 - Jul 2026)
- **Tech Stack**: FastAPI, Python, spaCy, HuggingFace Embeddings, Groq API, Supabase PostgreSQL, asyncio
- **Key Features**:
  • Asynchronous FastAPI backend using httpx and asyncio.gather, reducing API response latency by 60%.
  • Two-layer NLP extraction pipeline with spaCy, custom Entity Ruler, and trained NER model.
  • Weighted ATS scoring combining keyword match, semantic similarity, section completeness, and GitHub REST activity.
  • Integration with Adzuna Jobs API to surface relevant open roles post-analysis.

---

## 3. Chess++ — Open-Source Real-Time Chess Engine Arena
- **Type**: Open-Source (Jan 2026 - Mar 2026)
- **Tech Stack**: TypeScript, React.js, Node.js, WebSocket, Chess.js, Stockfish WASM
- **Key Features**:
  • Real-time multiplayer chess arena with WebSocket room matchmaking and move broadcasting.
  • Stockfish 16 WebAssembly engine running in Web Worker for local move evaluation and blunder detection.
  • Interactive PGN notation viewer and accuracy score graphs.

---

## 4. FoodRush — On-Demand Food Delivery Platform
- **Type**: Personal Project (Sep 2025 - Nov 2025)
- **Tech Stack**: React.js, TypeScript, Node.js, Express.js, MongoDB, Mapbox GL, Stripe API
- **Key Features**:
  • Responsive food ordering interface with menu customization and cart persistence.
  • Mapbox GL SDK real-time courier movement simulation with ETA calculations.
  • Stripe payment gateway integration with Webhook handlers for order receipts.
`;
