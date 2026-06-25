// Abstract architectural / diagrammatic emotion illustrations.
// One component per emotion. Minimal line work, no fills, currentColor stroke —
// each reads as a spatial-quality diagram, not a literal/figurative drawing.
// All share an 84×84 viewBox so they sit consistently on the flipped card back.

function Frame({ children, strokeWidth = 1.5 }) {
  return (
    <svg
      width="84"
      height="84"
      viewBox="0 0 84 84"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

// Freedom — open plan, column-light, uninterrupted sightline across an open field.
export function Freedom() {
  return (
    <Frame>
      <line x1="8" y1="62" x2="76" y2="62" />
      <line x1="28" y1="62" x2="28" y2="40" />
      <line x1="56" y1="62" x2="56" y2="40" />
      <line x1="10" y1="49" x2="74" y2="49" strokeDasharray="2 5" />
    </Frame>
  );
}

// Curiosity — an aperture in a wall plane with a partial view reveal beyond.
export function Curiosity() {
  return (
    <Frame>
      <line x1="38" y1="16" x2="38" y2="68" />
      <rect x="32" y="36" width="12" height="14" rx="1" />
      <line x1="44" y1="43" x2="70" y2="43" strokeDasharray="2 5" />
      <path d="M64 38l6 5-6 5" />
      <line x1="54" y1="20" x2="54" y2="66" strokeDasharray="2 5" opacity="0.7" />
    </Frame>
  );
}

// Play — multi-level platforms / climbable stepped geometry.
export function Play() {
  return (
    <Frame>
      <line x1="14" y1="62" x2="38" y2="62" />
      <line x1="32" y1="50" x2="58" y2="50" />
      <line x1="24" y1="38" x2="50" y2="38" />
      <line x1="38" y1="62" x2="38" y2="50" />
      <line x1="32" y1="50" x2="32" y2="38" />
      <path d="M50 38c12 4 12 18 0 24" strokeDasharray="2 5" />
    </Frame>
  );
}

// Community — circular gathering diagram: a ring of figures around a centre.
export function Community() {
  const r = 22;
  const cx = 42;
  const cy = 42;
  const dots = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
  return (
    <Frame>
      <circle cx={cx} cy={cy} r="3" />
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r="3.2" />
      ))}
    </Frame>
  );
}

// Wonder — a tall vertical void with top-light washing down to a low datum.
export function Wonder() {
  return (
    <Frame>
      <line x1="30" y1="18" x2="30" y2="66" />
      <line x1="54" y1="18" x2="54" y2="66" />
      <line x1="22" y1="66" x2="62" y2="66" />
      <line x1="42" y1="20" x2="34" y2="60" strokeDasharray="2 4" />
      <line x1="42" y1="20" x2="42" y2="60" strokeDasharray="2 4" />
      <line x1="42" y1="20" x2="50" y2="60" strokeDasharray="2 4" />
    </Frame>
  );
}

// Reflection — a still water datum with a mirrored form above and below.
export function Reflection() {
  return (
    <Frame>
      <line x1="12" y1="44" x2="72" y2="44" />
      <path d="M30 44l12-16 12 16" />
      <path d="M30 44l12 16 12-16" strokeDasharray="2 4" opacity="0.7" />
    </Frame>
  );
}

// Calm — a single slender element beside a long flat line; mostly empty space.
export function Calm() {
  return (
    <Frame>
      <line x1="8" y1="56" x2="76" y2="56" />
      <line x1="30" y1="56" x2="30" y2="30" />
      <circle cx="30" cy="26" r="6" />
    </Frame>
  );
}

// Exploration — a branching circulation path between discovery nodes.
export function Exploration() {
  return (
    <Frame>
      <path d="M20 68 L34 50" />
      <path d="M34 50 L22 34" />
      <path d="M34 50 L52 42" />
      <path d="M52 42 L48 24" />
      <path d="M52 42 L68 50" />
      <circle cx="22" cy="32" r="3" />
      <circle cx="48" cy="22" r="3" />
      <circle cx="68" cy="52" r="3" />
    </Frame>
  );
}

// Connection — a path linking a built form to the landscape across a threshold.
export function Connection() {
  return (
    <Frame>
      <path d="M14 58 L14 40 L26 32 L38 40 L38 58 Z" />
      <line x1="14" y1="58" x2="72" y2="58" />
      <path d="M62 58c0-10-8-12-8-20 0 8-8 10-8 20" />
      <line x1="38" y1="50" x2="50" y2="50" strokeDasharray="2 4" />
    </Frame>
  );
}

// Ceremony — a portal threshold on a central processional axis.
export function Ceremony() {
  return (
    <Frame>
      <line x1="30" y1="26" x2="30" y2="54" />
      <line x1="54" y1="26" x2="54" y2="54" />
      <line x1="26" y1="26" x2="58" y2="26" />
      <line x1="42" y1="54" x2="42" y2="74" strokeDasharray="2 4" />
      <path d="M38 68l4 4 4-4" />
      <line x1="22" y1="54" x2="62" y2="54" />
    </Frame>
  );
}

// Groundedness — terrain contours with a heavy structure set onto the earth.
export function Groundedness() {
  return (
    <Frame>
      <path d="M10 60c14-8 50-8 64 0" />
      <path d="M14 68c12-6 44-6 56 0" />
      <path d="M34 46 L34 36 L50 36 L50 46" />
      <path d="M32 36 L42 28 L52 36" />
      <line x1="30" y1="46" x2="54" y2="46" />
    </Frame>
  );
}

// Flexibility — sliding partitions with movement arrows.
export function Flexibility() {
  return (
    <Frame>
      <line x1="26" y1="22" x2="26" y2="62" />
      <line x1="38" y1="22" x2="38" y2="62" />
      <line x1="50" y1="22" x2="50" y2="62" />
      <line x1="20" y1="42" x2="64" y2="42" strokeDasharray="2 4" />
      <path d="M24 38l-5 4 5 4" />
      <path d="M60 38l5 4-5 4" />
    </Frame>
  );
}

// Safety — a sheltering canopy enclosing a defined, protected space.
export function Safety() {
  return (
    <Frame>
      <path d="M16 38 L42 22 L68 38" />
      <line x1="22" y1="38" x2="22" y2="62" />
      <line x1="62" y1="38" x2="62" y2="62" />
      <line x1="22" y1="62" x2="62" y2="62" />
      <circle cx="42" cy="52" r="5" />
    </Frame>
  );
}

// Creativity — scattered construction marks resolving into an emergent form.
export function Creativity() {
  return (
    <Frame>
      <path d="M24 60 L40 28 L58 56" />
      <line x1="18" y1="46" x2="66" y2="40" strokeDasharray="2 4" />
      <line x1="34" y1="22" x2="52" y2="64" strokeDasharray="2 4" opacity="0.7" />
      <circle cx="62" cy="26" r="2.4" />
      <circle cx="22" cy="30" r="2.4" />
    </Frame>
  );
}

// Belonging — two intimate volumes gathered beneath one shared roofline.
export function Belonging() {
  return (
    <Frame>
      <path d="M16 38 L42 20 L68 38" />
      <path d="M28 38 L28 60 L40 60 L40 38" />
      <path d="M44 38 L44 60 L56 60 L56 38" />
      <line x1="24" y1="60" x2="60" y2="60" />
    </Frame>
  );
}
