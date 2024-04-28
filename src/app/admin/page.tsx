"use client";

import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { Content, Section } from "../../components/layout";

export default function Admin() {

  return (
    <Content>
      <Section className="m-4">
        <Breadcrumbs color="primary">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/admin">Dashboard</BreadcrumbItem>
        </Breadcrumbs>
      </Section>
    </Content>
  );
}
