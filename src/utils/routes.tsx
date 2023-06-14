interface Routes {
  to: string;
  text: string;
  private?: boolean;
  publicOnly?: boolean;
  className?: string;
}

export const commonRoutes: Routes[] = [
  { to: "/", text: "All" },
  { to: "/clothes", text: "Clothes" },
  { to: "/electronics", text: "Electronics" },
  { to: "/furniture", text: "Furniture" },
  { to: "/toys", text: "Toys" },
  { to: "/others", text: "Others" },
];

export const authRoutes: Routes[] = [
  {
    to: "/signIn",
    text: "Sign In",
    className: "sigInbtn",
    private: false,
    publicOnly: true,
  },
  { to: "/orders", text: "Log out", private: true },
  { to: "/account", text: "Log out", private: true },
  { to: "/logOut", text: "Log out", private: true },
];
