// data
import { ProductData } from "@/lib/queries/products";

// types
import { Product as ProductType } from "@/lib/types";

// components
import { ProductCategories } from "@/components/product/product-categories";
import { ProductImageSection } from "@/components/product/product-image-section";
import { ImagePositionProvider } from "@/components/product/use-position";
import { ProductHighlighted } from "@/components/product/product-highlighted";
import { ProductPurchase } from "@/components/product/product-purchase";
import { ProductContent } from "@/components/product/product-content";
import { PurchaseOptionsProvider } from "@/components/product/use-purchase-options";

interface ProductProps {
  params: {
    slug: string;
  };
}

export interface ProductChildrenProps {
  product: ProductType;
}

async function Product({ params }: ProductProps) {
  const { slug } = params;
  const product = await ProductData(slug);

  return (
    <main className="border-t font-inter py-6 grid gap-6">
      <ProductCategories
        product={product}
        className="container font-jetbrains"
      />
      <div className="grid place-items-start md:grid-cols-2 xl:grid-cols-3 gap-6 container">
        <PurchaseOptionsProvider>
          <ImagePositionProvider>
            <ProductImageSection product={product} />
            <ProductHighlighted product={product} />
            <ProductPurchase product={product} />
          </ImagePositionProvider>
        </PurchaseOptionsProvider>
      </div>
      <ProductContent product={product} />
    </main>
  );
}

export default Product;
