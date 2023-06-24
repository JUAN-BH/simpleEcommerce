import { useNavigate } from "react-router-dom";
import { AddressItem } from "./components/AddressItem";
import { useAuthContext } from "../../contexts/auth";

export const AccountAddresses = () => {
  const authState = useAuthContext();
  const navigate = useNavigate();

  const handleNewAddress = () => {
    navigate(
      `/account/${authState?.state.userInfo.name}/addresses/add-address`
    );
  };
  return (
    <section className="flex flex-col items-center gap-6 w-full px-6 mx-auto">
      <article
        onClick={handleNewAddress}
        className="addressItem items-center justify-center text-center border-dashed cursor-pointer hover:border-green-500"
      >
        <p className="text-5xl text-gray-500/80 font-bold">+</p>
        <p className="text-2xl text-gray-500 font-semibold">Add address</p>
      </article>
      {authState?.state.userAddresses.map((address) => (
        <AddressItem
          key={address.id}
          name={address.fullName}
          address={address.address}
          city={address.city}
          state={address.state}
          zipCode={address.zipCode}
          country={address.country}
          phone={address.phoneNumber}
        />
      ))}
    </section>
  );
};
