// Minimalist architectural line illustrations for building types.
// 84×84 viewBox, 1.5px stroke, currentColor, no fills.

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

// School — pitched classroom block, open courtyard, flag
export function School() {
  return (
    <Frame>
      <line x1="8" y1="64" x2="76" y2="64" />
      <rect x="10" y="40" width="64" height="24" />
      <line x1="10" y1="52" x2="74" y2="52" />
      <line x1="28" y1="40" x2="28" y2="64" />
      <line x1="46" y1="40" x2="46" y2="64" />
      <path d="M10 40 L42 24 L74 40" />
      <line x1="66" y1="16" x2="66" y2="40" />
      <path d="M66 16 L76 20 L66 24" />
    </Frame>
  );
}

// Housing — terrace row, staggered heights, shared datum
export function Housing() {
  return (
    <Frame>
      <line x1="8" y1="64" x2="76" y2="64" />
      <rect x="10" y="44" width="16" height="20" />
      <rect x="26" y="36" width="16" height="28" />
      <rect x="42" y="48" width="16" height="16" />
      <rect x="58" y="40" width="16" height="24" />
      <path d="M10 44 L18 34 L26 44" />
      <path d="M26 36 L34 24 L42 36" />
      <path d="M42 48 L50 38 L58 48" />
      <path d="M58 40 L66 30 L74 40" />
    </Frame>
  );
}

// Museum — monumental plinth, wide entry, top-lit volume
export function Museum() {
  return (
    <Frame>
      <line x1="8" y1="66" x2="76" y2="66" />
      <rect x="16" y="38" width="52" height="28" />
      <line x1="8" y1="66" x2="8" y2="62" />
      <line x1="76" y1="66" x2="76" y2="62" />
      <line x1="4" y1="62" x2="80" y2="62" />
      <rect x="30" y="50" width="24" height="12" />
      <line x1="42" y1="38" x2="42" y2="20" />
      <line x1="34" y1="20" x2="50" y2="20" />
      <path d="M34 20 L34 38" strokeDasharray="2 4" opacity="0.5" />
      <path d="M50 20 L50 38" strokeDasharray="2 4" opacity="0.5" />
    </Frame>
  );
}

// Library — reading room with tall clerestory, shelving rhythm
export function Library() {
  return (
    <Frame>
      <line x1="8" y1="66" x2="76" y2="66" />
      <rect x="14" y="34" width="56" height="32" />
      <line x1="14" y1="50" x2="70" y2="50" />
      <line x1="26" y1="34" x2="26" y2="66" />
      <line x1="38" y1="34" x2="38" y2="66" />
      <line x1="50" y1="34" x2="50" y2="66" />
      <line x1="62" y1="34" x2="62" y2="66" />
      <line x1="14" y1="34" x2="70" y2="22" />
      <line x1="70" y1="22" x2="70" y2="34" />
      <line x1="14" y1="22" x2="14" y2="34" />
      <line x1="14" y1="22" x2="70" y2="22" />
    </Frame>
  );
}

// Community Centre — open gathering hall, wide entrance, no hierarchy
export function CommunityCentre() {
  return (
    <Frame>
      <line x1="8" y1="64" x2="76" y2="64" />
      <rect x="14" y="36" width="56" height="28" />
      <line x1="32" y1="64" x2="32" y2="52" />
      <line x1="52" y1="64" x2="52" y2="52" />
      <line x1="32" y1="52" x2="52" y2="52" />
      <path d="M14 36 L42 20 L70 36" />
      <circle cx="42" cy="30" r="4" />
      <line x1="14" y1="48" x2="32" y2="48" />
      <line x1="52" y1="48" x2="70" y2="48" />
    </Frame>
  );
}

