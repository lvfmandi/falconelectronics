"use client";

import { ProductChildrenProps } from "@/app/product/[slug]/page";
import { Table, TableBody, TableRow, TableCell } from "../ui/table";

export const ProductSpecifications = ({ product }: ProductChildrenProps) => {
  const { specifications } = product;
  return (
    <div className="grid gap-4">
      {specifications?.map((specification, idx) => {
        const { title, table } = specification;
        const { rows } = table;
        return (
          <div className="grid gap-3" key={specification._key}>
            <h4 className="capitalize">{title}</h4>
            <Table>
              <TableBody className="border">
                {rows?.map(({ _key, cells }: any) => (
                  <TableRow key={_key}>
                    {cells?.map((cell: any, idx: number) => (
                      <TableCell
                        key={_key + idx}
                        className={`${
                          idx === 0 ? "font-medium" : "font-light"
                        }`}
                      >
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      })}
    </div>
  );
};
