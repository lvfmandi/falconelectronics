import { NotFoundProducts } from "@/lib/queries/products";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { ProductGrid } from "../grid/product-grid";

interface NotFoundProps {
  errorPage?: string;
}

export const NotFound = async ({ errorPage }: NotFoundProps) => {
  const content = await NotFoundProducts(errorPage);
  const components: PortableTextComponents = {
    types: {
      gridCollection: ({ value: content }) => {
        return <ProductGrid content={content} />;
      },
    },
  };

  const notFoundProducts = {};

  return (
    <main className="font-inter">
      <PortableText value={content} components={components} />
    </main>
  );
};
