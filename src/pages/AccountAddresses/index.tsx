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
    <section className="grid place-content-center gap-6 w-full px-6 pb-6 mx-auto md:grid-cols-2 md:place-items-center md:max-w-screen-xl md:mx-auto md:pt-6 lg:grid-cols-3 lg:gap-x-4">
      <article
        onClick={handleNewAddress}
        className="addressItem items-center justify-center text-center border-dashed cursor-pointer hover:border-green-500"
      >
        <p className="text-5xl text-gray-500/80 font-bold">+</p>
        <p className="text-2xl text-gray-500 font-semibold">Add address</p>
      </article>
      {authState?.state.userAddresses
        .filter((add, index, self) => {
          return (
            index === self.findIndex((item) => item.idAddress === add.idAddress)
          );
        })
        .map((address) => (
          <AddressItem
            key={address.idAddress}
            idAddress={address.idAddress}
            name={address.name}
            address={address.address}
            city={address.city}
            state={address.state}
            zipCode={address.zipCode}
            country={address.country}
            phone={address.phone}
            isDefault={address.isDefault}
            extraInfo={address.extraInfo}
          />
        ))}
    </section>
  );
};
