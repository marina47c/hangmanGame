import { combineReducers } from "redux";
import { authenticationReducer } from "./authentication/authentication.reducer";
import { gameReducer } from "./game/game.reducer";

export const rootReducer = combineReducers({
  authentication: authenticationReducer,
  game: gameReducer
});