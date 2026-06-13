"use client";

import { Sparkles } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

import { aiService } from "@/services/ai.service";
import { ResumeFormData } from "@/schemas/resume.schema";
import { useState } from "react";

export default function SkillsSection() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeFormData>();

  const jobTitle = watch("jobTitle");
  const experienceLevel = watch("experienceLevel");

  const [newSkill, setNewSkill] = useState("");

  const generateSkills = async () => {
    try {
      if (!jobTitle || !experienceLevel) {
        toast.warning("Please fill Job Title and Experience Level first.");
        return;
      }

      const response = await aiService.generateSkills({
        jobTitle,
        experienceLevel,
      });

      setValue("skills", response.data.skills);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate skills");
    }
  };

  const skills = watch("skills") ?? [];

  const addSkill = () => {
    if (!newSkill.trim()) return;

    setValue("skills", [...skills, newSkill.trim()]);

    setNewSkill("");
  };

  const removeSkill = (index: number) => {
    setValue(
      "skills",
      skills.filter((_, i) => i !== index),
    );
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Skills</h2>

          <p className="mt-2 text-sm text-slate-400">
            Add skills manually or generate them with AI.
          </p>
        </div>

        <button
          type="button"
          onClick={generateSkills}
          className="flex items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-400 transition hover:bg-blue-500/20"
        >
          <Sparkles size={16} />
          Generate With AI
        </button>
      </div>

      <div className="mb-6 flex gap-3">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill..."
          className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
        />

        <button
          type="button"
          onClick={addSkill}
          className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
        >
          Add Skill
        </button>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
        {skills.filter((skill) => skill.trim()).length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {skills
              .filter((skill) => skill.trim())
              .map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-sm text-blue-300"
                >
                  <span>{skill}</span>

                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="text-red-400 transition hover:text-red-300"
                  >
                    ✕
                  </button>
                </div>
              ))}
          </div>
        ) : (
          <div className="py-6 text-center">
            <p className="text-slate-400">No skills added yet.</p>

            <p className="mt-1 text-xs text-slate-500">
              Add skills manually or generate them with AI.
            </p>
          </div>
        )}
      </div>

      {errors.skills && (
        <p className="mt-3 text-sm text-red-400">Invalid skills data</p>
      )}
    </section>
  );
}
