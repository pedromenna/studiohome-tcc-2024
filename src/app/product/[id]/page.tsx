import AddCart from '@/app/components/AddCart';
import ProductImageWithZoom from '@/app/components/ImageWithZoom';
import Footer from '@/app/components/Footer';
import { formatPrice } from '@/lib/utils';
import Stripe from 'stripe';

type ProductPageProps = {
  params: {
    id: string;
  };
};

async function getProduct(id: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-04-10'
  });
  const product = await stripe.products.retrieve(id);
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
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto p-6 mt-16">
          <div className="flex flex-col md:flex-row items-start gap-8 mt-16">
            <div className="w-full md:w-1/2 lg:w-2/3">
              <ProductImageWithZoom product={product} className="w-full h-96 object-contain" />
            </div>
            <div className="flex flex-col flex-grow max-w-full md:max-w-2xl">
              <div className="pb-4">
                <h1 className="text-3xl font-light text-black">{product.name}</h1>
                <h2 className="text-2xl text-black font-light mt-2">
                  {formatPrice(product.price)}
                </h2>
              </div>
              <div className="pb-4">
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
              <AddCart product={product} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 w-full">
        <Footer />
      </div>
    </div>
  );
}
