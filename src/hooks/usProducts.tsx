import { useEffect, useState } from "react";
import { Product } from "../ts/models/product.model";
import api from "../api/apiSettings";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get<Product[]>("products");
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return products;
};

export default useProducts;
