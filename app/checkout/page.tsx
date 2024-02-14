// components
import { CheckoutPrice } from "@/components/checkout/checkout-price";
import { CheckoutItems } from "@/components/checkout/checkout-items";
import { CheckoutAddress } from "@/components/checkout/checkout-address";
import file from "@/public/counties-constituencies-wards.json";

type Constituency = {
  name: string;
  wards: string[];
};

export type CountiesData = {
  countyCode: number;
  name: string;
  constituencies: Constituency[];
}[];

export default async function Checkout() {
  const countiesData: CountiesData = file;

  return (
    <main className="font-inter">
      <hr />
      <div className="container py-6">
        <h5 className="font-light">Checkout</h5>
      </div>
      <hr />
      <div className="py-4 container grid lg:grid-cols-2 gap-4 items-start">
        <div className="">
          <small className="font-light">Pay</small>
          <CheckoutPrice />
          <CheckoutItems />
        </div>
        <div className="grid gap-4">
          <div className="">
            <small className="font-light">Address</small>
            <h1 className="font-light lg:text-2xl">Shipping Address</h1>
          </div>
          <CheckoutAddress locationData={countiesData} />
        </div>
      </div>
    </main>
  );
}
