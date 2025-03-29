"use client";

import { useState } from "react";
import Image from "next/image";

interface ClientImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function ClientImage({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  className,
  width,
  height,
}: ClientImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
