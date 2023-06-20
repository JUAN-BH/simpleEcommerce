import { useShoppingCartContext } from "../../../contexts/shoppingCartState";
import { ShoppingCart } from "../ShoppingCart";

type PropTypes = {
  children: React.ReactNode;
};

export const Layout = ({ children }: PropTypes) => {
  const SCState = useShoppingCartContext();
  return (
    <div className="flex flex-col mt-24 md:mt-20 items-center">
      {SCState?.state.cart && <ShoppingCart />}
      {children}
    </div>
  );
};
