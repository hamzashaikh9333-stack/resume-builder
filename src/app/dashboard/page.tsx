"use client";

import { useEffect, useState } from "react";
import { resumeService } from "@/services/resume.service";
import { Resume } from "@/interfaces/resume.interface";

import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";

import Link from "next/link";
import { FileText, PlusCircle, Sparkles, LogOut } from "lucide-react";

export default function DashboardPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService.logout();

      toast.success("Logged out successfully");

      router.push("/auth/login");
    } catch (error) {
      console.error(error);

      toast.error("Failed to logout");
    }
  };

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await resumeService.getResumes();

        setResumes(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold">AI Resume Builder</h1>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm transition hover:bg-white/5"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Welcome Section */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <h2 className="text-4xl font-bold">Welcome Back 👋</h2>

          <p className="mt-3 text-slate-400">
            Create professional ATS-friendly resumes using AI-powered tools.
          </p>

          <Link
            href="/resume/create"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium transition hover:bg-blue-700"
          >
            <PlusCircle size={20} />
            Create New Resume
          </Link>
        </div>

        {/* Stats */}
        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <FileText className="mb-4 text-blue-500" />

            <h3 className="text-3xl font-bold">{resumes.length}</h3>

            <p className="mt-2 text-slate-400">Total Resumes</p>
          </div>
        </section>

        {/* Recent Resumes */}
        <section className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Resumes</h2>

            <Link
              href="/resume/create"
              className="text-blue-400 hover:text-blue-300"
            >
              Create Resume →
            </Link>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
              Loading resumes...
            </div>
          ) : resumes.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-16 text-center backdrop-blur-xl">
              <FileText size={50} className="mx-auto text-slate-500" />

              <h3 className="mt-4 text-xl font-semibold">No resumes yet</h3>

              <p className="mt-2 text-slate-400">Create your first resume.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {resumes.map((resume) => (
                <Link
                  key={resume._id}
                  href={`/resume/${resume._id}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-blue-500"
                >
                  <h3 className="text-xl font-semibold">{resume.title}</h3>

                  <p className="mt-2 text-slate-400">
                    {resume.personalInfo.fullname}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Updated {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
