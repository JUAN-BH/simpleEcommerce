import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { NavProps } from "../..";
import { NavItem } from "../../../NavItem";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../../../../hooks/useCategories";
// import { NavADOptions } from "../NavADOptions";

export const NavDesk = ({ authState, itemsCart, handleOpenCart }: NavProps) => {
  // const [openAuthOp, setOpenAuthOp] = useState<boolean>(false);
  const navigate = useNavigate();
  const categories = useCategories();

  const goSignIn = () => {
    navigate("/signin");
  };

  return (
    <nav className="hidden md:flex justify-between items-center max-w-screen-xl mx-auto">
      <ul className="flex items-center gap-4 p-4">
        <li>
          <NavItem to="/">
            <h1 className="text-2xl text-green-500 font-bold font-mono">
              SHOPPI
            </h1>
          </NavItem>
        </li>
        <li>
          <NavItem
            to={`/`}
            style="decoration-green-500 decoration-2 underline underline-offset-4"
          >
            All
          </NavItem>
        </li>

        {categories.slice(0, 5).map((route) => (
          <li key={route.id}>
            <NavItem
              to={`category/${route.id}`}
              style="decoration-green-500 decoration-2 underline underline-offset-4"
            >
              {route.name}
            </NavItem>
          </li>
        ))}
      </ul>
      <ul className="flex gap-4">
        {authState.userInfo.name ? (
          <li
            className="flex items-center h-[64px] cursor-pointer"
            onClick={() => navigate(`/account/${authState.userInfo.id}`)}
            // onMouseEnter={() => {
            //   setOpenAuthOp(true);
            // }}
            // onMouseLeave={() => {
            //   setOpenAuthOp(false);
            // }}
          >
            <span className="text-sm mr-1 text-gray-500">
              {authState.userInfo.name}
            </span>
            <UserIcon className="w-7 h-7 mr-1 text-green-500 fill-green-500" />
            {/* {openAuthOp && (
              <NavADOptions
                openAuthOp={openAuthOp}
                setOpenAuthOp={setOpenAuthOp}
              />
            )} */}
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
            className={`w-7 h-7 mr-1 text-green-500 hover:shadow-green-600/50 ${
              itemsCart?.length && "fill-green-500"
            }`}
          />
          {itemsCart?.length ? itemsCart?.length : ""}
        </li>
      </ul>
    </nav>
  );
};
