import { Dispatch, ReactNode, SetStateAction, createContext, useReducer } from "react";

type UserContextType = {
  currentUser: null | string;
  setCurrentUser: Dispatch<SetStateAction<null | string>>;
};

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  'SET_CURRENT_USER': 'SET_CURRENT_USER'
}

const INITIAL_STATE = {
  currentUser: null
}

const userReducer = (state: any, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default:
      throw Error(`Unhandled type ${type}`);
  }
}



export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user: any) => {
    dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
  };

  const value = { currentUser, setCurrentUser }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}