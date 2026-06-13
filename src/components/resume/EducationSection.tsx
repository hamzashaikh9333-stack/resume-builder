"use client";

import { useFieldArray, useFormContext } from "react-hook-form";

import { ResumeFormData } from "@/schemas/resume.schema";

export default function EducationSection() {
  const { control, register } = useFormContext<ResumeFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const addEducation = () => {
    append({
      degree: "",
      institute: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Education</h2>

          <p className="mt-2 text-sm text-slate-400">
            Add your academic qualifications and institutions.
          </p>
        </div>

        <button
          type="button"
          onClick={addEducation}
          className="rounded-xl bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
        >
          Add Education
        </button>
      </div>

      {fields.length === 0 && (
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 text-center">
          <p className="text-slate-400">No education added yet.</p>

          <p className="mt-1 text-xs text-slate-500">
            Add your academic background.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-xl border border-slate-700 bg-slate-900 p-5"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <input
                {...register(`education.${index}.degree`)}
                placeholder="Bachelor of Technology"
                className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
              />

              <input
                {...register(`education.${index}.institute`)}
                placeholder="Delhi University"
                className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
              />

              <input
                {...register(`education.${index}.startDate`)}
                placeholder="2020"
                className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
              />

              <input
                {...register(`education.${index}.endDate`)}
                placeholder="2024"
                className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
              />
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              ✕ Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
