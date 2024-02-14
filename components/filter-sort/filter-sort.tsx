import { FilterSortDesktop } from "./filter-sort-desktop";
import { FilterSortMobile } from "./filter-sort-mobile";

export async function FilterSort() {
  return (
    <div className="grid justify-items-end lg:justify-items-stretch">
      <FilterSortMobile />
      <FilterSortDesktop className="hidden lg:block" />
    </div>
  );
}
