import { getIllustration } from "./illustrations/index.js";

export default function EmotionCard({ emotion, selected, disabled, onToggle }) {
  const Illustration = getIllustration(emotion.id);
  const isDisabled = disabled && !selected;

  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={isDisabled}
      onClick={() => onToggle(emotion.id)}
      className={[
        "flip group relative aspect-square w-full rounded-2xl outline-none",
        "transition duration-300 ease-soft",
        "focus-visible:ring-2 focus-visible:ring-umber focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        selected ? "is-selected" : "",
        isDisabled ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:-translate-y-0.5",
      ].join(" ")}
    >
      <div className="flip-inner h-full w-full">
        {/* Front: the emotion word */}
        <div
          className={[
            "flip-face flip-front rounded-2xl border bg-surface shadow-card",
            "transition-shadow duration-300 ease-soft",
            "border-sand group-hover:shadow-lift",
          ].join(" ")}
        >
          <span className="font-display text-lg md:text-xl font-light text-ink tracking-tightish">
            {emotion.label}
          </span>
        </div>

        {/* Back: abstract architectural mark + small word */}
        <div className="flip-face flip-back rounded-2xl border border-umber bg-paper shadow-card">
          <span className="text-stone">
            <Illustration />
          </span>
          <span className="mt-2 text-xs uppercase tracking-wide2 text-umber">
            {emotion.label}
          </span>
          <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-umber text-paper">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
        </div>
      </div>
    </button>
  );
}
