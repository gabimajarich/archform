// Minimalist architectural line illustrations for the 10 site/climate types.
// Same style as emotionIllustrations: 84×84 viewBox, 1.5px stroke, currentColor, no fills.

function Frame({ children }) {
  return (
    <svg
      width="84" height="84" viewBox="0 0 84 84"
      fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

// Coastal — waves, horizon line, deep overhang
export function Coastal() {
  return (
    <Frame>
      <line x1="10" y1="50" x2="74" y2="50" />
      <path d="M10 40 Q22 34 34 40 Q46 46 58 40 Q70 34 74 40" />
      <path d="M10 58 Q22 52 34 58 Q46 64 58 58 Q70 52 74 58" />
      <line x1="28" y1="50" x2="28" y2="28" />
      <line x1="56" y1="50" x2="56" y2="28" />
      <line x1="20" y1="28" x2="64" y2="28" />
      <line x1="16" y1="28" x2="16" y2="40" />
    </Frame>
  );
}

// Urban Dense — tall close-set towers, street datum
export function UrbanDense() {
  return (
    <Frame>
      <line x1="10" y1="68" x2="74" y2="68" />
      <rect x="12" y="30" width="14" height="38" />
      <rect x="30" y="18" width="14" height="50" />
      <rect x="48" y="36" width="10" height="32" />
      <rect x="62" y="24" width="10" height="44" />
      <line x1="30" y1="34" x2="44" y2="34" strokeDasharray="2 4" opacity="0.6" />
      <line x1="30" y1="44" x2="44" y2="44" strokeDasharray="2 4" opacity="0.6" />
    </Frame>
  );
}

// Suburban — pitched-roof house, setback, tree
export function Suburban() {
  return (
    <Frame>
      <line x1="8" y1="64" x2="76" y2="64" />
      <rect x="24" y="44" width="32" height="20" />
      <path d="M20 44 L40 24 L60 44" />
      <line x1="56" y1="20" x2="56" y2="48" />
      <path d="M48 30 Q56 18 64 30" />
      <path d="M46 38 Q56 22 66 38" />
      <line x1="38" y1="64" x2="38" y2="56" />
      <line x1="34" y1="56" x2="42" y2="56" />
    </Frame>
  );
}

// Bushland — low sheltering form embedded in trees / scrub
export function Bushland() {
  return (
    <Frame>
      <line x1="8" y1="62" x2="76" y2="62" />
      <rect x="22" y="46" width="40" height="16" />
      <path d="M18 46 L42 32 L66 46" />
      <line x1="14" y1="62" x2="14" y2="40" />
      <path d="M8 46 Q14 32 20 46" />
      <path d="M8 40 Q14 26 20 40" />
      <line x1="68" y1="62" x2="68" y2="40" />
      <path d="M62 46 Q68 32 74 46" />
      <path d="M62 40 Q68 26 74 40" />
    </Frame>
  );
}

// Arid — thick-walled courtyard, small shaded openings, shadow
export function Arid() {
  return (
    <Frame>
      <rect x="14" y="20" width="56" height="44" />
      <rect x="26" y="32" width="32" height="32" />
      <line x1="26" y1="32" x2="58" y2="32" />
      <line x1="14" y1="20" x2="26" y2="32" />
      <line x1="70" y1="20" x2="58" y2="32" />
      <rect x="30" y="14" width="8" height="6" />
      <line x1="34" y1="20" x2="34" y2="32" strokeDasharray="2 4" opacity="0.6" />
    </Frame>
  );
}

// Tropical — raised floor on piles, deep verandah, big overhang
export function Tropical() {
  return (
    <Frame>
      <line x1="10" y1="66" x2="74" y2="66" />
      <line x1="24" y1="66" x2="24" y2="54" />
      <line x1="40" y1="66" x2="40" y2="54" />
      <line x1="56" y1="66" x2="56" y2="54" />
      <rect x="20" y="38" width="44" height="16" />
      <line x1="14" y1="38" x2="70" y2="38" />
      <path d="M10 38 L42 22 L74 38" />
      <line x1="14" y1="46" x2="20" y2="46" />
      <line x1="64" y1="46" x2="70" y2="46" />
    </Frame>
  );
}

// Temperate — balanced glazing, horizontal sun shading fins
export function Temperate() {
  return (
    <Frame>
      <line x1="10" y1="66" x2="74" y2="66" />
      <rect x="18" y="24" width="48" height="42" />
      <line x1="18" y1="40" x2="66" y2="40" />
      <line x1="18" y1="52" x2="66" y2="52" />
      <line x1="10" y1="30" x2="18" y2="30" />
      <line x1="10" y1="36" x2="18" y2="36" />
      <line x1="10" y1="42" x2="18" y2="42" />
      <line x1="10" y1="48" x2="18" y2="48" />
      <path d="M30 24 L30 14" strokeDasharray="2 4" opacity="0.5" />
      <path d="M42 24 L48 14" strokeDasharray="2 4" opacity="0.5" />
    </Frame>
  );
}

// Mountainous — steep roof, compact form, snow-shedding pitch
export function Mountainous() {
  return (
    <Frame>
      <line x1="8" y1="64" x2="76" y2="64" />
      <rect x="24" y="46" width="36" height="18" />
      <path d="M16 46 L42 16 L68 46" />
      <line x1="24" y1="54" x2="30" y2="54" />
      <line x1="24" y1="58" x2="30" y2="58" />
      <path d="M8 38 Q16 30 24 38" strokeDasharray="2 4" opacity="0.5" />
      <path d="M60 38 Q68 30 76 38" strokeDasharray="2 4" opacity="0.5" />
      <line x1="42" y1="16" x2="42" y2="8" strokeDasharray="2 4" opacity="0.4" />
    </Frame>
  );
}

// Waterfront — elevated piles, deck extending over water, horizon
export function Waterfront() {
  return (
    <Frame>
      <path d="M10 56 Q22 50 34 56 Q46 62 58 56 Q70 50 74 56" />
      <line x1="22" y1="56" x2="22" y2="42" />
      <line x1="42" y1="56" x2="42" y2="42" />
      <line x1="62" y1="56" x2="62" y2="42" />
      <line x1="16" y1="42" x2="68" y2="42" />
      <rect x="22" y="26" width="36" height="16" />
      <line x1="10" y1="42" x2="16" y2="42" />
      <line x1="68" y1="42" x2="74" y2="42" />
      <path d="M10 66 Q34 60 58 66 Q66 68 74 66" strokeDasharray="2 5" opacity="0.4" />
    </Frame>
  );
}

// Rural — isolated barn/shed form, long view, open landscape
export function Rural() {
  return (
    <Frame>
      <line x1="8" y1="60" x2="76" y2="60" />
      <rect x="26" y="40" width="32" height="20" />
      <path d="M22 40 L42 24 L62 40" />
      <line x1="8" y1="60" x2="26" y2="60" strokeDasharray="2 6" opacity="0.4" />
      <line x1="58" y1="60" x2="76" y2="60" strokeDasharray="2 6" opacity="0.4" />
      <line x1="12" y1="52" x2="26" y2="52" strokeDasharray="2 4" opacity="0.5" />
      <line x1="58" y1="52" x2="72" y2="52" strokeDasharray="2 4" opacity="0.5" />
      <line x1="40" y1="40" x2="40" y2="60" />
    </Frame>
  );
}
