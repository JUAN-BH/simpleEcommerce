import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";
import { BackBtnAccount } from "../../global/components/BackBtnAccount";
import { ProductInCart } from "../../ts/dtos/shoppingCartState.dto";

export const Orders = (): JSX.Element => {
  const authState = useAuthContext();
  const userOrders = authState?.state.userOrthers || [];
  return (
    <section className="w-full max-w-screen-xl mx-auto px-4">
      <div className="flex items-center gap-4 mb-8">
        <BackBtnAccount />
        <h2 className="text-xl font-semibold">Your orders</h2>
      </div>
      <div>
        <article className="flex flex-col items-center gap-6">
          {userOrders.length > 0 ? (
            userOrders
              .filter((ord, index, self) => {
                return (
                  index ===
                  self.findIndex((item) => item.idOrder === ord.idOrder)
                );
              })
              .map((order) => (
                <OrderItem
                  key={order.idOrder}
                  id={order.idOrder}
                  itemsNumber={order.products.length}
                  items={order.products}
                />
              ))
          ) : (
            <p>You have no orders made</p>
          )}
        </article>
      </div>
    </section>
  );
};

const OrderItem = ({
  id,
  items,
  itemsNumber,
}: {
  id: string;
  items: ProductInCart[];
  itemsNumber: number;
}) => {
  const authState = useAuthContext();
  const idUser = authState?.state.userInfo.id || "";
  const navigate = useNavigate();
  const total = items.map((item) => item.price).reduce((a, b) => a + b, 0);
  const goToOrder = () => {
    navigate(`/account/${idUser}/order/${id}`);
  };
  return (
    <div className="orderItem" onClick={goToOrder}>
      <div className="flex items-center gap-2 w-11/12">
        <p className="font-semibold p-2 bg-gray-100 rounded-md">
          Order# <span className="font-normal">{id}</span>{" "}
        </p>
        <p className="font-semibold p-2 bg-gray-100 rounded-md">
          Items: <span className="font-normal">{itemsNumber}</span>{" "}
        </p>
        <p className="font-semibold p-2 bg-gray-100 rounded-md">
          Total: <span className="font-normal">${total}</span>{" "}
        </p>
      </div>
      <ChevronRightIcon className="h-5 text-green-500 w-2/12" />
    </div>
  );
};
