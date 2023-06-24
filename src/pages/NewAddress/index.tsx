import { AddressForm } from "../../global/components/AddressForm";

export const NewAddress = () => {
  return (
    <section className="py-4 px-7 border border-gray-400/40 shadow-sm rounded-md w-3/4 sm:w-2/4 md:w-2/5 lg:w-1/4">
      <h2 className="text-2xl font-semibold">Add new address</h2>
      <AddressForm />
    </section>
  );
};
