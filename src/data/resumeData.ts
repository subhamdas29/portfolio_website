export const resumeData = {
  name: "Subham Das",
  title: "Full-Stack Developer & Backend Systems Engineer",
  email: "subhamdas5477@gmail.com",
  phone: "+91 8582953151",
  github: "https://github.com/subhamdas5477",
  linkedin: "https://linkedin.com/in/subhamdas5477",
  location: "Kolkata, West Bengal, India",
  summary: `Full-Stack Developer with a strong foundation in TypeScript, Python, Express.js, and FastAPI. Hands-on experience in building high-performance asynchronous backend systems, AI-driven NLP pipelines combining custom ML models with LLM APIs, and secure full-stack applications with REST APIs, JWT authentication, and PostgreSQL.`,
  education: {
    institution: "Techno Institute of Engineering & Management",
    degree: "B.Tech. in Computer Science & Engineering",
    cgpa: "7.6 / 10",
    period: "Oct. 2022 - Jul. 2026",
    mentor: "Dr. Syamal Patra, Department of Computer Science",
  },
  skills: {
    languages: ["TypeScript", "JavaScript", "Python", "SQL"],
    frontend: ["React.js", "Tailwind CSS", "HTML5", "CSS3", "Vite", "Next.js"],
    backendDevOps: ["Node.js", "Express.js", "FastAPI", "Docker", "CI/CD", "Git", "REST APIs"],
    aiMl: ["spaCy", "HuggingFace Embeddings", "Groq API", "Semantic Similarity", "NER Models"],
    databases: ["PostgreSQL", "Supabase", "Prisma ORM", "Redis"],
  },
  experience: [
    {
      role: "Lead Backend Developer — ResumePilot (FYP)",
      period: "Dec. 2025 - Jul. 2026",
      mentor: "Dr. Syamal Patra, Department of Computer Science",
      bullets: [
        "Built and optimized a high-performance backend using FastAPI and Python, transitioning synchronous operations into an asynchronous workflow with httpx and asyncio.gather to execute network requests concurrently, reducing API response latency by 60%.",
        "Engineered a two-layer NLP extraction pipeline using spaCy, a custom Entity Ruler and a trained NER model alongside structured Groq API prompts for section-completeness scoring and HuggingFace embedding models for semantic similarity; integrated the GitHub REST API to evaluate active portfolio presence and the Adzuna Jobs API to surface relevant open roles post-analysis.",
        "Designed a normalized PostgreSQL schema using Supabase to persist per-user analysis history, and built a weighted ATS scoring formula combining keyword match, semantic similarity, section scores, GitHub activity, and job title alignment to deliver structured feedback and actionable resume improvement suggestions."
      ]
    }
  ],
  achievements: [
    {
      title: "Smart India Hackathon (SIH '25) — Top 2 Finish",
      detail: "Lead Backend Developer for SIH'25 TIEM team, securing Top 2 position out of nationwide competing teams."
    },
    {
      title: "Chess Champion — 64squares '25 Tournament",
      detail: "1st Place Winner of the 64squares'25 Chess Tournament hosted by TIEM, demonstrating strategic problem-solving skills."
    }
  ]
};
