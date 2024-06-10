import { AddProductForm } from "@/components/forms/AddProductForm";
import { Content, Section } from "@/components/layout";
import { Breadcrumbs } from "@/components/routes";
import { getAllCategories } from "@/services/categoryService";

const AddProductPage = async () => {
  const allCategories = await getAllCategories();

  return (
    <Content>
      <Section className="flex flex-col gap-y-6 mt-6">
        <Breadcrumbs />
        <AddProductForm categories={allCategories} />
      </Section>
    </Content>
  );
};

export default AddProductPage;
