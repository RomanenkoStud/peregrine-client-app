import Image from 'next/image';

type Props = {
  className: string;
}

const Logo = ({className=''}: Props) => {
  return (
    <Image src="/logo.webp" alt="logo image" className={`min-w-36 h-auto object-cover ${className}`} width={100} height={50}/>
  );
};

export default Logo;