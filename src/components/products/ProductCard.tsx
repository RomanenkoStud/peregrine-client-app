import React from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import type {Product} from "@/models/products";

export const ProductCard = ({title, img, price}: Product) => {
  return (
    <Card className="rounded shadow-sm" isPressable onPress={() => console.log("item pressed")}>
      <CardBody className="overflow-visible p-0">
        <Image
          width="100%"
          alt={img.alt}
          src={img.src}
          className="w-full object-cover h-[140px]"
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b>{title}</b>
        <p className="text-peregrine">{price}</p>
      </CardFooter>
    </Card>
  );
}