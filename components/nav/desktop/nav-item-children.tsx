import Link from "next/link";

// types
import { ChildCategory } from "@/lib/types";

// components
import { NavigationMenuLink } from "../../ui/navigation-menu";

interface NavItemChildrenProps {
  otherChildren: ChildCategory[];
  first?: Boolean;
  parentLink: string;
  className?: string;
}

export const NavItemChildren = ({
  otherChildren,
  first,
  parentLink,
  className,
}: NavItemChildrenProps) => {
  return (
    <ul className={`${className}`}>
      {otherChildren?.slice().reverse().map((child) => (
        <li key={child._id}>
          {/* We display the second parent */}
          {first && (
            <Link
              href={`${parentLink}/${child.slug.current}`}
              legacyBehavior
              passHref
            >
              <NavigationMenuLink>
                <small className="uppercase whitespace-nowrap text-gray-500 hover:text-primary">
                  {child.name}
                </small>
              </NavigationMenuLink>
            </Link>
          )}
          {/* We don't want to display the middle children, we want the first and the last categories */}
          {!(first || child.otherChildren.length) && (
            <Link
              href={`${parentLink}/${child.slug.current}`}
              legacyBehavior
              passHref
            >
              <NavigationMenuLink>
                <span className="whitespace-nowrap capitalize">
                  {child.name}
                </span>
              </NavigationMenuLink>
            </Link>
          )}
          {/* If the child has other children we want to display them */}
          {child.otherChildren && (
            <NavItemChildren
              otherChildren={child.otherChildren}
              parentLink={`${parentLink}/${child.slug.current}`}
            />
          )}
        </li>
      ))}
    </ul>
  );
};
