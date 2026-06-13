"use client";

import { useFormContext } from "react-hook-form";
import { Sparkles } from "lucide-react";
import { aiService } from "@/services/ai.service";
import { ResumeFormData } from "@/schemas/resume.schema";
import { toast } from "sonner";

export default function SummarySection() {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext<ResumeFormData>();

  const handleGenerateSummary = async () => {
    try {
      const jobTitle = watch("jobTitle");
      const experienceLevel = watch("experienceLevel");
      const skills = watch("skills") ?? [];

      if (!jobTitle || !experienceLevel || skills.length === 0) {
        toast.warning("Please generate skills first.");
        return;
      }

      const response = await aiService.generateSummary({
        jobTitle,
        experienceLevel,
        skills: skills.join(", "),
      });

      setValue("summary", response.data.summary);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate summary");
    }
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Professional Summary</h2>

        <button
          type="button"
          onClick={handleGenerateSummary}
          className="flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-500/20"
        >
          <Sparkles size={16} />
          Generate with AI
        </button>
      </div>

      <textarea
        {...register("summary")}
        rows={6}
        placeholder="Write a professional summary about yourself..."
        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
      />

      {errors.summary && (
        <p className="mt-2 text-sm text-red-400">{errors.summary.message}</p>
      )}

      <p className="mt-3 text-sm text-slate-400">
        This section appears at the top of your resume and gives recruiters a
        quick overview of your profile.
      </p>
    </section>
  );
}
