import { Resume } from "@/interfaces/resume.interface";

export const buildResumeText = (
  resume: Resume
) => {
  return `
Name:
${resume.personalInfo.fullname}

Email:
${resume.personalInfo.email}

Summary:
${resume.summary}

Skills:
${resume.skills.join(", ")}

Experience:
${resume.workExperience
  .map(
    (exp) =>
      `${exp.position} at ${exp.company}
${exp.description}`
  )
  .join("\n\n")}

Projects:
${resume.projects
  .map(
    (project) =>
      `${project.title}
${project.description}`
  )
  .join("\n\n")}

Education:
${resume.education
  .map(
    (edu) =>
      `${edu.degree} - ${edu.institute}`
  )
  .join("\n")}
`;
};