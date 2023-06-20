import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { NavProps } from "../..";
import { NavItem } from "../../../NavItem";
import { useNavigate } from "react-router-dom";

export const NavDesk = ({
  authRoutes,
  commonRoutes,
  authState,
  itemsCart,
  handleOpenCart,
}: NavProps) => {
  const navigate = useNavigate();
  const goSignIn = () => {
    navigate("/signin");
  };

  return (
    <nav className="hidden md:flex justify-between items-center max-w-screen-xl mx-auto py-1">
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
        {authState.userInfo.name ? (
          <li className="flex items-center">
            <span className="text-sm mr-1 text-gray-500">
              {authState.userInfo.name}
            </span>
            <UserIcon className="w-7 h-7 mr-1 text-green-500 fill-green-500" />
          </li>
        ) : (
          <li>
            <button onClick={goSignIn} className="sigInbtn">
              Sign in
            </button>
          </li>
        )}
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
  );
};
