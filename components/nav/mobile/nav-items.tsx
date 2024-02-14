"use client";

import { Icons } from "@/components/icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Category } from "@/lib/types";
import { MobileNavItemChildren } from "./nav-item-children";
import { useState } from "react";
import Link from "next/link";

interface MobileNavItemsProps {
  categories: Category[];
}

export function MobileNavItems({ categories }: MobileNavItemsProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Icons.menu size={32} strokeWidth={".5px"} className="md:hidden" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Category Navigation Bar</SheetTitle>
          <SheetDescription>
            Choose a category you want to get a product from
          </SheetDescription>
        </SheetHeader>
        <Accordion type="multiple" className="w-full">
          {categories.map((category) => (
            <AccordionItem value={category._id} key={category._id}>
              <AccordionTrigger>
                <Link href={`/category/${category.slug.current}`}>
                  <span onClick={() => setOpen(false)}>{category.name}</span>
                </Link>
              </AccordionTrigger>
              <AccordionContent>
                <MobileNavItemChildren
                  otherChildren={category.otherChildren}
                  className="pl-1"
                  setOpen={setOpen}
                  parentLink={`/category/${category.slug.current}`}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <SheetFooter>
          <SheetClose asChild>{/* Add a contact link */}</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
