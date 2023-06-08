import { useGlobalState } from "../../../contexts/globalState";
import { Product } from "../../../ts/models/product.model";

type CardProps = Pick<
  Product,
  "id" | "title" | "price" | "description" | "category" | "images"
>;

export const Card = ({
  id,
  title,
  price,
  category,
  images,
  description,
}: CardProps) => {
  const img: string = images ? images[0] : " ";
  const categoryName: string = category ? category.name : " ";

  const dataState = useGlobalState();

  const addProduct = () => {
    const productsInCart = dataState?.state.productsInCart;
    if (productsInCart) {
      const sameProduct = productsInCart.some((product) => product.id === id);
      if (!sameProduct) {
        dataState?.dispatch({
          type: "ADD_PRODUCT_TO_CART",
          payload: { id, images, title, price, oPrice: price, qty: 1 },
        });
      }
    }
  };

  const handleProduct: React.MouseEventHandler<HTMLElement> = (e) => {
    const element = e.target as HTMLElement;

    if (element.id == "addProduct") {
      addProduct();
    } else {
      dataState?.dispatch({
        type: "PRODUCT_TO_DISPLAY",
        payload: { title, description, price, images },
      });
    }
  };

  return (
    <article
      id="product"
      onClick={handleProduct}
      className="z-0 bg-white cursor-pointer rounded-md w-60 h-56 shadow-md overflow-hidden"
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="rounded-md absolute m-2 bottom-0 bg-white/80 shadow-md py-1 px-2 text-sm">
          {categoryName}
        </span>
        <img className="w-full h-full object-cover" src={img} alt={title} />
        <div
          id="addProduct"
          className="absolute cursor-pointer top-0 right-0 m-2 flex justify-center items-center rounded-full bg-white text-center w-6 h-6 p-2"
        >
          <span id="addProduct" className="pb-1">
            +
          </span>
        </div>
      </figure>
      <div className="flex justify-between items-center px-3 pb-3 h-1/5">
        <p className="text-sm font-light">{title}</p>
        <p className="text-sm font-medium">${price}</p>
      </div>
    </article>
  );
};
