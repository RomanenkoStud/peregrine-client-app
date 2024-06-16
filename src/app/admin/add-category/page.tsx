import { CategoryForm } from "@/components/forms";
import { Section } from "@/components/layout";
import { Breadcrumbs } from "@/components/routes";

const AddCategoryPage = async () => {
  return (
    <Section className="flex flex-col gap-y-6 m-4">
      <Breadcrumbs />
      <CategoryForm type="create"/>
    </Section>
  );
};

export default AddCategoryPage;
