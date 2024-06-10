"use server";

import { Breadcrumbs } from "@/components/routes";
import { Section, NotFound } from "@/components/layout";
import { CategoryList } from "@/components/categories";
import { getAllCategories } from "@/services/categoryService";

export default async function Products() {
  const categories = (await getAllCategories()) || [];

  return (
    <Section className="m-4">
      <Breadcrumbs/>
      {categories.length ? (
        <CategoryList list={categories} />
      ) : (
        <NotFound/>
      )}
    </Section>
  );
}
