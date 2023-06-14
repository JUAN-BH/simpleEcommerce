import { useEffect, useState } from "react";
import { useShoppingCartContext } from "../../../contexts/shoppingCartState";

interface SelectProps {
  id: number;
  qty: number;
}

interface Option {
  value: string;
  label: string;
}

export const QuantitySelect = ({ id, qty }: SelectProps) => {
  const SCState = useShoppingCartContext();
  const [selectedOption, setSelectedOption] = useState<string>(qty.toString());

  useEffect(() => {
    setSelectedOption(qty.toString());
  }, [qty]);

  const options: Option[] = [
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];

  const addQtyProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productsInCart = SCState?.state.productsInCart;
    if (productsInCart) {
      const pIndex: number = productsInCart?.findIndex(
        (product) => product.id === id
      );

      productsInCart[pIndex] = {
        ...productsInCart[pIndex],
        qty: parseInt(e.target.value),
        price: productsInCart[pIndex].oPrice * parseInt(e.target.value),
      };

      SCState?.dispatch({
        type: "ADD_PRODUCT_QTY",
        payload: productsInCart,
      });
    }
  };

  return (
    <select
      className="bg-gray-300/10 focus:outline-none cursor-pointer"
      value={selectedOption}
      onChange={addQtyProduct}
    >
      <option value="1">1</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
