/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { useAuthContext } from "../../../../contexts/auth";
import { useNavigate } from "react-router-dom";

interface AddressProps {
  idAddress: string;
  name: string;
  address: string;
  city: string;
  isSelected: boolean;
  onSelect: (addressId: string) => void;
}

export const ShippingAddress = ({
  isSelected,
  setIsSelected,
}: {
  isSelected: string;
  setIsSelected(addressId: string): void;
}) => {
  const navigate = useNavigate();
  const authState = useAuthContext();
  const userAddresses = authState?.state.userAddresses || [];
  const memoizedUserAddresses = useMemo(() => userAddresses, [userAddresses]);
  const goAddAddress = () => {
    navigate(
      `/account/${authState?.state.userInfo.id}/addresses/add-address?from=checkout`
    );
  };

  // Función para manejar el cambio de la dirección seleccionada
  const handleAddressSelection = (addressId: string) => {
    setIsSelected(addressId);
  };

  // Establecer la dirección por defecto como seleccionada automáticamente
  useEffect(() => {
    const defaultAddress = memoizedUserAddresses.find(
      (address) => address.isDefault
    );
    if (defaultAddress) {
      setIsSelected(defaultAddress.idAddress);
    }
  }, [memoizedUserAddresses]);

  return (
    <section className="w-full px-4 max-w-screen-xl mx-auto mt-4">
      <h2 className="text-xl font-semibold mb-4">Shipping address</h2>

      {memoizedUserAddresses.length === 0 ? (
        <div>
          <p className="">No addresses found</p>
          <button className="mt-4 btn" onClick={goAddAddress}>
            Add new address
          </button>
        </div>
      ) : (
        <>
          <article className="flex flex-col rounded-md shadow-sm border">
            {memoizedUserAddresses
              .filter((add, index, self) => {
                return (
                  index ===
                  self.findIndex((item) => item.idAddress === add.idAddress)
                );
              })
              .map((address) => (
                <AddressSummaryItem
                  key={address.idAddress}
                  idAddress={address.idAddress}
                  name={address.name}
                  address={address.address}
                  city={address.city}
                  isSelected={address.idAddress === isSelected}
                  onSelect={handleAddressSelection}
                />
              ))}
          </article>
          <button className="mt-4 btn" onClick={goAddAddress}>
            Add new address
          </button>
        </>
      )}
    </section>
  );
};

function AddressSummaryItem({
  idAddress,
  name,
  address,
  city,
  isSelected,
  onSelect,
}: AddressProps) {
  const handleCheckboxChange = () => {
    onSelect(idAddress); // Llamar a la función de manejo del evento en el componente padre
  };
  return (
    <label
      id="addressSelect"
      className="flex items-center gap-4 w-full py-3 px-4 border-b cursor-pointer"
    >
      <input
        name="addressSelect"
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
      />
      <div>
        <p className="font-semibold">{name}</p>
        <p>
          {address}, {city}
        </p>
      </div>
    </label>
  );
}
