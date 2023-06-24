import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { authReducer, initalAuthState } from "../reducers/authReducer";
import { ReducerAuthType, UsersLS } from "../ts/models/auth.model";
import { Navigate, useLocation } from "react-router-dom";

interface ChildrenProps {
  children: React.ReactNode;
}

const AuthContext = createContext<ReducerAuthType | null>(null);

export function AuthContextProvider({ children }: ChildrenProps) {
  const [state, dispatch] = useReducer(authReducer, initalAuthState);
  const [usersStorage, setUsersStorage] = useState<UsersLS[]>([]);

  //*Trae o crea los usuarios en localStorage
  useEffect(() => {
    setUsersStorage(JSON.parse(localStorage.getItem("users") || "[]"));
    if (!Array.isArray(usersStorage)) {
      localStorage.setItem("users", JSON.stringify([]));
    } else {
      setUsersStorage(JSON.parse(localStorage.getItem("users") || "[]"));
    }
  }, []);
  //*Retiene el usuario logeado
  useEffect(() => {
    const userLogged: UsersLS = JSON.parse(
      sessionStorage.getItem("userLogged") || "{}"
    );
    if (userLogged) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          userInfo: userLogged.userInfo,
          userOrthers: userLogged.userOrthers,
          userAddresses: userLogged.userAddress,
        },
      });
    } else {
      sessionStorage.setItem("userLogged", JSON.stringify({}));
    }
  }, []);

  const authState = { usersStorage, state, dispatch };

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  const authState = useContext(AuthContext);
  if (authState) return authState;
}

export function PrivateRoute({ children }: ChildrenProps) {
  const authState = useAuthContext();
  const location = useLocation();

  const userLogged: UsersLS = JSON.parse(
    sessionStorage.getItem("userLogged") || "{}"
  );

  if (
    authState?.state.userInfo.name == undefined &&
    userLogged.userInfo == undefined
  ) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }
  return children;
}

export function PrivateOnAuth({ children }: ChildrenProps) {
  const authState = useAuthContext();

  const userLogged: UsersLS = JSON.parse(
    sessionStorage.getItem("userLogged") || "{}"
  );

  if (authState?.state.userInfo.name && userLogged.userInfo.name) {
    return <Navigate to="/" />;
  }
  return children;
}
