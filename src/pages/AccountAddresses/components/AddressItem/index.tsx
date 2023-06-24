interface AddressProps {
  name: string;
  address: string;
  extraInfo?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export const AddressItem = ({
  name,
  address,
  extraInfo,
  city,
  state,
  zipCode,
  country,
  phone,
  isDefault,
}: AddressProps) => {
  return (
    <article className="addressItem justify-between p-4 shadow-md">
      {isDefault && <p className="text-blue-800">Default</p>}
      <div>
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
        <span className="text-blue-800">Edit</span> |{" "}
        <span className="text-blue-800">Remove</span> |{" "}
        <span className="text-blue-800">Set as default</span>
      </p>
    </article>
  );
};
