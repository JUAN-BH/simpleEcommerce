import { useAuthContext } from "../../../contexts/auth";
import { useShoppingCartContext } from "../../../contexts/shoppingCartState";
import { NavDesk } from "./components/NavDesk";
import { InitalAuthState } from "../../../ts/models/auth.model";
import { ProductInCart } from "../../../ts/dtos/shoppingCartState.dto";
import { NavMobile } from "./components/NavMoblie";

export interface NavProps {
  authState: InitalAuthState;
  itemsCart: ProductInCart[];
  handleOpenCart: () => void;
}

export const Header = () => {
  const SCState = useShoppingCartContext();
  const itemsCart = SCState?.state.productsInCart;
  const handleOpenCart = () => {
    SCState?.dispatch({ type: "OPEN_CART" });
  };
  const authContext = useAuthContext();
  const authState = authContext?.state;

  if (authState && itemsCart)
    return (
      <header className="fixed z-10 bg-white top-0 w-full p-2 md:p-0 border-b shadow-sm">
        <NavMobile
          authState={authState}
          itemsCart={itemsCart}
          handleOpenCart={handleOpenCart}
        />
        <NavDesk
          authState={authState}
          itemsCart={itemsCart}
          handleOpenCart={handleOpenCart}
        />
      </header>
    );
};
