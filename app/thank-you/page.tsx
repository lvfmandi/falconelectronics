"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useCart } from "react-use-cart";

const ThankYou = () => {
  const { emptyCart } = useCart();
  emptyCart();
  return (
    <main className="flex items-center justify-center">
      <div className="font-inter container py-5 space-y-2 w-fit h-[50vh] grid content-center justify-items-center">
        <h1 className="text-green-500">Thank You!</h1>
        <p>We have received your purchase we will contact you shortly.</p>
        <div className="flex gap-2">
          <Link href={"/guides/contacts"}>
            <Button variant={"link"} className="text-green-500">
              Contact Us
            </Button>
          </Link>
          <Link href={"/"}>
            <Button className="bg-green-500 hover:bg-green-600">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ThankYou;
