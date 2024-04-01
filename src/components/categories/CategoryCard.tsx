import {Card, CardHeader, Image} from "@nextui-org/react";
import type {Category} from "@/models/categories";

export function CategoryCard({title, img, description}: Category) {
  return (
    <Card isPressable className="h-[250px] rounded shadow-sm">
      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">{title}</p>
        <h4 className="text-white font-medium text-large">{description}</h4>
      </CardHeader>
      <Image
        removeWrapper
        className="z-0 w-full h-full object-cover"
        alt={img.alt}
        src={img.src}
      />
    </Card>
  );
}
