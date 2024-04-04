import { Thing } from "@prisma/client";
import { getAllThings } from "../actions/thing/getAllThings";

export default async function Products() {
  const things: Thing[] = (await getAllThings()) || [];

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
