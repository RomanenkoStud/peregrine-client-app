'use server';

import { Breadcrumbs } from "@/components/routes";
import {
  Content,
  Section,
} from "../../../components/layout";
import {
  ProductList, 
} from "../../../components/products";
import {getCategoryProducts} from "../../../services/productService";
import {getCategory} from "../../../services/categoryService";

type Props = {
  params: {
    category: string;
  }
}

export default async function Category({params}: Props) {
  const {category: uri} = params;

  const category = await getCategory(uri);
  const products = await getCategoryProducts(uri);

  return (
    <Content>
      {category ? (<Section className="m-4">
        <Breadcrumbs />
        <ProductList list={products}/>
      </Section>) : (
        <Section className="m-4">
          <h2 className="next-ui text-primary">Not found</h2>
        </Section>
      )}
    </Content>
  );
}
