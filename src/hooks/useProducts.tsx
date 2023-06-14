import { useEffect, useState } from "react";
import { Product } from "../ts/models/product.model";
import api from "../api/apiSettings";
import { useGlobalState } from "../contexts/globalStateContext";

const useProducts = () => {
  const globalState = useGlobalState();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [productsPerPage, setProductsPerPage] = useState<Product[]>([]);
  // const [productsFilteredPage, setProductsFilteredPage] = useState<Product[][]>(
  //   []
  // );
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pagesOn, setPagesOn] = useState<boolean>(false);
  const limit = 12;

  const fetchAllProducts = async () => {
    try {
      globalState?.dispatch({ type: "START_REQUEST" });
      const { data } = await api.get<Product[]>("products");
      setAllProducts(data);
      if (Math.ceil(data.length / limit) > 1) {
        setPagesOn(true);
        setTotalPages(Math.ceil(data.length / limit));
      }
      globalState?.dispatch({ type: "REQUEST_SUCCESS" });
    } catch (error) {
      globalState?.dispatch({ type: "REQUEST_FAILED" });
      console.log(error);
    }
  };

  const fetchProductsPerPage = async (offset: number) => {
    try {
      globalState?.dispatch({ type: "START_REQUEST" });
      const { data } = await api.get<Product[]>(
        `products?offset=${offset}&limit=${limit}`
      );
      setProductsPerPage(data);
      setProducts(data);
      globalState?.dispatch({ type: "REQUEST_SUCCESS" });
    } catch (error) {
      globalState?.dispatch({ type: "REQUEST_FAILED" });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    fetchProductsPerPage(currentPage * limit);
  }, [currentPage]);

  function filterProducts(name: string) {
    if (name == "") {
      // setProductsFilteredPage([]);
      setProducts(productsPerPage);
    } else {
      const filtered = allProducts.filter((p) =>
        p.title.toLocaleLowerCase().includes(name.toLocaleLowerCase())
      );
      if (filtered.length > 12) {
        // const paginatedArray = [];
        // for (let i = 0; i < filtered.length; i += 12) {
        //   const page = filtered.slice(i, i + 12);
        //   paginatedArray.push(page);
        // }

        // setProductsFilteredPage(paginatedArray);
        // console.log(paginatedArray);
        setPagesOn(true);
        setTotalPages(Math.ceil(filtered.length / 12));
      } else {
        // setProductsFilteredPage([]);
        setPagesOn(false);
      }
      setProducts(filtered);
    }
  }

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    products,
    filterProducts,
    // productsFilteredPage,
    pagesOn,
    currentPage,
    totalPages,
    goToPage,
  };
};

export default useProducts;
