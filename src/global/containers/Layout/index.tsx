import { ModalNotification } from "../../components/ModalNotification";
import { ShoppingCart } from "../ShoppingCart";

type PropTypes = {
  children: React.ReactNode;
};

export const Layout = ({ children }: PropTypes) => {
  return (
    <div className="flex flex-col mt-24 md:mt-20 items-center">
      <ShoppingCart />
      <ModalNotification />
      {children}
    </div>
  );
};
