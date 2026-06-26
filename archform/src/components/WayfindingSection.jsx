import { useState, useId } from "react";
import {
  legibilityScore,
  approachFor,
  ZONE_PALETTE,
  getPlanLayout,
  deriveWayfindingStrategies,
} from "../data/wayfindingLogic.js";
import { priorityStrength } from "../data/strategies.js";
import StrategyCard from "./StrategyCard.jsx";
import WarningCard from "./WarningCard.jsx";

const LAYERS = [
  { id: "zones",      label: "Colour zones",    defaultOn: true },
  { id: "route",      label: "Circulation",     defaultOn: true },
  { id: "sightlines", label: "Sightlines",      defaultOn: false },
  { id: "landmarks",  label: "Landmarks",       defaultOn: false },
  { id: "signage",    label: "Signage nodes",   defaultOn: false },
  { id: "daylight",   label: "Daylight cues",   defaultOn: false },
  { id: "accessible", label: "Accessible route",defaultOn: false },
];

function bandFor(score) {
  if (score <= 33) return "intuitive";
  if (score >= 67) return "explicit";
  return "balanced";
}

function defaultLayers(approachKey) {
  const on = new Set(["zones", "route"]);
  if (approachKey === "intuitive") { on.add("landmarks"); on.add("sightlines"); }
  if (approachKey === "explicit")  { on.add("signage");   on.add("accessible"); }
  if (approachKey === "balanced")  { on.add("landmarks"); on.add("signage"); }
  return Object.fromEntries(LAYERS.map((l) => [l.id, on.has(l.id)]));
}

