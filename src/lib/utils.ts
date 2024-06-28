import Stripe from 'stripe';
import { ProductType } from '@/types/Productype';

export const formatPrice = (price: number | null) => {
  if (!price) return 'R$ 0,00';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price / 100);
};


export const fetchProducts = async (query: string): Promise<ProductType[]> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-04-10'
  });

  const products = await stripe.products.list({
    limit: 100, // Limite de produtos para listar
  });

  const filteredProducts = products.data.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const formattedProducts = await Promise.all(
    filteredProducts.map(async (product) => {
      const price = await stripe.prices.list({
        product: product.id,
      });
      return {
        id: product.id,
        price: price.data[0].unit_amount,
        name: product.name,
        image: product.images[0],
        description: product.description,
        currency: price.data[0].currency,
      };
    })
  );

  return formattedProducts;
}
