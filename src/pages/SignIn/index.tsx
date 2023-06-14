export const SignIn = (): JSX.Element => {
  return (
    <>
      <article className="py-4 px-7 border border-gray-400 rounded-md w-1/5">
        <h2 className="text-3xl font-semibold">Sign In</h2>
        <form action="" className="flex flex-col  gap-6 mt-6">
          <label htmlFor="">
            <p className="font-semibold">Email</p>
            <input
              className="border border-gray-400 rounded-md p-1 w-full"
              type="email"
              placeholder="Enter your email"
            />
          </label>
          <label htmlFor="">
            <p className="font-semibold">Password</p>
            <input
              className="border border-gray-400 rounded-md p-1 w-full"
              type="password"
              placeholder="******"
            />
          </label>
          <button
            className="w-full p-2 bg-green-500 text-white rounded-md mx-auto block shadow-sm hover:bg-green-600  transition-all"
            type="submit"
          >
            Login
          </button>
        </form>
      </article>
      <article className="w-1/5 py-4 px-7 mt-4">
        <div className="flex justify-center items-center gap-2 w-full">
          <span className="block border border-b-gray-400 w-1/3"></span>
          <p className="text-xs">New to SHOPPI?</p>
          <span className="block border border-b-gray-400 w-1/3"></span>
        </div>
        <button
          type="button"
          className="mt-4 w-full p-2 bg-gray-300 rounded-md mx-auto block shadow-sm hover:bg-gray-200  transition-all"
        >
          Create an account
        </button>
      </article>
    </>
  );
};
