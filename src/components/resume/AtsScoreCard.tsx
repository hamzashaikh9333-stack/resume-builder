import { AtsScoreResponse } from "@/interfaces/ai.interface";

export default function AtsScoreCard({
  score,
  rating,
  summary,
  strengths,
  weaknesses,
  suggestions,
}: AtsScoreResponse) {
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <h2 className="mb-6 text-2xl font-bold text-white">ATS Analysis</h2>

      {/* Score */}
      <div className="mb-8 flex items-center gap-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-green-500">
          <span className="text-3xl font-bold text-white">{score}</span>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white">{rating}</h3>

          <p className="text-slate-400">ATS Compatibility Score</p>
        </div>
      </div>

      {/* Summary */}
      <section className="mb-8">
        <h3 className="mb-2 text-lg font-semibold text-white">Summary</h3>

        <p className="text-slate-300">{summary}</p>
      </section>

      {/* Strengths */}
      <section className="mb-8">
        <h3 className="mb-3 text-lg font-semibold text-green-400">Strengths</h3>

        <ul className="space-y-2">
          {strengths.map((strength, index) => (
            <li
              key={index}
              className="rounded-lg bg-green-500/10 p-3 text-slate-300"
            >
              ✓ {strength}
            </li>
          ))}
        </ul>
      </section>

      {/* Weaknesses */}
      <section className="mb-8">
        <h3 className="mb-3 text-lg font-semibold text-red-400">Weaknesses</h3>

        <ul className="space-y-2">
          {weaknesses.map((weakness, index) => (
            <li
              key={index}
              className="rounded-lg bg-red-500/10 p-3 text-slate-300"
            >
              ✗ {weakness}
            </li>
          ))}
        </ul>
      </section>

      {/* Suggestions */}
      <section>
        <h3 className="mb-3 text-lg font-semibold text-blue-400">
          Suggestions
        </h3>

        <ul className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="rounded-lg bg-blue-500/10 p-3 text-slate-300"
            >
              • {suggestion}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
