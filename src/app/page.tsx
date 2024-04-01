'use client';

import {NextUIProvider} from '@nextui-org/react'
import {
  Hero,
  Header, 
  Footer, 
  Content, 
  Section,
  SectionTitle,
} from "../components/layout";
import {
  ProductList, 
} from "../components/products";
import { 
  CategoryList
} from '@/components/categories/CategoryList';
import {getFeaturedProducts} from "../services/productService";
import {getCategories} from '@/services/categoryService/categories';
import { ImageTicker } from '@/components/layout/common/ImageTicker';

export default function Home() {
  const products = getFeaturedProducts();
  const categories = getCategories();

  const hero = {
    src: "/promo/promo-2.jpg",
    alt: "Promo image",
  };

  const menu = [
    {text: "Everything"},
    {text: "Women"},
    {text: "Men"},
    {text: "Accessories"},
    {text: "Login", mobileOnly: true},
    {text: "Sign Up", mobileOnly: true},
  ];

  const logos = [
    '/brands/brand-1.png',
    '/brands/brand-2.png',
    '/brands/brand-3.png',
    '/brands/brand-4.png',
    '/brands/brand-5.png',
  ];

  return (
    <main className="flex min-h-screen bg-white flex-col items-center justify-between">
      <NextUIProvider className="w-full">
        <Header menu={menu}>
          <Hero image={hero}>
            <h1 className="self-center mx-8 text-center text-4xl drop-shadow-lg font-bold text-white">Raining Offers For Hot Summer!</h1>  
          </Hero>
        </Header>
        <ImageTicker images={logos} className="my-4"/>
        <Content className="my-8 flex flex-col justify-center">
          <Section>
            <SectionTitle className="mb-4">Categories</SectionTitle>
            <CategoryList list={categories}/>
          </Section>
          <Section>
            <SectionTitle className="mb-4">Featured Products</SectionTitle>
            <ProductList list={products}/>
          </Section>
        </Content>
        <Footer/>
      </NextUIProvider>
    </main>
  );
}
