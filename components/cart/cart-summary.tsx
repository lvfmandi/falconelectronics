"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// resources
import { Item, useCart } from "react-use-cart";

// components
import { Button } from "../ui/button";

interface StateType {
  items: Item[];
  cartTotal: number;
}

export const CartSummary = () => {
  const { items, cartTotal } = useCart();
  const [state, setState] = useState<StateType | null>(null);

  useEffect(() => {
    setState({ items, cartTotal });
  }, [items, cartTotal]);

  return (
    <div className="py-4">
      <div className="border self-start divide-y p-4 sticky top-[120px] ">
        <div className="py-2">
          <h5 className="font-light">Order Summary</h5>
          <span className="text-gray-500">
            Cross check the items in the cart before checking out
          </span>
        </div>
        {state?.items.length ? (
          <ul className="py-4 grid gap-2">
            {state?.items.map((item) => {
              const { id, name, itemTotal } = item;
              return (
                <li className="flex gap-4 justify-between" key={id}>
                  <span>{name}</span>
                  <span className="font-schibsted_grotesk text-nowrap">
                    KES {itemTotal?.toLocaleString("en-US")}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <span className="py-4 block">
            No Items in Cart.{" "}
            <Link href={"/"} className="text-primary">
              Add Items
            </Link>
          </span>
        )}
        <div className="flex py-2 justify-between items-baseline text-primary">
          <span>Cart Total: </span>
          <h6 className="font-schibsted_grotesk font-light">
            KES {state?.cartTotal.toLocaleString("en-US")}
          </h6>
        </div>
        <Link href={"/checkout"} style={{pointerEvents: state?.items.length ? "all" : "none" }}>
          <Button
            className="rounded-none w-full"
            disabled={!state?.items.length}
          >
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};
