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
import {featuredProducts} from "../services/productService";

export default function Home() {
  const products = featuredProducts();

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
          <SectionTitle className="flex justify-center mb-4"><span className="relative pb-1 after:rounded after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-peregrine">Featured Products</span></SectionTitle>
          <ProductList list={products}/>
        </Content>
        <Footer/>
      </NextUIProvider>
    </main>
  );
}
