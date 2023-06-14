import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { authReducer, initalAuthState } from "../reducers/authReducer";
import { ReducerAuthType, User, UsersLS } from "../ts/models/auth.model";
import { useNavigate } from "react-router-dom";

interface AuthProps {
  children: React.ReactNode;
}

const AuthContext = createContext<ReducerAuthType | null>(null);

export function AuthContextProvider({ children }: AuthProps) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(authReducer, initalAuthState);
  const [usersStorage, setUsersStorage] = useState<UsersLS[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setUsersStorage(JSON.parse(localStorage.getItem("users") || "[]"));
    if (!Array.isArray(usersStorage)) {
      localStorage.setItem("users", JSON.stringify([]));
    } else {
      setUsersStorage(JSON.parse(localStorage.getItem("users") || "[]"));
    }
  }, []);

  function signIn(userInfo: User) {
    const newUser: UsersLS = {
      userInfo: {
        ...userInfo,
      },
      userOrthers: [],
    };

    usersStorage.push(newUser);

    localStorage.setItem("users", JSON.stringify(usersStorage));
    dispatch({ type: "SIGN_IN", payload: { userInfo: userInfo } });
  }

  function login(userEmail: string) {
    const userFound = usersStorage.find((u) => u.userInfo.email === userEmail);
    // let from =
    //   location.state?.from?.pathname || `/porfile/${userFound.userName}`;
    if (userFound) {
      dispatch({
        type: "LOGIN",
        payload: {
          userInfo: userFound.userInfo,
          userOrthers: userFound.userOrthers,
        },
      });
      navigate("/");
    }
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  }

  // function editUser(newContact, newDescription) {
  //   let userToEditIndex = users.findIndex(
  //     (u) => u.userName === userLogged.userName
  //   );
  //   const userEdit = {
  //     ...users[userToEditIndex],
  //     contact: newContact,
  //     description: newDescription,
  //   };
  //   const newUsers = users;
  //   newUsers[userToEditIndex] = userEdit;
  //   setUsers(newUsers);

  //   navigate(`/profile/${userLogged.userName}`);
  // }

  const authState = { state, signIn, login, logout };

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  const authState = useContext(AuthContext);
  if (authState) return authState;
}
