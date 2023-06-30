export const CheckoutSuccess = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center gap-5 h-[calc(100vh-145px)]">
      <h1 className="text-3xl text-green-500 font-bold drop-shadow-sm">
        Checkout Success
      </h1>
      <div>
        <p className="text-xl italic">Thanks for shop with us!</p>
        <p>Your order has been placed and will be shipped soon</p>
      </div>
    </section>
  );
};
