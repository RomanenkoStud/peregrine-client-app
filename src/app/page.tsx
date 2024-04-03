'use client';

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
} from '@/components/categories';
import {getFeaturedProducts} from "../services/productService";
import {getCategories} from '@/services/categoryService';
import {ImageTicker} from '@/components/layout/common/ImageTicker';

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
    <>
      <Header menu={menu}>
        <Hero image={hero}>
          <h1 className="mx-8 text-center text-4xl md:text-6xl drop-shadow-lg font-bold text-white">Raining Offers For Hot Summer!</h1>  
        </Hero>
      </Header>
      <main className="flex flex-col flex-1 bg-white">
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
      </main>
      <Footer/>
    </>
  );
}
