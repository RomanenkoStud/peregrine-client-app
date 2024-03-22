import {TopBar} from "./TopBar";
import {Menu} from "./Menu";
import type {MenuItem} from "../../../models/menu";

type Props = {
  children?: JSX.Element|JSX.Element[],
  menu: MenuItem[],
}

export const Header = ({children, menu}: Props) => {
  const menuItems = menu.map(item => item.text);
  const navItems = menu.filter(item => !item.mobileOnly).map(item => item.text);

  return (
    <header className="relative text-peregrine w-full">
      <TopBar navItems={navItems}>
        <Menu menuItems={menuItems}/>
      </TopBar>
      {children}
    </header>
  );
};