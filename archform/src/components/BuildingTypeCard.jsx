import {
  School, Housing, Museum, Library, CommunityCentre, Hospitality,
  Commercial, PublicSpace, Workplace, Other,
} from "./illustrations/buildingIllustrations.jsx";

const ILLUSTRATIONS = {
  school:          School,
  housing:         Housing,
  museum:          Museum,
  library:         Library,
  community:       CommunityCentre,
  hospitality:     Hospitality,
  commercial:      Commercial,
  publicSpace:     PublicSpace,
  workplace:       Workplace,
  other:           Other,
};

export default function BuildingTypeCard({ type, selected, onSelect }) {
  const Illustration = ILLUSTRATIONS[type.id] ?? Other;

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(type.id)}
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
            {type.label}
          </span>
        </div>

        {/* Back — illustration + label */}
        <div className="flip-face flip-back rounded-2xl border border-umber bg-paper shadow-card">
          <span className="text-stone">
            <Illustration />
          </span>
          <span className="mt-2 text-xs uppercase tracking-wide2 text-umber">
            {type.label}
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
