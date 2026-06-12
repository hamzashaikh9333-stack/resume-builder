"use client";

import { useFormContext } from "react-hook-form";
import { ResumeFormData } from "@/schemas/resume.schema";

export default function CertificationsSection() {
  const { watch, setValue } =
    useFormContext<ResumeFormData>();

  const certifications =
    watch("certifications") ?? [];

  const addCertification = () => {
    const cert = prompt(
      "Enter certification"
    );

    if (!cert) return;

    setValue(
      "certifications",
      [...certifications, cert]
    );
  };

  const removeCertification = (
    index: number
  ) => {
    setValue(
      "certifications",
      certifications.filter(
        (_, i) => i !== index
      )
    );
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Certifications
        </h2>

        <button
          type="button"
          onClick={addCertification}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add Certification
        </button>
      </div>

      {certifications.length === 0 && (
        <p className="text-slate-400">
          No certifications added yet.
        </p>
      )}

      <div className="space-y-3">
        {certifications.map(
          (certification, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900 p-3"
            >
              <span className="text-white">
                {certification}
              </span>

              <button
                type="button"
                onClick={() =>
                  removeCertification(index)
                }
                className="rounded-lg bg-red-600 px-3 py-1 text-white hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          )
        )}
      </div>
    </section>
  );
}