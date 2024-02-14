"use client";

import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";

import { Category } from "@/lib/types";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavItemChildren } from "./nav-item-children";
import { NextImage } from "@/components/image";

interface NavItemsProps {
  categories: Category[];
  className?: string;
}

export const NavItems = ({ categories, className }: NavItemsProps) => (
  <NavigationMenu className={className}>
    <NavigationMenuList>
      <div className="flex flex-row-reverse gap-3">
        {categories.map((category) => (
          <NavigationMenuItem key={category._id} className="center">
            <NavigationMenuTrigger>
              <Link href={`/category/${category.slug.current}`}>
                {category.name}
              </Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="p-5 grid grid-cols-[2fr_3fr] gap-6 w-screen lg:w-[800px] xl:[w-800px]">
                <div className="grid items-end bg-gradient-to-b from-muted/50 to-muted p-6 rounded-sm aspect-square">
                  <NextImage
                    src={urlForImage(category.image).url()}
                    alt={`${category.name} Category Image`}
                    width={300}
                    height={300}
                    className="object-center object-contain"
                  />
                </div>
                <div key={category._id}>
                  {category.otherChildren && (
                    <NavItemChildren
                      otherChildren={category.otherChildren}
                      first={true}
                      className="grid grid-cols-2 items-start"
                      parentLink={`/category/${category.slug.current}`}
                    />
                  )}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </div>
    </NavigationMenuList>
  </NavigationMenu>
);
