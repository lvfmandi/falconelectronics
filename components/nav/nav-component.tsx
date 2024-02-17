"use client"

import { useContext } from "react";

import { Category } from "@/lib/types";
import Link from "next/link";

// resources
import Logo from "@/public/logo.svg";

// components
import { NextImage } from "../image";
import { Search } from "../search";
import { NavItems } from "./desktop/nav-items";
import { NavIcon } from "./nav-icon";
import { NavCheckerContext } from "../providers/nav-checker";

interface NavComponentProps {
  categories: Category[];
}

export const NavComponent = ({ categories }: NavComponentProps) => {
  const studio = useContext(NavCheckerContext);
  if (studio) return;

  return (
    <nav className="pb-2 sticky top-0 z-40 bg-background border-b">
      <div className="container flex justify-between items-center py-2">
        <Link href="/">
          <NextImage src={Logo} alt="Website Logo" width={150} priority />
        </Link>
        <Search className="w-[calc(100%/2)] hidden md:block" />
        <NavIcon categories={categories} />
      </div>
      <NavItems
        className="container content-start hidden md:block"
        categories={categories}
      />
    </nav>
  );
};
