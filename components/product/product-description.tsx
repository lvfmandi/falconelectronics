"use client";

import { PortableText, PortableTextComponents } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";
import { InstagramEmbed, YouTubeEmbed } from "react-social-media-embed";

// types
import { ProductChildrenProps } from "@/app/product/[slug]/page";

// componets
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { NextImage } from "../image";
import { useEffect, useState } from "react";

export const ProductDescription = ({ product }: ProductChildrenProps) => {
  const { name, brand, description } = product;
  const [components, setComponents] = useState<PortableTextComponents | null>(
    null
  );
  const portableComponents: PortableTextComponents = {
    types: {
      image: ({ value }) => (
        <div className="max-w-2xl">
          <NextImage
            src={urlForImage(value).url()}
            alt={`${name} description image`}
            width={650}
            height={650}
            className="w-[500px] h-[500px] aspect-square object-left-top object-contain"
          />
        </div>
      ),
      specification: ({ value }) => {
        return (
          <div className="grid gap-4 max-w-2xl">
            <h4>{value.title}</h4>
            <Table>
              <TableBody>
                {value.table.rows.map(({ _key, cells }: any) => (
                  <TableRow key={_key}>
                    {cells.map((cell: any, idx: number) => (
                      <TableCell key={_key + idx} className="font-medium">
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      },
      youtube: ({ value }: any) => (
        <YouTubeEmbed
          url={value.url}
          width="100%"
          youTubeProps={{ className: "max-w-2xl" }}
        />
      ),
      instagram: ({ value }: any) => (
        <div className="max-w-60 md:max-w-sm overflow-hidden">
          <InstagramEmbed url={value.url} />
        </div>
      ),
    },
    block: {
      h1: ({ children }) => (
        <>
          <h1 className="font-light max-w-2xl text-4xl">{children}</h1>{" "}
          <hr className="max-w-2xl" />
        </>
      ),
      h2: ({ children }) => (
        <>
          <h2 className="font-light max-w-2xl text-3xl">{children}</h2>{" "}
          <hr className="max-w-2xl" />
        </>
      ),
      h3: ({ children }) => (
        <>
          <h3 className="font-light max-w-2xl text-2xl">{children}</h3>
          <hr className="max-w-2xl" />
        </>
      ),
      h4: ({ children }) => (
        <>
          <h4 className="font-light max-w-2xl text-xl">{children}</h4>
          <hr className="max-w-2xl" />
        </>
      ),
      h5: ({ children }) => (
        <>
          <h5 className="font-light max-w-2xl text-lg">{children}</h5>
          <hr className="max-w-2xl" />
        </>
      ),
      h6: ({ children }) => (
        <>
          <h6 className="font-light max-w-2xl text-base">{children}</h6>
          <hr className="max-w-2xl" />
        </>
      ),
      normal: ({ children }) => <p className="max-w-2xl">{children}</p>,
      blockquote: ({ children }) => (
        <p className="max-w-2xl border-l-2 p-2 pr-0 text-gray-500">
          {children}
        </p>
      ),
    },
    marks: {
      link: ({ value, children }) => {
        const target = (value?.href || "").startsWith("http")
          ? "_blank"
          : undefined;
        return (
          <Link href={value?.href} target={target} className="text-primary">
            {children}
          </Link>
        );
      },
      code: ({ children }) => {
        return (
          <code className="p-3 bg-accent rounded-sm max-w-2xl">{children}</code>
        );
      },
    },
    list: {
      bullet: ({ children }) => (
        <ul className="mt-xl pl-4 max-w-2xl">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="mt-lg pl-4 max-w-2xl">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="list-disc">{children}</li>,
      number: ({ children }) => <li className="list-decimal">{children}</li>,
    },
  };

  useEffect(() => setComponents(portableComponents), [product]);

  return (
    <div className="">
      {components ? (
        <Card>
          <CardHeader>
            <CardTitle className="font-light">{name}</CardTitle>
            <CardDescription>
              <Link href={`/brand/${brand.slug.current}`}>{brand.name}</Link>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <PortableText value={description} components={components} />
          </CardContent>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
