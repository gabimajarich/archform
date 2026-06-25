import Because from "./Because.jsx";

// Earthy tone per material family (all within the warm-neutral palette).
const FAMILY_TONE = {
  timber: "#EFE7D6", earth: "#E2D4BE", masonry: "#DDC9AE", stone: "#D9D2C6",
  concrete: "#E5E2DB", metal: "#DEDAD2", panel: "#E9E2D4", biogenic: "#E7DFC9",
};

// A minimal line "texture" per family, drawn inside a 200×64 swatch.
function Texture({ family }) {
  const L = "#8B8275";
  switch (family) {
    case "timber": // grain lines + a knot
      return (
        <g stroke={L} strokeWidth="1" fill="none" opacity="0.7">
          {[12, 22, 32, 42, 52].map((y, i) => (
            <path key={y} d={`M0 ${y} q 50 ${i % 2 ? -5 : 5} 100 0 t 100 0`} />
          ))}
          <ellipse cx="150" cy="32" rx="6" ry="9" />
        </g>
      );
    case "earth": // rammed strata
      return (
        <g stroke={L} strokeWidth="1" opacity="0.6">
          {[10, 19, 28, 37, 46, 55].map((y) => <line key={y} x1="0" y1={y} x2="200" y2={y} />)}
        </g>
      );
    case "masonry": { // running-bond brick coursing
      const rows = [10, 22, 34, 46, 58];
      return (
        <g stroke={L} strokeWidth="1" opacity="0.6">
          {rows.map((y) => <line key={y} x1="0" y1={y} x2="200" y2={y} />)}
          {rows.map((y, r) =>
            Array.from({ length: 6 }, (_, i) => (
              <line key={`${y}-${i}`} x1={i * 40 + (r % 2 ? 20 : 0)} y1={y - 12} x2={i * 40 + (r % 2 ? 20 : 0)} y2={y} />
            ))
          )}
        </g>
      );
    }
    case "stone": // irregular ashlar
      return (
        <g stroke={L} strokeWidth="1" fill="none" opacity="0.6">
          <path d="M0 24 H64 V0 M64 24 V64 M64 40 H128 M128 12 V40 M128 40 V64 M128 28 H200 M150 28 V0" />
        </g>
      );
    case "concrete": // stipple + form ties
      return (
        <g fill={L} opacity="0.5" stroke="none">
          {Array.from({ length: 28 }, (_, i) => (
            <circle key={i} cx={(i * 53) % 196 + 4} cy={((i * 37) % 56) + 5} r="0.8" />
          ))}
          <circle cx="50" cy="20" r="2.2" fill="none" stroke={L} />
          <circle cx="150" cy="44" r="2.2" fill="none" stroke={L} />
        </g>
      );
    case "metal": // diagonal hatch
      return (
        <g stroke={L} strokeWidth="1" opacity="0.5">
          {Array.from({ length: 12 }, (_, i) => <line key={i} x1={i * 24 - 64} y1="64" x2={i * 24} y2="0" />)}
        </g>
      );
    case "panel": // prefab grid
      return (
        <g stroke={L} strokeWidth="1" opacity="0.55" fill="none">
          {[0, 50, 100, 150, 200].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="64" />)}
          <line x1="0" y1="32" x2="200" y2="32" />
        </g>
      );
    case "biogenic": // cork specks
      return (
        <g stroke={L} strokeWidth="1" opacity="0.55">
          {Array.from({ length: 22 }, (_, i) => {
            const x = (i * 71) % 192 + 6, y = ((i * 29) % 52) + 7;
            return <line key={i} x1={x} y1={y} x2={x + 3} y2={y + 2} />;
          })}
        </g>
      );
    default:
      return null;
  }
}

function MiniBar({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-[10px] text-stone">
        <span>{label}</span>
        <span className="tabular-nums text-umber">{value}</span>
      </div>
      <div className="mt-0.5 h-1 w-full overflow-hidden rounded-full bg-sand">
        <div className="h-full rounded-full bg-umber" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function MaterialSwatchBoard({ materials, index = 0 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {materials.map((m, i) => (
        <div
          key={m.key}
          className="animate-rise overflow-hidden rounded-2xl border border-sand bg-surface shadow-card transition duration-300 ease-soft hover:-translate-y-0.5 hover:shadow-lift"
          style={{ animationDelay: `${(index + i) * 60}ms` }}
        >
          {/* swatch */}
          <div className="border-b border-sand" style={{ backgroundColor: FAMILY_TONE[m.family] || "#E9E2D4" }}>
            <svg viewBox="0 0 200 64" className="block w-full" preserveAspectRatio="xMidYMid slice" style={{ height: 72 }}>
              <Texture family={m.family} />
            </svg>
          </div>
          {/* body */}
          <div className="p-5">
            <div className="flex items-baseline justify-between gap-2">
              <h4 className="font-display text-lg font-light text-ink tracking-tightish">{m.name}</h4>
              <span className="text-[10px] uppercase tracking-wide2 text-clay">{m.family}</span>
            </div>
            {m.climateNote && (
              <p className="mt-1 text-[11px] text-moss">Site-suited — {m.climateNote}</p>
            )}
            <div className="mt-3 space-y-2">
              <MiniBar label="Sustainability" value={m.sustainability} />
              <MiniBar label="Durability" value={m.durability} />
              <MiniBar label="Cost (affordability)" value={m.cost} />
            </div>
            <Because drivers={m.because} />
          </div>
        </div>
      ))}
    </div>
  );
}
