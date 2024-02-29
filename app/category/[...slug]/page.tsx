import { notFound } from "next/navigation";
import { CategoryGrid } from "@/components/category/category-grid";
import { FilterSort } from "@/components/filter-sort/filter-sort";
import { Search } from "@/components/search";
import { CategoryBySlug, ChildrenCategories } from "@/lib/queries/categories";
import { ProductsInCategories } from "@/lib/queries/products";
import { Category as CategoryType, Product } from "@/lib/types";
import Link from "next/link";

type CategoryParams = {
  params: {
    slug: string[];
    date?: string;
    price?: string;
    category?: string;
    rating?: string;
    tag?: string;
    brand?: string;
    color?: string;
    warranty?: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Category({
  params,
  searchParams,
}: CategoryParams) {
  const lastCategorySlug = params.slug[params.slug.length - 1];

  // to be defined
  var products: Product[] | undefined;
  var lastCategory: CategoryType | undefined;

  try {
    lastCategory = await CategoryBySlug(lastCategorySlug);

    if (!lastCategory) return notFound();
    // Fetch all children categories
    const categories = [
      lastCategory,
      ...(await ChildrenCategories(lastCategory._id)),
    ];

    // Get category slugs
    const categorySlugs = categories.map(
      (category) => `"${category.slug.current}"`
    );

    console.log({ categorySlugs });

    // getting products in the categories
    products = await ProductsInCategories(categorySlugs, searchParams);
  } catch (error: any) {
    throw new Error(error.message);
  }

  return (
    <main className="font-inter py-4 grid gap-4">
      <Search className="md:hidden" />
      <div className="container grid gap-4">
        <div className="font-schibsted_grotesk space-y-2">
          {params.slug.map((slug, index) => (
            <Link
              href={`/category/${params.slug.slice(0, index + 1).join("/")}`}
              key={slug}
            >
              <small>
                {`${slug.replace("-", " ").toUpperCase()} `}
                {index !== params.slug.length - 1 && "/ "}
              </small>
            </Link>
          ))}
        </div>
        <FilterSort />
        {products?.length ? (
          <CategoryGrid products={products} />
        ) : (
          <div className="space-y-2">
            <h5 className="font-light">No Products in this category</h5>
            <small>
              No products match the given description. Try adjusting the filter
              and sort
            </small>
          </div>
        )}
      </div>
    </main>
  );
}