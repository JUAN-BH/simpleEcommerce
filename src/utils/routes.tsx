export interface Routes {
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
  { to: "/account", text: "Account", private: true },
  { to: "/orders", text: "Orders", private: true },
  { to: "/logOut", text: "Log out", private: true },
];
