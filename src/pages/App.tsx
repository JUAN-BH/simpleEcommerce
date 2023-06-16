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
import { AuthContextProvider, PrivateRoute } from "../contexts/auth";
import { Register } from "./Register";

const AppRoutes = (): React.ReactElement | null => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/account/:userName",
      element: (
        // <PrivateRoute>
        <Account />
        // </PrivateRoute>
      ),
    },
    {
      path: "/order/:orderId",
      element: (
        <PrivateRoute>
          <Order />
        </PrivateRoute>
      ),
    },
    {
      path: "/orders",
      element: (
        <PrivateRoute>
          <Orders />
        </PrivateRoute>
      ),
    },
    {
      path: "/signIn",
      element: <SignIn />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/checkOut/information",
      element: (
        <PrivateRoute>
          <Account />
        </PrivateRoute>
      ),
    },
    {
      path: "/checkOut/payment",
      element: (
        <PrivateRoute>
          <Account />
        </PrivateRoute>
      ),
    },
    {
      path: "/logOut",
      element: (
        <PrivateRoute>
          <LogOut />
        </PrivateRoute>
      ),
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
