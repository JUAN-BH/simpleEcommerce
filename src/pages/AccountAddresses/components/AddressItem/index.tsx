interface AddressProps {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export const AddressItem = ({
  name,
  address,
  city,
  state,
  zipCode,
  country,
  phone,
}: AddressProps) => {
  return (
    <article className="addressItem justify-between p-4 shadow-md">
      <div>
        <p className="font-bold">{name}</p>
        <p>{address}</p>
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
