import { urlForImage } from "@/sanity/lib/image";
import { Item, useCart } from "react-use-cart";
import Link from "next/link";

// types
import { Product } from "@/lib/types";

// components
import { NextImage } from "../image";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { ProductOptions } from "../product/product-options";
import { ProductVariants } from "../product/product-variants";

type CartItemProps = {
  product: Product & Item;
};

export const CartItem = ({ product }: CartItemProps) => {
  const { updateItemQuantity, removeItem } = useCart();
  const { id, sku, name, images, price, slug, options, variants, quantity } =
    product;

  return (
    <div className="relative border md:flex items-start gap-4 p-4">
      <NextImage
        src={urlForImage(images[0]).url()}
        alt={`First image of ${name}`}
        width={100}
        height={100}
        className="w-[70px] h-[70px] object-contain object-center border bg-[#f5f4f7]"
      />
      <div className="w-full grid gap-3">
        <Link href={`/product/${slug.current}`}>
          <p className="font-light">{name}</p>
        </Link>
        <div className="justify-self-start flex items-center border font-schibsted_grotesk">
          <Button
            className="rounded-none border-r"
            variant={"link"}
            size={"icon"}
            onClick={() => updateItemQuantity(id, Number(quantity) - 1)}
          >
            <Icons.minus size={21} color="black" />
          </Button>
          <span className="min-w-8 flex justify-center">{quantity}</span>
          <Button
            className="rounded-none border-l"
            variant={"link"}
            size={"icon"}
            onClick={() => updateItemQuantity(id, Number(quantity) + 1)}
          >
            <Icons.add size={21} color="black" />
          </Button>
        </div>
        <div className="space-y-4">
          {/* options */}
          {options && (
            <ProductOptions
              options={options}
              defaultOptions={id.split("-").slice(1)}
              productId={id}
            />
          )}
          {/* variants */}
          {variants && (
            <ProductVariants
              variants={variants}
              defaultVariants={id.split("-").slice(1)}
              productId={id}
            />
          )}
        </div>
        <div className="flex justify-between font-schibsted_grotesk">
          <span>Price per item:</span>
          <span>KES {price.toLocaleString("en-US")}</span>
        </div>
      </div>
      <Button
        size="icon"
        variant={"secondary"}
        className="absolute top-4 right-4 text-black stroke-1 rounded-full"
        onClick={() => removeItem(id)}
      >
        <Icons.close size={21} />
      </Button>
    </div>
  );
};
