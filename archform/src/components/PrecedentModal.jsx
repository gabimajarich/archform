import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PrecedentPortrait from "./PrecedentPortrait.jsx";
import { getPrecedentDetail } from "../data/precedentDetails.js";
import { useWikiImage } from "../data/wikiImage.js";

export default function PrecedentModal({ precedent, onClose }) {
  const [imgFailed, setImgFailed] = useState(false);
  const photo = useWikiImage(precedent ? getPrecedentDetail(precedent).wiki : null);

  // Close on Escape; lock body scroll while open
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  if (!precedent) return null;
  const detail = getPrecedentDetail(precedent);
  const showPhoto = photo && !imgFailed;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={precedent.name}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-[archform-fade_250ms_ease]"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-sand bg-paper shadow-lift animate-rise no-scrollbar">
        {/* Image */}
        <div className="relative h-56 w-full overflow-hidden bg-surface sm:h-64">
          {showPhoto ? (
            <img
              src={photo}
              alt={precedent.name}
              onError={() => setImgFailed(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <PrecedentPortrait precedent={precedent} className="h-full w-full" />
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 text-ink shadow-card backdrop-blur-sm transition hover:bg-paper"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 md:p-8">
          {/* Title block */}
          <h3 className="font-display text-2xl md:text-3xl font-light text-ink tracking-tightish leading-tight">
            {precedent.name}
          </h3>
          <p className="mt-1 text-xs uppercase tracking-wide2 text-stone">
            {precedent.architect}
            {detail.year ? ` · ${detail.year}` : ""}
            {detail.location ? ` · ${detail.location}` : ""}
          </p>

          <p className="mt-5 text-base leading-relaxed text-ink/80">{precedent.reason}</p>

          {/* Material palette */}
          {detail.materials?.length > 0 && (
            <section className="mt-7">
              <h4 className="text-[11px] uppercase tracking-wide2 text-umber">Material palette</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {detail.materials.map((m) => (
                  <span key={m} className="rounded-full border border-sand bg-surface px-3 py-1 text-xs text-ink/75">
                    {m}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Lessons */}
          {detail.lessons?.length > 0 && (
            <section className="mt-7">
              <h4 className="text-[11px] uppercase tracking-wide2 text-umber">What to learn from it</h4>
              <ul className="mt-3 space-y-3">
                {detail.lessons.map((l) => (
                  <li key={l.topic} className="rounded-xl border border-sand bg-surface p-4">
                    <p className="text-[11px] uppercase tracking-wide2 text-clay">{l.topic}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink/80">{l.text}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Influences */}
          {detail.influences && (
            <section className="mt-7">
              <h4 className="text-[11px] uppercase tracking-wide2 text-umber">Influencing ideas</h4>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">{detail.influences}</p>
            </section>
          )}

          {/* Link */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={detail.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-umber bg-umber px-6 py-3 text-sm text-paper transition duration-300 ease-soft hover:bg-ink"
            >
              Search this project
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
            <p className="text-xs text-stone">Opens Google results for this project in a new tab.</p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
