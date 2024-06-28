'use client';

import { useCartStore } from '@/store';
import { ProductType } from '@/types/Productype';
import { AiOutlineShoppingCart } from 'react-icons/ai'; // Importando o ícone de carrinho

export default function Product({ product }: { product: ProductType }) {
  const { addProduct } = useCartStore();

  return (
    <button
      onClick={() => addProduct(product)}
      className='rounded-md bg-teal-600 text-white px-3.5 py-2.5 text-sm flex items-center justify-center' // Removi o 'text-center' e ajustei para 'flex items-center justify-center'
    >
      <AiOutlineShoppingCart className='inline-block' /> {/* Ícone de carrinho */}
    </button>
  );
}
