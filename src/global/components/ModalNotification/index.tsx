import { InformationCircleIcon } from "@heroicons/react/24/outline";
import ReactDOM from "react-dom";
import { useGlobalState } from "../../../contexts/globalStateContext";

export const ModalNotification = () => {
  const gloablState = useGlobalState();
  return ReactDOM.createPortal(
    <section
      className={`fixed z-10 top-[70px] flex gap-1 w-fit h-14 mr-4 rounded-md shadow-lg overflow-hidden bg-white ${
        gloablState?.state.modal
          ? "right-0 opacity-100"
          : "-right-full opacity-0"
      } transition-all duration-1000 ease-in-out`}
    >
      <div className="w-5 bg-green-500"></div>
      <div className="flex items-center gap-1 w-fit pr-4">
        <InformationCircleIcon className="w-7 h-7 text-green-500" />
        <p className="text-sm">{gloablState?.state.modalMessage}</p>
      </div>
    </section>,
    document.getElementById("modal-root") as HTMLElement
  );
};
