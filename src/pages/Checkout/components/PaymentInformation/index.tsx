import { useNavigate } from "react-router-dom";

export const PaymentInformation = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full p-4 max-w-screen-xl mx-auto">
      <h2 className="text-xl font-semibold">Payment Information</h2>
      <article className="mt-2">
        <form className="flex flex-col gap-4" action="">
          <label htmlFor="cardName" id="cardName">
            <p className="text-sm text-gray-500 font-semibold">Name on Card</p>
            <input
              className="inputStyle"
              type="text"
              name="cardName"
              placeholder="Name"
            />
          </label>
          <div>
            <p className="text-sm text-gray-500 font-semibold">
              Card information
            </p>
            <div className="grid grid-cols-2 grid-rows-2">
              <input
                className="inputStyle col-start-1 col-end-3"
                type="number"
                placeholder="Card number"
              />
              <input className="inputStyle" type="month" placeholder="MM/YY" />
              <input className="inputStyle" type="number" placeholder="CVV" />
            </div>
          </div>
        </form>
        <button
          className="btn w-full block mx-auto mt-8"
          onClick={() => navigate("/checkout/success")}
        >
          Place order
        </button>
      </article>
    </section>
  );
};
