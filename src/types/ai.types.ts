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