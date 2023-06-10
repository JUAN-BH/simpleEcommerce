import { useShoppingCartState } from "../../../contexts/shoppingCartState";
import { NavItem } from "../NavItem";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
export const Header = () => {
  const dataState = useShoppingCartState();
  const itemsCart = dataState?.state.productsInCart;
  const handleOpenCart = () => {
    dataState?.dispatch({ type: "OPEN_CART" });
  };
  return (
    <header className="fixed z-10 bg-white top-0 w-full py-5 px-8 border-b shadow-sm">
      <nav className="flex justify-between items-center">
        <ul className="flex items-center gap-4">
          <li>
            <NavItem to="/">
              <h1 className="text-2xl font-bold font-mono">SHOPPI</h1>
            </NavItem>
          </li>
          <li className="ml-4">
            <NavItem to="/" style="underline underline-offset-4">
              All
            </NavItem>
          </li>
          <li>
            <NavItem to="/clothes" style="underline underline-offset-4">
              Clothes
            </NavItem>
          </li>
          <li>
            <NavItem to="/electronics" style="underline underline-offset-4">
              Electronics
            </NavItem>
          </li>
          <li>
            <NavItem to="/furniture" style="underline underline-offset-4">
              Furniture
            </NavItem>
          </li>
          <li>
            <NavItem to="/toys" style="underline underline-offset-4">
              Toys
            </NavItem>
          </li>
          <li>
            <NavItem to="/others" style="underline underline-offset-4">
              Others
            </NavItem>
          </li>
        </ul>
        <ul className="flex gap-4">
          <li className="text-gray-400">bhc1223@platzi.com</li>
          <li>
            <NavItem to="/orders" style="underline underline-offset-4">
              My Orders
            </NavItem>
          </li>
          <li>
            <NavItem to="account" style="underline underline-offset-4">
              My Account
            </NavItem>
          </li>
          <li>
            <NavItem to="/logOut" style="underline underline-offset-4">
              Sing Out
            </NavItem>
          </li>
          <li
            className="flex items-center cursor-pointer"
            onClick={handleOpenCart}
          >
            <ShoppingCartIcon className="w-5 h-5 mr-1 " />
            {itemsCart?.length}
          </li>
        </ul>
      </nav>
    </header>
  );
};
