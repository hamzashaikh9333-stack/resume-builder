import { forwardRef } from "react";
import { Resume } from "@/interfaces/resume.interface";

interface PdfResumeTemplateProps {
  resume: Resume;
}

interface SectionRowProps {
  title: string;
  children: React.ReactNode;
}

function SectionRow({ title, children }: SectionRowProps) {
  return (
    <section className="grid grid-cols-[120px_1fr] gap-8 border-t border-black py-6">
      <h2 className="text-sm font-bold uppercase">{title}</h2>

      <div>{children}</div>
    </section>
  );
}

const PdfResumeTemplate = forwardRef<HTMLDivElement, PdfResumeTemplateProps>(
  ({ resume }, ref) => {
    return (
      <div
        ref={ref}
        className="mx-auto min-h-[1123px] w-[794px] bg-white p-12 text-black shadow-2xl"
      >
        <div className="pb-8">
          <div className="flex items-start justify-between">
            <h1 className="text-5xl font-bold tracking-wide">
              {resume.personalInfo.fullname}
            </h1>

            <p className="text-3xl text-gray-700">{resume.title}</p>
          </div>
        </div>

        <SectionRow title="Contact">
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p>
                <strong>Phone:</strong> {resume.personalInfo.mobile}
              </p>

              <p className="mt-2">
                <strong>Email:</strong> {resume.personalInfo.email}
              </p>
            </div>

            <div>
              {resume.personalInfo.linkedin && (
                <p>
                  <strong>LinkedIn:</strong> {resume.personalInfo.linkedin}
                </p>
              )}

              {resume.personalInfo.github && (
                <p className="mt-2">
                  <strong>GitHub:</strong> {resume.personalInfo.github}
                </p>
              )}

              {resume.personalInfo.portfolio && (
                <p className="mt-2">
                  <strong>Portfolio:</strong> {resume.personalInfo.portfolio}
                </p>
              )}
            </div>
          </div>
        </SectionRow>

        <SectionRow title="Skills">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {resume.skills.map((skill, index) => (
              <span key={index} className="text-sm">
                • {skill}
              </span>
            ))}
          </div>
        </SectionRow>

        {resume.summary && (
          <SectionRow title="Summary">
            <p className="leading-7">{resume.summary}</p>
          </SectionRow>
        )}

        {resume.workExperience.length > 0 && (
          <SectionRow title="Experience">
            <div className="space-y-8">
              {resume.workExperience.map((exp, index) => (
                <div key={index}>
                  <h3 className="font-bold">{exp.position}</h3>

                  <p className="font-medium">{exp.company}</p>

                  <p className="text-sm text-gray-600">
                    {exp.startDate} - {exp.endDate}
                  </p>

                  <p className="mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </SectionRow>
        )}

        {resume.projects.length > 0 && (
          <SectionRow title="Projects">
            <div className="space-y-8">
              {resume.projects.map((project, index) => (
                <div key={index}>
                  <h3 className="font-bold">{project.title}</h3>

                  <p className="mt-2">{project.description}</p>

                  <p className="mt-2 text-sm">
                    Tech Stack: {project.techStack.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </SectionRow>
        )}

        {resume.education.length > 0 && (
          <SectionRow title="Education">
            <div className="space-y-5">
              {resume.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-bold">{edu.degree}</h3>

                  <p>{edu.institute}</p>

                  <p className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          </SectionRow>
        )}

        {resume.certifications.filter((cert) => cert.trim()).length > 0 && (
          <SectionRow title="Certifications">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {resume.certifications
                .filter((cert) => cert.trim())
                .map((cert, index) => (
                  <span key={index}>• {cert}</span>
                ))}
            </div>
          </SectionRow>
        )}
      </div>
    );
  },
);

PdfResumeTemplate.displayName = "PdfResumeTemplate";

export default PdfResumeTemplate;
