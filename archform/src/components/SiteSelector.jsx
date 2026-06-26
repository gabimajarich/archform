import {
  Coastal, UrbanDense, Suburban, Bushland, Arid,
  Tropical, Temperate, Mountainous, Waterfront, Rural,
} from "./illustrations/siteIllustrations.jsx";

const ILLUSTRATIONS = {
  coastal:     Coastal,
  urbanDense:  UrbanDense,
  suburban:    Suburban,
  bushland:    Bushland,
  arid:        Arid,
  tropical:    Tropical,
  temperate:   Temperate,
  mountainous: Mountainous,
  waterfront:  Waterfront,
  rural:       Rural,
};

export default function SiteSelector({ sites, value, onChange }) {
  return (
    <div
      role="radiogroup"
      aria-label="Site context"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
    >
      {sites.map((site) => {
        const selected = value === site.id;
        const Illustration = ILLUSTRATIONS[site.id];

        return (
          <button
            key={site.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(site.id)}
            className={[
              "flip group relative aspect-square w-full rounded-2xl outline-none",
              "transition duration-300 ease-soft",
              "focus-visible:ring-2 focus-visible:ring-umber focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
              selected ? "is-selected" : "cursor-pointer hover:-translate-y-0.5",
            ].join(" ")}
          >
            <div className="flip-inner h-full w-full">
              {/* Front — label only */}
              <div className="flip-face flip-front rounded-2xl border border-sand bg-surface shadow-card transition-shadow duration-300 ease-soft group-hover:shadow-lift">
                <span className="font-display text-base md:text-lg font-light text-ink tracking-tightish text-center px-2">
                  {site.label}
                </span>
              </div>

              {/* Back — illustration + label */}
              <div className="flip-face flip-back rounded-2xl border border-umber bg-paper shadow-card">
                <span className="text-stone">
                  {Illustration && <Illustration />}
                </span>
                <span className="mt-2 text-xs uppercase tracking-wide2 text-umber">
                  {site.label}
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
      })}
    </div>
  );
}
