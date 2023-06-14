export interface User {
  name?: string;
  email?: string;
  phone?: number;
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
}

export interface InitalAuthState {
  userInfo: User;
  userOrthers: Orders[];
}

export interface AuthAction {
  type: "SIGN_IN" | "LOGIN" | "LOGOUT" | "ADD_OTHER";
  payload?: {
    userInfo?: User;
    userOrthers?: Orders[];
    order?: Orders;
  };
}

// export interface ReducerAuthType {
//   state: InitalAuthState;
//   dispatch: React.Dispatch<AuthAction>;
// }
export interface ReducerAuthType {
  state: InitalAuthState;
  signIn: (userInfo: User) => void;
  login: (userEmail: string) => void;
  logout: () => void;
}
