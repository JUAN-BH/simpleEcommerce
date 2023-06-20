import { useState } from "react";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { NavProps } from "../..";
import { NavItem } from "../../../NavItem";
import { useNavigate } from "react-router-dom";
import { NavADOptions } from "../NavADOptions";

export const NavDesk = ({
  commonRoutes,
  authState,
  itemsCart,
  handleOpenCart,
}: NavProps) => {
  const [openAuthOp, setOpenAuthOp] = useState<boolean>(false);
  const navigate = useNavigate();
  const goSignIn = () => {
    navigate("/signin");
  };

  return (
    <nav className="hidden md:flex justify-between items-center max-w-screen-xl mx-auto">
      <ul className="flex items-center gap-4 p-3">
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
          <li
            className="flex items-center h-[64px] cursor-pointer"
            onMouseEnter={() => {
              setOpenAuthOp(true);
            }}
            onMouseLeave={() => {
              setOpenAuthOp(false);
            }}
          >
            <span className="text-sm mr-1 text-gray-500">
              {authState.userInfo.name}
            </span>
            <UserIcon className="w-7 h-7 mr-1 text-green-500 fill-green-500" />
            {openAuthOp && (
              <NavADOptions
                openAuthOp={openAuthOp}
                setOpenAuthOp={setOpenAuthOp}
              />
            )}
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
            className={`w-7 h-7 mr-1 text-green-500 ${
              itemsCart?.length && "fill-green-500"
            }`}
          />
          {itemsCart?.length ? itemsCart?.length : ""}
        </li>
      </ul>
    </nav>
  );
};
