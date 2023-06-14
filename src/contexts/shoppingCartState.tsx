import { createContext, useContext, useReducer } from "react";
import {
  ContextStateProps,
  ReducerSCType,
} from "../ts/models/shoppingCartState.model";
import { initialSCState, reducerSC } from "../reducers/shoppingCartReducer";

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
