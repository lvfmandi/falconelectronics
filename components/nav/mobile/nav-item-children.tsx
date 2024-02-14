import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChildCategory } from "@/lib/types";
import Link from "next/link";

interface MobileNavItemChildrenProps {
  otherChildren: ChildCategory[];
  className?: string;
  setOpen: Function;
  first?: Boolean;
  parentLink: string;
}

export function MobileNavItemChildren({
  otherChildren,
  className,
  setOpen,
  parentLink,
  first,
}: MobileNavItemChildrenProps) {
  return (
    <div className={className}>
      {otherChildren.map((child) => (
        <AccordionItem key={child._id} value={child._id} className="border-b-0">
          {child.otherChildren.length ? (
            <AccordionTrigger>
              <Link href={`${parentLink}/${child.slug.current}`}>
                <span onClick={() => setOpen(false)}>{child.name}</span>
              </Link>
            </AccordionTrigger>
          ) : (
            <div className="py-4 font-medium" onClick={() => setOpen(false)}>
              <Link href={`${parentLink}/${child.slug.current}`}>
                {child.name}
              </Link>
            </div>
          )}
          {child.otherChildren && (
            <AccordionContent className="pl-2">
              <MobileNavItemChildren
                otherChildren={child.otherChildren}
                setOpen={setOpen}
                parentLink={`${parentLink}/${child.slug.current}`}
              />
            </AccordionContent>
          )}
        </AccordionItem>
      ))}
    </div>
  );
}
