'use client';

import {NextUIProvider, Image, Button} from '@nextui-org/react';
import {useRouter} from 'next/navigation';
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import {
  Header, 
  Footer, 
  Content,
  Section,
} from "../../../../components/layout";
import {getProduct} from "../../../../services/productService";
import {getCategory} from "../../../../services/categoryService";

type Props = {
  params: {
    product: string;
  }
}

export default function Product({params}: Props) {
  const {product: uri} = params;
  const router = useRouter();

  const product = getProduct(uri);
  const category = product && getCategory(product.category);
  const menu = [
    {text: "Everything"},
    {text: "Women"},
    {text: "Men"},
    {text: "Accessories"},
    {text: "Login", mobileOnly: true},
    {text: "Sign Up", mobileOnly: true},
  ];

  return (
    <main className="flex bg-white">
      <NextUIProvider className="w-full" navigate={router.push}>
        <Header menu={menu}>
        </Header>
        <Content>
          {product ? (<Section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
            <Image
              isZoomed
              width="100%"
              alt={product.img.alt}
              src={product.img.src}
              className="w-full object-center object-contain h-[300px] md:h-[400px]"
              classNames={{
                wrapper: "w-full"
              }}
            />
            <div className="next-ui flex flex-col text-primary">
              <Breadcrumbs color="primary" className="mb-4">
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
            <Section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
              <h2 className="next-ui text-primary">Not found</h2>
            </Section>
          )}
        </Content>
        <Footer/>
      </NextUIProvider>
    </main>
  );
}
