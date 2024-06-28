'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ProductType } from '@/types/Productype';

type ProductImageProps = {
  product: ProductType;
  fill?: boolean;
  className?: string;
};

export default function ProductImage({ product, fill, className }: ProductImageProps) {
  const [loading, setLoading] = useState(true);
  return fill ? (
    <Image
      src={product.image}
      fill
      alt={product.name}
      className={`${className} object-contain ${
        loading ? 'scale-110 blur-3xl grayscale' : 'scale-100 blur-0 grayscale-0'
      }`}
      onLoadingComplete={() => setLoading(false)}
    />
  ) : (
    <Image
      src={product.image}
      width={800}
      height={800}
      alt={product.name}
      className={`w-full h-96 object-contain ${
        loading ? 'scale-110 blur-3xl grayscale' : 'scale-100 blur-0 grayscale-0'
      } ${className}`}
      onLoadingComplete={() => setLoading(false)}
    />
  );
}
