// Explainability line — shows which inputs drove a recommendation.
// Renders nothing when there are no drivers.
export default function Because({ drivers, label = "Because" }) {
  if (!drivers || drivers.length === 0) return null;
  return (
    <p className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] leading-tight text-stone">
      <span className="uppercase tracking-wide2 text-clay">{label}</span>
      {drivers.map((d, i) => (
        <span key={i} className="inline-flex items-center gap-1.5">
          <span className="rounded-full border border-sand bg-paper px-2 py-0.5 text-ink/70">{d}</span>
        </span>
      ))}
    </p>
  );
}
