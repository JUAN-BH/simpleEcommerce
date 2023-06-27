import ordersImg from "./assets/checklist.png";
import addressImg from "./assets/location.png";
import editAccountImg from "./assets/edit.png";
import { useAuthContext } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const Account = (): JSX.Element => {
  const authState = useAuthContext();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const editAccount = () => {
    navigate(`/account/${authState?.state.userInfo.id}/edit`);
  };

  const goToAddresses = () => {
    navigate(`/account/${authState?.state.userInfo.id}/addresses`);
  };
  const logOut = () => {
    logout();
  };

  return (
    <section className="flex flex-col items-center gap-5 md:mt-5">
      <article className="accountItem">
        <figure className="w-14 h-14 rounded-full shadow-md">
          <img src={ordersImg} alt="Orders image" />
        </figure>
        <div>
          <h2 className="text-xl font-semibold">Your Orders</h2>
          <p className="text-sm text-gray-500">See your orders history</p>
        </div>
      </article>
      <article onClick={goToAddresses} className="accountItem">
        <figure className="w-14 h-14 rounded-full shadow-md">
          <img src={addressImg} alt="Address image" />
        </figure>
        <div>
          <h2 className="text-xl font-semibold">Your addresses</h2>
          <p className="text-sm text-gray-500">
            Edit, remove or set a default address
          </p>
        </div>
      </article>
      <article onClick={editAccount} className="accountItem">
        <figure className="w-14 h-14 rounded-full shadow-md">
          <img src={editAccountImg} alt="Edit account image" />
        </figure>
        <div>
          <h2 className="text-xl font-semibold">Your information</h2>
          <p className="text-sm text-gray-500">Edit your account information</p>
        </div>
      </article>
      <button type="button" className="logOutbtn mt-6" onClick={logOut}>
        Log out
      </button>
    </section>
  );
};
