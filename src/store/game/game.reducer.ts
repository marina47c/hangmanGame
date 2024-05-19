import { QUOTE_ACTION_TYPES } from "./game.types";

const INITIAL_STATE = {
  quote: null
}

export const gameReducer = (state = INITIAL_STATE, action: any = {}) => {
  const { type, payload } = action;

  switch (type) {
    case QUOTE_ACTION_TYPES.SET_QUOTE:
      return { ...state, quote: payload };
    case QUOTE_ACTION_TYPES.CLEAR_QUOTE:
      return { ...state, quote: null};
    default:
      return state;
  }
}