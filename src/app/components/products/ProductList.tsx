import React from "react";
import {Product, ProductCard} from "./ProductCard";

type Props = {
  list: Product[];
  className: string;
}

const ProductList = ({list, className=''}: Props) => {
  return (
    <div className={`gap-2 grid grid-cols-2 sm:grid-cols-4 ${className}`}>
      {list.map((item, index) => (
        <ProductCard key={index} item={item}/>
      ))}
    </div>
  );
}

export default ProductList;
