import { ProductForm } from "@/components/forms/ProductForm";
import { Section, NotFound } from "@/components/layout";
import { Breadcrumbs } from "@/components/routes";
import { getAllCategories } from "@/services/categoryService";
import { getProduct } from "@/services/productService";

type Props = {
  params: {
    product: string;
  }
}

const EditProductPage = async ({params}: Props) => {
  const {product: uri} = params;

  const allCategories = await getAllCategories();
  const product = await getProduct(uri);

  return (
    <Section className="flex flex-col gap-y-6 m-4">
      <Breadcrumbs />
      {product ? (
        <ProductForm product={product} categories={allCategories} type="edit"/>
      ) : (
        <NotFound/>
      )}
    </Section>
  );
};

export default EditProductPage;
