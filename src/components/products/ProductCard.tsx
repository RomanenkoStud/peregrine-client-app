import React from "react";
import {Card, CardBody, CardFooter, Image, Button, Link} from "@nextui-org/react";
import type {Product} from "@/models/products";

const PRODUCTS_PATH = "/products";

export const ProductCard = ({title, img, price, uri}: Product) => {
  return (
    <Card className="rounded shadow-sm">
      <CardBody className="overflow-visible p-0">
        <Link href={`${PRODUCTS_PATH}/${uri}`}  className="w-full" >
          <Image
            isZoomed
            width="100%"
            alt={img.alt}
            src={img.src}
            className="w-full object-center object-contain h-[200px] md:h-[300px]"
            classNames={{
              wrapper: "w-full"
            }}
          />
        </Link>
      </CardBody>
      <CardFooter className="text-small text-peregrine flex flex-col items-start">
        <Link href={`${PRODUCTS_PATH}/${uri}`}><b className="mb-2">{title}</b></Link>
        <p className="mb-2">{price}</p>
        <Button size="lg" className="w-full text-white bg-peregrine p-2 rounded">
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}