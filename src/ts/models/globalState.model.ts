export interface InitialGlobalState {
  loading: boolean;
  error: boolean;
}

export interface ReducerGSType {
  state: InitialGlobalState;
  dispatch: React.Dispatch<MyGSAction>;
}

export interface MyGSAction {
  type: "START_REQUEST" | "REQUEST_SUCCESS" | "REQUEST_FAILED";
  payload?: unknown;
}
