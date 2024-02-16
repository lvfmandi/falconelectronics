import { Product } from "@/lib/types";
import { ProductGridItem } from "./product-grid-item";

interface ProductGridProps {
  content: {
    title: string;
    description: string;
    products: Product[];
  };
}

export const ProductGrid = ({ content }: ProductGridProps) => {
  const { title, description, products } = content;
  return (
    <div className="container py-12">
      <div className="py-4 space-y-5 max-w-sm">
        <h2 className="text-primary">{title}</h2>
        <p className="text-lg font-light">{description}</p>
      </div>
      <ul className="grid border-t border-l grid-cols-2 [&>*:nth-child(3n)]:col-span-2 md:[&>*:nth-child(3n)]:col-span-1 md:grid-cols-3 md:[&>*:nth-child(4n)]:col-span-3 xl:[&>*:nth-child(4n)]:col-span-1 xl:grid-cols-4 xl:[&>*:nth-child(5n)]:col-span-2">
        {products.map((product) => (
          <ProductGridItem
            key={product._id}
            product={product}
            className="border-b border-r"
          />
        ))}
      </ul>
    </div>
  );
};
