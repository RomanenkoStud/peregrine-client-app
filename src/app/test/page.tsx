import { Product } from "@prisma/client";
import { getAllProducts } from "@/services/productService/getAllProducts";

export default async function Products() {
  const things: Product[] = (await getAllProducts()) || [];

  console.log("things", things);

  return (
    <div className="h-screen flex items-center justify-center bg-white/80">
      {things.map(({ id, description, createdAt, price, title }) => (
        <div key={id} className="w-[200px]">
          <h2>{title}</h2>
          <p>{description}</p>
          <span>{price}</span>
          {/* <span>{new Date(createdAt)}</span> */}
        </div>
      ))}
    </div>
  );
}
