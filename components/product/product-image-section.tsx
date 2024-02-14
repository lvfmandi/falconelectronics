"use client";

// types
import { Product } from "@/lib/types";
import { NextImage } from "../image";
import { urlForImage } from "@/sanity/lib/image";
import { Button } from "../ui/button";

// hooks
import { useImagePosition } from "./use-position";

interface ProductImageSectionProps {
  product: Product;
}

export const ProductImageSection = ({ product }: ProductImageSectionProps) => {
  const { name, images } = product;
  const { position, setPosition } = useImagePosition();

  return (
    <div className="overflow-hidden">
      <div className="relative w-full aspect-square border">
        {images.map((image, index) => (
          <NextImage
            src={urlForImage(image).url()}
            alt={`Image of ${name}`}
            width={600}
            height={600}
            className={`absolute w-full aspect-square object-contain object-center bg-[#F5F4F7] ${
              index == position ? "opacity-100" : "opacity-0"
            } transition ease-in duration-500`}
            key={urlForImage(image).url()}
          />
        ))}
      </div>
      <div className="w-full grid grid-cols-5 gap-4 py-4">
        {images.map((image, index) => {
          return (
            <Button
              variant={"link"}
              className={`"w-full h-fit p-2 ${
                position == index ? "border border-primary" : "border"
              }`}
              onClick={() => setPosition(index)}
              key={index}
            >
              <NextImage
                src={urlForImage(image).url()}
                alt={`Image of ${name}`}
                width={100}
                height={100}
                className="w-full aspect-square object-contain object-center bg-[#f5f4f7]"
              />
            </Button>
          );
        })}
      </div>
    </div>
  );
};
