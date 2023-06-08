import { useGlobalState } from "../../contexts/globalState";
import { Card } from "../../global/components/Card";
import useProducts from "../../hooks/usProducts";
import { ProductDetail } from "./Components/ProductDetail";

export const Home = (): JSX.Element => {
  const products = useProducts();
  const globalState = useGlobalState();
  return (
    <>
      {globalState?.state.detail && <ProductDetail />}
      <div className="grid grid-cols-4 gap-6 max-w-screen-lg">
        {products.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            price={product.price}
            title={product.title}
            images={product.images}
            category={product.category}
            description={product.description}
          />
        ))}
      </div>
    </>
  );
};
