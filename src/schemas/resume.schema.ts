import { z } from "zod";

export const resumeSchema = z.object({
  title: z.string().min(1, "Title is required"),

  jobTitle: z.string().optional(),

  experienceLevel: z.string().optional(),

  yearOfExperience: z.coerce.number().optional(),
  
  summary: z.string().optional(),

  personalInfo: z.object({
    fullname: z.string().min(1, "Full name is required"),

    email: z.string().email("Invalid email address"),

    mobile: z.string().min(10, "Mobile number is required"),

    address: z.string().optional(),

    linkedin: z.string().optional(),

    github: z.string().optional(),

    portfolio: z.string().optional(),
  }),

  skills: z.array(z.string()).default([]),

  certifications: z.array(z.string()).default([]),

  workExperience: z
    .array(
      z.object({
        company: z.string(),

        position: z.string(),

        startDate: z.string(),

        endDate: z.string(),

        description: z.string(),
      }),
    )
    .default([]),

  projects: z
    .array(
      z.object({
        title: z.string(),

        description: z.string(),

        githubLink: z.string(),

        liveLink: z.string(),

        techStack: z.array(z.string()),
      }),
    )
    .default([]),

  education: z
    .array(
      z.object({
        degree: z.string(),

        institute: z.string(),

        startDate: z.string(),

        endDate: z.string(),
      }),
    )
    .default([]),
});

export type ResumeFormData = z.input<typeof resumeSchema>;
