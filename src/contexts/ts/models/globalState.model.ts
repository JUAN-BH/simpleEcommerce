import { ProductInCart, ProductOnDisplay } from "../dtos/globalState.dto";

export interface GlobalStateProps {
  children: React.ReactNode;
}

export interface ReducerType {
  state: Initalstate;
  dispatch: React.Dispatch<MyAction>;
}

export interface Initalstate {
  loading: boolean;
  error: boolean;
  detail: boolean;
  productOnDetail: ProductOnDisplay;
  cart: boolean;
  productsInCart: ProductInCart[];
}

export interface MyAction {
  type:
    | "STAR_REQUEST"
    | "REQUEST_SUCCESS"
    | "REQUEST_ERROR"
    | "PRODUCT_TO_DISPLAY"
    | "CLOSE_DETAIL"
    | "ADD_PRODUCT_TO_CART"
    | "ADD_PRODUCT_QTY"
    | "REMOVE_ITEM"
    | "OPEN_CART"
    | "CLOSE_CART";
  payload?: ProductOnDisplay | ProductInCart | ProductInCart[];
}
