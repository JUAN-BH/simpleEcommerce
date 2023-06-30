import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";
import { Orders, User, UserAddress, UsersLS } from "../ts/models/auth.model";
import { generateId } from "../utils/idGenerator";
import { useShoppingCartContext } from "../contexts/shoppingCartState";
import { dateGenerator } from "../utils/dateGenerator";

interface ReturnFunc {
  signIn: (userInfo: User) => void;
  login: (userEmail: string, userPassword: string) => void;
  logout: () => void;
  addAddress: (addressInfo: UserAddress) => void;
  editUser: (newName: string, newPassword: string) => void;
  removeAddress: (idAddress: string) => void;
  editAddress: (idAddress: string, addressInfo: UserAddress) => void;
  setDefaultAddress: (idAddress: string) => void;
  addOrder: () => void;
}

export const useAuth = (): ReturnFunc => {
  const SCState = useShoppingCartContext();
  const navigate = useNavigate();
  const location = useLocation();
  const authState = useAuthContext();

  const currentUserId = authState?.state.userInfo.id || "";
  const usersInLs = authState?.usersStorage || [];
  const userIndex =
    usersInLs.findIndex((u) => u.userInfo.id === currentUserId) || 0;

  function signIn(userInfo: User) {
    const newUser: UsersLS = {
      userInfo,
      userOrthers: [],
      userAddress: [],
    };

    usersInLs.push(newUser);

    localStorage.setItem("users", JSON.stringify(usersInLs));
    authState?.dispatch({
      type: "SIGN_IN",
      payload: { userInfo: newUser.userInfo },
    });
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

  function editUser(name: string, password: string): void {
    const currentUser = authState?.state.userInfo as User;
    let newName = currentUser.name;
    let newPass = currentUser.password;

    if (name !== "") {
      newName = name;
      const userStorageInfo = usersInLs[userIndex as number].userInfo;
      userStorageInfo && (userStorageInfo.name = name);
    } else if (password !== "") {
      newPass = password;
      const userStorageInfo = usersInLs[userIndex as number].userInfo;
      userStorageInfo && (userStorageInfo.password = password);
    }

    const newUserInfo = {
      ...currentUser,
      name: newName,
      password: newPass,
    };

    authState?.dispatch({
      type: "EDIT_USER",
      payload: { userInfo: newUserInfo },
    });
    localStorage.setItem("users", JSON.stringify(usersInLs));
    sessionStorage.setItem(
      "userLogged",
      JSON.stringify(usersInLs[userIndex as number])
    );
  }

  function addAddress(addresInfo: UserAddress) {
    const currentUserId = authState?.state.userInfo.id || "";
    const usersInLs = authState?.usersStorage || [];
    const userIndex =
      usersInLs.findIndex((u) => u.userInfo.id === currentUserId) || 0;
    console.log(
      "🚀 ~ file: useAuth.tsx:120 ~ addAddress ~ addresInfo:",
      addresInfo
    );
    usersInLs[userIndex as number].userAddress.push(addresInfo);
    console.log(
      "🚀 ~ file: useAuth.tsx:122 ~ addAddress ~ usersInLs:",
      usersInLs[userIndex as number]
    );
    localStorage.setItem("users", JSON.stringify(authState?.usersStorage));
    sessionStorage.setItem(
      "userLogged",
      JSON.stringify(usersInLs[userIndex as number])
    );
    authState?.dispatch({
      type: "ADD_ADDRESS",
      payload: { userAddress: addresInfo },
    });

    if (addresInfo.isDefault) {
      setDefaultAddress(addresInfo.idAddress);
    }
  }

  function removeAddress(idAddress: string) {
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
  }

  const setDefaultAddress = (idAddress: string) => {
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

  const addOrder = () => {
    const productsInCart = SCState?.state.productsInCart || [];
    const order: Orders = {
      idOrder: generateId(),
      name: dateGenerator(),
      products: productsInCart,
    };
    authState?.dispatch({ type: "ADD_ORDER", payload: { order } });
    usersInLs[userIndex as number].userOrthers.push(order);
    localStorage.setItem("users", JSON.stringify(usersInLs));
    sessionStorage.setItem(
      "userLogged",
      JSON.stringify(usersInLs[userIndex as number])
    );
    navigate("/checkout/success");
    setTimeout(() => {
      SCState?.dispatch({ type: "CLEAR_CART" });
    }, 3000);
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
    addOrder,
  };
};
