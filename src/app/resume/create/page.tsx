import ResumeForm from "@/components/resume/ResumeForm";

export default function CreateResumePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl p-8">
        <h1 className="mb-8 text-4xl font-bold">
          Create Resume
        </h1>

        <ResumeForm />
      </div>
    </main>
  );
}