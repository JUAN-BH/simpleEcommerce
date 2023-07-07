import { useEffect, useState } from "react";
import api from "../api/apiSettings";
export interface Categorie {
  id: number;
  name: string;
  image: string;
  creationAt: Date;
  updatedAt: Date;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Categorie[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get<Categorie[]>("categories");
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  return categories;
};
