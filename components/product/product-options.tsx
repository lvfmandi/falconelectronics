"use client";
import { useState } from "react";
import { useCart } from "react-use-cart";

// resources
import { usePurchaseOptions } from "./use-purchase-options";

// types
import { Color, Size } from "@/lib/types";
import { ColorDisplay } from "../color-display";
import { SizeDisplay } from "../size-display";

interface ProductOptionsProps {
  options: (Color | Size)[];
  defaultOptions?: string[];
  productId?: string;
}

export const ProductOptions = ({
  options,
  defaultOptions,
  productId,
}: ProductOptionsProps) => {
  const { getItem, updateItem, inCart, removeItem, updateItemQuantity } =
    useCart();
  const { purchaseOptions, setPurchaseOptions } = usePurchaseOptions();
  const [color, setColor] = useState(setDefaultOptions("productColor"));
  const [size, setSize] = useState(setDefaultOptions("productSize"));

  function setDefaultOptions(type: string) {
    return options
      .filter((option) => option._type === type)
      .find((option) => defaultOptions?.includes(option.sku))?.sku;
  }

  function formatId(id: string) {
    const firstId = id.split("-")[0];
    const remainingId = id.split("-").slice(1).sort().join("-");
    return `${firstId}-${remainingId}`;
  }

  function handleSetOption(option: string, sku: string) {
    const updatedProductId = productId
      ? option === "color"
        ? formatId(
            color ? productId.replace(color, sku) : `${productId}-${sku}`
          )
        : formatId(size ? productId.replace(size, sku) : `${productId}-${sku}`)
      : "";

    const productExists = inCart(updatedProductId);

    if (productId && productExists && productId !== updatedProductId) {
      updateItemQuantity(
        updatedProductId,
        getItem(productId).quantity + getItem(updatedProductId).quantity
      );
      removeItem(productId);
    }

    // update cart
    productId &&
      updateItem(productId, {
        ...getItem(productId),
        id: updatedProductId,
      });
    // updating the context for the product's page
    setPurchaseOptions({
      ...purchaseOptions,
      options: { ...purchaseOptions.options, [option]: sku },
    });
    // updating state
    option === "color" ? setColor(sku) : setSize(sku);
  }

  return (
    <>
      {options?.some((option) => option._type == "productColor") && (
        <div className="grid gap-2">
          <span>
            {color != null
              ? `Color: ${
                  options.find(
                    (option) =>
                      option._type === "productColor" && option.sku === color
                  )?.name
                }`
              : "Choose Color"}
          </span>
          <div className="flex gap-3">
            {options
              .filter((option) => option._type === "productColor")
              .map((option) => {
                const { _key, sku } = option;
                return (
                  <span
                    key={_key}
                    className={`flex items-center justify-center p-[3px] rounded-full transition ease-in duration-200 ${
                      color === sku ? "ring-2" : "ring-2 ring-transparent"
                    }`}
                    onClick={() => handleSetOption("color", sku)}
                  >
                    <ColorDisplay color={option as Color} key={_key} />
                  </span>
                );
              })}
          </div>
        </div>
      )}
      {/* sizes */}
      {options?.some((option) => option._type === "productSize") && (
        <div className="grid gap-2">
          <span>
            {size != null
              ? `Size: ${
                  options.find(
                    (option) =>
                      option._type === "productSize" && option.sku === size
                  )?.name
                }`
              : "Choose Size"}
          </span>
          <div className="flex gap-3">
            <ul className={`max-w-xs grid w-full border-t border-l`}>
              {options
                .filter((option) => option._type === "productSize")
                .map((option) => (
                  <li
                    className={`cursor-pointer ${
                      option.sku === size
                        ? "border border-black"
                        : "border-r border-b"
                    }`}
                    key={option._key}
                    onClick={() => handleSetOption("size", option.sku)}
                  >
                    <SizeDisplay size={option as Size} key={option._key} />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
