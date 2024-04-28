"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Button,
} from "@nextui-org/react";
import { IconShoppingBag } from "@tabler/icons-react";
import { Logo } from "../common";

type Props = {
  navItems: string[];
  children?: React.ReactNode;
};

export const TopBar = ({ navItems, children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      classNames={{
        wrapper: "w-full flex",
      }}
      className="bg-primary text-white"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBlurred={false}
    >
      <NavbarContent className="sm:hidden">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
      <NavbarBrand className="h-full">
        <Link href="/" className="flex flex-1 flex-col items-center h-full">
          <Logo />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link color="foreground" href="#">
              {item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            className="min-w-10 min-h-10 p-0 text-white"
            href="#"
            variant="light"
          >
            <IconShoppingBag stroke={1.25} />
          </Button>
        </NavbarItem>
      </NavbarContent>

      {children}
    </Navbar>
  );
};
