import Image from 'next/image';

const TICKER_SPEED = {
  '5': 'animate-[ticker_5s_linear_infinite]',
  '10': 'animate-[ticker_10s_linear_infinite]',
}

type Props = {
  images: string[],
  speed?: keyof typeof TICKER_SPEED,
  className?: string,
}

export const ImageTicker = ({ images, speed='5', className='' }:Props) => {
  return (
    <div className={`overflow-hidden w-full h-8 ${className}`}>
      <div className={`min-w-full w-max h-full flex justify-around ${TICKER_SPEED[speed]}`}>
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`image-${index}`}
            width={120}
            height={50}
            className="px-2 w-auto"
          />
        ))}
        <div className={`absolute top-0 left-full w-full h-full flex justify-around`}>
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`image-${index}`}
              width={120}
              height={50}
              className="px-2 w-auto"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
