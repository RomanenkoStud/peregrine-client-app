import {TopBar} from "./TopBar";
import {Menu} from "./Menu";
import type {MenuItem} from "@/models/menu";

type Props = {
  children?: React.ReactNode,
  menu: MenuItem[],
}

export const Header = ({children, menu}: Props) => {
  const menuItems = menu.map(item => item.text);
  const navItems = menu.filter(item => !item.mobileOnly).map(item => item.text);

  return (
    <header className="next-ui relative text-primary w-full">
      <TopBar navItems={navItems}>
        <Menu menuItems={menuItems}/>
      </TopBar>
      {children}
    </header>
  );
};