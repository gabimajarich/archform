import { SITE_LABELS } from "./environmentMappings.js";

// Evaluates every rule against the inputs (and the derived material palette, so
// material/climate cross-references can fire). Each warning carries `drivers` —
// the inputs that triggered it — for explainability.
export function detectContradictions({ emotions = [], priorities: p = {}, buildingType, site }, materials = []) {
  const high = (v) => v >= 70;
  const low = (v) => v <= 30;
  const has = (e) => emotions.includes(e);
  const out = [];

  if (high(p.sustainability) && low(p.lowCarbon)) {
    out.push({
      id: "sustain-carbon",
      title: "Sustainability vs. embodied carbon",
      body: "Your sustainability priority is high, but low-carbon construction is rated low. High-embodied-carbon systems (concrete, steel) would undercut your stated intent.",
      drivers: ["High sustainability", "Low low-carbon"],
      alternatives: ["Cross-Laminated Timber", "Rammed Earth", "Recycled Brick"],
    });
  }

  if (high(p.budget) && (high(p.naturalMaterials) || high(p.lowCarbon))) {
    out.push({
      id: "budget-natural",
      title: "Budget vs. premium natural materials",
      body: "Tight budget sits alongside a strong pull toward natural / low-carbon materials, which often carry a cost premium. Expect to prioritise where the natural palette appears.",
      drivers: ["High budget", high(p.naturalMaterials) ? "Natural materials" : "Low carbon"],
      alternatives: ["Use timber/earth selectively at key public spaces", "Recycled brick & concrete for back-of-house", "Prefabrication to offset labour cost"],
    });
  }

  if (has("calm") && high(p.playfulness)) {
    out.push({
      id: "calm-play",
      title: "Calm vs. high playfulness",
      body: "You chose Calm as an intention while pushing playfulness very high. Without zoning, active energy can erode the calm atmosphere you're after.",
      drivers: ["Calm", "High playfulness"],
      alternatives: ["Zone active and quiet wings", "Acoustic buffers between them", "Provide dedicated quiet retreat spaces"],
    });
  }

  if ((has("reflection") || has("calm")) && high(p.communityInteraction)) {
    out.push({
      id: "quiet-community",
      title: "Quiet retreat vs. high community interaction",
      body: "Intentions of quiet/reflection compete with a high community-interaction priority. Both are achievable but need clear spatial separation.",
      drivers: [has("reflection") ? "Reflection" : "Calm", "High community interaction"],
      alternatives: ["Graded transition from social to quiet zones", "A retreat space off the main social heart"],
    });
  }

  if ((has("flexibility") || high(p.flexibility)) && high(p.durability) && low(p.budget)) {
    out.push({
      id: "flex-durable",
      title: "Flexibility vs. heavyweight permanence",
      body: "Flexible, reconfigurable space and very high durability can pull against each other — permanent heavy construction resists change.",
      drivers: [has("flexibility") ? "Flexibility" : "High flexibility", "High durability", "Low budget"],
      alternatives: ["Permanent core + loose-fit interior", "Demountable partitions", "Long-life shell, short-life fit-out strategy"],
    });
  }

  if (high(p.passiveDesign) && site === "arid" && (has("freedom") || has("wonder"))) {
    out.push({
      id: "passive-arid-glazing",
      title: "Open/glazed character vs. arid passive design",
      body: "An open, expansive character in an arid climate risks heat gain. Passive performance here favours smaller, shaded openings and thermal mass.",
      drivers: ["High passive design", "Arid", has("freedom") ? "Freedom" : "Wonder"],
      alternatives: ["Shade and recess glazing", "Courtyard plan", "High thermal mass walls"],
    });
  }

  if (high(p.accessibility) && has("play")) {
    out.push({
      id: "access-play",
      title: "Accessibility vs. playful level changes",
      body: "Playful split-levels, ramps and climbable thresholds must be checked against your high accessibility priority so no group is excluded.",
      drivers: ["High accessibility", "Play"],
      alternatives: ["Provide accessible parallel routes", "Ramp gradients within code", "Inclusive play elements at multiple abilities"],
    });
  }

  if (high(p.efficiency) && (has("exploration") || has("curiosity"))) {
    out.push({
      id: "efficiency-wander",
      title: "Efficiency vs. exploratory circulation",
      body: "Episodic, meandering routes that create discovery also add circulation area, which works against a high space-efficiency priority. Decide where each wins.",
      drivers: ["High efficiency", has("exploration") ? "Exploration" : "Curiosity"],
      alternatives: ["Concentrate 'wander' at the public route only", "Keep service/back-of-house direct", "Borrow circulation as usable space"],
    });
  }

  // --- Cross-reference: timber intent vs. a bushfire-prone site ---
  // The climate filter already steers combustible timber out of the palette, so
  // this fires on the underlying tension: either combustible material survived,
  // or the user's priorities lean to timber that the site won't safely allow.
  const combustible = materials.filter((m) => m.combustible);
  const wantsTimber = high(p.naturalMaterials) || high(p.lowCarbon);
  if (site === "bushland" && (combustible.length > 0 || wantsTimber)) {
    const body = combustible.length > 0
      ? `Your palette still carries combustible timber (${combustible.map((m) => m.name).join(", ")}) on a bushfire-prone bushland site — this needs explicit bushfire detailing at the fire-exposed envelope.`
      : "Your priorities favour natural / low-carbon timber, which ARCHFORM has steered out of the palette for this bushfire-prone site. If timber returns for warmth or carbon, it must be detailed for bushfire.";
    out.push({
      id: "timber-bushfire",
      title: "Timber intent vs. bushfire site",
      body,
      drivers: ["Bushland", ...(combustible.length ? combustible.map((m) => m.name) : [high(p.naturalMaterials) ? "Natural materials" : "Low carbon"])],
      alternatives: ["BAL-rated detailing and ember screening", "Non-combustible cladding to exposed elevations", "Keep timber to protected courtyards / interiors", "Rammed earth, masonry or concrete at the fire front"],
    });
  }

  // --- Cross-reference: lightweight/biogenic palette in a flood/waterfront zone ---
  if (site === "waterfront" && materials.some((m) => m.family === "timber" || m.family === "earth")) {
    out.push({
      id: "moisture-waterfront",
      title: "Moisture-sensitive palette vs. waterfront site",
      body: "Timber or earth materials on a waterfront/flood site risk moisture damage at the wet zone. Keep them clear of the splash and flood line.",
      drivers: ["Waterfront", "Timber / earth palette"],
      alternatives: ["Elevate moisture-sensitive material above flood level", "Stone / concrete to the wet base", "Ventilated, drained detailing"],
    });
  }

  return out;
}
