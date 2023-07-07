import { useAuthContext } from "../../../../contexts/auth";
import { useGlobalState } from "../../../../contexts/globalStateContext";
import { useAuth } from "../../../../hooks/useAuth";

export const PaymentInformation = ({ isSelected }: { isSelected: string }) => {
  const authState = useAuthContext();
  const globalState = useGlobalState();
  const { addOrder } = useAuth();
  const userAddresses = authState?.state.userAddresses || [];
  const addressSelected = userAddresses.find(
    (address) => address.idAddress === isSelected
  );

  const handleOrder = () => {
    if (addressSelected) {
      addOrder(addressSelected);
    } else {
      setTimeout(() => {
        globalState?.dispatch({
          type: "CLOSE_MODAL",
        });
      }, 3000);
      globalState?.dispatch({
        type: "SHOW_MODAL",
        payload: "Please select an address",
      });
    }
  };

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
        <button className="btn w-full block mx-auto mt-8" onClick={handleOrder}>
          Place order
        </button>
      </article>
    </section>
  );
};
