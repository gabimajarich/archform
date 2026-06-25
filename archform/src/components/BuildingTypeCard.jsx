export default function BuildingTypeCard({ type, selected, onSelect }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(type.id)}
      className={[
        "rounded-2xl border px-4 py-4 text-left transition duration-300 ease-soft",
        "outline-none focus-visible:ring-2 focus-visible:ring-umber focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        selected
          ? "border-umber bg-paper ring-1 ring-umber shadow-card"
          : "border-sand bg-surface shadow-card hover:-translate-y-0.5 hover:shadow-lift",
      ].join(" ")}
    >
      <span
        className={[
          "block text-sm md:text-base",
          selected ? "text-umber" : "text-ink/90",
        ].join(" ")}
      >
        {type.label}
      </span>
    </button>
  );
}
