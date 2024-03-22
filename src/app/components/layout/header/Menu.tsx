import {
  NavbarMenu, 
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";

type Props = {
  menuItems: string[],
}

const Menu = ({menuItems}: Props) => {
  return (
    <NavbarMenu className="bg-white">
      {menuItems.map((item, index) => (
        <NavbarMenuItem key={`${item}-${index}`}>
          <Link
            className="w-full text-peregrine"
            href="#"
            size="lg"
          >
            {item}
          </Link>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
  );
};

export default Menu;