import { useAuthContext } from "../../../contexts/auth";
import { useShoppingCartContext } from "../../../contexts/shoppingCartState";
import { Routes, authRoutes, commonRoutes } from "../../../utils/routes";
import { NavDesk } from "./components/NavDesk";
import { InitalAuthState } from "../../../ts/models/auth.model";
import { ProductInCart } from "../../../ts/dtos/shoppingCartState.dto";
import { NavMobile } from "./components/NavMoblie";

export interface NavProps {
  authRoutes: Routes[];
  commonRoutes: Routes[];
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
      <header className="fixed z-10 bg-white top-0 w-full py-3 px-3 border-b shadow-sm ">
        <NavMobile
          authRoutes={authRoutes}
          commonRoutes={commonRoutes}
          authState={authState}
          itemsCart={itemsCart}
          handleOpenCart={handleOpenCart}
        />
        <NavDesk
          authRoutes={authRoutes}
          commonRoutes={commonRoutes}
          authState={authState}
          itemsCart={itemsCart}
          handleOpenCart={handleOpenCart}
        />
      </header>
    );
};
