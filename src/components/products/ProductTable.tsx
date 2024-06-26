"use client";

import { 
  Table, 
  TableHeader, 
  TableColumn,
  TableCell, 
  TableBody, 
  TableRow,
} from "@nextui-org/react";
import type { Product } from "@/models/products";
import { ButtonLink } from "@/components/layout";

type Props = {
  list: Product[]
  className?: string;
}

export const ProductTable = ({ list, className }: Props) => {
  return (
    <Table className={`text-primary ${className}`}>
      <TableHeader>
        <TableColumn>Title</TableColumn>
        <TableColumn>Category</TableColumn>
        <TableColumn>Price</TableColumn>
        <TableColumn>URI (Link)</TableColumn>
        <TableColumn>Cover</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {list.map((product, index) => (
          <TableRow key={index}>
            <TableCell>{product.title}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.uri}</TableCell>
            <TableCell>{product.cover?.src}</TableCell>
            <TableCell className="flex gap-2">
              <ButtonLink
                href={`/admin/edit-product/${product.uri}`}
                className="min-w-[150px] text-white font-medium text-base hover:scale-105"
                size="sm"
              >
                Edit
              </ButtonLink>
              <ButtonLink
                href={`/admin/delete-product/${product.uri}`}
                className="min-w-[150px] text-white font-medium text-base hover:scale-105"
                size="sm"
              >
                Delete
              </ButtonLink>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};