import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// types
import { ProductChildrenProps } from "@/app/product/[slug]/page";
import { ProductDescription } from "./product-description";
import { ProductSpecifications } from "./product-specifications";
import { ProductReviews } from "./product-reviews";

export const ProductContent = ({ product }: ProductChildrenProps) => {
  return (
    <Tabs defaultValue="Description" className="w-full container">
      <TabsList className="grid justify-stretch h-fit md:grid-cols-3 font-schibsted_grotesk">
        <TabsTrigger value="Description">Description</TabsTrigger>
        <TabsTrigger value="Specifications">Specifications</TabsTrigger>
        <TabsTrigger value="Reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="Description">
        <ProductDescription product={product} />
      </TabsContent>
      <TabsContent value="Specifications">
        <ProductSpecifications product={product} />
      </TabsContent>
      <TabsContent value="Reviews">
        <ProductReviews product={product} />
      </TabsContent>
    </Tabs>
  );
};
