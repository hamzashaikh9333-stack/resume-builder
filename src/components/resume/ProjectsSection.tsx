"use client";

import { Sparkles } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { aiService } from "@/services/ai.service";
import { ResumeFormData } from "@/schemas/resume.schema";
import { useState } from "react";

export default function ProjectsSection() {
  const { watch, setValue } = useFormContext<ResumeFormData>();

  const jobTitle = watch("jobTitle");
  const experienceLevel = watch("experienceLevel");
  const skills = watch("skills") ?? [];

  const projects = watch("projects") ?? [];

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    githubLink: "",
    liveLink: "",
    techStack: "",
  });

  const generateProjects = async () => {
    try {
      if (!jobTitle || !experienceLevel || skills.length === 0) {
        toast.warning("Please generate skills first.");
        return;
      }

      const response = await aiService.generateProjectDescription({
        jobTitle,
        experienceLevel,
        techStack: skills,
      });
      console.log("PROJECT RESPONSE", response.data.projects);

      const formattedProjects = response.data.projects.map((project) => ({
        ...project,
        description: Array.isArray(project.description)
          ? project.description.join(" ")
          : project.description,
      }));

      setValue("projects", formattedProjects);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate projects");
    }
  };

  const addProject = () => {
    if (!newProject.title || !newProject.description) {
      toast.warning("Please fill required fields");
      return;
    }

    setValue("projects", [
      ...projects,
      {
        title: newProject.title,
        description: newProject.description,
        githubLink: newProject.githubLink,
        liveLink: newProject.liveLink,
        techStack: newProject.techStack
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
      },
    ]);

    setNewProject({
      title: "",
      description: "",
      githubLink: "",
      liveLink: "",
      techStack: "",
    });
  };

  const removeProject = (index: number) => {
    setValue(
      "projects",
      projects.filter((_, i) => i !== index),
    );
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Projects</h2>

          <p className="mt-2 text-sm text-slate-400">
            Add projects manually or generate them with AI.
          </p>
        </div>

        <button
          type="button"
          onClick={generateProjects}
          className="flex items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-400 hover:bg-blue-500/20"
        >
          <Sparkles size={16} />
          Generate With AI
        </button>
      </div>

      <div className="mb-6 grid gap-3">
        <input
          type="text"
          placeholder="Project Title"
          value={newProject.title}
          onChange={(e) =>
            setNewProject({
              ...newProject,
              title: e.target.value,
            })
          }
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
        />

        <textarea
          rows={4}
          placeholder="Project Description"
          value={newProject.description}
          onChange={(e) =>
            setNewProject({
              ...newProject,
              description: e.target.value,
            })
          }
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
        />

        <input
          type="text"
          placeholder="Tech Stack (React, Node.js, MongoDB)"
          value={newProject.techStack}
          onChange={(e) =>
            setNewProject({
              ...newProject,
              techStack: e.target.value,
            })
          }
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
        />

        <input
          type="text"
          placeholder="GitHub Link"
          value={newProject.githubLink}
          onChange={(e) =>
            setNewProject({
              ...newProject,
              githubLink: e.target.value,
            })
          }
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
        />

        <input
          type="text"
          placeholder="Live Link"
          value={newProject.liveLink}
          onChange={(e) =>
            setNewProject({
              ...newProject,
              liveLink: e.target.value,
            })
          }
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
        />

        <button
          type="button"
          onClick={addProject}
          className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
        >
          Add Project
        </button>
      </div>

      <div className="space-y-4">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-700 bg-slate-900 p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  ✕
                </button>
              </div>

              <p className="mt-3 text-slate-300">{project.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.githubLink && (
                <p className="mt-3 text-sm text-blue-400">
                  GitHub: {project.githubLink}
                </p>
              )}

              {project.liveLink && (
                <p className="mt-1 text-sm text-green-400">
                  Live: {project.liveLink}
                </p>
              )}
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 text-center">
            <p className="text-slate-400">No projects added yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
