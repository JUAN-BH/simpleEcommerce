import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { UserAddress } from "../../../ts/models/auth.model";
import { generateId } from "../../../utils/idGenerator";
import { useAuthContext } from "../../../contexts/auth";
import { useAuth } from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

type AddressProps = Partial<UserAddress>;

export const AddressForm = ({
  idAddress,
  country,
  name,
  phone,
  address,
  extraInfo,
  city,
  state,
  zipCode,
  isDefault,
}: AddressProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const auhtState = useAuthContext();
  const { addAddress, editAddress } = useAuth();

  const isNewAddress = location.pathname.includes("add-address");

  const intialValues: UserAddress = {
    idAddress: idAddress || "",
    country: country || "",
    name: name || "",
    phone: phone || "",
    address: address || "",
    extraInfo: extraInfo || "",
    city: city || "",
    state: state || "",
    zipCode: zipCode || "",
    isDefault: isDefault || false,
  };

  const handleValidate = (values: UserAddress) => {
    const errors: Partial<UserAddress> = {};

    if (!values.country) {
      errors.country = "Country is required";
    }

    if (!values.name) {
      errors.name = "Please enter your full name";
    }

    if (!values.phone) {
      errors.phone = "Please enter your phone number";
    }
    if (!values.address) {
      errors.address = "Please enter your address";
    }
    if (!values.city) {
      errors.city = "Please enter the name of your city";
    }
    if (!values.state) {
      errors.state = "Please enter the name of your state";
    }
    if (!values.zipCode) {
      errors.zipCode = "Please enter your zip code";
    }

    return errors;
  };

  const handleSubmit = (values: UserAddress) => {
    let idAddress = intialValues.idAddress;
    if (intialValues.idAddress === "") {
      idAddress = generateId();
    }
    const addressInfo: UserAddress = {
      idAddress: idAddress,
      country: values.country,
      name: values.name,
      phone: values.phone,
      address: values.address,
      extraInfo: values.extraInfo,
      city: values.city,
      state: values.state,
      zipCode: values.zipCode,
      isDefault: values.isDefault,
    };
    if (auhtState?.state.userInfo.id)
      isNewAddress
        ? addAddress(addressInfo)
        : editAddress(values.idAddress, addressInfo);

    if (location.search.includes("checkout")) {
      navigate(`/checkout`);
    } else {
      navigate(`/account/${auhtState?.state.userInfo.id}/addresses`);
    }
  };

  const handleOnCancel = () => {
    navigate(`/account/${auhtState?.state.userInfo.id}/addresses`);
  };

  return (
    <article>
      <Formik
        onSubmit={handleSubmit}
        validate={handleValidate}
        initialValues={intialValues}
      >
        {(formikProps: FormikProps<UserAddress>) => (
          <Form
            onSubmit={formikProps.handleSubmit}
            className="flex flex-col gap-6 mt-4"
          >
            <label htmlFor="country">
              <p className="font-semibold">Your country</p>
              <Field
                className="inputStyle"
                name="country"
                type="text"
                placeholder="Enter your country"
              />
              <ErrorMessage
                name="country"
                component={() => (
                  <div className="text-red-500 text-sm">
                    {formikProps.errors.country}
                  </div>
                )}
              />
            </label>
            <label htmlFor="name">
              <p className="font-semibold">Full name</p>
              <Field
                className="inputStyle"
                name="name"
                type="text"
                placeholder="Example: John Doe"
              />
              <ErrorMessage
                name="name"
                component={() => (
                  <div className="text-red-500 text-sm">
                    {formikProps.errors.name}
                  </div>
                )}
              />
            </label>
            <label htmlFor="phone">
              <p className="font-semibold">Phone number</p>
              <Field
                className="inputStyle"
                name="phone"
                type="number"
                placeholder="Enter your phone number"
              />
              <ErrorMessage
                name="phone"
                component={() => (
                  <div className="text-red-500 text-sm">
                    {formikProps.errors.phone}
                  </div>
                )}
              />
            </label>
            <label htmlFor="address">
              <p className="font-semibold">Address</p>
              <Field
                className="inputStyle"
                name="address"
                type="text"
                placeholder="Enter your address"
              />
              <ErrorMessage
                name="address"
                component={() => (
                  <div className="text-red-500 text-sm">
                    {formikProps.errors.address}
                  </div>
                )}
              />
              <Field
                className="inputStyle mt-2"
                name="extraInfo"
                type="text"
                placeholder="Apt, suite, floor, etc."
              />
            </label>
            <label htmlFor="state">
              <p className="font-semibold">State</p>
              <Field
                className="inputStyle"
                name="state"
                type="text"
                placeholder="State"
              />
              <ErrorMessage
                name="state"
                component={() => (
                  <div className="text-red-500 text-sm">
                    {formikProps.errors.state}
                  </div>
                )}
              />
            </label>
            <div className="flex items-center gap-4">
              <label htmlFor="city">
                <p className="font-semibold">City</p>
                <Field
                  className="inputStyle"
                  name="city"
                  type="text"
                  placeholder="Enter your city"
                />
                <ErrorMessage
                  name="city"
                  component={() => (
                    <div className="text-red-500 text-sm">
                      {formikProps.errors.city}
                    </div>
                  )}
                />
              </label>
              <label htmlFor="zipCode">
                <p className="font-semibold">Zip code</p>
                <Field
                  className="inputStyle"
                  name="zipCode"
                  type="text"
                  placeholder="Enter your zip code"
                />
                <ErrorMessage
                  name="zipCode"
                  component={() => (
                    <div className="text-red-500 text-sm">
                      {formikProps.errors.zipCode}
                    </div>
                  )}
                />
              </label>
            </div>
            <label htmlFor="isDefault" className="flex gap-2">
              <Field
                id="isDefault"
                name="isDefault"
                type="checkbox"
                placeholder="Enter your zip code"
              />
              <p className="text-sm">Select this address as your default</p>
            </label>
            <div className="flex gap-4 justify-center">
              <button type="submit" className="btn">
                Save address
              </button>
              {!isNewAddress && (
                <button
                  onClick={handleOnCancel}
                  type="button"
                  className="logOutbtn"
                >
                  Cancel
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </article>
  );
};
