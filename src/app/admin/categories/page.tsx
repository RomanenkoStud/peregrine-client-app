import { getAllCategories } from "@/services/categoryService";
import { Category } from "@/models/categories";
import { Section, ButtonLink } from "@/components/layout";
import { CategoryTable } from "@/components/categories";
import { Breadcrumbs } from "@/components/routes";

export default async function Categories() {  
  const categories: Category[] = (await getAllCategories()) || [];

  return (
    <Section className="m-4">
      <div className="next-ui flex flex-row justify-between">
        <Breadcrumbs />
        <ButtonLink
          href="/admin/add-category"
          className="min-w-[200px] text-white font-medium text-base hover:scale-105"
          size="sm"
        >
          Add category
        </ButtonLink>
      </div>
      <CategoryTable list={categories} className="mt-4"/>
    </Section>
  );
}
