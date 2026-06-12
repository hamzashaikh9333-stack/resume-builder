export const ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",

  // AI
  GENERATE_SUMMARY: "/ai/generate-summary",
  GENERATE_SKILLS: "/ai/generate-skills",
  GENERATE_PROJECT_DESCRIPTION: "/ai/generate-project-description",
  GENERATE_EXPERIENCE: "/ai/generate-experience",
  IMPROVE_CONTENT: "/ai/improve-content",
  ATS_SCORE: "/ai/ats-score",

  // Resume
  CREATE_RESUME: "/resume/create",

  GET_RESUMES: "/resume",

  UPDATE_RESUME: (resumeId: string) =>
  `/resume/${resumeId}`,

  DELETE_RESUME: (resumeId: string) =>
  `/resume/${resumeId}`,

  GET_RESUME: (resumeId: string) => `/resume/${resumeId}`,
} as const;



