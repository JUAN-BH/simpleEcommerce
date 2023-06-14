import { InitialGlobalState, MyGSAction } from "../ts/models/globalState.model";

export const initialGSState: InitialGlobalState = {
  loading: false,
  error: false,
};

export function reducerGS(state: InitialGlobalState, action: MyGSAction) {
  switch (action.type) {
    case "START_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "REQUEST_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
      };
    case "REQUEST_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return { ...state };
  }
}
