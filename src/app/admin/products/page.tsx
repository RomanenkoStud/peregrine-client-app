import { getAllProducts } from "@/services/productService/getAllProducts";
import { Product } from "@/models/products";
import { Section, ButtonLink } from "@/components/layout";
import { ProductTable } from "@/components/products";
import { Breadcrumbs } from "@/components/routes";

export default async function Products() {  
  const products: Product[] = (await getAllProducts()) || [];

  return (
    <Section className="m-4">
      <div className="next-ui flex flex-row justify-between">
        <Breadcrumbs />
        <ButtonLink
          href="/admin/add-product"
          className="min-w-[200px] text-white font-medium text-base hover:scale-105"
          size="sm"
        >
          Add product
        </ButtonLink>
      </div>
      <ProductTable list={products} className="mt-4"/>
    </Section>
  );
}
