"use client";

import { Sparkles } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { aiService } from "@/services/ai.service";
import { ResumeFormData } from "@/schemas/resume.schema";

export default function ProjectsSection() {
  const {
    watch,
    setValue,
  } = useFormContext<ResumeFormData>();

  const jobTitle = watch("jobTitle");
  const experienceLevel = watch("experienceLevel");
  const skills = watch("skills") ?? [];

  const projects = watch("projects") ?? [];

  const generateProjects = async () => {
    try {
      if (
        !jobTitle ||
        !experienceLevel ||
        skills.length === 0
      ) {
        alert(
          "Please generate skills first."
        );
        return;
      }

      const response =
        await aiService.generateProjectDescription({
          jobTitle,
          experienceLevel,
          techStack: skills,
        });

      setValue(
        "projects",
        response.data.projects
      );
    } catch (error) {
      console.error(error);
      alert(
        "Failed to generate projects"
      );
    }
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Projects
        </h2>

        <button
          type="button"
          onClick={generateProjects}
          className="flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 hover:bg-blue-500/20"
        >
          <Sparkles size={16} />
          Generate Projects
        </button>
      </div>

      {projects.length === 0 ? (
        <p className="text-slate-400">
          No projects added yet.
        </p>
      ) : (
        <div className="space-y-4">
          {projects.map(
            (project, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-700 bg-slate-900 p-4"
              >
                <h3 className="text-lg font-semibold text-white">
                  {project.title}
                </h3>

                <p className="mt-3 text-slate-300">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map(
                    (tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-300"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}