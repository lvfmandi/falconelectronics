"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// resources
import { useCart } from "react-use-cart";

// types
import { Category } from "@/lib/types";

// components
import { Icons } from "../icons";
import { MobileNavItems } from "./mobile/nav-items";

interface NavIconProps {
  categories: Category[];
}

export const NavIcon = ({ categories }: NavIconProps) => {
  const { totalItems: itemsTotal } = useCart();
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => setTotalItems(itemsTotal), [itemsTotal]);

  return (
    <div className="flex items-end gap-1">
      <span className="relative">
        <Link href="/cart">
          <Icons.cart size={32} strokeWidth={0.1} />
        </Link>
        <span className="flex items-center justify-center absolute -top-1 -right-2 p-[2px] border rounded-full  bg-background">
          {totalItems}
        </span>
      </span>
      <MobileNavItems categories={categories} />
    </div>
  );
};
