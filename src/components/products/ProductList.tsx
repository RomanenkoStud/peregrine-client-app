import React from "react";
import {ProductCard} from "./ProductCard";
import type {Product} from "@/models/products";

type Props = {
  list: Product[];
  className?: string;
}

export const ProductList = ({list, className=''}: Props) => {
  return (
    <div className={`gap-2 grid grid-cols-2 sm:grid-cols-4 ${className}`}>
      {list.map(({title, img, price}, index) => (
        <ProductCard key={index} title={title} img={img} price={price}/>
      ))}
    </div>
  );
}
