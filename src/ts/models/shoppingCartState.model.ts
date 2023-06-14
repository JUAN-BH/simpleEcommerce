import { ProductInCart, ProductOnDisplay } from "../dtos/shoppingCartState.dto";

export interface ContextStateProps {
  children: React.ReactNode;
}

export interface ReducerSCType {
  state: InitalSCstate;
  dispatch: React.Dispatch<MySCAction>;
}

export interface InitalSCstate {
  detail: boolean;
  productOnDetail: ProductOnDisplay;
  cart: boolean;
  productsInCart: ProductInCart[];
}

export interface MySCAction {
  type:
    | "PRODUCT_TO_DISPLAY"
    | "CLOSE_DETAIL"
    | "ADD_PRODUCT_TO_CART"
    | "ADD_PRODUCT_QTY"
    | "REMOVE_ITEM"
    | "OPEN_CART"
    | "CLOSE_CART";
  payload?: ProductOnDisplay | ProductInCart | ProductInCart[];
}
