"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Brand, Tag } from "@/lib/types";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";

interface FilterSortItemProps {
  name: string;
  filterItems: (Brand | Tag)[];
}

export function FilterSortItem({ name, filterItems }: FilterSortItemProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setValue(searchParams.get(name) ?? "");
  }, [searchParams, name]);

  function handleChange(currentValue: string) {
    setOpen(false);
    const params = new URLSearchParams(searchParams);
    const prevValue = value;
    if (prevValue === currentValue) {
      params.delete(name);
    } else {
      params.set(name, currentValue);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
    setValue(prevValue === currentValue ? "" : currentValue);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="lg:border-dashed hover:border-transparent w-fit"
        >
          {value ? (
            <div className="flex items-center gap-2 divide-x">
              <span className="capitalize">{name}</span>
              <div className="pl-2">
                <Badge variant="secondary" className="capitalize">
                  {value}
                </Badge>
              </div>
            </div>
          ) : (
            <span className="capitalize">{name}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0" align="start">
        <Command>
          <CommandInput placeholder={`Search ${name}`} className="h-9" />
          <CommandEmpty>No {name} found.</CommandEmpty>
          <CommandGroup>
            {filterItems.map((filterItem) => (
              <CommandItem
                key={filterItem._id}
                value={filterItem.slug.current}
                onSelect={handleChange}
              >
                <span>{filterItem.name}</span>
                <Icons.check
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === filterItem.slug.current ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
