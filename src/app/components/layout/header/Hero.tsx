import Image from 'next/image';

type Props = {
  className: string;
  children?: JSX.Element,
}

const Hero = ({className='', children}: Props) => {
  return (
    <div className={`relative w-full ${className}`}>
      <Image
        width={1900}
        height={1200}
        alt="Store hero Image"
        src="/promo-2.jpg"
        className="w-screen brightness-75 sm:h-[720px] h-[300px] object-cover"
      />
      <div className="absolute inset-0 flex">
        {children}
      </div>
    </div>
  );
};

export default Hero;