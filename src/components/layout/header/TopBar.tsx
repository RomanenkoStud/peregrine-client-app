import {useState} from 'react';
import Link from 'next/link';
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  Button,
} from "@nextui-org/react";
import {IconShoppingBag} from '@tabler/icons-react';
import {Logo} from '../common';

type Props = {
  navItems: string[],
  children?: JSX.Element,
}

export const TopBar = ({navItems, children}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar 
      classNames={{
        "wrapper": "flex gap-16",
      }}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"}/>
      </NavbarContent>
      <NavbarBrand>
        <Link href="#">
          <Logo/>
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
          <Button as={Link} className="w-10 h-10" color="primary" href="#" variant="flat">
            <IconShoppingBag stroke={1.25}/>
          </Button>
        </NavbarItem>
      </NavbarContent>
      {children}
    </Navbar>
  );
};