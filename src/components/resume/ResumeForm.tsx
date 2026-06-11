"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resumeSchema } from "@/schemas/resume.schema";
import type { ResumeFormData } from "@/schemas/resume.schema";;
import { resumeService } from "@/services/resume.service";

import PersonalInfoForm from "./PersonalInfoForm";
import SummarySection from "./SummarySection";
import SkillsSection from "./SkillsSection";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";

export default function ResumeForm() {
  const methods = useForm<ResumeFormData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      title: "My Resume",

      personalInfo: {
        fullname: "",
        email: "",
        mobile: "",
        address: "",
        linkedin: "",
        github: "",
        portfolio: "",
      },

      summary: "",

      skills: [],

      certifications: [],

      workExperience: [],

      projects: [],

      yearOfExperience: 0,

      education: [],
    },
  });

  const onSubmit = async (data: ResumeFormData) => {
    try {
      const response =
        await resumeService.createResume(data);

      console.log(response);

      alert("Resume Created Successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <PersonalInfoForm />

        <SummarySection />

        <SkillsSection />

        <ExperienceSection />

        <ProjectsSection />

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Save Resume
        </button>
      </form>
    </FormProvider>
  );
}