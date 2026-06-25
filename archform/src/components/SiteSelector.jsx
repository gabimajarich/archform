export default function SiteSelector({ sites, value, onChange }) {
  return (
    <div
      role="radiogroup"
      aria-label="Site context"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
    >
      {sites.map((site) => {
        const selected = value === site.id;
        return (
          <button
            key={site.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(site.id)}
            className={[
              "rounded-2xl border px-4 py-4 text-left transition duration-300 ease-soft",
              "outline-none focus-visible:ring-2 focus-visible:ring-umber focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
              selected
                ? "border-umber bg-paper ring-1 ring-umber shadow-card"
                : "border-sand bg-surface shadow-card hover:-translate-y-0.5 hover:shadow-lift",
            ].join(" ")}
          >
            <span className={selected ? "text-sm text-umber" : "text-sm text-ink/90"}>
              {site.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
