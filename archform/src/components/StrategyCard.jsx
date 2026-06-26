import { useState } from "react";
import Because from "./Because.jsx";

const CATEGORY_KICKER = {
  "Circulation":          "MOVEMENT",
  "Threshold":            "THRESHOLD",
  "Light":                "LIGHT",
  "Massing":              "FORM",
  "Social":               "SOCIAL",
  "Landscape":            "LANDSCAPE",
  "Structure & Flexibility": "STRUCTURE",
  "Sensory & Material":   "MATERIAL",
};

export default function StrategyCard({ strategy, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="animate-rise rounded-2xl border border-sand bg-surface shadow-card transition duration-300 ease-soft hover:shadow-lift print:break-inside-avoid"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-5 py-5 flex items-start justify-between gap-3 group"
        aria-expanded={open}
      >
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-wide2 text-clay mb-1">
            {CATEGORY_KICKER[strategy.category] ?? strategy.category}
          </p>
          <h4 className="text-sm md:text-base font-medium text-ink leading-snug">
            {strategy.title}
          </h4>
          <p className="mt-1.5 text-sm text-ink/60 leading-relaxed">
            {strategy.summary}
          </p>
          <Because drivers={strategy.because} />
        </div>
        {/* Expand chevron */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`flex-shrink-0 mt-1 text-stone transition-transform duration-300 ease-soft ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Expanded detail */}
      {open && (
        <div className="border-t border-sand px-5 py-5 space-y-4 text-sm text-ink/75 leading-relaxed">
          {strategy.what && (
            <div>
              <p className="text-[10px] uppercase tracking-wide2 text-stone mb-1">What it is</p>
              <p>{strategy.what}</p>
            </div>
          )}
          {strategy.why && (
            <div>
              <p className="text-[10px] uppercase tracking-wide2 text-stone mb-1">Why it works</p>
              <p>{strategy.why}</p>
            </div>
          )}
          {strategy.howToApply && (
            <div>
              <p className="text-[10px] uppercase tracking-wide2 text-stone mb-1">How to apply</p>
              <p>{strategy.howToApply}</p>
            </div>
          )}
          {strategy.tradeoffs && (
            <div>
              <p className="text-[10px] uppercase tracking-wide2 text-stone mb-1">Trade-offs</p>
              <p className="text-warn/90">{strategy.tradeoffs}</p>
            </div>
          )}
          {strategy.worksWith?.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-wide2 text-stone mb-1.5">Works with</p>
              <div className="flex flex-wrap gap-1.5">
                {strategy.worksWith.map((id) => (
                  <span
                    key={id}
                    className="rounded-full border border-sand bg-paper px-2 py-0.5 text-[11px] text-ink/60"
                  >
                    {id.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
