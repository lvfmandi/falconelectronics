"use client";

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
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";
import _ from "lodash";

type SortOption = {
  name: string;
  key: string;
  value: string;
};

const sortOptions: SortOption[] = [
  { name: "Oldest", key: "date", value: "asc" },
  { name: "Newest", key: "date", value: "desc" },
  { name: "Price, low to high", key: "price", value: "asc" },
  { name: "Price, high to low", key: "price", value: "desc" },
  { name: "Top Rated", key: "rating", value: "asc" },
];

export const SortItem = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<SortOption[] | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setValue(
      sortOptions.filter(
        (option) =>
          searchParams.has(option.key) &&
          searchParams.get(option.key) === option.value
      )
    );
  }, [searchParams]);

  function handleChange(key: string, currentValue: string) {
    setOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    const existingValue = params.get(key);
    if (existingValue === currentValue) {
      params.delete(key);
    } else {
      params.set(key, currentValue);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
    setValue(
      sortOptions.filter(
        (option) =>
          params.has(option.key) && params.get(option.key) === option.value
      )
    );
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
              <small className="capitalize">Sort</small>
              <div className="flex gap-2 pl-2">
                {value.map((valueItem) => (
                  <Badge
                    variant="secondary"
                    className="capitalize"
                    key={valueItem.key}
                  >
                    {valueItem.key}
                  </Badge>
                ))}
              </div>
            </div>
          ) : (
            <small className="capitalize">Sort</small>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0" align="start">
        <Command>
          <CommandInput placeholder={`Search sort items`} className="h-9" />
          <CommandEmpty>No sort item found.</CommandEmpty>
          <CommandGroup>
            {sortOptions.map((sortOption) => {
              return (
                <CommandItem
                  key={sortOption.key}
                  value={sortOption.value}
                  onSelect={(currentValue) =>
                    handleChange(sortOption.key, currentValue)
                  }
                >
                  <small>{sortOption.name}</small>
                  <Icons.check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value?.find(
                        (v) =>
                          v.key === sortOption.key &&
                          v.value === sortOption.value
                      )
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
