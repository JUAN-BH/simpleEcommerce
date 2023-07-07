import { NavLink } from "react-router-dom";

interface PropTypes {
  to: string;
  style?: string;
  children: React.ReactNode;
}

export const NavItem = ({ to, style, children }: PropTypes) => {
  return (
    <NavLink
      to={to}
      className={(e) =>
        e.isActive
          ? style
          : "decoration-green-500 decoration-2 underline-offset-4 hover:underline"
      }
    >
      {children}
    </NavLink>
  );
};
