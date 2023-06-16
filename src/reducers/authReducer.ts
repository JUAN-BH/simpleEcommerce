import {
  AuthAction,
  InitalAuthState,
  User,
  Orders,
  UserAddress,
} from "../ts/models/auth.model";

export const initalAuthState: InitalAuthState = {
  userInfo: {},
  userOrthers: [],
  userAddresses: [],
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
            userAddresses: [],
          }
        : state;

    case "LOGIN":
      return payload &&
        payload.userInfo &&
        payload.userOrthers &&
        payload.userAddresses
        ? {
            ...state,
            userInfo: payload.userInfo,
            userOrthers: payload.userOrthers,
            userAddresses: payload.userAddresses,
          }
        : state;

    case "LOGOUT":
      return {
        ...state,
        userInfo: {} as User,
        userOrthers: [] as Orders[],
        userAddresses: [] as UserAddress[],
      };

    case "ADD_OTHER":
      return payload && payload.order
        ? {
            ...state,
            userOrthers: [...state.userOrthers, payload.order],
          }
        : state;

    case "ADD_ADDRESS":
      return payload && payload.userAddress
        ? {
            ...state,
            userAddresses: [...state.userAddresses, payload.userAddress],
          }
        : state;

    default:
      return state;
  }
}
