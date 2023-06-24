import { useNavigate } from "react-router-dom";
import { useShoppingCartContext } from "../../../contexts/shoppingCartState";
import { ProductInCart } from "../../../ts/dtos/shoppingCartState.dto";
import { CartItem } from "../../components/CartItem";
import { useGlobalState } from "../../../contexts/globalStateContext";

export const ShoppingCart = () => {
  const navigate = useNavigate();
  const globalState = useGlobalState();
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

  const handleOnCheckout = () => {
    if (SCState?.state.productsInCart.length === 0) {
      setTimeout(() => {
        globalState?.dispatch({
          type: "CLOSE_MODAL",
        });
      }, 3000);
      globalState?.dispatch({
        type: "SHOW_MODAL",
        payload: "Your cart is empty, please add some items first",
      });
    } else {
      SCState?.dispatch({ type: "CLOSE_CART" });
      navigate("/checkout");
    }
  };

  return (
    <aside
      className={`pd flex flex-col justify-between overflow-y-auto ${
        SCState?.state.cart
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      }`}
    >
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
          onClick={handleOnCheckout}
          type="button"
          className="mt-5 cursor-pointer rounded-md py-3 w-full bg-green-500 text-white shadow-md"
        >
          Checkout
        </button>
      </article>
    </aside>
  );
};
