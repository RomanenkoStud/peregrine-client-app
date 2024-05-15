"use client";

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const Breadcrump = () => {
  const pathname = usePathname();
  const router = useRouter();

  const routes: string[] = pathname.split("/").filter((route) => route !== "");

  return (
    <>
      <Breadcrumbs color="primary">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        {routes.map((route) => (
          <BreadcrumbItem key={route}>
            <Link href={`/${route}`}>{route}</Link>
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </>
  );
};
