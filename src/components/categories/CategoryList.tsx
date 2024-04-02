import {CategoryCard} from "./CategoryCard";
import type {Category} from "@/models/categories";

type Props = {
  list: Category[];
  className?: string;
}

export function CategoryList({list, className=''}: Props) {
  return (
    <div className={`gap-2 grid grid-cols-2 md:grid-cols-4 m-2 ${className}`}>
      {list.map(({title, img, description}, index) => (
        <CategoryCard key={index} title={title} img={img} description={description}/>
      ))}
    </div>
  );
}
