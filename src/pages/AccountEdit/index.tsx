import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../contexts/auth";
import { useAuth } from "../../hooks/useAuth";

export const AccountEdit = () => {
  const navigate = useNavigate();
  const [newName, setNewName] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const authState = useAuthContext();
  const { editUser } = useAuth();
  const userId = authState?.state.userInfo.id;
  const handleOnCancel = () => {
    navigate(`/account/${userId}`);
  };

  const hanldeEditUser = () => {
    if (userId) editUser(userId, newName, newPassword);
    navigate(`/account/${userId}`);
  };

  return (
    <section className="w-4/5 sm:w-2/4 md:w-2/5 lg:w-1/4 md:mt-5 py-5 px-7 border rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Edit your account</h2>
      <article className="flex flex-col gap-4">
        <div>
          <p>
            <span className="font-semibold">Email: </span>
            {authState?.state.userInfo.email}
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold">Name: </span>
            {authState?.state.userInfo.name}
          </p>
          <p className="font-semibold">New name:</p>
          <input
            type="text"
            className="inputStyle"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          <p>
            <span className="font-semibold">Password: </span>
            {authState?.state.userInfo.password}
          </p>
          <p className="font-semibold">New password:</p>
          <input
            type="password"
            className="inputStyle"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
      </article>
      <article className="flex justify-evenly mt-6">
        <button onClick={handleOnCancel} type="button" className="logOutbtn">
          Cancel
        </button>
        <button onClick={hanldeEditUser} type="button" className="btn">
          Confirm
        </button>
      </article>
    </section>
  );
};
