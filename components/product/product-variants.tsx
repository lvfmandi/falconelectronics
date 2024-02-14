"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import { urlForImage } from "@/sanity/lib/image";
import { NextImage } from "../image";
import { usePurchaseOptions } from "./use-purchase-options";
import { ObjectElement, Variant } from "@/lib/types";

type DefaultVariants = {
  [key: string]: string[];
};

interface ProductVariantsProps {
  variants: Variant[];
  defaultVariants?: string[];
  productId?: string;
}

export const ProductVariants: React.FC<ProductVariantsProps> = ({
  variants,
  defaultVariants,
  productId,
}) => {
  const { getItem, inCart, updateItem, removeItem, updateItemQuantity } =
    useCart();
  const { purchaseOptions, setPurchaseOptions } = usePurchaseOptions();
  const [variantState, setVariantState] = useState<DefaultVariants | null>(
    null
  );

  useEffect(() => {
    setDefaultVariants();
  }, [variants, defaultVariants]);

  function setDefaultVariants() {
    const defaultVariantsObject: DefaultVariants = {};
    variants.forEach(({ _key, objects }) => {
      const defaultObject = objects.find((object) =>
        defaultVariants?.includes(object.sku)
      );

      if (defaultObject) {
        const { sku, variantName } = defaultObject;
        defaultVariantsObject[_key] = [sku, variantName];
      }
    });

    setVariantState(defaultVariantsObject);
  }

  function formatId(id: string) {
    const [firstId, ...remainingId] = id.split("-");
    return `${firstId}-${remainingId.sort().join("-")}`;
  }

  function handleChangeVariantState(_key: string, object: ObjectElement) {
    const { variantName, sku } = object;

    const updatedProductId = formatId(
      variantState && variantState[_key]
        ? productId?.replace(variantState[_key][0], sku) ||
            `${productId}-${sku}`
        : `${productId}-${sku}`
    );

    // update cart
    const productExists = inCart(updatedProductId);
    if (productId && productExists && productId !== updatedProductId) {
      updateItemQuantity(
        updatedProductId,
        getItem(productId).quantity + getItem(updatedProductId).quantity
      );
      removeItem(productId);
    }

    productId &&
      updateItem(productId, {
        ...getItem(productId),
        id: updatedProductId,
        price: object.variantDiscountedPrice || object.variantPrice,
      });

    // update context
    setPurchaseOptions({
      ...purchaseOptions,
      variants: { ...purchaseOptions.variants, [_key]: sku },
    });

    // update state
    setVariantState({ ...variantState, [_key]: [sku, variantName] });
  }

  return (
    <ul className="">
      {variants.map((variant) => {
        const { _key: variantKey, objects, variantTitle } = variant;

        return (
          <li className="grid gap-2 cursor-pointer" key={variantKey}>
            <span>
              {variantState && variantState[variantKey]
                ? `${variantTitle}: ${variantState[variantKey][1]}`
                : `Choose ${variantTitle}`}
            </span>
            <ul className="border-t border-l grid">
              {objects.map((object) => {
                const {
                  _key: objectKey,
                  variantName,
                  variantPrice,
                  variantDiscountedPrice,
                  variantImage,
                } = object;

                return (
                  <li
                    onClick={() => handleChangeVariantState(variantKey, object)}
                    className={`font-jetbrains ${
                      variantState &&
                      variantState[variantKey] &&
                      variantState[variantKey][1] === variantName
                        ? "border !border-black"
                        : "border-r border-b"
                    }`}
                    key={objectKey}
                  >
                    <div
                      className="grid grid-cols-3 divide-x"
                      style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${
                          variantImage ? 3 : 2
                        }, minmax(0, 1fr))`,
                      }}
                    >
                      {variantImage && (
                        <NextImage
                          src={urlForImage(variantImage).url()}
                          alt={variantName + "image"}
                          width={100}
                          height={100}
                          className="w-[58px] h-[58px] object-contain object-center"
                        />
                      )}
                      <div className="flex items-end p-2">
                        <span>{variantName}</span>
                      </div>
                      <div className="flex items-end p-2">
                        <span>
                          KES{" "}
                          {(variantDiscountedPrice
                            ? variantDiscountedPrice
                            : variantPrice
                          ).toLocaleString("en-US")}{" "}
                          {variantDiscountedPrice && (
                            <span className="line-through">
                              KES {variantPrice.toLocaleString("en-US")}
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};
