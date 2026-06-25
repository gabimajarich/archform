import { PRIORITIES, PRIORITY_SHORT } from "../data/priorities.js";

// 11-axis spider plot of the priorities — the "design fingerprint".
// Pure SVG, minimal linework. `priorities` is the 0..100 values object.
export default function RadarChart({ priorities }) {
  const size = 320;
  const c = size / 2;
  const maxR = c - 52; // leave room for labels
  const axes = PRIORITIES.map((p) => p.key);
  const n = axes.length;

  // angle for axis i (start at top, clockwise)
  const angle = (i) => (i / n) * Math.PI * 2 - Math.PI / 2;
  const point = (i, r) => [c + r * Math.cos(angle(i)), c + r * Math.sin(angle(i))];

  // concentric guide rings at 25/50/75/100
  const rings = [0.25, 0.5, 0.75, 1].map((f) =>
    axes.map((_, i) => point(i, maxR * f).join(",")).join(" ")
  );

  // value polygon
  const valuePts = axes
    .map((key, i) => point(i, maxR * ((priorities[key] ?? 0) / 100)).join(","))
    .join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-sm mx-auto" aria-hidden="true">
      {/* guide rings */}
      {rings.map((pts, i) => (
        <polygon key={`ring-${i}`} points={pts} fill="none" stroke="#E9E2D4" strokeWidth="1" />
      ))}
      {/* spokes */}
      {axes.map((_, i) => {
        const [x, y] = point(i, maxR);
        return <line key={`spoke-${i}`} x1={c} y1={c} x2={x} y2={y} stroke="#E9E2D4" strokeWidth="1" />;
      })}
      {/* value polygon */}
      <polygon points={valuePts} fill="rgba(107,94,76,0.10)" stroke="#6B5E4C" strokeWidth="1.5" strokeLinejoin="round" />
      {/* value vertices */}
      {axes.map((key, i) => {
        const [x, y] = point(i, maxR * ((priorities[key] ?? 0) / 100));
        return <circle key={`vtx-${i}`} cx={x} cy={y} r="2.4" fill="#6B5E4C" />;
      })}
      {/* axis labels */}
      {axes.map((key, i) => {
        const [x, y] = point(i, maxR + 18);
        const a = angle(i);
        const anchor = Math.cos(a) > 0.3 ? "start" : Math.cos(a) < -0.3 ? "end" : "middle";
        return (
          <text
            key={key}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            className="fill-stone"
            style={{ fontSize: "9.5px", letterSpacing: "0.04em" }}
          >
            {PRIORITY_SHORT[key]}
          </text>
        );
      })}
    </svg>
  );
}
