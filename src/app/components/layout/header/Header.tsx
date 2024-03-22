import TopBar from './TopBar';
import Menu from './Menu';
import Hero from './Hero';

type Props = {
  children?: JSX.Element,
}

const Header = ({children}: Props) => {
  const navItems = [
    "Everything",
    "Women",
    "Men",
    "Accessories",
  ];

  const controlItems = [
    "Login",
    "Sign Up",
  ]

  return (
    <header className="relative text-peregrine w-full">
      <TopBar navItems={navItems}>
        <Menu menuItems={[...navItems, ...controlItems]}/>
      </TopBar>
      <Hero>
        {children}
      </Hero>
    </header>
  );
};

export default Header;