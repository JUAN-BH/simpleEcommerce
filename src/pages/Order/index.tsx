import { useParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth";
import { BackBtnAccount } from "../../global/components/BackBtnAccount";
import { OrderItem } from "../../global/components/OrderItem";

export const Order = (): JSX.Element => {
  const { orderId } = useParams();
  const authState = useAuthContext();
  const userOrders = authState?.state.userOrthers || [];
  const order = userOrders.find((order) => order.idOrder === orderId);
  const orderProducts = order?.products || [];
  const orderTotal = orderProducts
    .map((p) => p.price)
    .reduce((a, b) => a + b, 0);
  return (
    <section className="flex flex-col w-full px-6 max-w-screen-xl mx-auto pb-6">
      <article className="flex items-center gap-4 mb-3">
        <BackBtnAccount
          to={`/account/${authState?.state.userInfo.id}/orders`}
        />
        <h2 className="text-xl font-semibold">Orders</h2>
      </article>
      <article className="w-11/12 md:w-4/5 lg:w-5/12 mx-auto">
        <p className="text-lg font-semibold">Order #{order?.idOrder}</p>
        <div className="flex items-center gap-2">
          <p>Shipped to:</p>
          <address> {order?.addressShipment.address}</address>
        </div>
        <p>Made on: {order?.name}</p>
        <div className="flex flex-col items-center gap-4 mt-5">
          {orderProducts.map((p) => (
            <OrderItem key={p.id} {...p} />
          ))}
          <p className=" text-lg font-semibold self-start">
            Total: ${orderTotal}
          </p>
        </div>
      </article>
    </section>
  );
};
