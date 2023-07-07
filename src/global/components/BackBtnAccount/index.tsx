import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../contexts/auth";

export const BackBtnAccount = ({ to }: { to?: string }) => {
  const authState = useAuthContext();
  const userId = authState?.state.userInfo.id || "";
  const urlTo = to ? to : `/account/${userId}`;
  return (
    <>
      <Link to={`${urlTo}`}>
        <button className="btnBack">
          <ArrowLeftIcon className="w-6 h-w-6" />
        </button>
      </Link>
    </>
  );
};
