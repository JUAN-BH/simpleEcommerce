import { ModalNotification } from "../../components/ModalNotification";
import { ShoppingCart } from "../ShoppingCart";

type PropTypes = {
  children: React.ReactNode;
};

export const Layout = ({ children }: PropTypes) => {
  return (
    <div className="flex flex-col items-center mt-24 md:-scroll-mt-20">
      <ShoppingCart />
      <ModalNotification />
      {children}
    </div>
  );
};
