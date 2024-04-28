import Image from 'next/image';

type Props = {
  className?: string;
}

export const Logo = ({className=''}: Props) => {
  return (
    <Image src="/logo-1.svg" alt="logo image" className={`max-w-24 md:max-w-36 max-h-full w-auto object-cover ${className}`} width={75} height={75}/>
  );
};