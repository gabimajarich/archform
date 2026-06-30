// Deterministic minimalist SVG "portrait" for a precedent — used as the image
// fallback when a remote photo fails or is absent. Derives a silhouette archetype
// from the precedent tags and a palette tone from the id hash. On-brand, no
// external calls, never broken.

const PALETTES = [
  ["#EBD9CD", "#C0927E"],
  ["#D8BFB0", "#9C7E6A"],
  ["#E8CFC2", "#C9A88A"],
  ["#EFE2D6", "#B89478"],
];

function hash(str = "") {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

// Pick a massing archetype from tags
function archetype(tags = []) {
  if (tags.includes("urbanDense") || tags.includes("commercial")) return "tower";
  if (tags.includes("waterfront") || tags.includes("coastal")) return "waterfront";
  if (tags.includes("mountainous")) return "peak";
  if (tags.includes("museum") || tags.includes("public")) return "civic";
  if (tags.includes("housing")) return "terrace";
  if (tags.includes("ceremony") || tags.includes("wonder")) return "vault";
  return "pavilion";
}

function Silhouette({ kind, stroke }) {
  const common = { fill: "none", stroke, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (kind) {
    case "tower":
      return (
        <g {...common}>
          <line x1="20" y1="150" x2="280" y2="150" />
          <rect x="110" y="40" width="80" height="110" />
          <line x1="110" y1="70" x2="190" y2="70" />
          <line x1="110" y1="95" x2="190" y2="95" />
          <line x1="110" y1="120" x2="190" y2="120" />
          <line x1="150" y1="40" x2="150" y2="150" />
        </g>
      );
    case "waterfront":
      return (
        <g {...common}>
          <path d="M20 120 Q70 112 110 120 Q150 128 190 120 Q230 112 280 120" />
          <line x1="90" y1="120" x2="90" y2="90" />
          <line x1="150" y1="120" x2="150" y2="90" />
          <line x1="210" y1="120" x2="210" y2="90" />
          <line x1="80" y1="90" x2="220" y2="90" />
          <rect x="110" y="62" width="80" height="28" />
          <path d="M20 138 Q80 132 150 138 Q220 144 280 138" strokeDasharray="3 7" opacity="0.5" />
        </g>
      );
    case "peak":
      return (
        <g {...common}>
          <line x1="20" y1="150" x2="280" y2="150" />
          <rect x="115" y="105" width="70" height="45" />
          <path d="M95 105 L150 50 L205 105" />
          <line x1="115" y1="125" x2="130" y2="125" />
        </g>
      );
    case "civic":
      return (
        <g {...common}>
          <line x1="20" y1="150" x2="280" y2="150" />
          <rect x="70" y="70" width="160" height="80" />
          <line x1="14" y1="70" x2="150" y2="40" />
          <line x1="286" y1="70" x2="150" y2="40" />
          <rect x="130" y="110" width="40" height="40" />
        </g>
      );
    case "terrace":
      return (
        <g {...common}>
          <line x1="20" y1="150" x2="280" y2="150" />
          <rect x="50" y="100" width="50" height="50" />
          <rect x="100" y="80" width="50" height="70" />
          <rect x="150" y="110" width="50" height="40" />
          <rect x="200" y="92" width="50" height="58" />
        </g>
      );
    case "vault":
      return (
        <g {...common}>
          <line x1="20" y1="150" x2="280" y2="150" />
          <path d="M90 150 L90 95 Q150 40 210 95 L210 150" />
          <line x1="150" y1="60" x2="150" y2="150" strokeDasharray="3 7" opacity="0.5" />
        </g>
      );
    default: // pavilion
      return (
        <g {...common}>
          <line x1="20" y1="150" x2="280" y2="150" />
          <line x1="80" y1="150" x2="80" y2="95" />
          <line x1="150" y1="150" x2="150" y2="95" />
          <line x1="220" y1="150" x2="220" y2="95" />
          <line x1="60" y1="95" x2="240" y2="95" />
          <line x1="60" y1="86" x2="240" y2="86" />
        </g>
      );
  }
}

export default function PrecedentPortrait({ precedent, className = "" }) {
  const h = hash(precedent?.id ?? precedent?.name);
  const [bg, stroke] = PALETTES[h % PALETTES.length];
  const kind = archetype(precedent?.tags);

  return (
    <svg
      viewBox="0 0 300 170"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${precedent?.name} — illustrative massing`}
    >
      <defs>
        <linearGradient id={`pg-${h}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF8" />
          <stop offset="100%" stopColor={bg} />
        </linearGradient>
      </defs>
      <rect width="300" height="170" fill={`url(#pg-${h})`} />
      <Silhouette kind={kind} stroke={stroke} />
    </svg>
  );
}
