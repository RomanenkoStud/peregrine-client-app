"use client";

import { UserProfile } from "@clerk/nextjs";
import { Section } from "@/components/layout";

export default function AdminProfile() {
  return <Section className="mt-4">
    <UserProfile/>
  </Section>;
}
