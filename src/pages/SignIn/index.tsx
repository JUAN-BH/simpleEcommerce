import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth";
// import { User } from "../../ts/models/auth.model";

interface LoginValues {
  userEmail: string;
  userPassword: string;
}

export const SignIn = (): JSX.Element => {
  // const usersLS = JSON.parse(localStorage.getItem("users") || "[]");
  const authState = useAuthContext();
  const navigate = useNavigate();
  const loginValues: LoginValues = {
    userEmail: "",
    userPassword: "",
  };

  const handleValidate = (values: LoginValues) => {
    const errors: Partial<LoginValues> = {};

    if (!values.userEmail) {
      errors.userEmail = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(values.userEmail)) {
      errors.userEmail = "Formato de correo electrónico inválido";
    }

    if (!values.userPassword) {
      errors.userPassword = "La contraseña es requerida";
    }
    return errors;
  };

  const handleSubmit = (values: LoginValues) => {
    authState?.login(values.userEmail, values.userPassword);
  };

  return (
    <>
      <article className="p-7 border border-gray-400/40 shadow-sm rounded-md w-3/4 sm:w-2/4 md:w-2/5 lg:w-1/4">
        <h2 className="text-3xl font-semibold">Sign In</h2>
        <Formik
          initialValues={loginValues}
          onSubmit={handleSubmit}
          validate={handleValidate}
        >
          {(formikProps: FormikProps<LoginValues>) => (
            <Form
              onSubmit={formikProps.handleSubmit}
              className="flex flex-col gap-6 mt-6"
            >
              <label htmlFor="userEmail">
                <p className="font-semibold">Email</p>
                <Field
                  name="userEmail"
                  type="email"
                  className="inputStyle"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="userEmail"
                  component={() => (
                    <div className="text-red-500 text-sm">
                      {formikProps.errors.userEmail}
                    </div>
                  )}
                />
              </label>
              <label htmlFor="userPassword">
                <p className="font-semibold">Password</p>
                <Field
                  name="userPassword"
                  type="password"
                  className="inputStyle"
                  placeholder="******"
                />
                <ErrorMessage
                  name="userPassword"
                  component={() => (
                    <div className="text-red-500 text-sm">
                      {formikProps.errors.userPassword}
                    </div>
                  )}
                />
              </label>
              <button
                className="w-full p-2 bg-green-500 text-white rounded-md mx-auto block shadow-sm hover:bg-green-600  transition-all"
                type="submit"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
        {authState?.state.loginError && (
          <p className="text-red-500 text-sm">
            Email or password are incorrect
          </p>
        )}
      </article>
      <article className="w-3/4 sm:w-2/4 md:w-2/5 lg:w-1/4 py-4 px-7 mt-4">
        <div className="flex justify-center items-center gap-2 w-full">
          <span className="block border border-b-gray-400/70 w-1/3"></span>
          <p className="text-xs text-center">New to SHOPPI?</p>
          <span className="block border border-b-gray-400/70 w-1/3"></span>
        </div>
        <button
          onClick={() => {
            navigate("/register");
          }}
          type="button"
          className="mt-4 w-full p-2 bg-gray-300 rounded-md mx-auto block shadow-sm hover:bg-gray-200  transition-all"
        >
          Create an account
        </button>
      </article>
    </>
  );
};
