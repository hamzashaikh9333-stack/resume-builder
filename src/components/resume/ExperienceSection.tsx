"use client";

import { Sparkles } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { aiService } from "@/services/ai.service";
import { ResumeFormData } from "@/schemas/resume.schema";
import { useState } from "react";

export default function ExperienceSection() {
  const { watch, setValue } = useFormContext<ResumeFormData>();

  const jobTitle = watch("jobTitle");
  const experienceLevel = watch("experienceLevel");
  const yearOfExperience = watch("yearOfExperience") ?? 0;
  const skills = watch("skills");

  const [newExperience, setNewExperience] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const generateExperience = async () => {
    try {
      if (!jobTitle || !experienceLevel || !yearOfExperience) {
        toast.warning(
          "Please fill Job Title, Experience Level and Years of Experience.",
        );
        return;
      }

      const response = await aiService.generateExperience({
        jobRole: jobTitle,
        experienceLevel,
        yearOfExperience: Number(yearOfExperience),
        techStack: skills ?? [],
      });

      console.log("EXPERIENCE RESPONSE", response.data.experience);

      const formattedExperience = response.data.experience.map((exp) => ({
        ...exp,
        description: Array.isArray(exp.description)
          ? exp.description.join(" ")
          : exp.description,
      }));

      setValue("workExperience", formattedExperience);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate experience");
    }
  };

  const addExperience = () => {
    if (
      !newExperience.company ||
      !newExperience.position ||
      !newExperience.description
    ) {
      toast.warning("Please fill required fields");
      return;
    }

    setValue("workExperience", [...experiences, newExperience]);

    setNewExperience({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const removeExperience = (index: number) => {
    setValue(
      "workExperience",
      experiences.filter((_, i) => i !== index),
    );
  };

  const experiences = watch("workExperience") ?? [];

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Work Experience</h2>

          <p className="mt-2 text-sm text-slate-400">
            Add experience manually or generate it with AI.
          </p>
        </div>

        <button
          type="button"
          onClick={generateExperience}
          className="flex items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-400 hover:bg-blue-500/20"
        >
          <Sparkles size={16} />
          Generate With AI
        </button>
      </div>

      <div className="mb-6 grid gap-3">
        <input
          type="text"
          placeholder="Company"
          value={newExperience.company}
          onChange={(e) =>
            setNewExperience({
              ...newExperience,
              company: e.target.value,
            })
          }
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
        />

        <input
          type="text"
          placeholder="Position"
          value={newExperience.position}
          onChange={(e) =>
            setNewExperience({
              ...newExperience,
              position: e.target.value,
            })
          }
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Start Date"
            value={newExperience.startDate}
            onChange={(e) =>
              setNewExperience({
                ...newExperience,
                startDate: e.target.value,
              })
            }
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
          />

          <input
            type="text"
            placeholder="End Date"
            value={newExperience.endDate}
            onChange={(e) =>
              setNewExperience({
                ...newExperience,
                endDate: e.target.value,
              })
            }
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
          />
        </div>

        <textarea
          rows={4}
          placeholder="Describe your responsibilities and achievements..."
          value={newExperience.description}
          onChange={(e) =>
            setNewExperience({
              ...newExperience,
              description: e.target.value,
            })
          }
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
        />

        <button
          type="button"
          onClick={addExperience}
          className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
        >
          Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {experiences.length > 0 ? (
          experiences.map((experience, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-700 bg-slate-900 p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white">
                    {experience.position}
                  </h3>

                  <p className="text-blue-400">{experience.company}</p>

                  <p className="mt-1 text-sm text-slate-400">
                    {experience.startDate} -{experience.endDate}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  ✕
                </button>
              </div>

              <p className="mt-3 text-slate-300">{experience.description}</p>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 text-center">
            <p className="text-slate-400">No experience added yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
