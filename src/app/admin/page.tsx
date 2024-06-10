"use client";

import { Button } from "@nextui-org/react";
import { Content, Section } from "../../components/layout";
import { Breadcrumbs } from "@/components/routes";
import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();

  return (
    <Content>
      <Section className="m-4 flex items-center justify-between">
        <Breadcrumbs />
        <Button
          className="min-w-[200px] text-white font-medium text-base hover:scale-105"
          onClick={() => router.push("/admin/add-product")}
        >
          Add product
        </Button>
      </Section>
    </Content>
  );
}
