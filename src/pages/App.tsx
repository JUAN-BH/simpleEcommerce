import { useRoutes, BrowserRouter } from "react-router-dom";
import { Account } from "./Account";
import { Home } from "./Home";
import { NotFound } from "./NotFound";
import { Order } from "./Order";
import { Orders } from "./Orders";
import { SignIn } from "./SignIn";
import { Header } from "../global/components/Header";
import { Layout } from "../global/containers/Layout";
import {
  PrivateCheckout,
  ShoppingCartContextProvider,
} from "../contexts/shoppingCartState";
import { GlobalStateProvider } from "../contexts/globalStateContext";
import {
  AuthContextProvider,
  PrivateOnAuth,
  PrivateRoute,
} from "../contexts/auth";
import { Register } from "./Register";
import { Checkout } from "./Checkout";
import { AccountEdit } from "./AccountEdit";
import { AccountAddresses } from "./AccountAddresses";
import { NewAddress } from "./NewAddress";
import { EditAddress } from "./EditAddress";
import { CheckoutSuccess } from "./CheckoutSuccess";
import { Category } from "./Category";

const AppRoutes = (): React.ReactElement | null => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/category/:idCategory",
      element: <Category />,
    },
    {
      path: "/account/:idUser",
      element: (
        <PrivateRoute>
          <Account />
        </PrivateRoute>
      ),
    },
    {
      path: "/account/:idUser/edit",
      element: (
        <PrivateRoute>
          <AccountEdit />
        </PrivateRoute>
      ),
    },
    {
      path: "/account/:idUser/addresses",
      element: (
        <PrivateRoute>
          <AccountAddresses />
        </PrivateRoute>
      ),
    },
    {
      path: "/account/:idUser/addresses/add-address",
      element: (
        <PrivateRoute>
          <NewAddress />
        </PrivateRoute>
      ),
    },
    {
      path: "/account/:idUser/addresses/edit-address/:idAddress",
      element: (
        <PrivateRoute>
          <EditAddress />
        </PrivateRoute>
      ),
    },
    {
      path: "/account/:idUser/order/:orderId",
      element: (
        <PrivateRoute>
          <Order />
        </PrivateRoute>
      ),
    },
    {
      path: "/account/:idUser/orders",
      element: (
        <PrivateRoute>
          <Orders />
        </PrivateRoute>
      ),
    },
    {
      path: "/signIn",
      element: (
        <PrivateOnAuth>
          <SignIn />
        </PrivateOnAuth>
      ),
    },
    {
      path: "/register",
      element: (
        <PrivateOnAuth>
          <Register />
        </PrivateOnAuth>
      ),
    },
    {
      path: "/checkout",
      element: (
        <PrivateCheckout>
          <Checkout />
        </PrivateCheckout>
      ),
    },
    {
      path: "/checkout/order-success",
      element: (
        <PrivateRoute>
          <CheckoutSuccess />
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
