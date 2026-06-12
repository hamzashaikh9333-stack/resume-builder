"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ResumeForm from "@/components/resume/ResumeForm";
import { resumeService } from "@/services/resume.service";
import { Resume } from "@/interfaces/resume.interface";

export default function EditResumePage() {
  const params = useParams();

  const [resume, setResume] = useState<Resume | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await resumeService.getResume(
          params.resumeId as string,
        );

        setResume(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [params.resumeId]);

  if (loading) {
    return <div className="p-10 text-white">Loading...</div>;
  }

  if (!resume) {
    return <div className="p-10 text-white">Resume not found</div>;
  }

  return (
    <main className="p-6">
      <ResumeForm mode="edit" initialData={resume} />
    </main>
  );
}
