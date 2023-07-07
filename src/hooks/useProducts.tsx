import { useEffect, useState } from "react";
import { Product } from "../ts/models/product.model";
import api from "../api/apiSettings";
import { useGlobalState } from "../contexts/globalStateContext";
import { useLocation, useNavigate } from "react-router-dom";

const useProducts = (category = "") => {
  const location = useLocation();
  const navigate = useNavigate();
  const globalState = useGlobalState();
  //All products from API so i can filter all of them
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  //Products per page, limited to 12
  const [productsPerPage, setProductsPerPage] = useState<Product[]>([]);
  //Products to display
  const [products, setProducts] = useState<Product[]>([]);
  //Current page
  const [currentPage, setCurrentPage] = useState<number>(1);
  //Total of pages
  const [totalPages, setTotalPages] = useState<number>(0);
  //If there is more than 1 page
  const [pagesOn, setPagesOn] = useState<boolean>(false);
  const limit = 12;

  const query =
    category !== "" ? `products/?categoryId=${category}` : "products";
  const queryOffset = (offset: number) => {
    if (category == "") {
      return `products/?offset=${offset}&limit=${limit}`;
    } else {
      return `products/?categoryId=${category}&offset=${offset}&limit=${limit}`;
    }
  };

  //Fetch all products from the api and define if there is pages and its total
  const fetchAllProducts = async () => {
    try {
      globalState?.dispatch({ type: "START_REQUEST" });
      const { data } = await api.get<Product[]>(`${query}`);
      setAllProducts(data);
      if (Math.ceil(data.length / limit) > 1) {
        setPagesOn(true);
        setTotalPages(Math.ceil(data.length / limit) - 1);
      }
      globalState?.dispatch({ type: "REQUEST_SUCCESS" });
    } catch (error) {
      globalState?.dispatch({ type: "REQUEST_FAILED" });
      console.log(error);
    }
  };

  //Fetch products per page
  const fetchProductsPerPage = async (offset: number) => {
    try {
      globalState?.dispatch({ type: "START_REQUEST" });
      const { data } = await api.get<Product[]>(queryOffset(offset));
      setProductsPerPage(data);
      setProducts(data);
      globalState?.dispatch({ type: "REQUEST_SUCCESS" });
    } catch (error) {
      globalState?.dispatch({ type: "REQUEST_FAILED" });
      console.log(error);
    }
  };

  useEffect(() => {
    const locationSearch = location.search;
    if (locationSearch.includes("p=")) {
      const pageNumber = Number(locationSearch.split("p=")[1]);
      setCurrentPage(pageNumber);
    }
  }, [location.search]);

  useEffect(() => {
    fetchAllProducts();
    fetchProductsPerPage(currentPage * limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, category]);

  function filterProducts(name: string) {
    if (name == "") {
      setProducts(productsPerPage);
    } else {
      const filtered = allProducts.filter((p) =>
        p.title.toLocaleLowerCase().includes(name.toLocaleLowerCase())
      );
      // if (filtered.length > 12) {
      //   setPagesOn(true);
      //   setTotalPages(Math.ceil(filtered.length / 12));
      // } else {
      //   setPagesOn(false);
      // }
      setProducts(filtered);
    }
  }

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    navigate(`${location.pathname}?p=${pageNumber}`);
  };

  return {
    products,
    filterProducts,
    pagesOn,
    currentPage,
    totalPages,
    goToPage,
  };
};

export default useProducts;
