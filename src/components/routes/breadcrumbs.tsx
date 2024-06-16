"use client";

import { BreadcrumbItem as NextUiBreadcrumbItem, Breadcrumbs as NextUiBreadcrumbs } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Breadcrumbs = () => {
  const pathname = usePathname();

  const routes: string[] = pathname.split("/").filter((route) => route !== "");

  return (
    <NextUiBreadcrumbs color="primary">
      <NextUiBreadcrumbItem href="/">Home</NextUiBreadcrumbItem>
      {routes.map((route, index) => (
        <NextUiBreadcrumbItem key={index + route}>
          <Link href={`/${routes.slice(0, index + 1).join("/")}`}>{route.charAt(0).toUpperCase() + route.slice(1)}</Link>
        </NextUiBreadcrumbItem>
      ))}
    </NextUiBreadcrumbs>
  );
};
