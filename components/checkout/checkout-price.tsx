"use client";

import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";

export const CheckoutPrice = () => {
  const [total, setTotal] = useState<string | number>("Loading...");
  const { cartTotal } = useCart();

  useEffect(() => setTotal(cartTotal), [cartTotal]);

  return <h1 className="font-light lg:text-2xl">KES {total.toLocaleString('en-US')}</h1>;
};
