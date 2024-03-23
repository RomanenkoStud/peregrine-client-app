'use client';

import {NextUIProvider} from '@nextui-org/react'
import {
  Hero,
  Header, 
  Footer, 
  Content, 
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

  return (
    <main className="flex min-h-screen bg-white flex-col items-center justify-between">
      <NextUIProvider>
        <Header menu={menu}>
          <Hero image={hero}>
            <h1 className="self-center mx-8 text-center text-4xl drop-shadow-lg font-bold text-white">Raining Offers For Hot Summer!</h1>  
          </Hero>
        </Header>
        <Content className="my-8 flex flex-col justify-center">
          <SectionTitle>Categories</SectionTitle>
          <CategoryList list={categories}/>
          <SectionTitle>Featured Products</SectionTitle>
          <ProductList list={products}/>
        </Content>
        <Footer/>
      </NextUIProvider>
    </main>
  );
}
