import { ProductInCart } from "../../../ts/dtos/shoppingCartState.dto";

type PropTypes = Pick<
  ProductInCart,
  "id" | "images" | "price" | "qty" | "title"
>;

export const OrderItem = ({ images, title, price, qty }: PropTypes) => {
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
