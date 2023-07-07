import { useCategories } from "../../../../../hooks/useCategories";
import { NavItem } from "../../../NavItem";

interface PropTypes {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

export const NavCMOptions = ({ isOpen, setOpen }: PropTypes) => {
  const categories = useCategories();

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
          isOpen ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-full py-4 px-5 bg-green-500">
          <h1 className="ml-8 text-2xl text-white font-bold font-mono ">
            SHOPPI
          </h1>
        </div>
        <div className="flex flex-col gap-4 mt-4 px-5">
          <h2 className="text-xl font-semibold">Categories</h2>
          <NavItem to={`/`}>
            <p onClick={() => setOpen(!isOpen)}>All</p>
          </NavItem>
          {categories.slice(0, 5).map((route) => (
            <NavItem to={`category/${route.id}`} key={route.id}>
              <p onClick={() => setOpen(!isOpen)}>{route.name}</p>
            </NavItem>
          ))}
        </div>
      </article>
    </section>
  );
};
