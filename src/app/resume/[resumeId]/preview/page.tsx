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
    try {
      if (!resume) return;

      if (!resumeRef.current) return;

      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: true,
        useCORS: true,
      });

      const imageData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();

      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imageData, "PNG", 0, 0, pdfWidth, pdfHeight);

      pdf.save(`${resume.personalInfo.fullname}-resume.pdf`);
    } catch (error) {
      console.error("PDF ERROR:", error);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#1e293b",
        padding: "3rem",
      }}
    >
      <div className="mb-6 flex justify-center">
        <button
          onClick={handleDownloadPdf}
          style={{
            background: "#16a34a",
            color: "#ffffff",
            padding: "12px 24px",
            borderRadius: "8px",
          }}
        >
          Download PDF
        </button>
      </div>

      <div className="flex justify-center">
        <div
          style={{
            background: "#ffffff",
            color: "#000000",
          }}
        >
          <PdfResumeTemplate ref={resumeRef} resume={resume} />
        </div>
      </div>
    </main>
  );
}
