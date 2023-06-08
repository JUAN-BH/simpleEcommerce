import { useEffect, useState } from "react";
import { Product } from "../ts/models/product.model";
import api from "../api/apiSettings";

const useProducts = () => {
  const [initProducts, setInitProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get<Product[]>("products");
        setInitProducts(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  function filterProducts(name: string) {
    if (name == "") {
      setProducts(initProducts);
    } else {
      const filtered = products.filter((p) =>
        p.title.toLocaleLowerCase().includes(name.toLocaleLowerCase())
      );
      setProducts(filtered);
    }
  }

  return { products, filterProducts };
};

export default useProducts;
