"use client";

import React from "react";
import {Tabs, Tab, Image} from "@nextui-org/react";
import type {Image as CustomImage} from "@/models/common";

type Props = {
  images: CustomImage[],
}

export const ProductPreview = ({images}: Props) => {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" color="primary" variant="underlined" disableCursorAnimation={true} classNames={{
        tab: "h-fit data-[selected]:outline-primary data-[selected]:outline-2 rounded-sm",
        panel: "order-first",
      }}>
        {images.map((image, index) => (
          <Tab
            key={index}
            title={
              <div className="flex items-center">
                <Image src={image.src} alt={image.alt}  className="w-full object-center object-contain h-24"/>
              </div>
            }
          >
            <Image
              isZoomed
              width="100%"
              alt={image.alt}
              src={image.src}
              className="w-full object-center object-contain h-[300px] md:h-[400px]"
              classNames={{
                wrapper: "w-full"
              }}
            />
          </Tab>
        ))}
      </Tabs>
    </div>  
  );
}