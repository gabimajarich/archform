export default function LandingPage({ onEnter }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      {/* Wordmark */}
      <p className="text-xs uppercase tracking-wide2 text-stone mb-6 animate-rise" style={{ animationDelay: "0ms" }}>
        ARCHFORM
      </p>

      {/* Headline */}
      <h1
        className="font-display font-light text-ink tracking-tightish leading-tight animate-rise"
        style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", animationDelay: "80ms" }}
      >
        Translate intention<br />into architecture.
      </h1>

      {/* Descriptor */}
      <p
        className="mt-6 max-w-md text-base leading-relaxed text-ink/60 animate-rise"
        style={{ animationDelay: "160ms" }}
      >
        Tell us how people should <em>feel</em> in your building.
        ARCHFORM turns abstract emotions and priorities into spatial
        strategies, material palettes, and precedent references — instantly,
        with no AI guesswork.
      </p>

      {/* CTA */}
      <div className="mt-10 animate-rise" style={{ animationDelay: "240ms" }}>
        <button
          type="button"
          onClick={onEnter}
          className="inline-flex items-center gap-3 rounded-full border border-umber bg-umber px-8 py-4 text-sm text-paper transition duration-300 ease-soft hover:bg-ink"
        >
          Begin your design
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Ambient footnote */}
      <p className="mt-16 text-[11px] uppercase tracking-wide2 text-stone/40 animate-rise" style={{ animationDelay: "320ms" }}>
        Deterministic · Local · No data collected
      </p>
    </div>
  );
}
