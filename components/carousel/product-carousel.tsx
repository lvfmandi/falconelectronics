"use client";

// types
import { Product } from "@/lib/types";
import { Carousel } from "./carousel";

// components
import { ProductGridItem } from "../grid/product-grid-item";

interface ProductCarouselProps {
  content: {
    title: string;
    description: string;
    products: Product[];
  };
}

export const ProductCarousel = ({ content }: ProductCarouselProps) => {
  const { title, description, products } = content;
  return (
    <div className="bg-gray-50 py-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_3fr] items-end py-8 container">
        <div className="grid gap-4">
          <h2 className="text-primary">{title}</h2>
          <p>{description}</p>
        </div>
        <div className="bg-background overflow-hidden">
          <Carousel
            carousel={{
              breakPoints: {
                1024: {
                  slidesPerView: products.length < 2 ? products.length : 2,
                },
                1280: {
                  slidesPerView: products.length < 3 ? products.length : 3,
                },
              },
              loop: false,
              pagination: true,
              slidesPerView: 1,
            }}
            items={products}
          >
            {(product: Product, index) => (
              <ProductGridItem
                product={product}
                className={`${index === 0 ? "" : "border-l"}`}
              />
            )}
          </Carousel>
        </div>
      </div>
    </div>
  );
};
