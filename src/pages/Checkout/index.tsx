import { OrderSummary } from "./components/OrderSummary";
import { PaymentInformation } from "./components/PaymentInformation";
import { ShippingAddress } from "./components/ShippingAddress";

export const Checkout = () => {
  return (
    <section className="lg:flex justify-center items-baseline gap-10 w-full">
      <div>
        <OrderSummary />
      </div>
      <div>
        <ShippingAddress />
        <PaymentInformation />
      </div>
    </section>
  );
};
