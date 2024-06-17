"use client";

import { useEffect } from "react";
import { setViewedProducts } from "@/services/productService";

export function Providers({ children, productUri }: { children: React.ReactNode, productUri: string }) {

  useEffect(() => {
    setViewedProducts(productUri);
  }, [productUri]);

  return (
    <>
      {children}
    </>
  );
}
