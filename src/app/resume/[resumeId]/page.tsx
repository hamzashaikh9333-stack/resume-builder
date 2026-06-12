"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import ResumeDetails from "@/components/resume/ResumeDetails";
import { resumeService } from "@/services/resume.service";
import { Resume } from "@/interfaces/resume.interface";

export default function CheckResumePage() {
  const params = useParams();
  const router = useRouter();

  const [resume, setResume] =
    useState<Resume | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response =
          await resumeService.getResume(
            params.resumeId as string
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

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this resume?"
      )
    ) {
      return;
    }

    try {
      await resumeService.deleteResume(
        params.resumeId as string
      );

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-white">
        Loading...
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="p-10 text-white">
        Resume not found
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="mb-6 flex gap-3">
        <Link
          href={`/resume/${resume._id}/edit`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Edit Resume
        </Link>

        <button
          onClick={handleDelete}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Delete Resume
        </button>
      </div>

      <ResumeDetails resume={resume} />
    </main>
  );
}