"use client";

import { urlForImage } from "@/sanity/lib/image";
import Link from "next/link";

// resources
import { useCart } from "react-use-cart";
import { ToasterToast, useToast } from "../ui/use-toast";

// types
import { Product } from "@/lib/types";

// components
import { NextImage } from "../image";
import { Icons } from "../icons";
import { Button } from "../ui/button";

interface ProductGridItemProps {
  product: Product;
  className?: string;
}

export const ProductGridItem = ({
  product,
  className,
}: ProductGridItemProps) => {
  const { _id, name, sku, slug, images, brand, price, discountedPrice } =
    product;
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddItem = () => {
    addItem({ ...product, id: sku, price: discountedPrice || price });
    toast({
      title: (
        <span className="flex gap-2 items-center">
          <Icons.cart className="text-green-400 min-w-5" size={20} />
          <span>{name} added</span>
        </span>
      ),
      description: "The product has been added to cart",
      action: (
        <Link href="/cart">
          <Button>To cart</Button>
        </Link>
      ),
    } as ToasterToast);
  };

  return (
    <li className={`grid p-4 xl:p-6 ${className} items-start`}>
      <div className="grid gap-4">
        <Link
          href={`/product/${slug.current}`}
          className="relative w-full h-[300px] border"
        >
          {[0, 1].map((item) => (
            <div
              className={`absolute inset-0 w-full h-full aspect-square bg-[#F5F4F7] p-3 flex items-center justify-center ${
                item === 0 ? "hover:opacity-0" : "opacity-0 hover:opacity-100"
              } transition ease-in-out duration-500`}
              key={item}
            >
              <NextImage
                src={urlForImage(images[item]).url()}
                alt={`${name} product image`}
                width={600}
                height={600}
                className="object-contain object-center w-full h-full"
              />
            </div>
          ))}
        </Link>
        <div className="w-full flex gap-4 flex-col-reverse md:grid md:grid-cols-[10fr_2fr] md:gap-0">
          <div className="w-full overflow-hidden">
            <Link href={`/product/${slug.current}`}>
              <h3 className="text-base font-light md:truncate">{name}</h3>
            </Link>
            <Link href={`/brand/${brand.slug.current}`}>
              <p className="font-light text-gray-400">{brand.name}</p>
            </Link>
          </div>
          <Button
            variant={"outline"}
            size={"icon"}
            className="relative md:rounded-full"
            onClick={handleAddItem}
          >
            <span className="absolute top-[9px] -right-2 rounded-[5px] md:rounded-full bg-background">
              <Icons.add strokeWidth={1} />
            </span>
            <Icons.cart size={24} />
          </Button>
        </div>
        <div className="font-jetbrains">
          <span className="">
            Kes
            {discountedPrice
              ? discountedPrice.toLocaleString("en-US")
              : price.toLocaleString("en-US")}
          </span>{" "}
          {discountedPrice && (
            <span className="line-through text-gray-400">
              Kes{price.toLocaleString("en-US")}
            </span>
          )}
        </div>
      </div>
    </li>
  );
};
