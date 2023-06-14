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
import { ShoppingCartContextProvider } from "../contexts/shoppingCartState";
import { GlobalStateProvider } from "../contexts/globalStateContext";
import { AuthContextProvider } from "../contexts/auth";

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
      path: "/order",
      element: <Order />,
    },
    {
      path: "/orders",
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
        <GlobalStateProvider>
          <AuthContextProvider>
            <ShoppingCartContextProvider>
              <Header />
              <Layout>
                <AppRoutes />
              </Layout>
            </ShoppingCartContextProvider>
          </AuthContextProvider>
        </GlobalStateProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
