import {
  ProductInCart,
  ProductOnDisplay,
} from "../ts/dtos/shoppingCartState.dto";
import {
  InitalSCstate,
  MySCAction,
} from "../ts/models/shoppingCartState.model";

export const initialSCState: InitalSCstate = {
  loading: false,
  error: false,
  detail: false,
  productOnDetail: {
    title: "",
    description: "",
    price: 0,
    images: [],
  },
  cart: false,
  productsInCart: [],
};

export const reducerSC = (state: InitalSCstate, action: MySCAction) => {
  switch (action.type) {
    case "STAR_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "REQUEST_SUCCESS":
      return {
        ...state,
        loading: false,
      };
    case "REQUEST_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "CLOSE_DETAIL":
      return {
        ...state,
        detail: false,
      };
    case "PRODUCT_TO_DISPLAY":
      if (action.payload) {
        return {
          ...state,
          detail: true,
          cart: false,
          productOnDetail: action.payload as ProductOnDisplay,
        };
      } else {
        return {
          ...state,
        };
      }
    case "CLOSE_CART":
      return {
        ...state,
        cart: false,
      };
    case "OPEN_CART":
      return {
        ...state,
        detail: false,
        cart: !state.cart,
      };
    case "ADD_PRODUCT_TO_CART":
      if (action.payload) {
        return {
          ...state,
          cart: true,
          detail: false,
          productsInCart: [
            ...state.productsInCart,
            action.payload as ProductInCart,
          ],
        };
      } else {
        return {
          ...state,
        };
      }
    case "ADD_PRODUCT_QTY":
      if (action.payload) {
        return {
          ...state,
          cart: true,
          detail: false,
          productsInCart: action.payload as ProductInCart[],
        };
      } else {
        return {
          ...state,
        };
      }
    case "REMOVE_ITEM":
      if (action.payload) {
        return {
          ...state,
          productsInCart: action.payload as ProductInCart[],
        };
      } else {
        return {
          ...state,
        };
      }
    default:
      return {
        ...state,
      };
  }
};
