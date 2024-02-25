import React from 'react'
import Image from "next/image";
export const ImageResp = ({src, alt, width, height}) => {
  return (
    <Image
      src={src}
      // layout="fill"
      alt={alt}
      width={400}
      height={500}
      className="flex self-center image"
    />
  );
}
