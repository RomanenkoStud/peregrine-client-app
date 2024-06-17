"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { setUserId } from "@/services/userService";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    setUserId();
  }, []);

  return (
    <ClerkProvider>
      <NextUIProvider className="flex flex-col flex-1" navigate={router.push}>
        {children}
      </NextUIProvider>
    </ClerkProvider>
  );
}