export default function WayfindingSection({ emotions = [], priorities = {}, buildingType, site }) {
  const uid = useId();
  const baseScore = legibilityScore({ emotions, priorities });
  const [sliderVal, setSliderVal] = useState(baseScore);
  const approach = approachFor(sliderVal);
  const layout = getPlanLayout(buildingType);

  const [zoneColors, setZoneColors] = useState(() =>
    Object.fromEntries(layout.zones.map((z, i) => [z.id, ZONE_PALETTE[i % ZONE_PALETTE.length]]))
  );
  const [layers, setLayers] = useState(() => defaultLayers(approach.key));
  const [tracing, setTracing] = useState(false);

  const band = bandFor(sliderVal);
  const activePath = layout.paths[band];
  const traceDur = band === "intuitive" ? "4s" : band === "balanced" ? "2.5s" : "1.5s";

  const strategies = deriveWayfindingStrategies(emotions, priorities);

  const showDiscoveryWarning =
    (emotions.includes("exploration") || emotions.includes("curiosity")) &&
    (priorities.accessibility ?? 50) >= 67;

  const discoveryWarning = {
    id: "discovery-access",
    title: "Discovery vs. access",
    body: "Your navigation leans on discovery (Exploration / Curiosity), but accessibility is a high priority. Provide accessible parallel cues — signage, tactile ground, a legible backup route — so discovery never means getting lost.",
    alternatives: ["Accessible parallel route alongside the discovery path", "Tactile ground indicators on the main loop", "Signage at every accessible destination"],
  };

  function cycleColor(zoneId) {
    setZoneColors((prev) => {
      const cur = prev[zoneId];
      const idx = ZONE_PALETTE.indexOf(cur);
      return { ...prev, [zoneId]: ZONE_PALETTE[(idx + 1) % ZONE_PALETTE.length] };
    });
  }

  function toggleLayer(id) {
    setLayers((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleTrace() {
    setTracing(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setTracing(true)));
    setTimeout(() => setTracing(false), parseFloat(traceDur) * 1000 + 200);
  }

  return (
    <section className="space-y-8">
      {/* Approach header */}
      <div>
        <p className="text-[10px] uppercase tracking-wide2 text-clay mb-1">Wayfinding approach</p>
        <h3 className="text-xl font-light text-ink tracking-tightish">{approach.label}</h3>
        <p className="mt-1.5 text-sm text-ink/65 leading-relaxed max-w-2xl">{approach.rationale}</p>
      </div>

      {/* Interactive plan */}
      <div className="rounded-2xl border border-sand bg-surface shadow-card overflow-hidden">
        {/* Layer toggles */}
        <div className="px-5 pt-5 pb-3 border-b border-sand flex flex-wrap gap-2">
          {LAYERS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => toggleLayer(l.id)}
              className={`rounded-full border px-3 py-1 text-[11px] transition duration-200 ${
                layers[l.id]
                  ? "border-umber bg-umber/10 text-umber"
                  : "border-sand bg-paper text-stone"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* SVG plan */}
        <div className="relative bg-paper">
          <svg
            viewBox="0 0 600 400"
            className="w-full"
            style={{ maxHeight: 380 }}
            aria-label="Schematic wayfinding plan"
          >
            <defs>
              <marker id={`${uid}-arr`} markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#8B8275" />
              </marker>
            </defs>

            {/* Zones layer */}
            {layout.zones.map((z, i) => (
              <g key={z.id} style={{ opacity: layers.zones ? 1 : 0, transition: "opacity 300ms" }}>
                <rect
                  x={z.x} y={z.y} width={z.w} height={z.h}
                  rx="6"
                  fill={zoneColors[z.id]}
                  fillOpacity="0.22"
                  stroke={zoneColors[z.id]}
                  strokeWidth="1.5"
                  className="cursor-pointer"
                  onClick={() => cycleColor(z.id)}
                />
                <text
                  x={z.x + z.w / 2} y={z.y + z.h / 2 - 6}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="10" fill="#2B2A27" fontFamily="Inter, system-ui, sans-serif"
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {z.label}
                </text>
                <text
                  x={z.x + z.w / 2} y={z.y + z.h / 2 + 10}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="8" fill="#8B8275" fontFamily="Inter, system-ui, sans-serif"
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {z.cue}
                </text>
              </g>
            ))}

            {/* Sightlines layer */}
            {layout.cueMarkers.sightlines?.map((sl, i) => (
              <line
                key={i}
                x1={sl.x} y1={sl.y ?? 200} x2={sl.ex} y2={sl.ey ?? sl.y ?? 200}
                stroke="#C9BBA4" strokeWidth="1" strokeDasharray="4 3"
                markerEnd={`url(#${uid}-arr)`}
                style={{ opacity: layers.sightlines ? 0.8 : 0, transition: "opacity 300ms" }}
              />
            ))}

            {/* Circulation route */}
            <g style={{ opacity: layers.route ? 1 : 0, transition: "opacity 300ms" }}>
              <path
                d={activePath}
                fill="none"
                stroke="#6B5E4C"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* Trace dot */}
            {tracing && (
              <circle r="6" fill="#6B5E4C" fillOpacity="0.85">
                <animateMotion
                  dur={traceDur}
                  repeatCount="1"
                  path={activePath}
                />
              </circle>
            )}

            {/* Accessible route */}
            {layers.accessible && layout.cueMarkers.accessible?.map((ar, i) => (
              <line
                key={i}
                x1={ar.x} y1={ar.y ?? 200} x2={ar.ex} y2={ar.ey ?? ar.y ?? 200}
                stroke="#6E7A5E" strokeWidth="3" strokeDasharray="6 3"
                style={{ opacity: 0.7, transition: "opacity 300ms" }}
              />
            ))}

            {/* Landmark markers */}
            {layers.landmarks && layout.cueMarkers.landmarks?.map((lm, i) => (
              <g key={i}>
                <circle cx={lm.x} cy={lm.y} r="7" fill="none" stroke="#C9A24B" strokeWidth="1.5" />
                <circle cx={lm.x} cy={lm.y} r="2.5" fill="#C9A24B" />
                <text x={lm.x + 10} y={lm.y + 4} fontSize="8" fill="#6B5E4C"
                  fontFamily="Inter, system-ui, sans-serif">{lm.label}</text>
              </g>
            ))}

            {/* Signage nodes */}
            {layers.signage && layout.cueMarkers.signage?.map((sn, i) => (
              <g key={i}>
                <rect x={sn.x - 6} y={sn.y - 6} width="12" height="12" rx="2"
                  fill="#5E6E78" fillOpacity="0.15" stroke="#5E6E78" strokeWidth="1.2" />
                <text x={sn.x} y={sn.y + 4} textAnchor="middle" fontSize="7" fill="#5E6E78"
                  fontFamily="Inter, system-ui, sans-serif" fontWeight="600">i</text>
                <text x={sn.x + 10} y={sn.y + 4} fontSize="8" fill="#5E6E78"
                  fontFamily="Inter, system-ui, sans-serif">{sn.label}</text>
              </g>
            ))}

            {/* Daylight cues */}
            {layers.daylight && layout.cueMarkers.daylight?.map((dl, i) => (
              <g key={i}>
                <circle cx={dl.x} cy={dl.y} r="9" fill="#C9A24B" fillOpacity="0.15" stroke="#C9A24B" strokeWidth="1" strokeDasharray="2 2" />
                <text x={dl.x} y={dl.y + 4} textAnchor="middle" fontSize="9" fill="#C9A24B"
                  fontFamily="Inter, system-ui, sans-serif">☀</text>
              </g>
            ))}
          </svg>

          {/* Hint */}
          <p className="absolute bottom-2 right-3 text-[10px] text-stone/60 pointer-events-none">
            Click a zone to cycle colour
          </p>
        </div>

        {/* Legibility slider */}
        <div className="px-5 py-5 border-t border-sand">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wide2 text-stone mb-2">
            <span>Intuitive &amp; immersive</span>
            <span>Explicit &amp; signed</span>
          </div>
          <input
            type="range" min={0} max={100} value={sliderVal}
            onChange={(e) => setSliderVal(Number(e.target.value))}
            className="w-full accent-umber h-1"
            style={{ accentColor: "#6B5E4C" }}
            aria-label="Legibility scale"
          />
          <p className="mt-2 text-[11px] text-stone text-center">
            {approach.label} <span className="text-clay">({sliderVal})</span>
          </p>
        </div>

        {/* Zone legend */}
        <div className="px-5 pb-5 border-t border-sand pt-4">
          <p className="text-[10px] uppercase tracking-wide2 text-stone mb-3">Zone legend</p>
          <div className="flex flex-wrap gap-3">
            {layout.zones.map((z) => (
              <button
                key={z.id}
                type="button"
                onClick={() => cycleColor(z.id)}
                className="flex items-center gap-2 rounded-full border border-sand bg-paper px-3 py-1.5 text-xs text-ink/70 transition hover:border-umber"
                title="Click to cycle colour"
              >
                <span
                  className="inline-block w-3 h-3 rounded-full flex-shrink-0"
                  style={{ background: zoneColors[z.id] }}
                />
                <span>{z.label}</span>
                <span className="text-stone">·</span>
                <span className="text-stone">{z.cue}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Trace button */}
        <div className="px-5 pb-5">
          <button
            type="button"
            onClick={handleTrace}
            disabled={tracing}
            className="inline-flex items-center gap-2 rounded-full border border-sand bg-paper px-5 py-2 text-xs text-umber transition duration-200 hover:border-umber disabled:opacity-40"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
            {tracing ? "Tracing…" : "Trace the route"}
          </button>
        </div>
      </div>

      {/* Wayfinding strategy cards */}
      {strategies.length > 0 && (
        <div>
          <p className="text-xs text-stone mb-3">Recommended wayfinding strategies for your design intent:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {strategies.map((s, i) => (
              <StrategyCard key={s.id} strategy={s} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Discovery-vs-access contradiction */}
      {showDiscoveryWarning && (
        <WarningCard warning={discoveryWarning} />
      )}
    </section>
  );
}
