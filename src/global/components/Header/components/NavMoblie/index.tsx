import { useState } from "react";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { NavProps } from "../..";
import { NavItem } from "../../../NavItem";
import { Squash as Hamburger } from "hamburger-react";
import { NavCMOptions } from "../NavCMOptions";
import { useAuthContext } from "../../../../../contexts/auth";
import { useNavigate } from "react-router-dom";
// import { NavAMOptions } from "../NavAMOptions";

export const NavMobile = ({ itemsCart, handleOpenCart }: NavProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const authState = useAuthContext();
  const navigate = useNavigate();
  const goSignIn = () => {
    navigate("/signin");
  };

  const openAuth = () => {
    navigate(`/account/${authState?.state.userInfo.id}`);
  };

  return (
    <nav className="relative  flex justify-between items-center md:hidden">
      <ul className="flex items-center ">
        <li>
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            size={20}
            color={`${isOpen ? "#ffff" : "#22c55e"}`}
            rounded
          />
        </li>
        <li>
          <NavItem to="/">
            <h1 className="text-2xl text-green-500 font-bold font-mono">
              SHOPPI
            </h1>
          </NavItem>
        </li>
      </ul>
      <ul className="flex gap-4 items-center">
        {authState?.state.userInfo.name ? (
          <li className="flex items-center" onClick={openAuth}>
            <span className="text-sm mr-1 text-gray-500">
              {authState?.state.userInfo.name}
            </span>
            <UserIcon className="w-7 h-7 mr-1 text-green-500 fill-green-500" />
          </li>
        ) : (
          <li>
            <button onClick={goSignIn} className="btn">
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
      <NavCMOptions isOpen={isOpen} setOpen={setOpen} />
      {/* <NavAMOptions isOpen={authOpen} setOpen={setauthOpen} /> */}
    </nav>
  );
};
