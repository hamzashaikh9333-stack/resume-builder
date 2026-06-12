"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Resume } from "@/interfaces/resume.interface";

import { resumeSchema } from "@/schemas/resume.schema";
import type { ResumeFormData } from "@/schemas/resume.schema";
import { resumeService } from "@/services/resume.service";

import PersonalInfoForm from "./PersonalInfoForm";
import SummarySection from "./SummarySection";
import SkillsSection from "./SkillsSection";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";
import ResumePreview from "./ResumePreview";
import EducationSection from "./EducationSection";
import CertificationsSection from "./CertificationsSection";
import { useRouter } from "next/navigation";

interface ResumeFormProps {
  mode?: "create" | "edit";
  initialData?: Resume;
}

export default function ResumeForm({
  mode = "create",
  initialData,
}: ResumeFormProps) {
  const methods = useForm<ResumeFormData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          yearOfExperience: 0,
        }
      : {
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
  const router = useRouter();

  const onSubmit = async (data: ResumeFormData) => {
    console.log("FORM SUBMITTED");

    try {
      if (mode === "edit" && initialData) {
        await resumeService.updateResume(initialData._id, data);

        router.push(`/resume/${initialData._id}`);

        return;
      }

      const response = await resumeService.createResume(data);

      router.push(`/resume/${response.data._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <form
            onSubmit={methods.handleSubmit(onSubmit, (errors) => {
              console.log("FORM ERRORS");
              console.log(errors);
            })}
            className="space-y-8"
          >
            <PersonalInfoForm />

            <SummarySection />

            <SkillsSection />

            <ExperienceSection />

            <ProjectsSection />

            <EducationSection />

            <CertificationsSection />

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              {mode === "edit" ? "Update Resume" : "Save Resume"}
            </button>
          </form>
        </div>

        <div>
          <ResumePreview />
        </div>
      </div>
    </FormProvider>
  );
}
