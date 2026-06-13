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
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Personal Information</h2>

        <p className="mt-2 text-sm text-slate-400">
          Enter your personal details and professional background.
        </p>
      </div>

      {/* Professional Details */}
      <div className="mb-6 grid gap-5 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Job Title
          </label>

          <input
            {...register("jobTitle")}
            placeholder="Backend Developer"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Experience Level
          </label>

          <select
            {...register("experienceLevel")}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          >
            <option value="">select</option>
            <option value="Fresher">Fresher</option>
            <option value="Junior">Junior</option>
            <option value="Mid-Level">Mid-Level</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Years of Experience
          </label>

          <input
            type="number"
            {...register("yearOfExperience", {
              valueAsNumber: true,
            })}
            placeholder="2"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />
        </div>
      </div>

      {/* Personal Details */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Full Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Full Name
          </label>

          <input
            {...register("personalInfo.fullname")}
            placeholder="John Doe"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />

          {errors.personalInfo?.fullname && (
            <p className="mt-1 text-sm text-red-400">
              {errors.personalInfo.fullname.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Email
          </label>

          <input
            {...register("personalInfo.email")}
            placeholder="john@example.com"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />

          {errors.personalInfo?.email && (
            <p className="mt-1 text-sm text-red-400">
              {errors.personalInfo.email.message}
            </p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Mobile
          </label>

          <input
            {...register("personalInfo.mobile")}
            placeholder="1234567890"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />

          {errors.personalInfo?.mobile && (
            <p className="mt-1 text-sm text-red-400">
              {errors.personalInfo.mobile.message}
            </p>
          )}
        </div>

        {/* LinkedIn */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            LinkedIn
          </label>

          <input
            {...register("personalInfo.linkedin")}
            placeholder="https://linkedin"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            GitHub
          </label>

          <input
            {...register("personalInfo.github")}
            placeholder="https://github.com"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />
        </div>

        {/* Portfolio */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Portfolio
          </label>

          <input
            {...register("personalInfo.portfolio")}
            placeholder="https://yourportfolio.com"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Address
          </label>

          <input
            {...register("personalInfo.address")}
            placeholder="New Delhi, India"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />
        </div>
      </div>
    </section>
  );
}
