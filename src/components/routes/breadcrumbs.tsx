"use client";

import { BreadcrumbItem as NextUiBreadcrumbItem, Breadcrumbs as NextUiBreadcrumbs } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const Breadcrumbs = () => {
  const pathname = usePathname();
  const router = useRouter();

  const routes: string[] = pathname.split("/").filter((route) => route !== "");

  return (
    <>
      <NextUiBreadcrumbs color="primary">
        <NextUiBreadcrumbItem href="/">Home</NextUiBreadcrumbItem>
        {routes.map((route) => (
          <NextUiBreadcrumbItem key={route}>
            <Link href={`/${route}`}>{route.charAt(0).toUpperCase() + route.slice(1)}</Link>
          </NextUiBreadcrumbItem>
        ))}
      </NextUiBreadcrumbs>
    </>
  );
};
