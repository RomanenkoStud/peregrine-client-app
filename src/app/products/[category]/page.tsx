'use server';

import { Breadcrumbs } from "@/components/routes";
import {
  Section,
  NotFound,
} from "@/components/layout";
import {
  ProductList, 
} from "@/components/products";
import {getCategoryProducts} from "@/services/productService";

type Props = {
  params: {
    category: string;
  }
}

export default async function Category({params}: Props) {
  const {category: uri} = params;
  const products = (await getCategoryProducts(uri)) || [];

  return (
    <Section className="m-4">
      <Breadcrumbs/>
      {products.length ? (
        <ProductList list={products}/>
      ) : (
        <NotFound/>
      )}
    </Section>
  );
}
