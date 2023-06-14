import { createContext, useContext, useReducer } from "react";
import { ReducerGSType } from "../ts/models/globalState.model";
import { initialGSState, reducerGS } from "../reducers/globalStateReducer";

interface GlobalProps {
  children: React.ReactNode;
}

const GlobalStateContext = createContext<ReducerGSType | null>(null);

export function GlobalStateProvider({ children }: GlobalProps) {
  const [state, dispatch] = useReducer(reducerGS, initialGSState);
  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGlobalState() {
  const dataState = useContext(GlobalStateContext);
  if (dataState) return dataState;
}
