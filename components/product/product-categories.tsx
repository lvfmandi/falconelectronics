import Link from "next/link";

// types
import { ChildCategory, Product } from "@/lib/types";

// data
import { getProductCategories } from "@/lib/queries/categories";

interface ProductCategoriesProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  product: Product;
}

export async function ProductCategories({
  product,
  ...props
}: ProductCategoriesProps) {
  const { categories } = product;

  // getting the root category
  const rootCategory: ChildCategory = categories.filter(
    (category: ChildCategory) => !!category.parent == true
  )[0];

  // getting all the other categories
  const productCategories = await getProductCategories(rootCategory, [
    rootCategory,
  ]);
  return (
    <div {...props}>
      <div className="">
        <Link href="/"><small>HOME</small></Link>
        {productCategories?.slice().reverse().map((category, index) => {
          const previousSlugs = productCategories
            ?.slice().reverse()
            .slice(0, index)
            .map((category) => category.slug.current)
            .join("/");

          return (
            <Link
              key={category._id}
              href={`/category${previousSlugs ? `/${previousSlugs}` : ""}/${
                category.slug.current
              }`}
            >
              <small>/ {category.name.toUpperCase()}</small>
            </Link>
          );
        })}
        <small>/ {product.name.toUpperCase()}</small>
      </div>
    </div>
  );
}
