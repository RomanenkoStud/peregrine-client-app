import Image from 'next/image';
import type {PromoImage} from "../../model/promo";

type Props = {
  className: string;
  children?: JSX.Element,
  image?: PromoImage,
}

export const Hero = ({className='', children, image}: Props) => {
  return (
    <div className={`relative w-full ${className}`}>
      {image && (<Image
        width={1900}
        height={1200}
        alt={image.alt}
        src={image.src}
        className="w-screen brightness-75 sm:h-[720px] h-[300px] object-cover"
      />)}
      <div className="absolute inset-0 flex">
        {children}
      </div>
    </div>
  );
};