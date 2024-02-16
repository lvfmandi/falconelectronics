// resources
import React from "react";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import { Item } from "react-use-cart";

// types
import { Product } from "@/lib/types";
type CheckoutItemProps = {
  product: Product & Item;
};

// components
import { NextImage } from "../image";

export const CheckoutItem = ({ product }: CheckoutItemProps) => {
  const { id, name, images, slug, price, options, variants, quantity } =
    product;
  return (
    <div className="relative border-b last:border-b-0 md:flex items-start gap-4 py-4">
      <NextImage
        src={urlForImage(images[0]).url()}
        alt={`First image of ${name}`}
        width={100}
        height={100}
        className="w-[70px] h-[70px] object-contain object-center border bg-[#f5f4f7]"
      />
      <div className="w-full grid gap-1">
        <Link href={`/product/${slug.current}`} className="w-fit">
          <p className="font-light">{name}</p>
        </Link>
        <div className="flex space-x-2">
          {/* options */}
          {options &&
            options.map((option) => {
              const { _type, name, sku } = option;
              if (id.split("-").includes(sku)) {
                return (
                  <div key={sku} className="flex space-x-1">
                    <span>
                      {_type === "productColor" ? "Color" : "Size"}:
                    </span>
                    <span className="text-gray-400">{name}</span>
                  </div>
                );
              }
              return null;
            })}

          {/* variants */}
          {variants &&
            variants.map((variant) => {
              const variantJSXS = variant.objects
                .filter((object) => id.split("-").includes(object.sku))
                .map((object) => ({
                  [variant.variantTitle]: object.variantName,
                }));

              return (
                <React.Fragment key={variant._key}>
                  {variantJSXS.length > 0 &&
                    variantJSXS.map((variantJSX) => (
                      <div
                        key={`${variant._key}-${variantJSX[0]}`}
                        className="flex space-x-1"
                      >
                        <span>{Object.keys(variantJSX)[0]}:</span>
                        <span className="text-gray-400">
                          {variantJSX[Object.keys(variantJSX)[0]]}
                        </span>
                      </div>
                    ))}
                </React.Fragment>
              );
            })}
        </div>
        <div className="flex">
          <span>
            {quantity} x {price.toLocaleString("en-US")} ={" "}
          </span>
          <span className="text-primary">
            {" "}
            {((quantity || 1) * price).toLocaleString("en-US")}
          </span>
        </div>
      </div>
    </div>
  );
};
