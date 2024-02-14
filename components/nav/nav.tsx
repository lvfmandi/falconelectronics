import Link from "next/link";
import { headers } from "next/headers";

// resources
import Logo from "@/public/logo.svg";

// components
import { NextImage } from "../image";
import { NavItems } from "./desktop/nav-items";
import { Search } from "../search";

// data
import { getCategories } from "@/lib/queries/categories";
import { NavIcon } from "./nav-icon";

export async function DesktopNav() {
  // getting categories
  const categories = await getCategories();

  const headersList = headers();
  const fullUrl = headersList.get("referer") || "";
  if (fullUrl.includes(`${process.env.NEXT_PUBLIC_SITE_DOMAIN}/studio`))
    return null;

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
}
