import { createContext, useContext, useReducer } from "react";
import {
  ContextStateProps,
  ReducerSCType,
} from "../ts/models/shoppingCartState.model";
import { initialSCState, reducerSC } from "../reducers/shoppingCartReducer";

const ShoppingCartState = createContext<ReducerSCType | null>(null);

export const ShoppingCartStateProvider = ({ children }: ContextStateProps) => {
  const [state, dispatch] = useReducer(reducerSC, initialSCState);
  const dataState = { state, dispatch };
  return (
    <ShoppingCartState.Provider value={dataState}>
      {children}
    </ShoppingCartState.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useShoppingCartState() {
  const dataState = useContext(ShoppingCartState);
  if (dataState) return dataState;
}
