import { useNavigate } from "react-router-dom";
import { useShoppingCartContext } from "../../../contexts/shoppingCartState";
import { ProductInCart } from "../../../ts/dtos/shoppingCartState.dto";
import { CartItem } from "../../components/CartItem";

export const ShoppingCart = () => {
  const navigate = useNavigate();
  const SCState = useShoppingCartContext();
  const total = SCState?.state.productsInCart?.reduce<number>(
    (a: number, b: ProductInCart): number => {
      return a + b.price;
    },
    0
  );

  const handleCloseCart = () => {
    SCState?.dispatch({ type: "CLOSE_CART" });
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

        {SCState?.state.productsInCart.map((p) => (
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
          onClick={() => navigate("/order")}
          type="button"
          className="mt-5 cursor-pointer rounded-md py-3 w-full bg-green-500 text-white shadow-md"
        >
          Checkout
        </button>
      </article>
    </aside>
  );
};
