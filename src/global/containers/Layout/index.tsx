import { useGlobalState } from "../../../contexts/globalState";
import { ShoppingCart } from "../ShoppingCart";

type PropTypes = {
  children: React.ReactNode;
};

export const Layout = ({ children }: PropTypes) => {
  const globalState = useGlobalState();
  return (
    <div className="flex flex-col mt-24 items-center">
      {globalState?.state.cart && <ShoppingCart />}

      {children}
    </div>
  );
};
