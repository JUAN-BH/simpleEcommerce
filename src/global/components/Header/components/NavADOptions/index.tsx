import { useAuthContext } from "../../../../../contexts/auth";
import { authRoutes } from "../../../../../utils/routes";
import { NavItem } from "../../../NavItem";

interface PropTypes {
  openAuthOp: boolean;
  setOpenAuthOp: (isOpen: boolean) => void;
}

export const NavADOptions = ({ openAuthOp, setOpenAuthOp }: PropTypes) => {
  const authState = useAuthContext();

  return (
    <section
      className="absolute top-[64.8px] left-0 w-full"
      onMouseOver={(e: React.MouseEvent<HTMLLIElement>) => {
        const element = e.target as HTMLElement;
        if (element.id !== "menu") {
          setOpenAuthOp(false);
        }
      }}
    >
      <div className="flex justify-end max-w-screen-xl mx-auto">
        <article
          id="menu"
          className="flex flex-col gap-3 w-fit mr-12 p-3 rounded-md shadow-lg bg-white"
        >
          {authRoutes.map((route) => {
            if (route.to === "/account") {
              return (
                <div id="menu" key={route.to}>
                  <NavItem to={`${route.to}/${authState?.state.userInfo.name}`}>
                    <p
                      id="menu"
                      className="inline-block"
                      onClick={() => setOpenAuthOp(!openAuthOp)}
                    >
                      {route.text}
                    </p>
                  </NavItem>
                </div>
              );
            } else {
              return (
                <div id="menu" key={route.to}>
                  <NavItem to={`${route.to}`}>
                    <p
                      id="menu"
                      className="inline-block"
                      onClick={() => setOpenAuthOp(!openAuthOp)}
                    >
                      {route.text}
                    </p>
                  </NavItem>
                </div>
              );
            }
          })}
          <button onClick={authState?.logout} id="menu" className="logOutbtn">
            Log out
          </button>
        </article>
      </div>
    </section>
  );
};
