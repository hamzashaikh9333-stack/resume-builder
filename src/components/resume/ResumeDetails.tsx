import { Resume } from "@/interfaces/resume.interface";
import { forwardRef } from "react";

interface ResumeDetailsProps {
  resume: Resume;
}

const ResumeDetails = forwardRef<HTMLDivElement, ResumeDetailsProps>(
  function ResumeDetails({ resume }, ref) {
    return (
      <div
        ref={ref}
        className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
      >
        {/* Header */}
        <div className="border-b border-slate-700 pb-6">
          <h1 className="text-3xl font-bold text-white">
            {resume.personalInfo.fullname}
          </h1>

          <p className="mt-2 text-slate-400">{resume.title}</p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-400">
            <span>{resume.personalInfo.email}</span>
            <span>{resume.personalInfo.mobile}</span>
          </div>
        </div>

        {/* Summary */}
        {resume.summary && (
          <section className="mt-6">
            <h2 className="mb-2 text-lg font-semibold text-white">
              Professional Summary
            </h2>

            <p className="text-slate-300">{resume.summary}</p>
          </section>
        )}

        {/* Skills */}
        {resume.skills.length > 0 && (
          <section className="mt-6">
            <h2 className="mb-3 text-lg font-semibold text-white">Skills</h2>

            <div className="flex flex-wrap gap-2">
              {resume.skills
                .filter((skill) => skill.trim())
                .map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-300"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {resume.workExperience.length > 0 && (
          <section className="mt-6">
            <h2 className="mb-3 text-lg font-semibold text-white">
              Experience
            </h2>

            <div className="space-y-6">
              {resume.workExperience.map((experience, index) => (
                <div key={index}>
                  <h3 className="font-medium text-white">
                    {experience.position}
                  </h3>

                  <p className="text-blue-400">{experience.company}</p>

                  <p className="text-sm text-slate-500">
                    {experience.startDate} - {experience.endDate}
                  </p>

                  <p className="mt-2 text-slate-300">
                    {experience.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {resume.projects.length > 0 && (
          <section className="mt-6">
            <h2 className="mb-3 text-lg font-semibold text-white">Projects</h2>

            <div className="space-y-6">
              {resume.projects.map((project, index) => (
                <div key={index}>
                  <h3 className="font-medium text-white">{project.title}</h3>

                  <p className="mt-2 text-slate-300">{project.description}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.techStack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <section className="mt-6">
            <h2 className="mb-3 text-lg font-semibold text-white">Education</h2>

            {resume.education.map((edu, index) => (
              <div key={index}>
                <h3 className="text-white font-medium">{edu.degree}</h3>

                <p className="text-slate-400">{edu.institute}</p>

                <p className="text-sm text-slate-500">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {resume.certifications.length > 0 && (
          <section className="mt-6">
            <h2 className="mb-3 text-lg font-semibold text-white">
              Certifications
            </h2>

            <ul className="space-y-2 text-slate-300">
              {resume.certifications.map((certification, index) => (
                <li key={index}>• {certification}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  },
);

export default ResumeDetails;
