import { GAME_ACTION_TYPES } from "./game.types";

const INITIAL_STATE = {
  quote: null,
  errorsCount: 0,
  gameDuration: null,
  chosenLetters: []
}

export const gameReducer = (state = INITIAL_STATE, action: any = {}) => {
  const { type, payload } = action;

  switch (type) {
    case GAME_ACTION_TYPES.SET_QUOTE:
      return { ...state, quote: payload };

    case GAME_ACTION_TYPES.CLEAR_QUOTE:
      return { ...state, quote: null };

    case GAME_ACTION_TYPES.SET_ERRORS_COUNT:
      return { ...state, errorsCount: payload };

    case GAME_ACTION_TYPES.INCREMENT_ERRORS_COUNT:
      return { ...state, errorsCount: state.errorsCount + 1 }

    case GAME_ACTION_TYPES.ADD_CHOSEN_LETTER:
      return { ...state, chosenLetters: [...state.chosenLetters, payload] }

    case GAME_ACTION_TYPES.CLERAR_CHOSEN_LETTERS:
      return { ...state, chosenLetters: [] }
      
    default:
      return state;
  }
}