import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { UserAddress } from "../../../ts/models/auth.model";
import { generateId } from "../../../utils/idGenerator";
import { useAuthContext } from "../../../contexts/auth";

interface AddressValues {
  country: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  addressExtraInfo: string;
  city: string;
  state: string;
  zipCode: string;
  default: boolean;
}
export const AddressForm = () => {
  const auhtState = useAuthContext();
  const intialValues: AddressValues = {
    country: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    addressExtraInfo: "",
    city: "",
    state: "",
    zipCode: "",
    default: false,
  };

  const handleValidate = (values: AddressValues) => {
    const errors: Partial<AddressValues> = {};

    if (!values.country) {
      errors.country = "Country is required";
    }

    if (!values.fullName) {
      errors.fullName = "Please enter your full name";
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = "Please enter your phone number";
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

  const handleSubmit = (values: AddressValues) => {
    const addressInfo: UserAddress = {
      id: generateId(),
      country: values.country,
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
      address: values.address,
      addressExtraInfo: values.addressExtraInfo,
      city: values.city,
      state: values.state,
      zipCode: values.zipCode,
      default: values.default,
    };
    if (auhtState?.state.userInfo.id)
      auhtState?.addAddress(auhtState?.state.userInfo.id, addressInfo);
    console.log(values);
  };

  return (
    <article>
      <Formik
        onSubmit={handleSubmit}
        validate={handleValidate}
        initialValues={intialValues}
      >
        {(formikProps: FormikProps<AddressValues>) => (
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
            <label htmlFor="fullName">
              <p className="font-semibold">Full name</p>
              <Field
                className="inputStyle"
                name="fullName"
                type="text"
                placeholder="Example: John Doe"
              />
              <ErrorMessage
                name="fullName"
                component={() => (
                  <div className="text-red-500 text-sm">
                    {formikProps.errors.fullName}
                  </div>
                )}
              />
            </label>
            <label htmlFor="phoneNumber">
              <p className="font-semibold">Phone number</p>
              <Field
                className="inputStyle"
                name="phoneNumber"
                type="number"
                placeholder="Enter your phone number"
              />
              <ErrorMessage
                name="phoneNumber"
                component={() => (
                  <div className="text-red-500 text-sm">
                    {formikProps.errors.phoneNumber}
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
                name="addressExtraInfo"
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
            <label htmlFor="default" className="flex gap-2">
              <Field
                id="default"
                name="default"
                type="checkbox"
                placeholder="Enter your zip code"
              />
              <p className="text-sm">Select this address as your default</p>
            </label>
            <button type="submit" className="btn">
              Save address
            </button>
          </Form>
        )}
      </Formik>
    </article>
  );
};
