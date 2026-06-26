import { priorityStrength } from "./strategies.js";

export function legibilityScore({ emotions, priorities: p }) {
  const has = (e) => emotions.includes(e);
  let s = 50;
  if (has("safety"))    s += 12;
  if (has("belonging")) s += 6;
  if (has("community")) s += 4;
  s += (p.accessibility - 50) * 0.30;
  s += (p.efficiency    - 50) * 0.20;
  if (has("curiosity"))   s -= 12;
  if (has("exploration")) s -= 12;
  if (has("wonder"))      s -= 6;
  if (has("play"))        s -= 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function approachFor(score) {
  if (score <= 33) return {
    key: "intuitive",
    label: "Landscape-led orientation",
    rationale: "You favour discovery, so navigation should rely on sightlines, landmarks and material thresholds rather than signage.",
  };
  if (score >= 67) return {
    key: "explicit",
    label: "Signed & legible orientation",
    rationale: "Clarity and access matter most, so use a clear circulation spine, signage nodes and colour-coded zones.",
  };
  return {
    key: "balanced",
    label: "Layered orientation",
    rationale: "Intuitive cues for the main public route, with explicit signage where decisions and access demand it.",
  };
}

export const WAYFINDING_STRATEGIES = [
  {
    id: "sightline-corridors", category: "Sightlines",
    title: "Sightline corridors",
    summary: "Long uninterrupted views that pull people through.",
    what: "Design the primary routes so people can see their destination from the moment they enter — vistas draw movement without signs.",
    why: "The eye leads the body. When the end of a route is visible, people navigate instinctively rather than reading instructions.",
    howToApply: "Align key thresholds on a common axis. Remove visual obstructions at entry points. Frame the destination (a courtyard, a landmark, daylight) in the opening view.",
    tradeoffs: "Long sightlines demand careful acoustic and privacy management. They can feel exposed in quieter retreat-type buildings.",
    worksWith: ["view-anchors", "daylight-cue", "discovery-thresholds"],
    triggers: { emotions: ["exploration","curiosity","freedom"], priorities: { efficiency: "high" } },
  },
  {
    id: "central-landmark", category: "Landmark",
    title: "Central orienting landmark",
    summary: "A visible anchor people navigate back to.",
    what: "A single prominent element — a stair, a tree, a sculptural column, a skylit void — placed so it's visible from multiple points in the plan.",
    why: "Landmarks give people a mental map. When you can always see the landmark, you always know roughly where you are.",
    howToApply: "Position the landmark at the intersection of the main axes. Ensure it's visible from all major entry points and secondary corridors.",
    tradeoffs: "The landmark eats floor area. It needs to be genuinely distinctive — a generic column or a standard stair won't read as a wayfinding anchor.",
    worksWith: ["sightline-corridors", "colour-zoning", "legible-loop"],
    triggers: { emotions: ["community","belonging","ceremony"], priorities: {} },
  },
  {
    id: "colour-zoning", category: "Colour",
    title: "Colour-coded zones",
    summary: "Distinct earthy hues identify each wing.",
    what: "Assign a palette colour to each zone and carry it consistently: floor, wall band, signage backing. Visitors map colour to location.",
    why: "Colour is processed pre-consciously. A consistent zone colour reduces cognitive load, especially under stress or in busy environments.",
    howToApply: "Use muted, distinct hues (avoid primaries). Apply the colour at a consistent height band (skirting, cornice) so it appears in peripheral vision. Pair with a non-colour cue (material, pattern) for accessibility.",
    tradeoffs: "Requires discipline to maintain — adding partitions or refits must respect the zone palette. Colour alone is not accessible; a redundant cue is mandatory.",
    worksWith: ["central-landmark", "signage-nodes", "tactile-ground"],
    triggers: { emotions: ["safety","belonging"], priorities: { accessibility: "high" } },
  },
  {
    id: "material-thresholds", category: "Material",
    title: "Material change at thresholds",
    summary: "Floor/wall shifts signal you've entered a new zone.",
    what: "Change the underfoot material at every zone boundary — timber to stone, polished to rough, light to dark. The transition is felt as well as seen.",
    why: "Tactile cues work where visual ones fail (crowded, low-light, or for people with low vision). A material shift is universally legible.",
    howToApply: "Plan material zones on the same diagram as the wayfinding zones. Use the material transition as the threshold marker rather than a door or sign.",
    tradeoffs: "Acoustic and thermal performance at joints needs detailing. Requires coordination with the material palette brief.",
    worksWith: ["tactile-ground", "daylight-cue", "colour-zoning"],
    triggers: { emotions: ["groundedness","connection","calm"], priorities: { naturalMaterials: "high" } },
  },
  {
    id: "daylight-cue", category: "Light",
    title: "Daylight as a directional cue",
    summary: "Brightness draws people toward key destinations.",
    what: "Concentrate top-light or end-light at destination spaces so brightness acts as a beacon along the route.",
    why: "Humans are phototropic — we move toward light by instinct. A bright destination at the end of a dim corridor creates effortless wayfinding.",
    howToApply: "Place skylights or clerestories over arrival spaces, the social heart, or the landmark. Keep corridors relatively dim so contrast works. Use deep reveals to control glare.",
    tradeoffs: "Bright destinations can create glare problems. Requires sun-path analysis to ensure the right quality of light at the right time of day.",
    worksWith: ["sightline-corridors", "central-landmark", "view-anchors"],
    triggers: { emotions: ["wonder","calm","reflection"], priorities: { passiveDesign: "high" } },
  },
  {
    id: "signage-nodes", category: "Signage",
    title: "Signage at decision points",
    summary: "Clear signs only where routes branch.",
    what: "Place explicit directional signage only at junctions where two or more routes diverge — not continuously along a corridor.",
    why: "Sign clutter degrades wayfinding. Minimal, well-placed signs at genuine decision points are more effective than repeated redundant messages.",
    howToApply: "Map every route junction. Install a signage node at each. Remove signs from straight-run corridors. Test by walking the route without prior knowledge.",
    tradeoffs: "Under-signing feels sparse until users are familiar. Requires clear graphic standards that persist through future fit-outs.",
    worksWith: ["colour-zoning", "legible-loop", "tactile-ground"],
    triggers: { emotions: ["safety"], priorities: { accessibility: "high", efficiency: "high" } },
  },
  {
    id: "tactile-ground", category: "Accessible",
    title: "Tactile ground indicators",
    summary: "Underfoot cues for low-vision navigation.",
    what: "Tactile paving strips (detectable warning surfaces and directional bars) integrated into the floor finish, indicating paths and hazard edges.",
    why: "Essential for low-vision users. Also reinforces the wayfinding logic for all users — a consistent tactile route is a backup to every other cue.",
    howToApply: "Follow accessibility standards (AS 1428.4.1 or equivalent). Route tactile strips along the primary accessible path and to all key destinations. Integrate into the material palette — use tonal contrast rather than high-vis yellow where aesthetics permit.",
    tradeoffs: "Maintenance sensitive — grout lines and edge fixings must be kept flush. Design requires specialist accessibility consultant input.",
    worksWith: ["signage-nodes", "colour-zoning", "material-thresholds"],
    triggers: { emotions: ["safety"], priorities: { accessibility: "high" } },
  },
  {
    id: "view-anchors", category: "View",
    title: "View-to-exterior anchors",
    summary: "Framed outside views keep people oriented to site.",
    what: "At each major junction or arrival space, frame a view to the landscape, street, or sky so visitors always know their orientation relative to the outside world.",
    why: "External landmarks are the most stable orientation cues. When a visitor can see a tree, a hill, or the street from inside, they can triangulate their position.",
    howToApply: "Design the plan so key corridors and gathering spaces terminate in a window or opening. Orient the openings toward memorable exterior features (a large tree, a landform, a landmark).",
    tradeoffs: "Windows mean solar gain, privacy, and acoustic trade-offs. Views must be actively maintained — don't let landscaping or future construction block them.",
    worksWith: ["sightline-corridors", "daylight-cue", "discovery-thresholds"],
    triggers: { emotions: ["connection","freedom","wonder"], priorities: {} },
  },
  {
    id: "legible-loop", category: "Circulation",
    title: "Single legible loop",
    summary: "One clear circuit you can't get lost on.",
    what: "A single, continuous circulation route that loops through all major spaces, returning to the entry. No dead ends. No confusing branches on the primary path.",
    why: "A loop is cognitively simple — you always know that following the path will eventually bring you back. Reduces anxiety in unfamiliar buildings.",
    howToApply: "Design the primary public route as a loop. Branch secondary (private/service) routes off the loop, clearly marked as such. Ensure the loop is visible as a loop — not a spiral or figure-eight.",
    tradeoffs: "Loops can feel inefficient for point-to-point journeys. May conflict with episodic or discovery-led circulation strategies.",
    worksWith: ["signage-nodes", "central-landmark", "colour-zoning"],
    triggers: { emotions: ["safety","belonging"], priorities: { efficiency: "high" } },
  },
  {
    id: "discovery-thresholds", category: "Threshold",
    title: "Hidden discovery thresholds",
    summary: "Partial reveals reward wandering off the main route.",
    what: "Secondary spaces reveal themselves only when the visitor ventures off the main route — glimpsed through a slot, found around a corner, or at the end of a stepped-down path.",
    why: "Discovery generates delight and a sense of ownership. Visitors who find a hidden space remember it and return. It rewards curiosity without confusing the primary route.",
    howToApply: "Keep the main route legible and clear. Layer secondary thresholds as optional detours — a slot in a wall, a lowered ceiling that rises into a hidden room, a door that is ajar.",
    tradeoffs: "Can disorient visitors who are not discovery-inclined. Must not conceal essential services (exits, accessible routes, toilets) — those must remain clearly signed.",
    worksWith: ["sightline-corridors", "view-anchors", "material-thresholds"],
    triggers: { emotions: ["curiosity","exploration","play"], priorities: { efficiency: "low" } },
  },
];

export const ZONE_PALETTE = ["#B5734F", "#6E7A5E", "#C9A24B", "#5E6E78", "#D8C7A8"];

// Plan layouts: zones (rect in viewBox 0 0 600 400), paths per band, cue markers
export const PLAN_LAYOUTS = {
  school: {
    zones: [
      { id: "entry",      label: "Entry",      x: 30,  y: 170, w: 80,  h: 60,  cue: "Timber canopy" },
      { id: "commons",    label: "Commons",    x: 150, y: 130, w: 140, h: 140, cue: "Central skylight" },
      { id: "classrooms", label: "Classrooms", x: 340, y: 80,  w: 220, h: 120, cue: "Timber floor" },
      { id: "library",    label: "Library",    x: 340, y: 240, w: 140, h: 120, cue: "Rammed earth wall" },
      { id: "outdoor",    label: "Outdoor",    x: 510, y: 240, w: 70,  h: 120, cue: "Landscape edge" },
    ],
    paths: {
      intuitive: "M 70 200 Q 150 160 220 200 Q 320 240 380 140 Q 450 80 530 120 M 380 300 Q 450 280 510 300",
      balanced:  "M 70 200 L 150 200 L 290 200 L 340 140 L 560 140 M 340 200 L 340 300 L 480 300",
      explicit:  "M 70 200 L 150 200 L 290 200 L 290 140 L 560 140 M 290 200 L 290 360 L 480 360",
    },
    cueMarkers: {
      landmarks: [{ x: 220, y: 200, label: "Commons heart" }],
      signage:   [{ x: 150, y: 200, label: "Entry junction" }, { x: 340, y: 200, label: "Split" }],
      daylight:  [{ x: 220, y: 160, label: "Skylight" }],
      sightlines:[{ x: 70, y: 200, ex: 560, ey: 140, label: "Main axis" }],
      accessible:[{ x: 70, y: 210, ex: 290, ey: 210, label: "Accessible route" }],
    },
  },
  museum: {
    zones: [
      { id: "entry",    label: "Entry",    x: 260, y: 20,  w: 80,  h: 60,  cue: "Polished stone floor" },
      { id: "atrium",   label: "Atrium",   x: 200, y: 120, w: 200, h: 160, cue: "Central void + skylight" },
      { id: "galleries",label: "Galleries",x: 30,  y: 100, w: 140, h: 260, cue: "Timber track lighting" },
      { id: "cafe",     label: "Café",     x: 430, y: 200, w: 140, h: 100, cue: "Garden outlook" },
      { id: "service",  label: "Service",  x: 430, y: 320, w: 140, h: 60,  cue: "Concrete floor" },
    ],
    paths: {
      intuitive: "M 300 80 Q 280 130 300 200 Q 320 260 250 320 M 200 200 Q 120 200 100 300 M 400 200 Q 450 230 500 250",
      balanced:  "M 300 80 L 300 120 L 300 280 M 200 200 L 30 200 M 400 200 L 500 250",
      explicit:  "M 300 80 L 300 360 M 200 200 L 30 200 L 30 360 M 400 200 L 570 200",
    },
    cueMarkers: {
      landmarks: [{ x: 300, y: 200, label: "Atrium void" }],
      signage:   [{ x: 300, y: 120, label: "Entry split" }, { x: 200, y: 200, label: "Gallery split" }],
      daylight:  [{ x: 300, y: 150, label: "Skylight" }],
      sightlines:[{ x: 300, y: 80, ex: 300, ey: 360, label: "Central axis" }],
      accessible:[{ x: 300, y: 80, ex: 300, ey: 320, label: "Accessible spine" }],
    },
  },
  library: {
    zones: [
      { id: "entry",    label: "Entry",     x: 30,  y: 160, w: 80,  h: 80,  cue: "Timber threshold" },
      { id: "desk",     label: "Help Desk", x: 140, y: 160, w: 80,  h: 80,  cue: "Visible from entry" },
      { id: "reading",  label: "Reading",   x: 260, y: 100, w: 180, h: 200, cue: "Soft cork floor" },
      { id: "stacks",   label: "Stacks",    x: 460, y: 60,  w: 120, h: 140, cue: "Timber shelving" },
      { id: "quiet",    label: "Quiet",     x: 460, y: 230, w: 120, h: 130, cue: "Rammed earth alcove" },
    ],
    paths: {
      intuitive: "M 70 200 Q 140 200 180 200 Q 250 180 350 150 Q 430 120 520 130 M 350 200 Q 430 220 520 295",
      balanced:  "M 70 200 L 220 200 L 350 200 L 520 130 M 350 200 L 520 295",
      explicit:  "M 70 200 L 220 200 L 350 200 L 460 130 M 350 200 L 460 295 M 350 200 L 350 360",
    },
    cueMarkers: {
      landmarks: [{ x: 220, y: 200, label: "Help desk" }],
      signage:   [{ x: 350, y: 200, label: "Reading split" }],
      daylight:  [{ x: 350, y: 130, label: "Reading light" }],
      sightlines:[{ x: 70, y: 200, ex: 460, ey: 200, label: "Main axis" }],
      accessible:[{ x: 70, y: 200, ex: 350, ey: 200, label: "Accessible route" }],
    },
  },
  community: {
    zones: [
      { id: "entry",    label: "Entry",      x: 260, y: 20,  w: 80,  h: 60,  cue: "Covered porch" },
      { id: "heart",    label: "Heart",      x: 160, y: 120, w: 280, h: 180, cue: "Central hearth/skylight" },
      { id: "meeting",  label: "Meeting",    x: 30,  y: 100, w: 110, h: 160, cue: "Timber floor" },
      { id: "workshop", label: "Workshop",   x: 460, y: 100, w: 110, h: 160, cue: "Concrete floor" },
      { id: "garden",   label: "Garden",     x: 160, y: 320, w: 280, h: 70,  cue: "Permeable paving" },
    ],
    paths: {
      intuitive: "M 300 80 Q 270 120 250 200 Q 230 280 300 340 M 160 200 Q 100 200 85 180 M 440 200 Q 500 200 515 180",
      balanced:  "M 300 80 L 300 300 M 160 200 L 30 200 M 440 200 L 570 200",
      explicit:  "M 300 80 L 300 120 L 300 300 L 300 390 M 160 200 L 30 200 M 440 200 L 570 200",
    },
    cueMarkers: {
      landmarks: [{ x: 300, y: 210, label: "Community heart" }],
      signage:   [{ x: 300, y: 120, label: "Entry to heart" }, { x: 160, y: 200, label: "Side rooms" }],
      daylight:  [{ x: 300, y: 160, label: "Heart skylight" }],
      sightlines:[{ x: 300, y: 80, ex: 300, ey: 390, label: "Central spine" }],
      accessible:[{ x: 300, y: 80, ex: 300, ey: 320, label: "Accessible spine" }],
    },
  },
  workplace: {
    zones: [
      { id: "lobby",  label: "Lobby",       x: 30,  y: 160, w: 100, h: 80,  cue: "Exposed concrete" },
      { id: "collab", label: "Collaboration",x: 160, y: 120, w: 160, h: 160, cue: "Timber acoustic ceiling" },
      { id: "focus",  label: "Focus",        x: 360, y: 60,  w: 220, h: 130, cue: "Cork floor" },
      { id: "amenity",label: "Amenity",      x: 360, y: 220, w: 100, h: 120, cue: "Kitchen / cafe" },
      { id: "service",label: "Service",      x: 490, y: 220, w: 90,  h: 120, cue: "Service core" },
    ],
    paths: {
      intuitive: "M 80 200 Q 180 180 240 200 Q 340 220 450 125 M 360 280 Q 430 270 490 280",
      balanced:  "M 80 200 L 160 200 L 320 200 L 360 125 M 320 200 L 360 280",
      explicit:  "M 80 200 L 160 200 L 320 200 L 580 200 M 320 200 L 320 60 L 580 60",
    },
    cueMarkers: {
      landmarks: [{ x: 240, y: 200, label: "Collab hub" }],
      signage:   [{ x: 160, y: 200, label: "Entry split" }, { x: 320, y: 200, label: "Zone split" }],
      daylight:  [{ x: 440, y: 125, label: "Focus light" }],
      sightlines:[{ x: 80, y: 200, ex: 580, ey: 200, label: "Main axis" }],
      accessible:[{ x: 80, y: 200, ex: 360, ey: 200, label: "Accessible route" }],
    },
  },
  generic: {
    zones: [
      { id: "entry",  label: "Entry",       x: 30,  y: 160, w: 80,  h: 80,  cue: "Threshold marker" },
      { id: "heart",  label: "Heart",       x: 170, y: 120, w: 160, h: 160, cue: "Central skylight" },
      { id: "quiet",  label: "Quiet",       x: 380, y: 60,  w: 190, h: 130, cue: "Soft floor" },
      { id: "service",label: "Service",     x: 380, y: 230, w: 190, h: 130, cue: "Hard floor" },
      { id: "outdoor",label: "Outdoor",     x: 170, y: 320, w: 160, h: 70,  cue: "Permeable paving" },
    ],
    paths: {
      intuitive: "M 70 200 Q 200 160 250 200 Q 340 240 475 125 M 250 200 Q 340 260 475 295",
      balanced:  "M 70 200 L 170 200 L 330 200 L 380 125 M 330 200 L 380 295",
      explicit:  "M 70 200 L 170 200 L 330 200 L 570 200 M 330 200 L 330 360 L 570 360",
    },
    cueMarkers: {
      landmarks: [{ x: 250, y: 200, label: "Heart space" }],
      signage:   [{ x: 170, y: 200, label: "Entry junction" }, { x: 330, y: 200, label: "Zone split" }],
      daylight:  [{ x: 250, y: 160, label: "Skylight" }],
      sightlines:[{ x: 70, y: 200, ex: 570, ey: 200, label: "Main axis" }],
      accessible:[{ x: 70, y: 200, ex: 380, ey: 200, label: "Accessible route" }],
    },
  },
};

export function getPlanLayout(buildingType) {
  return PLAN_LAYOUTS[buildingType] ?? PLAN_LAYOUTS.generic;
}

export function deriveWayfindingStrategies(emotions = [], priorities = {}) {
  const scored = WAYFINDING_STRATEGIES.map((s) => {
    let score = 0;
    for (const eid of emotions) {
      if (s.triggers.emotions.includes(eid)) score += 3;
    }
    if (s.triggers.priorities) {
      for (const [key, band] of Object.entries(s.triggers.priorities)) {
        const v = priorities[key] ?? 50;
        const strength = priorityStrength(v, band);
        if (strength > 0) score += 2 * strength;
      }
    }
    return { ...s, score };
  });
  const kept = scored.filter((s) => s.score >= 2).sort((a, b) => b.score - a.score);
  const fallback = scored.filter((s) => s.score < 2).sort((a, b) => b.score - a.score);
  return [...kept, ...fallback].slice(0, 5);
}
