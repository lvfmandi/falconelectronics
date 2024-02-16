import { ProductChildrenProps } from "@/app/product/[slug]/page";
import Link from "next/link";

export const ProductHighlighted = ({ product }: ProductChildrenProps) => {
  const { brand, name, highlightedSpecifications, categories } = product;
  return (
    <div className="w-full grid divide-y content-start">
      <span className="py-2">{brand.name}</span>
      <h1 className="text-gray-500 text-3xl py-4 text-foreground">{name}</h1>
      <ul className="grid py-1 list-disc">
        {highlightedSpecifications.map((hSpec) => (
          <li className="ml-4" key={hSpec._key}>
            <span>
              <span className="font-medium text-xs">{hSpec.name}: </span>
              {hSpec.value}
            </span>
          </li>
        ))}
      </ul>
      <div className="py-1">
        {categories.map((category) => (
          <Link
            className="uppercase font-schibsted_grotesk"
            href={`/category/${category.slug.current}`}
            key={category._id}
          >
            <span>{category.name} </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
