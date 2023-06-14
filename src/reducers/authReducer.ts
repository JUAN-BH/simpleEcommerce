import {
  AuthAction,
  InitalAuthState,
  User,
  Orders,
} from "../ts/models/auth.model";

export const initalAuthState: InitalAuthState = {
  userInfo: {},
  userOrthers: [],
};

export function authReducer(state: InitalAuthState, action: AuthAction) {
  const { type, payload } = action;

  switch (type) {
    case "SIGN_IN":
      return payload && payload.userInfo
        ? {
            ...state,
            userInfo: payload.userInfo,
            userOrthers: [],
          }
        : state;

    case "LOGIN":
      return payload && payload.userInfo && payload.userOrthers
        ? {
            ...state,
            userInfo: payload.userInfo,
            userOrthers: payload.userOrthers,
          }
        : state;

    case "LOGOUT":
      return {
        ...state,
        userInfo: {} as User,
        userOrthers: [] as Orders[],
      };

    case "ADD_OTHER":
      return payload && payload.order
        ? {
            ...state,
            userOrthers: [...state.userOrthers, payload.order],
          }
        : state;

    default:
      return state;
  }
}
