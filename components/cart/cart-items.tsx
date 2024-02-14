"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

// types
import { Product } from "@/lib/types";

// resources
import { Item, useCart } from "react-use-cart";

// components
import { CartItem } from "./cart-item";
import { Button } from "../ui/button";
import { PurchaseOptionsProvider } from "../product/use-purchase-options";

export const CartItems = () => {
  const [products, setProducts] = useState<(Item & Product)[] | null>(null);
  const { items } = useCart();

  useEffect(() => setProducts(items as (Item & Product)[]), [items]);

  return (
    <div className="py-4 space-y-4">
      {products?.length ? (
        <>
          {products.map((product) => (
            <PurchaseOptionsProvider key={product.id}>
              <CartItem product={product} />
            </PurchaseOptionsProvider>
          ))}
        </>
      ) : (
        <div className="py-4 grid gap-4">
          <h6>No items in cart</h6>
          <small>
            Please{" "}
            <Link href={"/"} className="w-fit text-primary">
              Continue Shopping
            </Link>{" "}
            to add items to cart.
          </small>
        </div>
      )}
    </div>
  );
};
