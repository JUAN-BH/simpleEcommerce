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
  removeAddress: (idAddress: string) => void;
  editAddress: (idAddress: string, addressInfo: UserAddress) => void;
  setDefaultAddress: (idAddress: string) => void;
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
    navigate(`/account/${userInfo.id}`);
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
    console.log("add address", addresInfo);

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

    if (addresInfo.isDefault) {
      setDefaultAddress(addresInfo.idAddress);
    }

    navigate(`/account/${authState?.state.userInfo.id}/addresses`);
  }

  function removeAddress(idAddress: string) {
    const usersInLs = authState?.usersStorage;
    const currentUserId = authState?.state.userInfo.id;
    const userIndex = authState?.usersStorage.findIndex(
      (u) => u.userInfo.id === currentUserId
    );
    const newAddresses = authState?.state.userAddresses.filter(
      (a) => a.idAddress !== idAddress
    );
    authState?.dispatch({
      type: "REMOVE_ADDRESS",
      payload: { userAddresses: newAddresses },
    });

    if (usersInLs && newAddresses) {
      usersInLs[userIndex as number].userAddress = newAddresses;
    }
    localStorage.setItem("users", JSON.stringify(usersInLs));
    if (usersInLs)
      sessionStorage.setItem(
        "userLogged",
        JSON.stringify(usersInLs[userIndex as number])
      );
    navigate(`/account/${authState?.state.userInfo.id}/addresses`);
  }

  function editAddress(idAddress: string, addressInfo: UserAddress) {
    const usersInLs = authState?.usersStorage;
    const userId = authState?.state.userInfo.id;
    const userIndex = authState?.usersStorage.findIndex(
      (u) => u.userInfo.id === userId
    );

    const addresIndex = authState?.state.userAddresses.findIndex(
      (a) => a.idAddress === idAddress
    );
    const userAddressModified = authState?.state.userAddresses;
    if (userAddressModified && addressInfo) {
      userAddressModified[addresIndex as number] = addressInfo;
      authState?.dispatch({
        type: "EDIT_ADDRESS",
        payload: { userAddresses: userAddressModified },
      });
    }

    if (usersInLs && addressInfo) {
      usersInLs[userIndex as number].userAddress[addresIndex as number] =
        addressInfo;
    }
    localStorage.setItem("users", JSON.stringify(usersInLs));
    if (usersInLs)
      sessionStorage.setItem(
        "userLogged",
        JSON.stringify(usersInLs[userIndex as number])
      );

    if (addressInfo.isDefault) {
      setDefaultAddress(addressInfo.idAddress);
    }

    navigate(`/account/${authState?.state.userInfo.id}/addresses`);
  }

  const setDefaultAddress = (idAddress: string) => {
    const usersInLs = authState?.usersStorage;
    const userId = authState?.state.userInfo.id;
    const userIndex = authState?.usersStorage.findIndex(
      (u) => u.userInfo.id === userId
    );

    const userAddress = authState?.state.userAddresses;
    if (userAddress && usersInLs) {
      const newAddresses = userAddress.reduce((acc, address) => {
        if (address.idAddress !== idAddress) {
          address.isDefault = false;
          acc.push(address);
        } else {
          address.isDefault = true;
          acc.push(address);
        }
        return acc;
      }, [] as UserAddress[]);
      authState?.dispatch({
        type: "EDIT_ADDRESS",
        payload: {
          userAddresses: newAddresses,
        },
      });

      usersInLs[userIndex as number].userAddress = newAddresses;
      localStorage.setItem("users", JSON.stringify(usersInLs));
      sessionStorage.setItem(
        "userLogged",
        JSON.stringify(usersInLs[userIndex as number])
      );
    }
  };

  return {
    signIn,
    login,
    logout,
    addAddress,
    editUser,
    removeAddress,
    editAddress,
    setDefaultAddress,
  };
};
