'use client';

import {
  Header, 
  Footer,
} from "../../components/layout";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function ProductsLayout({children}: Props) {
  const menu = [
    {text: "Everything"},
    {text: "Women"},
    {text: "Men"},
    {text: "Accessories"},
    {text: "Login", mobileOnly: true},
    {text: "Sign Up", mobileOnly: true},
  ];

  return (
    <>
      <Header menu={menu}>
      </Header>
      <main className="flex flex-col flex-1 bg-white">
        {children}
      </main>
      <Footer/>
    </>
  );
}
