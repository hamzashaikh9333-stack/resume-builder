"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import ResumeDetails from "@/components/resume/ResumeDetails";
import { resumeService } from "@/services/resume.service";
import { Resume } from "@/interfaces/resume.interface";

import { aiService } from "@/services/ai.service";
import AtsScoreCard from "@/components/resume/AtsScoreCard";
import { AtsScoreResponse } from "@/interfaces/ai.interface";
import { buildResumeText } from "@/lib/buildResumeText";
import ImproveContentCard from "@/components/resume/ImproveContentCard";
import PdfResumeTemplate from "@/components/resume/PdfResumeTemplate";

export default function CheckResumePage() {
  const params = useParams();
  const router = useRouter();

  const [resume, setResume] = useState<Resume | null>(null);

  const [loading, setLoading] = useState(true);

  const [atsScore, setAtsScore] = useState<AtsScoreResponse | null>(null);

  const [atsLoading, setAtsLoading] = useState(false);

  const [improvedContent, setImprovedContent] = useState("");

  const [improveLoading, setImproveLoading] = useState(false);

  const resumeRef = useRef<HTMLDivElement>(null);

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

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this resume?")) {
      return;
    }

    try {
      await resumeService.deleteResume(params.resumeId as string);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAtsScore = async () => {
    if (!resume) return;

    try {
      setAtsLoading(true);

      const resumeText = buildResumeText(resume);

      const response = await aiService.atsScore({
        resumeText,
      });

      setAtsScore(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setAtsLoading(false);
    }
  };

  const handleImproveSummary = async () => {
    console.log("clicked");
    console.log("summary:", resume?.summary);
    if (!resume?.summary) return;

    try {
      setImproveLoading(true);

      const response = await aiService.improveContent({
        content: resume.summary,
      });

      setImprovedContent(response.data.content);
    } catch (error) {
      console.error(error);
    } finally {
      setImproveLoading(false);
    }
  };

  const handleAcceptImprovement = async () => {
    if (!resume) return;

    try {
      const updatedResume = {
        ...resume,
        summary: improvedContent,
      };

      await resumeService.updateResume(resume._id, updatedResume);

      setResume(updatedResume);

      setImprovedContent("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadPdf = async () => {
    if (!resume) return;

    if (!resumeRef.current) return;

    const canvas = await html2canvas(resumeRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
    });

    const imageData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imageData, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save(`${resume.personalInfo.fullname}-resume.pdf`);
  };

  if (loading) {
    return <div className="p-10 text-white">Loading...</div>;
  }

  if (!resume) {
    return <div className="p-10 text-white">Resume not found</div>;
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
        <button
          onClick={handleAtsScore}
          disabled={atsLoading}
          className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
        >
          {atsLoading ? "Analyzing..." : "Check ATS Score"}
        </button>
        <button
          onClick={handleImproveSummary}
          disabled={improveLoading}
          className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
        >
          {improveLoading ? "Improving..." : "Improve Summary"}
        </button>
        <button
          onClick={handleDownloadPdf}
          className="rounded-lg bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700"
        >
          Download PDF
        </button>
        <Link
          href={`/resume/${resume._id}/preview`}
          className="rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700"
        >
          Preview PDF
        </Link>
      </div>

      <ResumeDetails resume={resume} />

      <div className="fixed -left-[9999px] top-0">
        <PdfResumeTemplate ref={resumeRef} resume={resume} />
      </div>
      {atsScore && (
        <div className="mt-6">
          <AtsScoreCard
            score={atsScore.score}
            rating={atsScore.rating}
            summary={atsScore.summary}
            strengths={atsScore.strengths}
            weaknesses={atsScore.weaknesses}
            suggestions={atsScore.suggestions}
          />
        </div>
      )}
      {improvedContent && (
        <ImproveContentCard
          originalContent={resume.summary}
          improvedContent={improvedContent}
          onAccept={handleAcceptImprovement}
        />
      )}
    </main>
  );
}
