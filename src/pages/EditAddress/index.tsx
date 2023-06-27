import { useParams } from "react-router-dom";
import { AddressForm } from "../../global/components/AddressForm";
import { useAuthContext } from "../../contexts/auth";

export const EditAddress = () => {
  const params = useParams();
  const authState = useAuthContext();

  const addressToEdit = authState?.state.userAddresses.find(
    (address) => address.idAddress === params.idAddress
  );

  return (
    <section className="py-4 px-7 border border-gray-400/40 shadow-sm rounded-md w-3/4 sm:w-2/4 md:w-2/5 lg:w-1/4">
      <h2 className="text-2xl font-semibold">Edit address</h2>
      <AddressForm
        name={addressToEdit?.name}
        address={addressToEdit?.address}
        extraInfo={addressToEdit?.extraInfo}
        city={addressToEdit?.city}
        state={addressToEdit?.state}
        zipCode={addressToEdit?.zipCode}
        country={addressToEdit?.country}
        phone={addressToEdit?.phone}
        isDefault={addressToEdit?.isDefault}
        idAddress={addressToEdit?.idAddress}
        key={addressToEdit?.idAddress}
      />
    </section>
  );
};
