import { CategoryForm } from "@/components/forms";
import { Section, NotFound } from "@/components/layout";
import { Breadcrumbs } from "@/components/routes";
import { getCategory } from "@/services/categoryService";

type Props = {
  params: {
    category: string;
  }
}

const EditProductPage = async ({params}: Props) => {
  const {category: uri} = params;

  const category = await getCategory(uri);

  return (
    <Section className="flex flex-col gap-y-6 m-4">
      <Breadcrumbs />
      {category ? (
        <CategoryForm category={category} type="edit"/>
      ) : (
        <NotFound/>
      )}
    </Section>
  );
};

export default EditProductPage;
