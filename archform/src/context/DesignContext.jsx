import { createContext, useContext, useReducer } from "react";
import { generate } from "../engine/generate.js";

export const initialState = {
  step: 0, // 0..3
  emotions: [], // array of emotion ids, length 3..5
  priorities: {
    sustainability: 50, budget: 50, efficiency: 50, passiveDesign: 50,
    communityInteraction: 50, naturalMaterials: 50, playfulness: 50,
    flexibility: 50, lowCarbon: 50, accessibility: 50, durability: 50,
  },
  buildingType: null, // id from list, or "other"
  buildingTypeOther: "", // free text when buildingType === "other"
  site: null, // single climate id
  results: null, // set after generate(); null until computed
  shuffleSeed: 0, // bumped by "Regenerate Design Path"
};

const MAX_EMOTIONS = 5;

// Build the inputs object the engine expects from current state.
function toInputs(state) {
  return {
    emotions: state.emotions,
    priorities: state.priorities,
    buildingType: state.buildingType,
    buildingTypeOther: state.buildingTypeOther,
    site: state.site,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "SELECT_EMOTION": {
      const { id } = action;
      const selected = state.emotions.includes(id);
      if (selected) {
        return { ...state, emotions: state.emotions.filter((e) => e !== id) };
      }
      if (state.emotions.length >= MAX_EMOTIONS) return state; // block the 6th
      return { ...state, emotions: [...state.emotions, id] };
    }
    case "SET_PRIORITY":
      return {
        ...state,
        priorities: { ...state.priorities, [action.key]: action.value },
      };
    case "SET_BUILDING_TYPE":
      return {
        ...state,
        buildingType: action.id,
        // clear free text if leaving "other"
        buildingTypeOther: action.id === "other" ? state.buildingTypeOther : "",
      };
    case "SET_BUILDING_OTHER":
      return { ...state, buildingTypeOther: action.value };
    case "SET_SITE":
      return { ...state, site: action.id };
    case "GOTO_STEP":
      return { ...state, step: action.step };
    case "GENERATE":
      return {
        ...state,
        results: generate(toInputs(state), state.shuffleSeed),
      };
    case "REGENERATE": {
      const seed = state.shuffleSeed + 1;
      return {
        ...state,
        shuffleSeed: seed,
        results: generate(toInputs(state), seed),
      };
    }
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

const DesignContext = createContext(null);

export function DesignProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DesignContext.Provider value={{ state, dispatch }}>
      {children}
    </DesignContext.Provider>
  );
}

export function useDesign() {
  const ctx = useContext(DesignContext);
  if (!ctx) throw new Error("useDesign must be used within DesignProvider");
  return ctx;
}

// Gate helpers shared by App for enabling/disabling Continue.
export function canAdvance(state) {
  switch (state.step) {
    case 0:
      return state.emotions.length >= 3;
    case 1:
      return true;
    case 2:
      if (!state.buildingType) return false;
      if (state.buildingType === "other" && !state.buildingTypeOther.trim()) return false;
      return state.site !== null;
    default:
      return true;
  }
}
