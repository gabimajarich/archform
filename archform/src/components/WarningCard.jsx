export default function WarningCard({ warning }) {
  return (
    <div className="rounded-2xl border border-warn/30 bg-warnbg p-6 shadow-card print:break-inside-avoid">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-warn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </span>
        <div className="min-w-0">
          <h4 className="text-base text-umber">{warning.title}</h4>
          {warning.drivers?.length > 0 && (
            <p className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-stone">
              <span className="uppercase tracking-wide2 text-warn">Triggered by</span>
              {warning.drivers.map((d, i) => (
                <span key={i} className="rounded-full border border-warn/30 bg-paper/60 px-2 py-0.5 text-ink/70">{d}</span>
              ))}
            </p>
          )}
          <p className="mt-2 text-sm leading-relaxed text-ink/80">{warning.body}</p>
          {warning.alternatives?.length > 0 && (
            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide2 text-stone">
                Suggested alternatives
              </p>
              <ul className="mt-2 space-y-1.5">
                {warning.alternatives.map((alt, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink/80">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-warn" />
                    <span>{alt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
