"use server";

import { Breadcrumbs } from "@/components/routes";
import { Content, Section } from "../../components/layout";
import { CategoryList } from "../../components/categories";
import { getAllCategories } from "../../services/categoryService";

export default async function Products() {
  const categories = await getAllCategories();

  return (
    <Content>
      <Section className="m-4">
        <Breadcrumbs />
        <CategoryList list={categories} />
      </Section>
    </Content>
  );
}
