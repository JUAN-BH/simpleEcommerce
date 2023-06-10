import { useShoppingCartState } from "../../../contexts/shoppingCartState";
import { ProductInCart } from "../../../ts/dtos/shoppingCartState.dto";
import { CartItem } from "../../components/CartItem";

export const ShoppingCart = () => {
  const globalState = useShoppingCartState();
  const total = globalState?.state.productsInCart?.reduce<number>(
    (a: number, b: ProductInCart): number => {
      return a + b.price;
    },
    0
  );

  const handleCloseCart = () => {
    globalState?.dispatch({ type: "CLOSE_CART" });
  };

  return (
    <aside className="pd flex flex-col justify-between overflow-y-auto">
      <div>
        <article className="flex items-center justify-between w-full mb-5">
          <h2 className="text-2xl font-semibold">Your cart</h2>
          <button
            onClick={handleCloseCart}
            type="button"
            className="cursor-pointer rounded-full bg-white border border-black/10 w-8 h-8 shadow-lg"
          >
            <span className="block mb-1">x</span>
          </button>
        </article>

        {globalState?.state.productsInCart.map((p) => (
          <CartItem
            key={p.id}
            id={p.id}
            qty={p.qty}
            images={p.images}
            title={p.title}
            price={p.price}
          />
        ))}
      </div>

      <article className="">
        <div className="text-xl flex items-center justify-between">
          <p>Total:</p>
          <p className="text-xl font-bold">${total}</p>
        </div>
        <button
          type="button"
          className="mt-5 cursor-pointer rounded-md py-3 w-full bg-black text-white"
        >
          Checkout
        </button>
      </article>
    </aside>
  );
};
