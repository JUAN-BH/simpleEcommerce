import { useParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth";
import { ProductInCart } from "../../ts/dtos/shoppingCartState.dto";

type PropTypes = Pick<
  ProductInCart,
  "id" | "images" | "price" | "qty" | "title"
>;

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
    <section className="flex flex-col w-full px-4 max-w-screen-xl mx-auto">
      <article className="flex flex-col items-center gap-6 w-11/12 md:w-4/5 lg:w-5/12 mx-auto">
        {orderProducts.map((p) => (
          <SumaryItem key={p.id} {...p} />
        ))}
        <p className=" text-lg font-semibold self-start">
          Total: ${orderTotal}
        </p>
      </article>
    </section>
  );
};

const SumaryItem = ({ images, title, price, qty }: PropTypes) => {
  return (
    <article className="flex items-center justify-between w-full p-2 py-3 rounded-md border">
      <div className="flex items-center gap-4">
        <figure className="w-14 h-14">
          <img
            className="w-full h-full object-cover rounded-md"
            src={images[0]}
            alt={title}
          />
        </figure>
        <div>
          <p>{title}</p>
          <div className="flex items-center  text-sm mt-1 w-fit py-1 px-2 rounded-md shadow-md bg-gray-300/30">
            <p>Qty: {qty}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-semibold">${price}</p>
      </div>
    </article>
  );
};
