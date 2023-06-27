import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import { UserAddress } from "../../../../ts/models/auth.model";
import { useAuthContext } from "../../../../contexts/auth";

export const AddressItem = ({
  idAddress,
  name,
  address,
  extraInfo,
  city,
  state,
  zipCode,
  country,
  phone,
  isDefault,
}: UserAddress) => {
  const navigate = useNavigate();
  const authState = useAuthContext();
  const { removeAddress, setDefaultAddress } = useAuth();

  const handleEditAddress = () => {
    navigate(
      `/account/${authState?.state.userInfo.id}/addresses/edit-address/${idAddress}`
    );
  };

  return (
    <article className="addressItem shadow-md">
      {isDefault && (
        <p className="text-sm text-blue-800 p-2 border-b h-min">Default</p>
      )}
      <div className="flex flex-col justify-between py-2 px-4  h-full">
        <div className="text-base overflow-y-auto">
          <p className="font-bold">{name}</p>
          <p>{address}</p>
          {extraInfo && <p>{extraInfo}</p>}
          <p>
            {city}, {state} {zipCode}
          </p>
          <p>{country}</p>
          <p>Phone number: {phone}</p>
        </div>
        <p className="text-sm">
          <span
            onClick={handleEditAddress}
            className="text-blue-800 hover:underline cursor-pointer"
          >
            Edit
          </span>{" "}
          |{" "}
          <span
            onClick={() => removeAddress(idAddress)}
            className="text-blue-800 hover:underline cursor-pointer"
          >
            Remove
          </span>{" "}
          |{" "}
          <span
            onClick={() => setDefaultAddress(idAddress)}
            className="text-blue-800 hover:underline cursor-pointer"
          >
            Set as default
          </span>
        </p>
      </div>
    </article>
  );
};
