'use client';

import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import {
  Content,
  Section,
} from "../../components/layout";
import {
  CategoryList, 
} from "../../components/categories";
import {getCategories} from "../../services/categoryService";

export default function Products() {
  const categories = getCategories();

  return (
    <Content>
      <Section className="m-4">
        <Breadcrumbs color="primary">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        </Breadcrumbs>
        <CategoryList list={categories}/>
      </Section>
    </Content>
  );
}
