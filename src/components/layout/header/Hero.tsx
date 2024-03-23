import {Image} from "@nextui-org/react";
import type {PromoImage} from "@/models/promo";

type Props = {
  className?: string;
  children?: JSX.Element|JSX.Element[],
  image?: PromoImage,
}

export const Hero = ({className='', children, image}: Props) => {
  return (
    <div className={`relative w-full ${className}`}>
      {image && (<Image
        removeWrapper
        width={1900}
        height={1200}
        alt={image.alt}
        src={image.src}
        className="w-screen brightness-75 sm:h-[720px] h-[300px] object-cover z-0"
      />)}
      <div className="absolute inset-0 flex">
        {children}
      </div>
    </div>
  );
};