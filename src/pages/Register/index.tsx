import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import { Link } from "react-router-dom";
import { User } from "../../ts/models/auth.model";
import { useAuth } from "../../hooks/useAuth";

interface RegisterValues {
  userName: string;
  userEmail: string;
  userPassword: string;
  userPasswordValid: string;
}

export const Register = () => {
  const { signIn } = useAuth();
  const registerValues: RegisterValues = {
    userName: "",
    userEmail: "",
    userPassword: "",
    userPasswordValid: "",
  };

  const handleValidate = (values: RegisterValues) => {
    const errors: Partial<RegisterValues> = {};

    // Validacion nombre
    if (!values.userName) {
      errors.userName = "Please enter your name";
    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.userName)) {
      errors.userName = "El nombre solo puede contener letras y espacios";
    }

    if (!values.userEmail) {
      errors.userEmail = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(values.userEmail)) {
      errors.userEmail = "Formato de correo electrónico inválido";
    }

    if (!values.userPassword) {
      errors.userPassword = "La contraseña es requerida";
    }

    if (!values.userPasswordValid) {
      errors.userPasswordValid = "La confirmación de contraseña es requerida";
    } else if (values.userPassword !== values.userPasswordValid) {
      errors.userPasswordValid = "Las contraseñas no coinciden";
    }

    return errors;
  };

  const handleSubmit = (values: RegisterValues) => {
    console.log(values);
    const userInfo: User = {
      name: values.userName,
      email: values.userEmail,
      password: values.userPassword,
    };
    signIn(userInfo);
  };

  return (
    <>
      <article className="py-4 px-7 border border-gray-400/40 shadow-sm rounded-md w-3/4 sm:w-2/4 md:w-2/5 lg:w-1/4">
        <h2 className="text-3xl font-semibold">Create an account</h2>

        <Formik
          initialValues={registerValues}
          onSubmit={handleSubmit}
          validate={handleValidate}
        >
          {(formikProps: FormikProps<RegisterValues>) => (
            <Form
              onSubmit={formikProps.handleSubmit}
              className="flex flex-col gap-6 mt-4"
            >
              <label htmlFor="userName">
                <p className="font-semibold">Your name</p>
                <Field
                  className="inputStyle"
                  name="userName"
                  type="text"
                  placeholder="Enter your name"
                />
                <ErrorMessage
                  name="userName"
                  component={() => (
                    <div className="text-red-500 text-sm">
                      {formikProps.errors.userName}
                    </div>
                  )}
                />
              </label>
              <label htmlFor="userEmail">
                <p className="font-semibold">Email</p>
                <Field
                  className="inputStyle"
                  name="userEmail"
                  type="email"
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
                  className="inputStyle"
                  name="userPassword"
                  type="password"
                  placeholder="Enter your password"
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
              <label htmlFor="userPasswordValid">
                <p className="font-semibold">Re-enter password</p>
                <Field
                  className="inputStyle"
                  name="userPasswordValid"
                  type="password"
                  placeholder="Re-enter your password"
                />
                <ErrorMessage
                  name="userPasswordValid"
                  component={() => (
                    <div className="text-red-500 text-sm">
                      {formikProps.errors.userPasswordValid}
                    </div>
                  )}
                />
              </label>
              <button
                className="w-full p-2 bg-green-500 text-white rounded-md mx-auto block shadow-sm hover:bg-green-600 cursor-pointer transition-all"
                type="submit"
              >
                Register and login
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-5 pt-4 pb-1 border-t border-t-gray-400/30">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/signIn" className="text-blue-700">
              Sign in
            </Link>{" "}
          </p>
        </div>
      </article>
    </>
  );
};
