export interface User {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
}

export interface UserAddress {
  idAddress: string;
  name: string;
  address: string;
  extraInfo?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface Orders {
  name: string;
}

export interface UsersLS {
  userInfo: User;
  userOrthers: Orders[];
  userAddress: UserAddress[];
}

export interface InitalAuthState {
  loginError: boolean;
  userInfo: User;
  userOrthers: Orders[];
  userAddresses: UserAddress[];
}

export interface AuthAction {
  type:
    | "SIGN_IN"
    | "LOGIN_ERROR"
    | "LOGIN_SUCCESS"
    | "LOGOUT"
    | "EDIT_USER"
    | "ADD_OTHER"
    | "ADD_ADDRESS"
    | "REMOVE_ADDRESS"
    | "EDIT_ADDRESS";
  payload?: {
    userInfo?: User;
    userOrthers?: Orders[];
    order?: Orders;
    userAddresses?: UserAddress[];
    userAddress?: UserAddress;
  };
}

// export interface ReducerAuthType {
//   state: InitalAuthState;
//   dispatch: React.Dispatch<AuthAction>;
// }
export interface ReducerAuthType {
  usersStorage: UsersLS[];
  state: InitalAuthState;
  dispatch: React.Dispatch<AuthAction>;
}
