import React from "react";
import {ProductCard} from "./ProductCard";
import type {Product} from "@/models/products";

type Props = {
  list: Product[];
  className?: string;
}

export const ProductList = ({list, className=''}: Props) => {
  return (
    <div className={`gap-2 grid grid-cols-2 md:grid-cols-4 m-2 ${className}`}>
      {list.map((product, index) => (
        <ProductCard key={index} {...product}/>
      ))}
    </div>
  );
}
