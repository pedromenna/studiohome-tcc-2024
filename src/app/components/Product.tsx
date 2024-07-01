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
            <div 
                className={`flex flex-col shadow-lg bg-white bg-opacity-90 p-2 text-gray-800 hover:bg-opacity-100 transition-all duration-300 ${className}`} 
                style={{ height: '300px', width: '220px', border: '1px solid rgba(0, 0, 0, 0.1)' }} // Aumentou a largura do cartão
            > 
                <div className="relative flex-grow h-3/4 w-full"> {/* Ajustou a altura do contêiner da imagem */}
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
                <div className="flex flex-col justify-between mt-1 h-1/4"> {/* Ajustou a altura do contêiner de texto */}
                    <p className="truncate text-lg sm:text-base mb-0.5 hover:text-slate-800 transition-colors duration-300">{product.name}</p> {/* Tamanho do texto ajustado */}
                    <div className="flex justify-between items-end">
                        <p className="price">{formatPrice(product.price)}</p> {/* Aplicada a classe "price" */}
                        <AddCartIcone product={product} />
                    </div>
                </div>
            </div>
        </Link>
    );
}
