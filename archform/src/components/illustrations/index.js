import PlaceholderMark from "./PlaceholderMark.jsx";
import {
  Freedom, Curiosity, Play, Community, Wonder, Reflection, Calm,
  Exploration, Connection, Ceremony, Groundedness, Flexibility,
  Safety, Creativity, Belonging,
} from "./emotionIllustrations.jsx";

// Map emotion id -> abstract architectural illustration component.
const ILLUSTRATIONS = {
  freedom: Freedom,
  curiosity: Curiosity,
  play: Play,
  community: Community,
  wonder: Wonder,
  reflection: Reflection,
  calm: Calm,
  exploration: Exploration,
  connection: Connection,
  ceremony: Ceremony,
  groundedness: Groundedness,
  flexibility: Flexibility,
  safety: Safety,
  creativity: Creativity,
  belonging: Belonging,
};

export function getIllustration(id) {
  return ILLUSTRATIONS[id] ?? PlaceholderMark;
}
