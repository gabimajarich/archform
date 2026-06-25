import { useMemo } from "react";

// Tiny deterministic force layout (no d3): repulsion + link springs + centering.
// Seeded so the same program always lays out the same way.
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const roleColor = {
  communal: "#6B5E4C",  // umber — social hearts
  outdoor:  "#6E7A5E",  // moss — landscape
  primary:  "#8B8275",  // stone
  private:  "#C9BBA4",  // clay
  entry:    "#8B8275",
  service:  "#C9BBA4",
};

function layout(spaces, links, w, h, seed) {
  const rng = mulberry32(seed);
  const cx = w / 2, cy = h / 2;
  // radius from size weight
  const r = (s) => 14 + Math.sqrt(s.size) * 13;
  const nodes = spaces.map((s, i) => {
    const a = (i / spaces.length) * Math.PI * 2;
    return { ...s, r: r(s), x: cx + Math.cos(a) * 70 + (rng() - 0.5) * 10, y: cy + Math.sin(a) * 70 + (rng() - 0.5) * 10 };
  });
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  for (let iter = 0; iter < 240; iter++) {
    const k = 1 - iter / 300; // cooling
    // repulsion
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        let dx = a.x - b.x, dy = a.y - b.y;
        let d = Math.hypot(dx, dy) || 0.01;
        const minD = a.r + b.r + 16;
        const force = (minD * minD) / d * 0.012 * k;
        dx /= d; dy /= d;
        a.x += dx * force; a.y += dy * force;
        b.x -= dx * force; b.y -= dy * force;
      }
    }
    // link springs
    for (const ln of links) {
      const a = byId[ln.a], b = byId[ln.b];
      if (!a || !b) continue;
      let dx = b.x - a.x, dy = b.y - a.y;
      let d = Math.hypot(dx, dy) || 0.01;
      const ideal = a.r + b.r + 30 - ln.strength * 10;
      const force = (d - ideal) * 0.05 * k;
      dx /= d; dy /= d;
      a.x += dx * force; a.y += dy * force;
      b.x -= dx * force; b.y -= dy * force;
    }
    // gravity to centre
    for (const nd of nodes) {
      nd.x += (cx - nd.x) * 0.012;
      nd.y += (cy - nd.y) * 0.012;
    }
  }
  // clamp inside frame
  for (const nd of nodes) {
    nd.x = Math.max(nd.r + 4, Math.min(w - nd.r - 4, nd.x));
    nd.y = Math.max(nd.r + 4, Math.min(h - nd.r - 4, nd.y));
  }
  return { nodes, byId };
}

export default function BubbleDiagram({ program }) {
  const w = 420, h = 320;
  const { nodes, byId } = useMemo(() => {
    // seed from the space ids so it's stable per building type
    const seed = program.spaces.reduce((a, s) => a + s.id.charCodeAt(0) * (s.id.length + 1), 7);
    return layout(program.spaces, program.links, w, h, seed);
  }, [program]);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" aria-hidden="true">
      {/* adjacency links */}
      {program.links.map((ln, i) => {
        const a = byId[ln.a], b = byId[ln.b];
        if (!a || !b) return null;
        return (
          <line
            key={i}
            x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke="#C9BBA4"
            strokeWidth={0.6 + ln.strength * 1.1}
            strokeOpacity="0.7"
          />
        );
      })}
      {/* space bubbles */}
      {nodes.map((nd) => (
        <g key={nd.id}>
          <circle
            cx={nd.x} cy={nd.y} r={nd.r}
            fill="#FFFFFF"
            stroke={roleColor[nd.role] || "#8B8275"}
            strokeWidth="1.5"
          />
          <text
            x={nd.x} y={nd.y}
            textAnchor="middle" dominantBaseline="middle"
            className="fill-ink"
            style={{ fontSize: nd.r > 30 ? "10px" : "8.5px", letterSpacing: "0.01em" }}
          >
            {nd.label.length > 14 && nd.r < 34
              ? nd.label.split(" ").map((word, i, arr) => (
                  <tspan key={i} x={nd.x} dy={i === 0 ? `${-(arr.length - 1) * 5}px` : "10px"}>{word}</tspan>
                ))
              : nd.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
