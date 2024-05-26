import { createAction } from "../../utils/reducer/reducer.utils";
import { GAME_ACTION_TYPES } from "./game.types";
import { GameStatusEnum, Quote } from "../../types/globalTypes";

export const setQuote = (quote: Quote) => 
  createAction(GAME_ACTION_TYPES.SET_QUOTE, quote);

export const setErrorsCount = (errorsCount: number) =>
  createAction(GAME_ACTION_TYPES.SET_ERRORS_COUNT, errorsCount);

export const incrementErrorsCount = () => 
  createAction(GAME_ACTION_TYPES.INCREMENT_ERRORS_COUNT, null);

export const addChosenLetter = (letter: string) => 
  createAction(GAME_ACTION_TYPES.ADD_CHOSEN_LETTER, letter);

export const clearChosenLetters = () => 
  createAction(GAME_ACTION_TYPES.CLERAR_CHOSEN_LETTERS, []);

export const setGameStatus = (gameStatus: GameStatusEnum) => 
  createAction(GAME_ACTION_TYPES.SET_GAME_STATUS, gameStatus);

export const setGameStartTime = (gameStartTime: number) => 
  createAction(GAME_ACTION_TYPES.SET_GAME_START_TIME, gameStartTime);
