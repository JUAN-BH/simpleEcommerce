export interface InitialGlobalState {
  loading: boolean;
  error: boolean;
  modal: boolean;
  modalMessage: string;
}

export interface ReducerGSType {
  state: InitialGlobalState;
  dispatch: React.Dispatch<MyGSAction>;
}

export interface MyGSAction {
  type:
    | "START_REQUEST"
    | "REQUEST_SUCCESS"
    | "REQUEST_FAILED"
    | "SHOW_MODAL"
    | "CLOSE_MODAL";
  payload?: string;
}
