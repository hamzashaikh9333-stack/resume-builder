import { FileText, Sparkles, CheckCircle } from "lucide-react";

export default function AuthSidePanel() {
  return (
    <div className="hidden lg:flex flex-col justify-center px-16 text-white">
      <div className="max-w-lg">
        <div className="flex items-center gap-3">
          <FileText className="h-10 w-10 text-blue-500" />

          <h1 className="text-4xl font-bold">
            AI Resume Builder
          </h1>
        </div>

        <p className="mt-6 text-lg text-slate-300">
          Build ATS-friendly resumes, generate
          professional summaries, skills, and work
          experience with AI.
        </p>

        <div className="mt-10 space-y-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-500" />
            <span>ATS Optimized Resume</span>
          </div>

          <div className="flex items-center gap-3">
            <Sparkles className="text-yellow-500" />
            <span>AI Generated Content</span>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-500" />
            <span>Professional Templates</span>
          </div>
        </div>
      </div>
    </div>
  );
}