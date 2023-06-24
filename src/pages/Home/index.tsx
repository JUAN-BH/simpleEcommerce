import { useGlobalState } from "../../contexts/globalStateContext";
import { Card } from "../../global/components/Card";
import { FilterProducts } from "../../global/components/FilterProducts";
import { Loader } from "../../global/components/Loader";
import useProducts from "../../hooks/useProducts";
import { ProductDetail } from "./Components/ProductDetail";

export const Home = (): JSX.Element => {
  const {
    products,
    filterProducts,
    currentPage,
    totalPages,
    goToPage,
    pagesOn,
  } = useProducts();
  const globalState = useGlobalState();

  // console.log(products);

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    goToPage(currentPage + 1);
  };

  return (
    <>
      <FilterProducts filterFunc={filterProducts} />
      <ProductDetail />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 max-w-screen-lg">
        {globalState?.state.loading && <Loader />}
        {products.map((product) => {
          return (
            <Card
              key={product.id}
              id={product.id}
              price={product.price}
              title={product.title}
              images={product.images}
              category={product.category}
              description={product.description}
            />
          );
        })}
      </section>
      <section
        className={`p-8 items-center gap-4 ${pagesOn ? "flex" : "hidden"}`}
      >
        <button
          className="p-2 bg-gray-300 rounded-md shadow-md"
          type="button"
          onClick={prevPage}
        >
          Previous Page
        </button>
        {currentPage}
        <p>of</p>
        {totalPages}
        <button
          className="p-2 bg-gray-300 rounded-md shadow-md"
          type="button"
          onClick={nextPage}
        >
          Next Page
        </button>
      </section>
    </>
  );
};
