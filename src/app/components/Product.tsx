import React from 'react';
import { ProductType } from "@/types/Productype";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import AddCartIcone from "./AddCartIcone";
import Link from "next/link";

type ProductProps = {
    product: ProductType;
    className?: string;
};

export default function Product({ product, className = '' }: ProductProps) {
    return (
        <Link href={`/product/${product.id}`}>
            <div className={`flex flex-col shadow-lg bg-gray-200 rounded-lg p-2 text-gray-800 hover:bg-gray-300 transition-colors duration-300 ${className}`} style={{ height: '220px' }}> {/* Reduced overall height and padding */}
                <div className="relative flex-grow h-2/3 w-full"> {/* Adjusted height of the image container */}
                    {product.image ? (
                        <Image 
                            src={product.image} 
                            alt={product.name} 
                            layout="fill" 
                            objectFit="contain" 
                            className="rounded"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No Image</span>
                        </div>
                    )}
                </div>
                <div className="flex flex-col justify-between mt-1 h-1/3"> {/* Adjusted height of the text container */}
                    <p className="truncate text-lg sm:text-base mb-0.5">{product.name}</p> {/* Increased text size */}
                    <div className="flex justify-between items-end">
                        <p className="text-sm font-semibold">{formatPrice(product.price)}</p> {/* Reduced text size */}
                        <AddCartIcone product={product} />
                    </div>
                </div>
            </div>
        </Link>
    );
}
