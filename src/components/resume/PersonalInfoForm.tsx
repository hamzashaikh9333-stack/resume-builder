"use client";

import { useFormContext } from "react-hook-form";
import { ResumeFormData } from "@/schemas/resume.schema";

export default function PersonalInfoForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ResumeFormData>();

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Personal Information
      </h2>
      <div>
        <label className="mb-2 block text-sm text-slate-300">Job Title</label>

        <input
          {...register("jobTitle")}
          placeholder="Frontend Developer"
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="mb-2 mt-3 block text-sm text-slate-300">
          Experience Level
        </label>
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Years of Experience
          </label>

          <input
            type="number"
            {...register("yearOfExperience", {
              valueAsNumber: true,
            })}
            placeholder="2"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
          />
        </div>
        <select
          {...register("experienceLevel")}
          className="w-full mt-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
        >
          <option value="">Select Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="Junior">Junior</option>
          <option value="Mid-Level">Mid-Level</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Full Name */}
        <div>
          <label className="mb-2 block text-sm text-slate-300">Full Name</label>

          <input
            {...register("personalInfo.fullname")}
            placeholder="John Doe"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />

          {errors.personalInfo?.fullname && (
            <p className="mt-1 text-sm text-red-400">
              {errors.personalInfo.fullname.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm text-slate-300">Email</label>

          <input
            {...register("personalInfo.email")}
            placeholder="john@example.com"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />

          {errors.personalInfo?.email && (
            <p className="mt-1 text-sm text-red-400">
              {errors.personalInfo.email.message}
            </p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <label className="mb-2 block text-sm text-slate-300">Mobile</label>

          <input
            {...register("personalInfo.mobile")}
            placeholder="9876543210"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />

          {errors.personalInfo?.mobile && (
            <p className="mt-1 text-sm text-red-400">
              {errors.personalInfo.mobile.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="mb-2 block text-sm text-slate-300">Address</label>

          <input
            {...register("personalInfo.address")}
            placeholder="New Delhi, India"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="mb-2 block text-sm text-slate-300">LinkedIn</label>

          <input
            {...register("personalInfo.linkedin")}
            placeholder="https://linkedin.com/in/yourprofile"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="mb-2 block text-sm text-slate-300">GitHub</label>

          <input
            {...register("personalInfo.github")}
            placeholder="https://github.com/yourusername"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />
        </div>

        {/* Portfolio */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-slate-300">
            Portfolio Website
          </label>

          <input
            {...register("personalInfo.portfolio")}
            placeholder="https://yourportfolio.com"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />
        </div>
      </div>
    </section>
  );
}
