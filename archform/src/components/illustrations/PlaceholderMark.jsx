// Shared placeholder for emotion card backs. A minimal, abstract architectural
// line glyph (ground line + simple framed volume) — intentionally diagrammatic,
// not literal/figurative. Per-emotion diagrammatic SVGs replace this later.
export default function PlaceholderMark() {
  return (
    <svg
      width="84"
      height="84"
      viewBox="0 0 84 84"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* ground datum */}
      <line x1="10" y1="62" x2="74" y2="62" />
      {/* simple framed volume */}
      <path d="M26 62 V36 L42 24 L58 36 V62" />
      {/* threshold / opening */}
      <line x1="42" y1="62" x2="42" y2="48" />
      {/* horizon hint */}
      <line x1="18" y1="62" x2="10" y2="62" opacity="0" />
    </svg>
  );
}
