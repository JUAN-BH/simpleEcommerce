import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";

export const Orders = (): JSX.Element => {
  const authState = useAuthContext();
  const userOrders = authState?.state.userOrthers || [];
  return (
    <section className="w-full max-w-screen-xl mx-auto px-4">
      <article className="flex flex-col items-center gap-6">
        {userOrders.length > 0 ? (
          userOrders.map((order) => (
            <OrderItem
              key={order.idOrder}
              id={order.idOrder}
              date={order.name}
              items={order.products.length}
            />
          ))
        ) : (
          <p>You have no orders made</p>
        )}
      </article>
    </section>
  );
};

const OrderItem = ({
  id,
  date,
}: {
  id: string;
  date: string;
  items: number;
}) => {
  const authState = useAuthContext();
  const idUser = authState?.state.userInfo.id || "";
  const navigate = useNavigate();
  const goToOrder = () => {
    navigate(`/account/${idUser}/order/${id}`);
  };
  return (
    <div className="orderItem" onClick={goToOrder}>
      <p className="font-semibold">{date}</p>
      <ChevronRightIcon className="h-5 w-5 text-green-500" />
    </div>
  );
};
