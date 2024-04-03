import {Card, CardHeader, Image, Link} from "@nextui-org/react";
import type {Category} from "@/models/categories";

const PRODUCTS_PATH = "/products";

export function CategoryCard({title, img, uri}: Category) {
  return (
    <Card className="h-[250px] rounded shadow-sm">
      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <h4 className="text-primary text-large uppercase font-bold drop-shadow-sm bg-white/75 p-2 rounded">{title}</h4>
      </CardHeader>
      <Link href={`${PRODUCTS_PATH}/${uri}`}  className="w-full" >
        <Image
          removeWrapper
          radius="sm"
          className="z-0 w-full h-full object-cover"
          alt={img.alt}
          src={img.src}
        />
      </Link>
    </Card>
  );
}
