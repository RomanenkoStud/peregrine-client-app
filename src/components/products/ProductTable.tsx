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
      </TableHeader>
      <TableBody>
        {list.map((product, index) => (
          <TableRow key={index}>
            <TableCell>{product.title}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.uri}</TableCell>
            <TableCell>{product.cover?.src}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};