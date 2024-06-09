import { getAllProducts } from "@/services/productService/getAllProducts";
import { UserButton } from "@clerk/nextjs";
import { initialProfile } from "@/lib/initial-profile";
import { Product } from "@/models/products";

export default async function Products() {
  const things: Product[] = (await getAllProducts()) || [];

  const profile = await initialProfile();

  // console.log(profile);

  // console.log("things", things);

  return (
    <div className="h-screen flex items-center justify-center bg-white/80">
      <div className="flex flex-col gap-y-4">
        <h2 className="text-center text-black">Add product</h2>
        {/* Mapping products */}
        <div className="grid grid-cols-2 gap-4 w-[400px]">
          {things.map(({ id, description, createdAt, price, title }) => (
            <div key={id}>
              <h2>{title}</h2>
              <p>{description}</p>
              <span>{price}</span>
              {/* <span>{new Date(createdAt)}</span> */}
            </div>
          ))}
        </div>
      </div>

      {/* <UserButton afterSignOutUrl="/" /> */}

      {/* Here I will add products */}
    </div>
  );
}
