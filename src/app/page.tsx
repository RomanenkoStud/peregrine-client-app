'use client';

import {NextUIProvider} from '@nextui-org/react'
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import ProductList from "./components/products/ProductList";
import Content from "./components/layout/main/Content";
import SectionTitle from "./components/layout/main/SectionTitle";

export default function Home() {
  const products = [
    {
      title: "Orange",
      img: "/product-1.jpg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "/product-2.jpg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "/product-3.jpg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "/product-4.jpg",
      price: "$5.30",
    },
  ];

  return (
    <main className="flex min-h-screen bg-white flex-col items-center justify-between">
      <NextUIProvider>
        <Header>
          <h1 className="self-center mx-8 text-center text-4xl drop-shadow-lg font-bold text-white">Raining Offers For Hot Summer!</h1>  
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
