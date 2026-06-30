import { useState } from "react";
import Because from "./Because.jsx";
import PrecedentPortrait from "./PrecedentPortrait.jsx";
import { getPrecedentDetail } from "../data/precedentDetails.js";
import { useWikiImage } from "../data/wikiImage.js";

export default function PrecedentCard({ precedent, onOpen }) {
  const detail = getPrecedentDetail(precedent);
  const photo = useWikiImage(detail.wiki);
  const [imgFailed, setImgFailed] = useState(false);
  const showPhoto = photo && !imgFailed;

  return (
    <article className="snap-start shrink-0 w-72 md:w-80 print:break-inside-avoid">
      <button
        type="button"
        onClick={() => onOpen(precedent)}
        className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-sand bg-surface text-left shadow-card outline-none transition duration-300 ease-soft hover:-translate-y-0.5 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-umber focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        {/* Image header */}
        <div className="relative h-40 w-full overflow-hidden bg-paper">
          {showPhoto ? (
            <img
              src={photo}
              alt={precedent.name}
              loading="lazy"
              onError={() => setImgFailed(true)}
              className="h-full w-full object-cover transition duration-500 ease-soft group-hover:scale-[1.03]"
            />
          ) : (
            <PrecedentPortrait precedent={precedent} className="h-full w-full" />
          )}
          {detail.authored && (
            <span className="absolute left-3 top-3 rounded-full bg-paper/80 px-2 py-0.5 text-[10px] uppercase tracking-wide2 text-umber backdrop-blur-sm">
              Case study
            </span>
          )}
        </div>

        {/* Text body */}
        <div className="flex flex-1 flex-col p-6">
          <h4 className="font-display text-xl font-light text-ink tracking-tightish leading-snug">
            {precedent.name}
          </h4>
          <p className="mt-1 text-xs uppercase tracking-wide2 text-stone">
            {precedent.architect}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink/75">
            {precedent.reason}
          </p>
          <div className="mt-auto">
            <Because drivers={precedent.because} label="Matched" />
            <p className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-wide2 text-umber">
              View detail
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </p>
          </div>
        </div>
      </button>
    </article>
  );
}
