import { InitialGlobalState, MyGSAction } from "../ts/models/globalState.model";

export const initialGSState: InitialGlobalState = {
  loading: false,
  error: false,
  modal: false,
  modalMessage: "",
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
    case "SHOW_MODAL":
      if (action.payload) {
        return {
          ...state,
          modal: true,
          modalMessage: action.payload,
        };
      } else {
        return {
          ...state,
        };
      }
    case "CLOSE_MODAL":
      return {
        ...state,
        modal: false,
      };
    default:
      return { ...state };
  }
}
