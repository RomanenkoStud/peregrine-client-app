'use client';

import {
  Header, 
  Footer,
  Content,
} from "@/components/layout";


type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function AdminLayout({children}: Props) {
  const menu = [
    {text: "Products"},
    {text: "Profile"},
    {text: "Login", mobileOnly: true},
    {text: "Sign Up", mobileOnly: true},
  ];

  return (
    <>
      <Header menu={menu}>
      </Header>
      <main className="flex flex-col flex-1 bg-white">
        <Content>
          {children}
        </Content>
      </main>
      <Footer/>
    </>
  );
}
