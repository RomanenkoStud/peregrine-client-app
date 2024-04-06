import { Image } from "@nextui-org/react";
import type { PromoImage } from "@/models/promo";

type Props = {
  className?: string;
  children?: React.ReactNode;
  image?: PromoImage;
};

export const Hero = ({ className = "", children, image }: Props) => {
  return (
    <div className={`relative w-full ${className}`}>
      {image && (
        <Image
          removeWrapper
          width={1900}
          height={1200}
          radius="none"
          alt={image.alt}
          src={image.src}
          className="w-full brightness-75 sm:h-[550px] h-[350px] object-cover z-0"
        />
      )}
      <div className="absolute inset-0 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
};
