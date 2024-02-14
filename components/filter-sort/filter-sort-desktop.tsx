// data
import { FilterItems } from "@/lib/queries/global";

// types
import { Brand, Tag } from "@/lib/types";
interface Filters {
  brands: Brand[]; // Replace Brand with the actual type of brands
  tags: Tag[]; // Replace Tag with the actual type of tags
  warranties: Tag[]; // Replace Tag with the actual type of warranties
}

// components
import { FilterSortItem } from "./filter-item";
import { SortItem } from "./sort-item";

export const FilterSortDesktop = async ({
  className,
}: {
  className?: string;
}) => {
  const filters: Filters = await FilterItems();

  return (
    <div
      className={`grid gap-2 lg:flex justify-between font-jetbrains mt-6 lg:mt-0 ${className}`}
    >
      <div className="grid gap-2">
        <small>FILTER </small>
        <div className="grid lg:flex gap-2">
          {Object.keys(filters).map((name) => (
            // change to its own client component where you can add state and copy paste again from radix
            <FilterSortItem
              key={name}
              name={name}
              filterItems={filters[name as keyof Filters]}
            />
          ))}
        </div>
      </div>
      <div className="grid gap-2 lg:justify-items-end">
        <small>SORT</small>
        <div className="flex gap-2">
          <SortItem />
        </div>
      </div>
    </div>
  );
};
