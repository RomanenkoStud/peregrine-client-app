"use client";

import { useEffect, useState } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { Content, Section } from "../../components/layout";
import { CategoryList } from "../../components/categories";
import { getAllCategories } from "../../services/categoryService";
import { Category } from "@/models/categories";

export default function Products() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
      async function fetchCategories() {
          const categories = await getAllCategories();
          setCategories(categories);
      }
      fetchCategories();
  }, []);

  return (
    <Content>
      <Section className="m-4">
        <Breadcrumbs color="primary">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        </Breadcrumbs>
        <CategoryList list={categories} />
      </Section>
    </Content>
  );
}
