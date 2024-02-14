import Link from "next/link";

// importing types
import { ChildCategory } from "@/lib/types";

interface FooterNavItemsProps {
  categories: ChildCategory[];
  first?: Boolean;
  parentLink: string;
}

export function FooterNavItems({
  categories,
  first,
  parentLink,
}: FooterNavItemsProps) {
  return (
    <ul>
      {categories.map((category) => (
        <li key={category._id} className={`${first && "mb-4"}`}>
          {(!category.otherChildren.length || first) && (
            <Link href={`${parentLink}/${category.slug.current}`}>
              <span
                className={`${
                  first ? "uppercase text-gray-500 text-xs" : "capitalize"
                } py-3`}
              >
                {category.name}
              </span>
            </Link>
          )}
          <FooterNavItems
            categories={category.otherChildren}
            parentLink={`${parentLink}/${category.slug.current}`}
          />
        </li>
      ))}
    </ul>
  );
}
