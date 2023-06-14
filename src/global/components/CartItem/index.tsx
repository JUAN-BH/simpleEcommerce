import { TrashIcon } from "@heroicons/react/24/outline";
import { useShoppingCartContext } from "../../../contexts/shoppingCartState";
import { ProductInCart } from "../../../ts/dtos/shoppingCartState.dto";
import { QuantitySelect } from "../QuantitySelect";

type PropTypes = Pick<
  ProductInCart,
  "id" | "images" | "price" | "qty" | "title"
>;

export const CartItem = ({
  id,
  images,
  title,
  price,
  qty,
}: PropTypes): JSX.Element => {
  const SCState = useShoppingCartContext();

  const hanldeRemoveItem = () => {
    const newItems = SCState?.state.productsInCart.filter((p) => p.id !== id);
    SCState?.dispatch({ type: "REMOVE_ITEM", payload: newItems });
  };

  return (
    <article className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-4">
        <figure className="w-20 h-20">
          <img
            className="w-full h-full object-cover rounded-md"
            src={images[0]}
            alt={title}
          />
        </figure>
        <div>
          <p>{title}</p>
          <div className="flex items-center  text-sm mt-1 w-fit py-1 px-2 rounded-md shadow-md bg-gray-300/30">
            <p>Qty:</p>
            <QuantitySelect id={id} qty={qty} />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-semibold">${price}</p>
        <button
          onClick={hanldeRemoveItem}
          type="button"
          className="cursor-pointer w-6 h-6"
        >
          <TrashIcon />
        </button>
      </div>
    </article>
  );
};
