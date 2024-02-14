// components
import { CartItems } from "@/components/cart/cart-items";
import { CartSummary } from "@/components/cart/cart-summary";

const Cart = () => {
  return (
    <main className="font-inter">
      <hr />
      <div className="container py-6">
        <h5 className="font-light">Shopping Cart</h5>
      </div>
      <hr />
      <div className="py-4 container grid lg:grid-cols-[3fr_2fr] gap-4">
        <CartItems />
        <CartSummary />
      </div>
    </main>
  );
};

export default Cart;
