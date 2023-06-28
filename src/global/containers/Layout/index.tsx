import { useLocation } from "react-router-dom";
import { ModalNotification } from "../../components/ModalNotification";
import { ShoppingCart } from "../ShoppingCart";

type PropTypes = {
  children: React.ReactNode;
};

export const Layout = ({ children }: PropTypes) => {
  const location = useLocation();
  const isCheckoutSuccess = location.pathname === "/checkout/success";
  return (
    <div
      className={`flex flex-col items-center ${
        !isCheckoutSuccess && "mt-24 md:mt-20"
      }`}
    >
      <ShoppingCart />
      <ModalNotification />
      {children}
    </div>
  );
};
