"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { ResumeFormData } from "@/schemas/resume.schema";

export default function CertificationsSection() {
  const { watch, setValue } = useFormContext<ResumeFormData>();

  const certifications = watch("certifications") ?? [];

  const [newCertification, setNewCertification] = useState("");

  const addCertification = () => {
    if (!newCertification.trim()) return;

    setValue("certifications", [...certifications, newCertification.trim()]);

    setNewCertification("");
  };

  const removeCertification = (index: number) => {
    setValue(
      "certifications",
      certifications.filter((_, i) => i !== index),
    );
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Certifications</h2>

        <p className="mt-2 text-sm text-slate-400">
          Add your certifications and professional credentials.
        </p>
      </div>

      <div className="mb-6 flex gap-3">
        <input
          type="text"
          value={newCertification}
          onChange={(e) => setNewCertification(e.target.value)}
          placeholder="AWS Certified Developer"
          className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
        />

        <button
          type="button"
          onClick={addCertification}
          className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
        >
          Add
        </button>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
        {certifications.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {certifications.map((certification, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-lg border border-purple-500/20 bg-purple-500/10 px-3 py-2 text-sm text-purple-300"
              >
                <span>{certification}</span>

                <button
                  type="button"
                  onClick={() => removeCertification(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center">
            <p className="text-slate-400">No certifications added yet.</p>

            <p className="mt-1 text-xs text-slate-500">
              Add certifications to strengthen your resume.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
