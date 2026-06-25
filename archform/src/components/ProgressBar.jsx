const STEPS = ["Step 1", "Step 2", "Step 3", "Results"];
const SUBTITLES = ["Emotion", "Priorities", "Project", "Design"];

export default function ProgressBar({ step }) {
  return (
    <div className="w-full border-b border-sand/70 bg-paper/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex items-center gap-3 md:gap-6 py-4">
          <span className="font-display text-lg text-umber tracking-tightish pr-2 md:pr-6">
            ARCHFORM
          </span>
          <ol className="flex items-center gap-2 md:gap-4 flex-1">
            {STEPS.map((label, i) => {
              const active = i === step;
              const done = i < step;
              return (
                <li key={label} className="flex items-center gap-2 md:gap-4 min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={[
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs transition duration-300 ease-soft",
                        active
                          ? "border-umber bg-umber text-paper"
                          : done
                            ? "border-umber/40 bg-paper text-umber"
                            : "border-sand bg-paper text-stone",
                      ].join(" ")}
                    >
                      {done ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </span>
                    <span
                      className={[
                        "hidden sm:block text-xs uppercase tracking-wide2 truncate transition-colors",
                        active ? "text-umber" : "text-stone",
                      ].join(" ")}
                    >
                      {SUBTITLES[i]}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <span
                      className={[
                        "h-px w-4 md:w-10 transition-colors duration-300",
                        i < step ? "bg-umber/40" : "bg-sand",
                      ].join(" ")}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
