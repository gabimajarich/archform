export default function SliderControl({ label, value, onChange }) {
  return (
    <div className="py-3">
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <label className="text-sm text-ink/90">
          {label}
        </label>
        <span className="font-display text-base text-umber tabular-nums">
          {value}%
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--fill": `${value}%`, width: "100%" }}
        aria-label={`${label} — ${value}%`}
      />
    </div>
  );
}
