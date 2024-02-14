"use client";

import { urlForImage } from "@/sanity/lib/image";
import { NextImage } from "../image";

// resources
import PaymentMethods from "@/public/payments.svg";
import { useCart } from "react-use-cart";
import { ToasterToast, useToast } from "../ui/use-toast";

// types
import { ProductChildrenProps } from "@/app/product/[slug]/page";

// components
import { Button } from "../ui/button";
import { icons } from "@/lib/component-utils";
import { ProductOptions } from "./product-options";
import { ProductVariants } from "./product-variants";
import { Icons } from "../icons";
import { usePurchaseOptions } from "./use-purchase-options";
import Link from "next/link";

export const ProductPurchase = ({ product }: ProductChildrenProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const { purchaseOptions } = usePurchaseOptions();

  const { sku, images, name, discountedPrice, price, options, variants } =
    product;

  const handleAddItem = () => {
    const productSku = `${sku}-${Object.values(purchaseOptions.options)
      .concat(Object.values(purchaseOptions.variants))
      .sort()
      .join("-")}`;
    addItem({
      ...product,
      id:
        Object.keys(purchaseOptions.options).length ||
        Object.keys(purchaseOptions.variants).length
          ? productSku
          : sku,
      price: discountedPrice || price,
    });
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
    <div className="w-full border divide-y col-span-1 grid md:col-span-2 lg:col-span-1">
      <div className="grid gap-2 divide-y">
        <div className="flex gap-4 items-start p-4">
          <NextImage
            src={urlForImage(images[0]).url()}
            alt={`${name} image`}
            width={100}
            height={100}
            className="w-[70px] h-[70px] aspect-square object-contain object-center bg-[#f5f4f7]"
          />
          <div>
            <h1 className="text-sm font-normal">{name}</h1>
            <h2 className="text-base font-normal text-primary font-jetbrains">
              <small>KES</small>{" "}
              {(discountedPrice || price).toLocaleString("en-US")}
            </h2>
            {discountedPrice && (
              <small className="line-through font-jetbrains">
                KES {price.toLocaleString("en-US")}
              </small>
            )}
          </div>
        </div>
        <div className="p-4 space-y-4">
          {/* options */}
          {options && <ProductOptions options={options} />}
          {/* variants */}
          {variants && <ProductVariants variants={variants} />}
        </div>
        <div className="p-4">
          <Button className="w-full" onClick={handleAddItem}>
            Add to cart
          </Button>
        </div>
      </div>
      <div className="p-4 gap-4 grid">
        {icons.map((iconData) => (
          <div className="flex gap-2 content-start" key={iconData.heading}>
            <div className="flex items-center justify-center aspect-square w-12 border">
              {iconData.icon}
            </div>
            <div className="grid content-start">
              <h6 className="text-sm uppercase font-medium text-gray-500 font-jetbrains">
                {iconData.heading}
              </h6>
              <small>{iconData.content}</small>
            </div>
          </div>
        ))}
      </div>
      <NextImage
        src={PaymentMethods}
        alt={`${name} image`}
        width={200}
        height={200}
        className="p-4 w-full bg-none"
      />
    </div>
  );
};
