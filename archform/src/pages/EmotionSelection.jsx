import { useState, useRef } from "react";
import { EMOTIONS } from "../data/emotions.js";
import { useDesign } from "../context/DesignContext.jsx";
import EmotionCard from "../components/EmotionCard.jsx";

const MAX = 5;

export default function EmotionSelection() {
  const { state, dispatch } = useDesign();
  const [pulse, setPulse] = useState(false);
  const pulseTimer = useRef(null);

  const count = state.emotions.length;
  const atMax = count >= MAX;

  const handleToggle = (id) => {
    const selected = state.emotions.includes(id);
    if (!selected && atMax) {
      // Block the 6th — pulse the counter.
      setPulse(false);
      // force reflow so the animation restarts on rapid clicks
      window.requestAnimationFrame(() => setPulse(true));
      clearTimeout(pulseTimer.current);
      pulseTimer.current = setTimeout(() => setPulse(false), 340);
      return;
    }
    dispatch({ type: "SELECT_EMOTION", id });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-10 md:py-16">
      <p className="text-xs uppercase tracking-wide2 text-stone">Step 1 — Emotional intent</p>
      <h1 className="mt-3 font-display text-4xl md:text-5xl font-light text-ink tracking-tightish">
        How should people feel in this space?
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70">
        Select between 3 and 5 emotions that represent your design intention.
      </p>

      <div className="mt-6 flex items-center gap-3">
        <span
          className={[
            "inline-flex items-center rounded-full border border-sand bg-surface px-4 py-1.5 text-sm text-umber",
            pulse ? "animate-pulse-once" : "",
          ].join(" ")}
        >
          {count} of {MAX} selected
        </span>
        {count < 3 && (
          <span className="text-sm text-stone">Select at least {3 - count} more</span>
        )}
      </div>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
        {EMOTIONS.map((emotion) => (
          <EmotionCard
            key={emotion.id}
            emotion={emotion}
            selected={state.emotions.includes(emotion.id)}
            disabled={atMax}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}
