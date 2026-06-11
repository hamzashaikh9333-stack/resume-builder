import Link from "next/link";
import {
  FileText,
  PlusCircle,
  Sparkles,
  LogOut,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold">
            AI Resume Builder
          </h1>

          <button className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/5 transition">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Welcome Section */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <h2 className="text-4xl font-bold">
            Welcome Back 👋
          </h2>

          <p className="mt-3 text-slate-400">
            Create professional ATS-friendly resumes
            using AI-powered tools.
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

            <h3 className="text-3xl font-bold">0</h3>

            <p className="mt-2 text-slate-400">
              Total Resumes
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <Sparkles className="mb-4 text-yellow-500" />

            <h3 className="text-3xl font-bold">0</h3>

            <p className="mt-2 text-slate-400">
              AI Optimizations
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <FileText className="mb-4 text-green-500" />

            <h3 className="text-3xl font-bold">0</h3>

            <p className="mt-2 text-slate-400">
              ATS Checks
            </p>
          </div>
        </section>

        {/* Recent Resumes */}
        <section className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Recent Resumes
            </h2>

            <Link
              href="/resume/create"
              className="text-blue-400 hover:text-blue-300"
            >
              Create Resume →
            </Link>
          </div>

          <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-16 text-center backdrop-blur-xl">
            <FileText
              size={50}
              className="mx-auto text-slate-500"
            />

            <h3 className="mt-4 text-xl font-semibold">
              No resumes yet
            </h3>

            <p className="mt-2 text-slate-400">
              Create your first resume and start
              building your professional profile.
            </p>

            <Link
              href="/resume/create"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-medium hover:bg-blue-700"
            >
              Create Resume
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}