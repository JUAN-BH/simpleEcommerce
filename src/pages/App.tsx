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
import { GlobalStateProvider } from "../contexts/globalState";

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
        <GlobalStateProvider>
          <Header />
          <Layout>
            <AppRoutes />
          </Layout>
        </GlobalStateProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
