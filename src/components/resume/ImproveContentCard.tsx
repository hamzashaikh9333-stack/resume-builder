interface ImproveContentCardProps {
  originalContent: string;
  improvedContent: string;
  onAccept: () => void;
}

export default function ImproveContentCard({
  originalContent,
  improvedContent,
  onAccept,
}: ImproveContentCardProps) {
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <h2 className="mb-6 text-2xl font-bold text-white">
        AI Content Improvement
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Original */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-red-400">
            Current Content
          </h3>

          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <p className="whitespace-pre-wrap text-slate-300">
              {originalContent}
            </p>
          </div>
        </div>

        {/* Improved */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-green-400">
            Improved Content
          </h3>

          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
            <p className="whitespace-pre-wrap text-slate-300">
              {improvedContent}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onAccept}
          className="rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
        >
          Use Improved Version
        </button>
      </div>
    </div>
  );
}
