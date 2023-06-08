import { useEffect, useState } from "react";
import { useGlobalState } from "../../../contexts/globalState";

interface SelectProps {
  id: number;
  qty: number;
}

interface Option {
  value: string;
  label: string;
}

export const QuantitySelect = ({ id, qty }: SelectProps) => {
  const globalState = useGlobalState();
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
    const productsInCart = globalState?.state.productsInCart;
    if (productsInCart) {
      const pIndex: number = productsInCart?.findIndex(
        (product) => product.id === id
      );

      if (productsInCart[pIndex].qty < parseInt(e.target.value)) {
        console.log("oPrice", productsInCart[pIndex].oPrice);
        console.log("qtySelect", parseInt(e.target.value));
        console.log(productsInCart[pIndex].oPrice * parseInt(e.target.value));

        productsInCart[pIndex] = {
          ...productsInCart[pIndex],
          qty: parseInt(e.target.value),
          price: productsInCart[pIndex].oPrice * parseInt(e.target.value),
        };

        console.log("priceDisplay", productsInCart[pIndex].price);

        globalState?.dispatch({
          type: "ADD_PRODUCT_QTY",
          payload: productsInCart,
        });
      } else {
        productsInCart[pIndex] = {
          ...productsInCart[pIndex],
          qty: parseInt(e.target.value),
          price: productsInCart[pIndex].oPrice / parseInt(e.target.value),
        };

        globalState?.dispatch({
          type: "ADD_PRODUCT_QTY",
          payload: productsInCart,
        });
      }
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
