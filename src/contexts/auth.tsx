import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { authReducer, initalAuthState } from "../reducers/authReducer";
import {
  ReducerAuthType,
  User,
  UserAddress,
  UsersLS,
} from "../ts/models/auth.model";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { generateId } from "../utils/idGenerator";

interface ChildrenProps {
  children: React.ReactNode;
}

const AuthContext = createContext<ReducerAuthType | null>(null);

export function AuthContextProvider({ children }: ChildrenProps) {
  const navigate = useNavigate();
  const location = useLocation();

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

  function signIn(userInfo: User) {
    const newUser: UsersLS = {
      userInfo: {
        id: generateId(),
        ...userInfo,
      },
      userOrthers: [],
      userAddress: [],
    };

    usersStorage.push(newUser);

    localStorage.setItem("users", JSON.stringify(usersStorage));
    dispatch({ type: "SIGN_IN", payload: { userInfo: userInfo } });
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        userInfo: userInfo,
        userOrthers: [],
        userAddresses: [],
      },
    });
    navigate(`/account/${userInfo.name}`);
  }

  function login(userEmail: string, userPassword: string) {
    const userFound = usersStorage.find(
      (u) =>
        u.userInfo.email === userEmail && u.userInfo.password === userPassword
    );

    if (userFound) {
      sessionStorage.setItem("userLogged", JSON.stringify(userFound));
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          userInfo: userFound.userInfo,
          userOrthers: userFound.userOrthers,
          userAddresses: userFound.userAddress,
        },
      });
      const from = location.state?.from?.pathname || `/`;
      navigate(from, { replace: true });
    } else {
      dispatch({
        type: "LOGIN_ERROR",
      });
    }
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
    sessionStorage.removeItem("userLogged");
    navigate("/");
  }

  function addAddress(idUser: string, addresInfo: UserAddress) {
    const userIndex = usersStorage.findIndex((u) => u.userInfo.id === idUser);
    usersStorage[userIndex].userAddress.push(addresInfo);
    localStorage.setItem("users", JSON.stringify(usersStorage));
    sessionStorage.setItem(
      "userLogged",
      JSON.stringify(usersStorage[userIndex])
    );
    dispatch({ type: "ADD_ADDRESS", payload: { userAddress: addresInfo } });
    navigate(`/account/${state.userInfo.name}/addresses`);
  }

  function editUser(idUser: string, newName: string, newPassword: string) {
    const userIndex = usersStorage.findIndex((u) => u.userInfo.id === idUser);
    state.userInfo.name = newName;
    state.userInfo.password = newPassword;
    usersStorage[userIndex].userInfo.name = newName;
    usersStorage[userIndex].userInfo.password = newPassword;
    localStorage.setItem("users", JSON.stringify(usersStorage));
  }

  const authState = { state, signIn, login, logout, addAddress, editUser };

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
