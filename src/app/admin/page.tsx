import { Section } from "../../components/layout";
import { Breadcrumbs } from "@/components/routes";

export default function Admin() {

  return (
    <Section className="m-4 flex items-center justify-between">
      <Breadcrumbs />
    </Section>
  );
}
