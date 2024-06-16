import { ProductForm } from "@/components/forms/ProductForm";
import { Section } from "@/components/layout";
import { Breadcrumbs } from "@/components/routes";
import { getAllCategories } from "@/services/categoryService";

const AddProductPage = async () => {
  const allCategories = await getAllCategories();

  return (
    <Section className="flex flex-col gap-y-6 m-4">
      <Breadcrumbs />
      <ProductForm categories={allCategories} type="create"/>
    </Section>
  );
};

export default AddProductPage;
