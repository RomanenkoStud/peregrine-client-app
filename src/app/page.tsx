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
    '/brands/brand-6.png',
    '/brands/brand-7.png',
  ];

  return (
    <main className="min-h-screen bg-white">
      <NextUIProvider className="w-full">
        <Header menu={menu}>
          <Hero image={hero}>
            <h1 className="mx-8 text-center text-4xl md:text-6xl drop-shadow-lg font-bold text-white">Raining Offers For Hot Summer!</h1>  
          </Hero>
        </Header>
        <ImageTicker images={logos} speed="10" className="my-4"/>
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
