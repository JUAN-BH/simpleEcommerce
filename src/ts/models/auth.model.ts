export interface User {
  name?: string;
  email?: string;
  // phone?: number;
  password?: string;
}

export interface UserAddress {
  country?: string;
  city?: string;
  state?: string;
  address?: string;
  zipCode?: string;
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
  userInfo: User;
  userOrthers: Orders[];
  userAddresses: UserAddress[];
}

export interface AuthAction {
  type: "SIGN_IN" | "LOGIN" | "LOGOUT" | "ADD_OTHER" | "ADD_ADDRESS";
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
  state: InitalAuthState;
  signIn: (userInfo: User) => void;
  login: (userEmail: string, userPassword: string) => void;
  logout: () => void;
  addAddress: (addressInfo: UserAddress) => void;
}
