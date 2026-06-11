export interface GenerateSummaryBody {
  experienceLevel: string;
  skills: string;
  jobTitle: string;
}

export interface GenerateSkillsBody {
  experienceLevel: string;
  jobTitle: string;
}

export interface GenerateProjectDescriptionBody {
  experienceLevel: string;
  jobTitle: string;
  techStack: string[];
}

export interface GenerateExperienceBody {
  experienceLevel: string;
  yearOfExperience: number;
  jobRole: string;
  techStack: string[];
}

export interface ImproveContentBody {
  content: string;
}

export interface AtsScoreBody {
  resumeText: string;
}

//=======Response Interfaces=======



export interface SummaryResponse {
  summary: string;
}

export interface SkillsResponse {
  skills: string[];
}

export interface ProjectDescriptionResponse {
  projects: {
    title: string;
    description: string;
    techStack: string[];
    githubLink: string;
    liveLink: string;
  }[];
}

export interface ExperienceResponse {
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
}

export interface ImproveContentResponse {
  content: string;
}

export interface AtsScoreResponse {
  score: number;
  suggestions: string[];
}