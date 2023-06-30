import { useShoppingCartContext } from "../../../../contexts/shoppingCartState";
import { ProductInCart } from "../../../../ts/dtos/shoppingCartState.dto";

type PropTypes = Pick<ProductInCart, "images" | "price" | "qty" | "title">;

export const OrderSummary = () => {
  const SCState = useShoppingCartContext();
  const productsInCart = SCState?.state.productsInCart || [];
  const totalPrice: number =
    SCState?.state.productsInCart
      .map((p) => p.price)
      .reduce((a: number, b: number) => a + b, 0) || 0;
  return (
    <section className="w-full px-4 max-w-screen-xl mx-auto">
      <h2 className="text-xl font-semibold">Order summary</h2>
      <article className="mt-4">
        {productsInCart?.length > 0 ? (
          productsInCart?.map((p) => (
            <SumaryItem
              key={p.id}
              title={p.title}
              price={p.price}
              qty={p.qty}
              images={p.images}
            />
          ))
        ) : (
          <p>No products in cart</p>
        )}
      </article>
      <article>
        <p className="text-lg font-semibold">Total: ${totalPrice}</p>
      </article>
    </section>
  );
};

const SumaryItem = ({ images, title, price, qty }: PropTypes) => {
  return (
    <div>
      <article className="flex items-center justify-between mb-5">
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
    </div>
  );
};
