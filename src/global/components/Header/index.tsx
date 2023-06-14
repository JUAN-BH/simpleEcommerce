import { useAuthContext } from "../../../contexts/auth";
import { useShoppingCartContext } from "../../../contexts/shoppingCartState";
import { authRoutes, commonRoutes } from "../../../utils/routes";
import { NavItem } from "../NavItem";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
export const Header = () => {
  const SCState = useShoppingCartContext();
  const itemsCart = SCState?.state.productsInCart;
  const handleOpenCart = () => {
    SCState?.dispatch({ type: "OPEN_CART" });
  };
  const authState = useAuthContext();
  return (
    <header className="fixed z-10 bg-white top-0 w-full py-5 px-8 border-b shadow-sm">
      <nav className="flex justify-between items-center">
        <ul className="flex items-center gap-4">
          <li>
            <NavItem to="/">
              <h1 className="text-2xl text-green-500 font-bold font-mono">
                SHOPPI
              </h1>
            </NavItem>
          </li>
          {commonRoutes.map((route) => (
            <li key={route.to}>
              <NavItem
                to={route.to}
                style="underline underline-offset-4 decoration-green-500"
              >
                {route.text}
              </NavItem>
            </li>
          ))}
        </ul>
        <ul className="flex gap-4">
          {authState?.state.userInfo.email ? (
            <li className="text-gray-400">{authState?.state.userInfo.email}</li>
          ) : null}
          {authRoutes.map((route) => {
            if (route.private && authState?.state.userInfo.name == null)
              return null;
            if (route.publicOnly && authState?.state.userInfo.name != null)
              return null;

            return (
              <li key={route.text} className={route?.className}>
                <NavItem
                  to={route.to}
                  style={`${
                    route?.className ? "" : "underline underline-offset-4"
                  }`}
                >
                  {route.text}
                </NavItem>
              </li>
            );
          })}
          {/* <li>
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
          </li> */}
          <li
            className="flex items-center cursor-pointer"
            onClick={handleOpenCart}
          >
            <ShoppingCartIcon
              className={`w-5 h-5 mr-1 text-green-500 ${
                itemsCart?.length && "fill-green-500"
              }`}
            />
            {itemsCart?.length ? itemsCart?.length : ""}
          </li>
        </ul>
      </nav>
    </header>
  );
};
