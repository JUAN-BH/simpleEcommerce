import { useState } from "react";

interface FilterProps {
  filterFunc: (name: string) => void;
}

export const FilterProducts = ({ filterFunc }: FilterProps) => {
  const [filter, setFilter] = useState<string>("");

  const filterProducts = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setFilter(inputValue);
    filterFunc(inputValue);
  };

  return (
    <section className="mb-6 w-full flex flex-col items-center">
      <h2 className="text-2xl font-semibold">Exclusive products</h2>
      <div className="mt-3 w-1/5">
        <input
          type="text"
          value={filter}
          onChange={filterProducts}
          className="p-2 border border-black w-full rounded-md shadow-md focus:outline-none text-sm"
          placeholder="Search for a product"
        />
      </div>
    </section>
  );
};
