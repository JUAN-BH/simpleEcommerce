import { useGlobalState } from "../../../../contexts/globalState";

export const ProductDetail = () => {
  const globalState = useGlobalState();
  const handleOnCloseDetail = () => {
    globalState?.dispatch({ type: "CLOSE_DETAIL" });
  };

  return (
    <aside className="pd">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-semibold">Detail</h2>
        <button
          type="button"
          onClick={handleOnCloseDetail}
          className="cursor-pointer rounded-full bg-white border border-black/10 w-8 h-8 shadow-lg"
        >
          <span className="block mb-1">x</span>
        </button>
      </div>
      <figure className="w-full h-80 rounded-md overflow-hidden my-5">
        <img
          className="w-full h-full object-cover"
          src={globalState?.state.productOnDetail.images[0]}
          alt={globalState?.state.productOnDetail.title}
        />
      </figure>
      <p className="text-xl font-semibold">
        ${globalState?.state.productOnDetail.price}
      </p>
      <div>
        <p className="text-lg font-semibold">
          {globalState?.state.productOnDetail.title}
        </p>
        <p>{globalState?.state.productOnDetail.description}</p>
      </div>
    </aside>
  );
};
