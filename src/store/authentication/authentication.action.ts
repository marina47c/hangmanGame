import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./authentication.types";
import { User } from "../../types/globalTypes";

export const setCurrentUser = (user: User) => 
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

//TODO: do it this way?
export const clearCurrentUser = () =>
  createAction(USER_ACTION_TYPES.CLEAR_CURRENT_USER, null);

