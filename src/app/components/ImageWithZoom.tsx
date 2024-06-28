'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ProductType } from '@/types/Productype';

type ProductImageWithZoomProps = {
  product: ProductType;
  className?: string;
};

export default function ProductImageWithZoom({ product, className }: ProductImageWithZoomProps) {
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      setImageSize({
        width: imageRef.current.clientWidth,
        height: imageRef.current.clientHeight,
      });
    }
  }, [loading]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div
      className="relative w-full h-96"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
      ref={imageRef}
    >
      <Image
        src={product.image}
        fill
        alt={product.name}
        className={`${className} object-contain ${
          loading ? 'scale-110 blur-3xl grayscale' : 'scale-100 blur-0 grayscale-0'
        }`}
        onLoadingComplete={() => setLoading(false)}
      />
      {zoom && (
        <div
          className="absolute w-64 h-64 border-2 border-gray-300 bg-white bg-cover bg-no-repeat"
          style={{
            top: `${position.y}%`,
            left: `${position.x}%`,
            transform: 'translate(-50%, -50%)',
            backgroundImage: `url(${product.image})`,
            backgroundSize: `${imageSize.width * 1.2}px ${imageSize.height * 1.2}px`, // Diminuir mais o nível de zoom
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundRepeat: 'no-repeat',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
}
