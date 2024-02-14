import { CategoryGrid } from "@/components/category/category-grid";
import { FilterSort } from "@/components/filter-sort/filter-sort";
import { ProductsInCategories } from "@/lib/queries/products";

interface SearchParams {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Search(props: SearchParams) {
  const products = await ProductsInCategories([], props.searchParams);

  return (
    <main className="py-4 space-y-4 container">
      <FilterSort />
      {products?.length ? (
        <CategoryGrid products={products} />
      ) : (
        <div className="font-inter">
          <h5 className="font-light">No Items</h5>
          <p>There are no items for the search &quot;{props.searchParams.search}&quot;</p>
        </div>
      )}
    </main>
  );
}
