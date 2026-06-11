"use client";

import { Sparkles } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { aiService } from "@/services/ai.service";
import { ResumeFormData } from "@/schemas/resume.schema";

export default function ExperienceSection() {
  const {
    watch,
    setValue,
  } = useFormContext<ResumeFormData>();

  const jobTitle = watch("jobTitle");
  const experienceLevel = watch("experienceLevel");
  const yearOfExperience = watch("yearOfExperience")??0;
  const skills = watch("skills");

  const generateExperience = async () => {
    try {
      if (
        !jobTitle ||
        !experienceLevel ||
        !yearOfExperience
      ) {
        alert(
          "Please fill Job Title, Experience Level and Years of Experience."
        );
        return;
      }

      const response =
        await aiService.generateExperience({
          jobRole: jobTitle,
          experienceLevel,
          yearOfExperience: Number(yearOfExperience),
          techStack: skills ?? [],
        });

      setValue(
        "workExperience",
        response.data.experience
      );
    } catch (error) {
      console.error(error);
      alert("Failed to generate experience");
    }
  };

  const experiences =
    watch("workExperience") ?? [];

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Work Experience
        </h2>

        <button
          type="button"
          onClick={generateExperience}
          className="flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 hover:bg-blue-500/20"
        >
          <Sparkles size={16} />
          Generate Experience
        </button>
      </div>

      {experiences.length === 0 ? (
        <p className="text-slate-400">
          No experience added yet.
        </p>
      ) : (
        <div className="space-y-4">
          {experiences.map(
            (experience, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-700 bg-slate-900 p-4"
              >
                <h3 className="font-semibold text-white">
                  {experience.position}
                </h3>

                <p className="text-blue-400">
                  {experience.company}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  {experience.startDate} -{" "}
                  {experience.endDate}
                </p>

                <p className="mt-3 text-slate-300">
                  {experience.description}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}