// Hospitality — entry canopy, layered levels, generous terrace
export function Hospitality() {
  return (
    <Frame>
      <line x1="8" y1="66" x2="76" y2="66" />
      <rect x="18" y="44" width="48" height="22" />
      <rect x="24" y="30" width="36" height="14" />
      <line x1="12" y1="44" x2="72" y2="44" />
      <line x1="18" y1="30" x2="24" y2="30" />
      <line x1="60" y1="30" x2="66" y2="30" />
      <line x1="12" y1="44" x2="12" y2="66" />
      <line x1="72" y1="44" x2="72" y2="66" />
      <line x1="24" y1="30" x2="24" y2="20" />
      <line x1="60" y1="30" x2="60" y2="20" />
      <line x1="24" y1="20" x2="60" y2="20" />
    </Frame>
  );
}

// Commercial — glass curtain wall tower, structural grid
export function Commercial() {
  return (
    <Frame>
      <line x1="10" y1="66" x2="74" y2="66" />
      <rect x="26" y="14" width="32" height="52" />
      <line x1="26" y1="26" x2="58" y2="26" />
      <line x1="26" y1="38" x2="58" y2="38" />
      <line x1="26" y1="50" x2="58" y2="50" />
      <line x1="42" y1="14" x2="42" y2="66" />
      <line x1="10" y1="66" x2="26" y2="66" />
      <line x1="58" y1="66" x2="74" y2="66" />
      <line x1="20" y1="58" x2="26" y2="58" />
      <line x1="58" y1="58" x2="64" y2="58" />
    </Frame>
  );
}

// Public Space — open pavilion, thin columns, stick people gathering beneath
export function PublicSpace() {
  return (
    <Frame>
      {/* Ground */}
      <line x1="8" y1="64" x2="76" y2="64" />
      {/* Thin columns */}
      <line x1="20" y1="40" x2="20" y2="64" />
      <line x1="42" y1="40" x2="42" y2="64" />
      <line x1="64" y1="40" x2="64" y2="64" />
      {/* Flat roof / canopy */}
      <line x1="12" y1="40" x2="72" y2="40" />
      <line x1="12" y1="36" x2="72" y2="36" />
      {/* Stick person 1 — left */}
      <circle cx="28" cy="50" r="3" />
      <line x1="28" y1="53" x2="28" y2="62" />
      <line x1="22" y1="57" x2="34" y2="57" />
      <line x1="28" y1="62" x2="24" y2="64" />
      <line x1="28" y1="62" x2="32" y2="64" />
      {/* Stick person 2 — right, slightly smaller / further */}
      <circle cx="55" cy="51" r="2.5" />
      <line x1="55" y1="54" x2="55" y2="62" />
      <line x1="50" y1="57" x2="60" y2="57" />
      <line x1="55" y1="62" x2="52" y2="64" />
      <line x1="55" y1="62" x2="58" y2="64" />
    </Frame>
  );
}

// Workplace — open floor plate, structural core, flexible plan
export function Workplace() {
  return (
    <Frame>
      <line x1="8" y1="66" x2="76" y2="66" />
      <rect x="14" y="24" width="56" height="42" />
      <rect x="34" y="38" width="16" height="18" />
      <line x1="14" y1="42" x2="34" y2="42" />
      <line x1="50" y1="42" x2="70" y2="42" />
      <line x1="14" y1="54" x2="34" y2="54" />
      <line x1="50" y1="54" x2="70" y2="54" />
      <line x1="14" y1="24" x2="70" y2="24" />
      <line x1="14" y1="30" x2="70" y2="30" strokeDasharray="2 4" opacity="0.5" />
    </Frame>
  );
}

// Other — question mark + abstract form suggesting possibility
export function Other() {
  return (
    <Frame>
      <line x1="8" y1="66" x2="76" y2="66" />
      <path d="M28 40 Q28 28 42 28 Q56 28 56 38 Q56 46 42 48" />
      <circle cx="42" cy="56" r="1.5" />
      <line x1="14" y1="66" x2="14" y2="52" strokeDasharray="2 4" opacity="0.4" />
      <line x1="70" y1="66" x2="70" y2="52" strokeDasharray="2 4" opacity="0.4" />
    </Frame>
  );
}
