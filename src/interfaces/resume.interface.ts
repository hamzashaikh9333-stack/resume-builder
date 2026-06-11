export interface PersonalInfo {
  fullname: string;
  email: string;
  mobile: string;
  address: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  githubLink: string;
  liveLink: string;
  techStack: string[];
}

export interface Education {
  degree: string;
  institute: string;
  startDate: string;
  endDate: string;
}

export interface Resume {
  _id: string;

  user_id: string;

  title: string;

  summary: string;

  workExperience: WorkExperience[];

  projects: Project[];

  education: Education[];

  skills: string[];

  certifications: string[];

  personalInfo: PersonalInfo;

  createdAt: string;
  updatedAt: string;
}



export interface ResumeResponse {
  resume: Resume;
}