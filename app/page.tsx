import { content } from "@/lib/queries/homepage";
import { PortableText, PortableTextComponents } from "@portabletext/react";

// components
import { AboveTheFold } from "@/components/pages/above-the-fold";
import { ProductCarousel } from "@/components/carousel/product-carousel";
import { ProductGrid } from "@/components/grid/product-grid";
import { Search } from "@/components/search";

const components: PortableTextComponents = {
  types: {
    aboveTheFoldContentImage: ({ value: content }) => {
      return <AboveTheFold content={content} />;
    },
    carouselCollection: ({ value: content }) => {
      return <ProductCarousel content={content} />;
    },
    gridCollection: ({ value: content }) => {
      return <ProductGrid content={content} />;
    },
  },
};

export default async function Home() {
  await new Promise((resolve) => setTimeout(() => resolve(4), 5000));

  return (
    <main className="min-h-[50vh] border-t font-inter">
      <Search className="container md:hidden" />
      <PortableText value={content} components={components} />
    </main>
  );
}
