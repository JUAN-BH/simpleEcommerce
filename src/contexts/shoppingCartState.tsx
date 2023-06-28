import { createContext, useContext, useReducer } from "react";
import {
  ContextStateProps,
  ReducerSCType,
} from "../ts/models/shoppingCartState.model";
import { initialSCState, reducerSC } from "../reducers/shoppingCartReducer";
import { useAuthContext } from "./auth";
import { Navigate, useLocation } from "react-router-dom";
import { UsersLS } from "../ts/models/auth.model";

interface ChildrenProps {
  children: React.ReactNode;
}

const ShoppingCartContext = createContext<ReducerSCType | null>(null);

export const ShoppingCartContextProvider = ({
  children,
}: ContextStateProps) => {
  const [state, dispatch] = useReducer(reducerSC, initialSCState);
  const dataState = { state, dispatch };
  return (
    <ShoppingCartContext.Provider value={dataState}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useShoppingCartContext() {
  const dataState = useContext(ShoppingCartContext);
  if (dataState) return dataState;
}

export function PrivateCheckout({ children }: ChildrenProps) {
  const SCState = useShoppingCartContext();
  const authState = useAuthContext();
  const location = useLocation();

  const productsInCart = SCState?.state.productsInCart || [];

  const userLogged: UsersLS = JSON.parse(
    sessionStorage.getItem("userLogged") || "{}"
  );

  if (
    (authState?.state.userInfo.name == undefined &&
      userLogged.userInfo == undefined) ||
    productsInCart.length < 1
  ) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }
  return children;
}
