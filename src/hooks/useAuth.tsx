import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";
import { User, UserAddress, UsersLS } from "../ts/models/auth.model";
import { generateId } from "../utils/idGenerator";

interface ReturnFunc {
  signIn: (userInfo: User) => void;
  login: (userEmail: string, userPassword: string) => void;
  logout: () => void;
  addAddress: (idUser: string, addressInfo: UserAddress) => void;
  editUser: (idUser: string, newName: string, newPassword: string) => void;
}

export const useAuth = (): ReturnFunc => {
  const navigate = useNavigate();
  const location = useLocation();
  const authState = useAuthContext();

  function signIn(userInfo: User) {
    const newUser: UsersLS = {
      userInfo: {
        id: generateId(),
        ...userInfo,
      },
      userOrthers: [],
      userAddress: [],
    };

    authState?.usersStorage.push(newUser);

    localStorage.setItem("users", JSON.stringify(authState?.usersStorage));
    authState?.dispatch({ type: "SIGN_IN", payload: { userInfo: userInfo } });
    authState?.dispatch({
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
    const userFound = authState?.usersStorage.find(
      (u) =>
        u.userInfo.email === userEmail && u.userInfo.password === userPassword
    );

    if (userFound) {
      sessionStorage.setItem("userLogged", JSON.stringify(userFound));
      authState?.dispatch({
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
      authState?.dispatch({
        type: "LOGIN_ERROR",
      });
    }
  }
  function logout() {
    authState?.dispatch({ type: "LOGOUT" });
    sessionStorage.removeItem("userLogged");
    navigate("/");
  }

  function editUser(id: string, name: string, password: string): void {
    const userIndex = authState?.usersStorage.findIndex(
      (u) => u.userInfo.id === id
    );

    if (name !== "") {
      const userInfo = authState?.state.userInfo;
      const userStorageInfo =
        authState?.usersStorage[userIndex as number]?.userInfo;
      userInfo && (userInfo.name = name);
      userStorageInfo && (userStorageInfo.name = name);
    } else if (password !== "") {
      const userInfo = authState?.state.userInfo;
      const userStorageInfo =
        authState?.usersStorage[userIndex as number]?.userInfo;
      userInfo && (userInfo.password = password);
      userStorageInfo && (userStorageInfo.password = password);
    }

    localStorage.setItem("users", JSON.stringify(authState?.usersStorage));
  }

  function addAddress(idUser: string, addresInfo: UserAddress) {
    const userIndex = authState?.usersStorage.findIndex(
      (u) => u.userInfo.id === idUser
    );
    authState?.usersStorage[userIndex as number].userAddress.push(addresInfo);
    localStorage.setItem("users", JSON.stringify(authState?.usersStorage));
    sessionStorage.setItem(
      "userLogged",
      JSON.stringify(authState?.usersStorage[userIndex as number])
    );
    authState?.dispatch({
      type: "ADD_ADDRESS",
      payload: { userAddress: addresInfo },
    });
    navigate(`/account/${authState?.state.userInfo.name}/addresses`);
  }

  // function removeAddress(idUser: string, addressId: string) {
  //   const userIndex = authState?.usersStorage.findIndex(
  //     (u) => u.userInfo.id === idUser
  //   );

  //   if (
  //     userIndex !== undefined &&
  //     authState?.usersStorage[userIndex]?.userAddress
  //   ) {
  //     const addressesInStorage = authState.usersStorage[userIndex].userAddress;

  //     authState.usersStorage[userIndex].userAddress =
  //       addressesInStorage?.filter((a) => a.id !== addressId);

  //     localStorage.setItem("users", JSON.stringify(authState?.usersStorage));
  //     sessionStorage.setItem(
  //       "userLogged",
  //       JSON.stringify(authState?.usersStorage[userIndex as number])
  //     );
  //     authState.dispatch({
  //       type: "REMOVE_ADDRESS",
  //       payload: { addressId: addressId },
  //     })
  //     navigate(`/account/${authState?.state.userInfo.name}/addresses`);
  //   }

  // }

  return {
    signIn,
    login,
    logout,
    addAddress,
    editUser,
  };
};
