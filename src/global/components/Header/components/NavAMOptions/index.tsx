import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "../../../../../contexts/auth";
import { authRoutes } from "../../../../../utils/routes";
import { NavItem } from "../../../NavItem";

interface PropTypes {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

export const NavAMOptions = ({ isOpen, setOpen }: PropTypes) => {
  const authState = useAuthContext();
  return (
    <section className="fixed top-0 left-0 w-full">
      <div
        onClick={() => setOpen(!isOpen)}
        className={`fixed left-0 right-0 top-0 w-full h-full bg-black/30 transition-all duration-300 ease-in-out ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      ></div>
      <article
        className={`fixed w-4/6 h-full shadow-lg bg-white transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-1/2" : "translate-x-[800px]"
        }`}
      >
        <div className="flex items-center justify-between w-full py-4 px-5 bg-green-500">
          <h1 className="text-2xl text-white font-semibold ">
            Hello, {authState?.state.userInfo.name}
          </h1>
          <XMarkIcon
            className="w-8 h-8 text-white"
            onClick={() => setOpen(!isOpen)}
          />
        </div>
        <div className="flex flex-col gap-4 mt-4 px-5">
          {authRoutes.map((route) => {
            if (route.to === "/account") {
              return (
                <NavItem
                  to={`${route.to}/${authState?.state.userInfo.name}`}
                  key={route.to}
                >
                  <p onClick={() => setOpen(!isOpen)}>{route.text}</p>
                </NavItem>
              );
            } else {
              return (
                <NavItem to={`${route.to}`} key={route.to}>
                  <p onClick={() => setOpen(!isOpen)}>{route.text}</p>
                </NavItem>
              );
            }
          })}
        </div>
      </article>
    </section>
  );
};
