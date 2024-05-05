'use client';

import {useState} from 'react';
import {Button} from '@nextui-org/react';
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import {
  Content,
  Section,
} from "@/components/layout";
import {ProductPreview} from "@/components/products";
import {getProduct} from "@/services/productService";
import {getCategory} from "@/services/categoryService";
import {Product as ProductType} from '@/models/products';
import {Category as CategoryType} from '@/models/categories';

type Props = {
  params: {
    product: string;
  }
}

export default function Product({params}: Props) {
  const {product: uri} = params;

  const [product, setProduct] = useState<ProductType|null>(null);
  const [category, setCategory] = useState<CategoryType|null>(null);
  getProduct(uri)
    .then(product => {
      if(!product) return;

      setProduct(product);
      product.category && getCategory(uri)
        .then(category => {
          if(!category) return;
          
          setCategory(category);
        })
        .catch(error => {
          // Handle errors here
        });
    })
    .catch(error => {
      // Handle errors here
    });

  return (
    <Content>
      {product ? (<Section className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
        <ProductPreview images={[...(product.cover ? [product.cover] : []), ...(product.images ? product.images : [])]}/>
        <div className="next-ui flex flex-col text-primary">
          <Breadcrumbs color="primary">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/products">Products</BreadcrumbItem>
            <BreadcrumbItem href={`/products/${product.category}`}>{category && category.title}</BreadcrumbItem>
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
