"use client";

import { 
  Table, 
  TableHeader, 
  TableColumn,
  TableCell, 
  TableBody, 
  TableRow,
} from "@nextui-org/react";
import type { Category } from "@/models/categories";
import { ButtonLink } from "@/components/layout";

type Props = {
  list: Category[]
  className?: string;
}

export const CategoryTable = ({ list, className }: Props) => {
  return (
    <Table className={`text-primary ${className}`}>
      <TableHeader>
        <TableColumn>Title</TableColumn>
        <TableColumn>Cover</TableColumn>
        <TableColumn>URI (Link)</TableColumn>
        <TableColumn>Description</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody>
        {list.map((category, index) => (
          <TableRow key={index}>
            <TableCell>{category.title}</TableCell>
            <TableCell>{category.img?.src}</TableCell>
            <TableCell>{category.uri}</TableCell>
            <TableCell>{category.description}</TableCell>
            <TableCell className="flex gap-2">
              <ButtonLink
                href={`/admin/edit-category/${category.uri}`}
                className="min-w-[150px] text-white font-medium text-base hover:scale-105"
                size="sm"
              >
                Edit
              </ButtonLink>
              <ButtonLink
                href={`/admin/delete-category/${category.uri}`}
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