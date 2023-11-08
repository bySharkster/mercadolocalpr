import React from 'react'
import Image from "next/image";
export const ImageResp = ({src, alt}) => {
  return (
    <Image
      src={src}
      layout="fill"
      alt={alt}
      className="flex self-center image"
    />
  );
}
