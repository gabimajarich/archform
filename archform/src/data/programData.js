// Programmatic spaces + adjacencies per building type, used to generate the
// bubble / adjacency diagram. `role` drives how community/connection scores
// scale a space; `size` is a relative area weight; links carry a base strength.
const PROGRAMS = {
  school: {
    spaces: [
      { id: "entry", label: "Entry", size: 1.0, role: "entry" },
      { id: "class", label: "Classrooms", size: 2.2, role: "primary" },
      { id: "hall", label: "Assembly Hall", size: 1.6, role: "communal" },
      { id: "library", label: "Library", size: 1.2, role: "primary" },
      { id: "play", label: "Outdoor Play", size: 1.5, role: "outdoor" },
      { id: "admin", label: "Admin", size: 0.9, role: "service" },
    ],
    links: [["entry", "hall", 0.9], ["hall", "class", 1.0], ["hall", "library", 0.7], ["hall", "play", 0.8], ["class", "play", 0.6], ["entry", "admin", 0.6]],
  },
  housing: {
    spaces: [
      { id: "entry", label: "Entry", size: 0.9, role: "entry" },
      { id: "commons", label: "Shared Commons", size: 1.4, role: "communal" },
      { id: "units", label: "Dwellings", size: 2.4, role: "private" },
      { id: "court", label: "Courtyard", size: 1.5, role: "outdoor" },
      { id: "service", label: "Services", size: 0.8, role: "service" },
      { id: "park", label: "Parking", size: 1.0, role: "service" },
    ],
    links: [["entry", "commons", 0.8], ["commons", "units", 0.9], ["commons", "court", 1.0], ["units", "court", 0.7], ["entry", "park", 0.6], ["commons", "service", 0.5]],
  },
  museum: {
    spaces: [
      { id: "foyer", label: "Foyer", size: 1.2, role: "entry" },
      { id: "gallery", label: "Galleries", size: 2.4, role: "primary" },
      { id: "atrium", label: "Atrium", size: 1.5, role: "communal" },
      { id: "cafe", label: "Café", size: 0.9, role: "communal" },
      { id: "education", label: "Education", size: 1.0, role: "primary" },
      { id: "boh", label: "Back-of-house", size: 1.1, role: "service" },
    ],
    links: [["foyer", "atrium", 1.0], ["atrium", "gallery", 1.0], ["atrium", "cafe", 0.8], ["atrium", "education", 0.7], ["gallery", "boh", 0.6], ["foyer", "cafe", 0.5]],
  },
  library: {
    spaces: [
      { id: "entry", label: "Entry", size: 1.0, role: "entry" },
      { id: "reading", label: "Reading Room", size: 2.2, role: "primary" },
      { id: "stacks", label: "Stacks", size: 1.6, role: "primary" },
      { id: "event", label: "Event Space", size: 1.3, role: "communal" },
      { id: "childrens", label: "Children's", size: 1.1, role: "primary" },
      { id: "quiet", label: "Quiet Study", size: 0.9, role: "private" },
    ],
    links: [["entry", "reading", 1.0], ["reading", "stacks", 0.9], ["entry", "event", 0.8], ["reading", "childrens", 0.6], ["reading", "quiet", 0.7], ["entry", "childrens", 0.5]],
  },
  community: {
    spaces: [
      { id: "foyer", label: "Foyer", size: 1.0, role: "entry" },
      { id: "hall", label: "Multi-purpose Hall", size: 2.4, role: "communal" },
      { id: "meeting", label: "Meeting Rooms", size: 1.2, role: "primary" },
      { id: "kitchen", label: "Kitchen / Café", size: 1.0, role: "communal" },
      { id: "outdoor", label: "Outdoor", size: 1.4, role: "outdoor" },
      { id: "admin", label: "Admin", size: 0.7, role: "service" },
    ],
    links: [["foyer", "hall", 1.0], ["hall", "meeting", 0.8], ["hall", "kitchen", 0.9], ["hall", "outdoor", 0.9], ["foyer", "admin", 0.5]],
  },
  hospitality: {
    spaces: [
      { id: "lobby", label: "Lobby", size: 1.2, role: "entry" },
      { id: "rooms", label: "Guest Rooms", size: 2.4, role: "private" },
      { id: "dining", label: "Dining", size: 1.4, role: "communal" },
      { id: "lounge", label: "Lounge", size: 1.2, role: "communal" },
      { id: "amenity", label: "Amenity / Spa", size: 1.1, role: "primary" },
      { id: "service", label: "Service", size: 1.1, role: "service" },
    ],
    links: [["lobby", "lounge", 1.0], ["lobby", "dining", 0.9], ["lobby", "rooms", 0.8], ["lounge", "amenity", 0.7], ["dining", "service", 0.6]],
  },
  commercial: {
    spaces: [
      { id: "entry", label: "Entry", size: 1.0, role: "entry" },
      { id: "retail", label: "Retail Floor", size: 2.4, role: "primary" },
      { id: "atrium", label: "Atrium", size: 1.4, role: "communal" },
      { id: "service", label: "Services", size: 1.0, role: "service" },
      { id: "boh", label: "Back-of-house", size: 1.0, role: "service" },
    ],
    links: [["entry", "atrium", 1.0], ["atrium", "retail", 1.0], ["retail", "service", 0.6], ["entry", "boh", 0.5]],
  },
  public: {
    spaces: [
      { id: "plaza", label: "Plaza / Commons", size: 2.4, role: "communal" },
      { id: "pavilion", label: "Pavilion", size: 1.4, role: "primary" },
      { id: "landscape", label: "Landscape", size: 1.6, role: "outdoor" },
      { id: "amenities", label: "Amenities", size: 1.0, role: "service" },
      { id: "service", label: "Service", size: 0.8, role: "service" },
    ],
    links: [["plaza", "pavilion", 1.0], ["plaza", "landscape", 1.0], ["plaza", "amenities", 0.7], ["pavilion", "service", 0.5]],
  },
  workplace: {
    spaces: [
      { id: "reception", label: "Reception", size: 1.0, role: "entry" },
      { id: "open", label: "Open Workspace", size: 2.4, role: "primary" },
      { id: "meeting", label: "Meeting", size: 1.2, role: "primary" },
      { id: "breakout", label: "Breakout", size: 1.3, role: "communal" },
      { id: "quiet", label: "Quiet / Focus", size: 0.9, role: "private" },
      { id: "service", label: "Service", size: 0.9, role: "service" },
    ],
    links: [["reception", "breakout", 0.9], ["breakout", "open", 1.0], ["open", "meeting", 0.8], ["open", "quiet", 0.7], ["reception", "service", 0.5]],
  },
  generic: {
    spaces: [
      { id: "entry", label: "Entry", size: 1.0, role: "entry" },
      { id: "primary", label: "Primary Space", size: 2.2, role: "primary" },
      { id: "shared", label: "Shared Space", size: 1.4, role: "communal" },
      { id: "support", label: "Support", size: 1.0, role: "service" },
      { id: "service", label: "Service", size: 0.8, role: "service" },
    ],
    links: [["entry", "shared", 0.9], ["shared", "primary", 1.0], ["primary", "support", 0.6], ["entry", "service", 0.5]],
  },
};

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// Build the diagram graph for a building type, scaling communal/outdoor spaces
// and link strengths by the community-interaction priority and the community /
// connection emotions. Returns { spaces:[{id,label,size,role}], links:[{a,b,strength}] }.
export function deriveProgram(buildingType, priorities = {}, emotions = []) {
  const base = PROGRAMS[buildingType] || PROGRAMS.generic;
  const ci = (priorities.communityInteraction ?? 50) / 100;
  const hasCommunity = emotions.includes("community") || emotions.includes("belonging");
  const hasConnection = emotions.includes("connection");

  // social weighting → bigger communal/outdoor hearts
  const socialF = clamp(0.7 + ci * 0.7 + (hasCommunity ? 0.35 : 0), 0.65, 1.8);
  // connection weighting → stronger, more open adjacencies
  const connF = clamp(0.75 + ci * 0.4 + (hasConnection ? 0.4 : 0), 0.7, 1.7);

  const spaces = base.spaces.map((s) => ({
    ...s,
    size: (s.role === "communal" || s.role === "outdoor") ? +(s.size * socialF).toFixed(2) : s.size,
  }));
  const links = base.links.map(([a, b, strength]) => ({ a, b, strength: +(strength * connF).toFixed(2) }));

  return { spaces, links };
}
