import { USER_ACTION_TYPES } from "./authentication.types";

const INITIAL_STATE = {
  currentUser: null
}

export const authenticationReducer = (state = INITIAL_STATE, action: any = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {...state, currentUser: payload};
    case USER_ACTION_TYPES.CLEAR_CURRENT_USER:
      return {...state, currentUser: null};
    default:
      return state;
  }
}