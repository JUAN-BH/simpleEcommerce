import { useRoutes, BrowserRouter } from "react-router-dom";
import { Account } from "./Account";
import { Home } from "./Home";
import { NotFound } from "./NotFound";
import { Order } from "./Order";
import { Orders } from "./Orders";
import { SignIn } from "./SignIn";
import { LogOut } from "./LogOut";
import { Header } from "../global/components/Header";
import { Layout } from "../global/containers/Layout";
import { ShoppingCartStateProvider } from "../contexts/shoppingCartState";

const AppRoutes = (): React.ReactElement | null => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/account",
      element: <Account />,
    },
    {
      path: "/Order",
      element: <Order />,
    },
    {
      path: "/Orders",
      element: <Orders />,
    },
    {
      path: "/signIn",
      element: <SignIn />,
    },
    {
      path: "/logOut",
      element: <LogOut />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return routes;
};

function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <ShoppingCartStateProvider>
          <Header />
          <Layout>
            <AppRoutes />
          </Layout>
        </ShoppingCartStateProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
