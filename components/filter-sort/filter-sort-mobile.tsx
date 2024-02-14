import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { FilterSortDesktop } from "./filter-sort-desktop";

export const FilterSortMobile = async () => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="link" role="combobox" className="w-fit">
            <small className="uppercase">Filter & Sort</small>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="font-inter text-left">
            <SheetTitle>Filter & Sort</SheetTitle>
            <SheetDescription>
              Filter & Sort to customize the product selection
            </SheetDescription>
          </SheetHeader>
          <FilterSortDesktop />
        </SheetContent>
      </Sheet>
    </div>
  );
};
