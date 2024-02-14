import { Product } from "@/lib/types";
import { ProductGridItem } from "@/components/grid/product-grid-item";

interface CategoryGridProps {
  products: Product[];
}

export const CategoryGrid = ({ products }: CategoryGridProps) => {
  return (
    <ul className="grid border-t border-l grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductGridItem
          key={product._id}
          product={product}
          className="border-b border-r"
        />
      ))}
    </ul>
  );
};
