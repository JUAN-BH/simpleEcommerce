import { useParams } from "react-router-dom";
import { useGlobalState } from "../../contexts/globalStateContext";
import { FilterProducts } from "../../global/components/FilterProducts";
import { Loader } from "../../global/components/Loader";
import useProducts from "../../hooks/useProducts";
import { Card } from "../Home/Components/Card";
import { ProductDetail } from "../Home/Components/ProductDetail";

export const Category = () => {
  const { idCategory } = useParams();
  const {
    products,
    filterProducts,
    currentPage,
    totalPages,
    goToPage,
    pagesOn,
    productsFound,
  } = useProducts(idCategory);
  const globalState = useGlobalState();
  const isLoading = globalState?.state.loading || false;

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
      <ProductDetail />
      {isLoading ? (
        <Loader />
      ) : products.length > 0 ? (
        <>
          <FilterProducts filterFunc={filterProducts} />
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 max-w-screen-lg">
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
            <button className="btnPages" type="button" onClick={prevPage}>
              Previous Page
            </button>
            {currentPage}
            <p>of</p>
            {totalPages}
            <button
              className="btnPages"
              type="button"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              Next Page
            </button>
          </section>
        </>
      ) : !productsFound ? (
        <>
          <FilterProducts filterFunc={filterProducts} />
          <section className="max-w-screen-lg">
            <p className="font-semibold text-center">
              Sorry, no products found
            </p>
          </section>
        </>
      ) : (
        <section className="flex flex-col items-center justify-center h-[calc(100vh-145px)]">
          <p className="text-center text-3xl font-semibold text-green-500">
            We are re stocking our products
          </p>
          <p className="text-center text-xl italic text-green-500">
            we will be back soon
          </p>
        </section>
      )}
    </>
  );
};
