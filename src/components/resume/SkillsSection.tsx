"use client";

import { Sparkles } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { aiService } from "@/services/ai.service";
import { ResumeFormData } from "@/schemas/resume.schema";

export default function SkillsSection() {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext<ResumeFormData>();

  const jobTitle = watch("jobTitle");
  const experienceLevel = watch("experienceLevel");

  const generateSkills = async () => {
    try {
      if (!jobTitle || !experienceLevel) {
        alert(
          "Please fill Job Title and Experience Level first."
        );
        return;
      }

      const response =
        await aiService.generateSkills({
          jobTitle,
          experienceLevel,
        });

      setValue(
        "skills",
        response.data.skills
      );
    } catch (error) {
      console.error(error);
      alert("Failed to generate skills");
    }
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Skills
        </h2>

        <button
          type="button"
          onClick={generateSkills}
          className="flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-500/20"
        >
          <Sparkles size={16} />
          Generate Skills
        </button>
      </div>

      <textarea
        {...register("skills.0")}
        hidden
      />

      <div className="flex flex-wrap gap-2">
        {watch("skills")?.map(
          (skill, index) => (
            <span
              key={index}
              className="rounded-full bg-blue-500/20 px-4 py-2 text-sm text-blue-300"
            >
              {skill}
            </span>
          )
        )}
      </div>

      {watch("skills")?.length === 0 && (
        <p className="text-slate-400">
          No skills added yet.
        </p>
      )}

      {errors.skills && (
        <p className="mt-2 text-sm text-red-400">
          Invalid skills data
        </p>
      )}
    </section>
  );
}