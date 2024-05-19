import { createAction } from "../../utils/reducer/reducer.utils";
import { QUOTE_ACTION_TYPES } from "./game.types";
import { Quote } from "../../types/globalTypes";

export const setQuote = (quote: Quote) => 
  createAction(QUOTE_ACTION_TYPES.SET_QUOTE, quote)