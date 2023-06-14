import { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface PaginationResult {
  products: Product[];
  currentPage: number;
  totalPages: number;
  goToPage: (pageNumber: number) => void;
}

const useProductsPagination = (): PaginationResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchProducts(currentPage * limit);
  }, [currentPage]);

  const fetchProducts = async (offset: number) => {
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
      );
      setProducts(response.data);
      setTotalPages(Math.ceil(response.data.length / limit));
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    products,
    currentPage,
    totalPages,
    goToPage,
  };
};

export default useProductsPagination;
