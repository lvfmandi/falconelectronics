"use client";

import { useState } from "react";

// importing resources
import { Icons } from "./icons";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";

interface SearchProps {
  className?: string;
}

export function Search({ className }: SearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(defaultSearch);

  function handleSearch() {
    const params = new URLSearchParams(searchParams);
    search.trim() ? params.set("search", search) : params.delete("search");
    router.replace(search.trim() ? `/search/?${params.toString()}` : "/search");
  }

  return (
    <div className={`relative ${className}`}>
      <input
        name="search"
        type="text"
        placeholder="Search products here"
        className="border-b border-gray-300 text-gray-900 focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-primary outline-none pl-9"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <span className="absolute left-1 top-2">
        <Icons.search size={24} strokeWidth={".5px"} color="gray" />
      </span>
      <span className="absolute right-1 top-2">
        <Button
          variant="link"
          className={`hover:no-underline ${
            !(search || defaultSearch) ? "hidden" : "block"
          }`}
          onClick={handleSearch}
        >
          {search ? "Search" : defaultSearch ? "Clear" : ""}
        </Button>
      </span>
    </div>
  );
}