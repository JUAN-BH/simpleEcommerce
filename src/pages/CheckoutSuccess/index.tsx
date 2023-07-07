import { OrderItem } from "../../global/components/OrderItem";
import { UsersLS } from "../../ts/models/auth.model";

export const CheckoutSuccess = () => {
  const userLogged: UsersLS = JSON.parse(
    localStorage.getItem("userLogged") || "{}"
  );
  const userOrders = userLogged?.userOrthers || [];
  const mostRecentOrder = userOrders[userOrders.length - 1];
  const orderItems = mostRecentOrder.products;
  const orderTotal = orderItems.map((p) => p.price).reduce((a, b) => a + b, 0);

  return (
    <section className="flex flex-col gap-5 w-full px-4 md:max-w-screen-xl">
      <article className="">
        <h2 className="text-xl font-semibold text-green-500">
          Checkout Success
        </h2>
        <p>Thanks for your shopping with us!</p>
      </article>
      <article className="w-full mx-auto md:w-4/5 lg:w-5/12">
        <p className="text-lg font-semibold">
          Order #{mostRecentOrder.idOrder}
        </p>
        <div className="flex items-center gap-2">
          <p>Shipped to:</p>
          <address> {mostRecentOrder.addressShipment.address}</address>
        </div>
        <p>Made on: {mostRecentOrder.name}</p>
        <div className="flex flex-col gap-4 mt-4">
          {orderItems.map((item) => (
            <OrderItem key={item.id} {...item} />
          ))}
        </div>
        <p className="text-lg font-semibold mt-4">Total: ${orderTotal}</p>
      </article>
    </section>
  );
};
