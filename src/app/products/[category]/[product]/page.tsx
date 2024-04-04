'use client';

import {Button} from '@nextui-org/react';
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import {
  Content,
  Section,
} from "@/components/layout";
import {ProductPreview} from "@/components/products";
import {getProduct} from "@/services/productService";
import {getCategory} from "@/services/categoryService";

type Props = {
  params: {
    product: string;
  }
}

export default function Product({params}: Props) {
  const {product: uri} = params;
  const product = getProduct(uri);
  const category = product && getCategory(product.category);

  return (
    <Content>
      {product ? (<Section className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
        <ProductPreview images={[product.cover, ...(product.images ? product.images : [])]}/>
        <div className="next-ui flex flex-col text-primary">
          <Breadcrumbs color="primary">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/products">Products</BreadcrumbItem>
            <BreadcrumbItem href={`/products/${product.category}`}>{category?.title}</BreadcrumbItem>
            <BreadcrumbItem href={`/products/${product.category}/${uri}`}>{product ? product.title : '404'}</BreadcrumbItem>
          </Breadcrumbs>
          <div className="flex flex-col flex-1">
            <h2 className="text-2xl font-semibold mb-4">{product.title}</h2>
            <p className="mb-2">{product.description}</p>
            <p className="font-bold mb-2">{product.price}</p>
          </div>
          <Button size="lg" className="justify-self-end w-full text-white p-2 rounded">
            Add to cart
          </Button>
        </div>
      </Section>) : (
        <Section className="m-4">
          <h2 className="next-ui text-primary">Not found</h2>
        </Section>
      )}
    </Content>
  );
}
