"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Resume } from "@/interfaces/resume.interface";
import { resumeService } from "@/services/resume.service";

import PdfResumeTemplate from "@/components/resume/PdfResumeTemplate";
import { useRef } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function PreviewResumePage() {
  const params = useParams();

  const [resume, setResume] = useState<Resume | null>(null);

  const resumeRef = useRef<HTMLDivElement>(null);

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

  return (
    <main className="min-h-screen bg-slate-800 p-12">
      <div className="mb-6 flex justify-center">
        <button
          onClick={handleDownloadPdf}
          className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>

      <PdfResumeTemplate ref={resumeRef} resume={resume} />
    </main>
  );
}
